// Smooth scroll for nav links and footer back-to-top link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Close mobile nav if open
      const navMenu = document.getElementById("navMenu");
      const navToggle = document.getElementById("navToggle");
      if (navMenu && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function setActiveLink() {
  let currentId = "";
  const scrollY = window.scrollY + 96; // offset for sticky nav

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
}

window.addEventListener("scroll", setActiveLink);

// Scroll reveal animations using IntersectionObserver
const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Trigger progress bars when their cards enter view
          if (entry.target.matches(".skills__card, .language__card")) {
            const bars = entry.target.querySelectorAll(
              ".skills__bar-fill, .language__bar-fill"
            );
            bars.forEach((bar) => {
              const level = bar.getAttribute("data-skill-level");
              if (level) {
                bar.style.width = level + "%";
              }
            });
          }

          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all
  animatedElements.forEach((el) => el.classList.add("animate-in"));
}

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

function toggleBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 350) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", toggleBackToTop);

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Basic form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {

    form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => console.log(data));
});

   

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    // Clear previous errors
    [nameError, emailError, messageError].forEach((el) => (el.textContent = ""));
    [nameInput, emailInput, messageInput].forEach((input) =>
      input.classList.remove("error")
    );
    if (formSuccess) formSuccess.textContent = "";

    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      nameInput.classList.add("error");
      isValid = false;
    }

    // Email validation
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      emailError.textContent = "Please enter your email.";
      emailInput.classList.add("error");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("error");
      isValid = false;
    }

    // Message validation
    if (!messageInput.value.trim()) {
      messageError.textContent = "Please enter a message.";
      messageInput.classList.add("error");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      messageInput.classList.add("error");
      isValid = false;
    }

    if (!isValid) return;

    // Simulate success (no backend)
    if (formSuccess) {
      formSuccess.textContent = "Thank you for your message. I will get back to you soon.";
    }
    contactForm.reset();
  });
}

//New JS

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "d0c498fe-65c5-4eda-b834-53c1f651e132");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});