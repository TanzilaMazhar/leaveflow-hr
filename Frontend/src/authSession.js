export function clearAuthSession() {
  localStorage.removeItem("LoggedIn");
  localStorage.removeItem("user");
  localStorage.removeItem("authExpiresAt");
}

export function saveAuthSession(user, expiresAt) {
  localStorage.setItem("LoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(user));

  if (expiresAt) {
    localStorage.setItem("authExpiresAt", String(expiresAt));
  }
}

export function isAuthSessionActive() {
  const isLoggedIn = localStorage.getItem("LoggedIn") === "true";
  const expiresAt = Number(localStorage.getItem("authExpiresAt"));

  if (!isLoggedIn) return false;

  if (!expiresAt || Date.now() > expiresAt) {
    clearAuthSession();
    return false;
  }

  return true;
}
