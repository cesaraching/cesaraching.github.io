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

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    portfolioItems.forEach((item) => {
      const category = item.dataset.category || "";

      if (filter === "all" || category.includes(filter)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.getElementById("videoClose");
const videoBackdrop = document.getElementById("videoBackdrop");
const playButtons = document.querySelectorAll("[data-video]");

function openVideo(videoUrl) {
  if (!videoModal || !videoFrame) return;

  const autoplayUrl = `${videoUrl}?autoplay=1&rel=0`;

  videoFrame.src = autoplayUrl;
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

playButtons.forEach((button) => {
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