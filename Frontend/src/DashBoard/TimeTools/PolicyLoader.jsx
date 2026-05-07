import React from 'react'
import axios from "axios";


export default async function PolicyLoader() {
    try {
        const res = await axios.get("http://localhost:5000/api/policies", {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching policies:", error);
        throw error;
    }
}
