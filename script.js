const STATS_ENDPOINT = "/api/public/stats";
const REFRESH_INTERVAL = 60000;

const userCounter = document.getElementById("registeredUsers");
const statsStatus = document.getElementById("statsStatus");

async function loadRegisteredUsers() {
  try {
    const response = await fetch(STATS_ENDPOINT, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    if (!response.ok) throw new Error("Statistics endpoint unavailable");

    const data = await response.json();
    const count = data.registeredUsers;

    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error("Invalid statistics response");
    }

    userCounter.textContent = count.toLocaleString("en-US");
    statsStatus.textContent = "Live network statistics";
  } catch (error) {
    userCounter.textContent = "—";
    statsStatus.textContent = "Statistics temporarily unavailable";
  }
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

loadRegisteredUsers();
setInterval(loadRegisteredUsers, REFRESH_INTERVAL);
