const projects = {
  modmate: {
    title: "Modmate — Community moderation",
    type: "DISCORD BOT CONCEPT 01 · MODERATION",
    description: "A Discord moderation bot concept focused on helpful automod, clear mod logs, and a quick view of server health. Replace this summary with details of your bot and the features you implemented.",
    tags: ["Discord bot", "Python", "Moderation"]
  },
  orbit: {
    title: "Orbit — A warmer welcome",
    type: "DISCORD BOT CONCEPT 02 · ONBOARDING",
    description: "A Discord welcome and setup bot concept with member onboarding, self-assignable roles, and easy-to-find server resources. Replace this summary with your bot's actual details.",
    tags: ["Discord bot", "Python", "Onboarding"]
  },
  gather: {
    title: "Gather — Make plans together",
    type: "DISCORD BOT CONCEPT 03 · COMMUNITY EVENTS",
    description: "A Discord events bot concept for posting events, collecting RSVPs, and sending reminders right where the community already talks. Replace this summary with the features of your own project.",
    tags: ["Discord bot", "Python", "Events"]
  },
  sidequest: {
    title: "Sidequest — Web experiments",
    type: "OTHER PROJECT · WEB",
    description: "A flexible home for small web projects and experiments outside Discord. Update this entry to feature one of your own sites, tools, or other builds.",
    tags: ["HTML", "CSS", "Web"]
  }
};

const projectDialog = document.querySelector(".project-dialog");
const commandDialog = document.querySelector(".command-dialog");
const toast = document.querySelector(".toast");
const cursorOrbs = document.querySelectorAll(".cursor-orb");
const cursorDots = document.querySelectorAll(".cursor-dot");
let toastTimer;
let lastPointerPosition = null;

function positionCursors(x, y) {
  cursorOrbs.forEach((orb) => {
    orb.style.left = `${x - 17}px`;
    orb.style.top = `${y - 17}px`;
    orb.style.opacity = "1";
  });
  cursorDots.forEach((dot) => {
    dot.style.left = `${x - 2.5}px`;
    dot.style.top = `${y - 2.5}px`;
    dot.style.opacity = "1";
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && !card.dataset.category.split(" ").includes(filter);
    });
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = projects[card.dataset.project];
    if (!project) return;
    document.querySelector("#dialog-kicker").textContent = project.type;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector(".dialog-description").textContent = project.description;
    const tags = document.querySelector(".dialog-tags");
    tags.replaceChildren(...project.tags.map((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      return item;
    }));
    projectDialog.showModal();
    if (lastPointerPosition) positionCursors(lastPointerPosition.x, lastPointerPosition.y);
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => projectDialog?.close());
document.querySelector(".dialog-done")?.addEventListener("click", () => projectDialog?.close());
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-theme");
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#1c1e1a" : "#f5f4ee";
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  siteNav.classList.toggle("is-open", open);
});
siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

function openQuickNav() {
  if (commandDialog && !commandDialog.open) {
    commandDialog.showModal();
    if (lastPointerPosition) positionCursors(lastPointerPosition.x, lastPointerPosition.y);
    commandDialog.querySelector("input").focus();
  }
}
document.querySelector(".command-trigger")?.addEventListener("click", openQuickNav);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    openQuickNav();
  }
});
commandDialog?.addEventListener("click", (event) => {
  if (event.target === commandDialog) commandDialog.close();
});
commandDialog?.querySelectorAll(".command-results a").forEach((link) => {
  link.addEventListener("click", () => commandDialog.close());
});
const quickSearch = commandDialog?.querySelector("input");
quickSearch?.addEventListener("input", () => {
  const query = quickSearch.value.trim().toLowerCase();
  commandDialog.querySelectorAll(".command-results a").forEach((link) => {
    link.hidden = !link.textContent.toLowerCase().includes(query);
  });
});
commandDialog?.addEventListener("close", () => {
  quickSearch.value = "";
  commandDialog.querySelectorAll(".command-results a").forEach((link) => { link.hidden = false; });
});

const progress = document.querySelector(".scroll-progress");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

document.querySelectorAll(".year").forEach((year) => { year.textContent = new Date().getFullYear(); });

document.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  document.body.classList.add("cursor-enabled");
  lastPointerPosition = { x: event.clientX, y: event.clientY };
  positionCursors(event.clientX, event.clientY);
});
document.addEventListener("pointerover", (event) => {
  if (!(event instanceof PointerEvent) || event.pointerType === "touch") return;
  const interactive = event.target instanceof Element &&
    event.target.closest("a, button, input, [role='button']");
  cursorOrbs.forEach((orb) => orb.classList.toggle("is-interactive", Boolean(interactive)));
  cursorDots.forEach((dot) => dot.classList.toggle("is-interactive", Boolean(interactive)));
});
document.addEventListener("pointerleave", () => {
  [...cursorOrbs, ...cursorDots].forEach((cursor) => {
    cursor.style.opacity = "0";
    cursor.classList.remove("is-interactive");
  });
});
