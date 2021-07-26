if (getCookie("barx") !== "true") {
    document.getElementById("beta").classList.remove("hidden")
}

function dismiss() {
    if (getCookie("cookiebar") === "CookieAllowed") {
        document.cookie = "barx=true; samesite=strict; max-age=31536000; path=/"
    }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}