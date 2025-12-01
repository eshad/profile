/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  const modalEl = modalViews[modalClick];
  // Move modal to body to avoid transform issues from parent elements
  document.body.appendChild(modalEl);
  // Small delay to ensure DOM update
  setTimeout(() => {
    modalEl.classList.add("active-modal");
  }, 10);
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

// Close modal function
function closeAllModals() {
  modalViews.forEach((mv) => {
    mv.classList.remove("active-modal");
  });
}

modalClose.forEach((mc) => {
  mc.addEventListener("click", closeAllModals);
});

// Close modal when clicking outside content
modalViews.forEach((mv) => {
  mv.addEventListener("click", (e) => {
    if (e.target === mv) {
      closeAllModals();
    }
  });
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
  }
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== TYPING ANIMATION ===============*/
const typingText = document.getElementById('typing-text');
const phrases = [
  'Project Management Specialist',
  'Sr. Software Engineer',
  'Team Lead with Full Stack skill set',
  'IoT / Embedded System Expert',
  'Cloud & DevOps Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500; // Pause before new word
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
if (typingText) {
  setTimeout(typeEffect, 1000);
}

/*=============== COUNTER ANIMATION ===============*/
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

// Observe counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "bottom",
  distance: "30px",
  duration: 800,
  delay: 100,
  reset: false,
  easing: 'ease',
});

// Home section - gentle staggered entrance
sr.reveal(`.home__greeting`, { delay: 100, origin: "left", distance: "30px" });
sr.reveal(`.home__name`, { delay: 200, origin: "left", distance: "30px" });
sr.reveal(`.typing-container`, { delay: 300, distance: "20px" });
sr.reveal(`.home__education`, { delay: 400, distance: "20px" });
sr.reveal(`.home__buttons`, { delay: 500, distance: "20px" });
sr.reveal(`.home__cv-links`, { delay: 600, distance: "20px" });
sr.reveal(`.home__handle`, { delay: 200, origin: "right", distance: "40px" });
sr.reveal(`.home__social`, { delay: 700, distance: "20px" });
sr.reveal(`.home__scroll`, { delay: 800, distance: "20px" });

// Section titles
sr.reveal(`.section__subtitle`, { origin: "top", distance: "15px" });
sr.reveal(`.section__title`, { origin: "top", distance: "20px", delay: 100 });

// About section
sr.reveal(`.about__img`, { origin: "left", distance: "40px" });
sr.reveal(`.about__box`, { distance: "30px", interval: 150 });
sr.reveal(`.about__description`, { origin: "right", distance: "30px", delay: 200 });
sr.reveal(`.about__button-contact`, { distance: "20px", delay: 300 });

// Skills section
sr.reveal(`.skills__content`, { distance: "40px", interval: 200 });

// Services section
sr.reveal(`.services__card`, { distance: "40px", interval: 150 });

// Work section
sr.reveal(`.work__filters`, { origin: "top", distance: "20px" });
sr.reveal(`.work__card`, { distance: "40px", interval: 100 });

// Portfolio/Approach section
sr.reveal(`.portfolio__card`, { distance: "40px", interval: 200 });

// Screenshots section
sr.reveal(`.projectSwiper`, { distance: "50px" });

// Contact section
sr.reveal(`.contact__info`, { origin: "left", distance: "40px" });
sr.reveal(`.contact__form`, { origin: "right", distance: "40px", delay: 150 });

// Footer
sr.reveal(`.footer__title`, { origin: "top", distance: "20px" });
sr.reveal(`.footer__list`, { distance: "20px", delay: 150 });
sr.reveal(`.footer__social`, { distance: "20px", delay: 200 });
