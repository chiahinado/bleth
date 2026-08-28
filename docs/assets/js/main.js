const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.querySelector("span").textContent = isOpen ? "MENU" : "CLOSE";
  menu?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("is-menu-open", !isOpen);
});

menu?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  menuButton?.setAttribute("aria-expanded", "false");
  const label = menuButton?.querySelector("span");
  if (label) {
    label.textContent = "MENU";
  }
  menu.classList.remove("is-open");
  header?.classList.remove("is-menu-open");
});
