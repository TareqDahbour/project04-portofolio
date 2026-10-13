// ==========================================================
// Personal Portfolio - script.js
// ==========================================================

(() => {
  "use strict";

  // ---------- 1. THEME SWITCHER (mandatory feature) ----------
  // Event lifecycle:
  //   User clicks button -> browser fires "click" event ->
  //   handleThemeClick() runs -> data-theme attribute on <html>
  //   changes -> CSS variables re-resolve -> page restyles.

  const THEMES = [
    { name: "light",  label: "Light",  icon: "\u2600" }, // sun
    { name: "dark",   label: "Dark",   icon: "\u263E" }, // moon

  ];

  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeLabel = document.getElementById("theme-label");

  let themeIndex = 0;

  function applyTheme(index) {
    const theme = THEMES[index];
    root.setAttribute("data-theme", theme.name); // DOM mutation -> CSS re-evaluates
    themeIcon.textContent = theme.icon;
    themeLabel.textContent = theme.label;
    try { localStorage.setItem("portfolio-theme", theme.name); } catch (e) { /* storage unavailable */ }
  }

  // The callback: runs every time the "click" event fires on the button.
  function handleThemeClick() {
    themeIndex = (themeIndex + 1) % THEMES.length;
    applyTheme(themeIndex);
  }

  // Restore the visitor's last choice, if any.
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const found = THEMES.findIndex(t => t.name === saved);
    if (found !== -1) themeIndex = found;
  } catch (e) { /* ignore */ }
  applyTheme(themeIndex);

  // Register the listener: "when a click happens here, call this function".
  themeButton.addEventListener("click", handleThemeClick);


  // ---------- 2. MOBILE MENU TOGGLE ----------
  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after choosing a link (mobile).
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });


  // ---------- 3. CONTACT FORM VALIDATION ----------
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status " + type;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page reload; this is a static site

    const fields = [form.elements.name, form.elements.email, form.elements.message];
    let valid = true;

    fields.forEach(field => {
      const empty = field.value.trim() === "";
      field.classList.toggle("invalid", empty);
      if (empty) valid = false;
    });

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.elements.email.value.trim());
    if (valid && !emailOk) {
      form.elements.email.classList.add("invalid");
      valid = false;
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    if (!valid) {
      setStatus("Please fill in all fields.", "error");
      return;
    }

    setStatus("Thanks! Your message has been received (demo form, nothing is sent).", "success");
    form.reset();
  });


  // ---------- 4. FOOTER YEAR ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
