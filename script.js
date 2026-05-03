const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category || "";

      if (filter === "all" || category.includes(filter)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.getElementById("videoClose");
const videoBackdrop = document.getElementById("videoBackdrop");
const videoButtons = document.querySelectorAll("[data-video]");

function openVideo(videoUrl) {
  if (!videoModal || !videoFrame) return;

  videoFrame.src = `${videoUrl}?autoplay=1&rel=0`;
  videoModal.classList.add("open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  if (!videoModal || !videoFrame) return;

  videoFrame.src = "";
  videoModal.classList.remove("open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoUrl = button.dataset.video;

    if (videoUrl) {
      openVideo(videoUrl);
    }
  });
});

if (videoClose) {
  videoClose.addEventListener("click", closeVideo);
}

if (videoBackdrop) {
  videoBackdrop.addEventListener("click", closeVideo);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideo();
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});