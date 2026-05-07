const express = require("express");
const pool = require("./db");
const authMiddleware = require("./authMiddleWare");
const router = express.Router();

// Get all policies for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const user_id = req.user_id;
  try {
    const result = await pool.query(
      "SELECT * FROM policy WHERE user_id = $1 ORDER BY id DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Add new policy
router.post("/", authMiddleware, async (req, res) => {
  const { title, policy_date, type } = req.body;
  const user_id = req.user_id;

  if (!title || !policy_date || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch employee join date
    const userResult = await pool.query(
      "SELECT join_date FROM users WHERE id=$1",
      [user_id]
    );
    const joinDate = new Date(userResult.rows[0].join_date);
    const requestedDate = new Date(policy_date);

    // Max leave date = joining + 1 year
    const maxLeaveDate = new Date(joinDate);
    maxLeaveDate.setFullYear(maxLeaveDate.getFullYear() + 1);

    // 1-year cycle validation
    if (requestedDate < joinDate || requestedDate > maxLeaveDate) {
      return res.status(400).json({
        error: "Oops! Your leave date is outside your 1-year leave cycle."
      });
    }

    // Fetch current leaves of user in this cycle
    const leaves = await pool.query(
      "SELECT type, COUNT(*) as count FROM policy WHERE user_id=$1 AND policy_date BETWEEN $2 AND $3 GROUP BY type",
      [user_id, joinDate, maxLeaveDate]
    );

    const limits = { "Casual": 12, "Sick": 16, "Annual": 14 };
    const totalLimit = 42;

    let currentCount = { "Casual": 0, "Sick": 0, "Annual": 0 };
    let totalLeaves = 0;

    leaves.rows.forEach(l => {
      currentCount[l.type] = parseInt(l.count);
      totalLeaves += parseInt(l.count);
    });

    // Check type limit
    if (currentCount[type] + 1 > limits[type]) {
      return res.status(400).json({ error: `You cannot take more than ${limits[type]} ${type} leaves` });
    }

    // Check total limit
    if (totalLeaves + 1 > totalLimit) {
      return res.status(400).json({ error: "You cannot exceed total leave limit of 42" });
    }

    // Check if already exists for this user and date
    const check = await pool.query(
      `SELECT * FROM policy WHERE user_id = $1 AND policy_date = $2`,
      [user_id, policy_date]
    );
    if (check.rows.length > 0) {
      return res.status(409).json({ error: "You already applied for this date" });
    }

    // Insert policy
    const result = await pool.query(
      `INSERT INTO policy (title, policy_date, type, status, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, policy_date, type, "pending", user_id]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("Error adding policy:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// Update policy
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, policy_date, type } = req.body;
  const user_id = req.user_id;

  // Required fields check
  if (!title || !policy_date || !type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Fetch user's join date
    const userResult = await pool.query(
      "SELECT join_date FROM users WHERE id=$1",
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const joinDate = new Date(userResult.rows[0].join_date);
    const requestedDate = new Date(policy_date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // 1-year cycle validation
    const maxLeaveDate = new Date(joinDate);
    maxLeaveDate.setFullYear(maxLeaveDate.getFullYear() + 1);
    if (requestedDate < joinDate || requestedDate > maxLeaveDate) {
      return res.status(400).json({ error: "Your leave date is outside your 1-year cycle." });
    }

    // Check duplicate date (exclude current policy)
    const check = await pool.query(
      "SELECT * FROM policy WHERE user_id=$1 AND policy_date=$2 AND id<>$3",
      [user_id, policy_date, id]
    );
    if (check.rows.length > 0) {
      return res.status(409).json({ error: "You already applied for this date" });
    }

    // Fetch current leaves in this cycle (exclude current policy)
    const leaves = await pool.query(
      "SELECT type, COUNT(*) as count FROM policy WHERE user_id=$1 AND policy_date BETWEEN $2 AND $3 AND id<>$4 GROUP BY type",
      [user_id, joinDate, maxLeaveDate, id]
    );

    const limits = { "Casual": 12, "Sick": 16, "Annual": 14 };
    const totalLimit = 42;
    let currentCount = { "Casual": 0, "Sick": 0, "Annual": 0 };
    let totalLeaves = 0;

    leaves.rows.forEach(l => {
      currentCount[l.type] = parseInt(l.count);
      totalLeaves += parseInt(l.count);
    });

    // Include the updated leave
    currentCount[type] = (currentCount[type] || 0) + 1;
    totalLeaves += 1;

    if (currentCount[type] > limits[type]) {
      return res.status(400).json({ error: `You cannot take more than ${limits[type]} ${type} leaves` });
    }
    if (totalLeaves > totalLimit) {
      return res.status(400).json({ error: "You cannot exceed total leave limit of 42" });
    }

    // Update policy
    const result = await pool.query(
      `UPDATE policy
       SET title=$1, policy_date=$2, type=$3, updated_at=CURRENT_TIMESTAMP
       WHERE id=$4 AND user_id=$5
       RETURNING *`,
      [title, policy_date, type, id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete policy
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user_id;

  try {
    const result = await pool.query(
      "DELETE FROM policy WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.json({ message: "Policy deleted successfully", policy: result.rows[0] });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;



