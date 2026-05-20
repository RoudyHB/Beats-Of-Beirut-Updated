document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  // Function to show Error with aria-live for screen readers
  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.className = "error-message";
      error.setAttribute("aria-live", "polite"); // Added for accessibility
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = message;
    error.style.color = "red";
  }

  function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidLebanesePhone(phone) {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("961")) {
      return /^(961)(1|3|4|5|6|7[0-9])[0-9]{6}$/.test(digits);
    } else if (digits.length === 8) {
      return /^(1|3|4|5|6|7[0-9])[0-9]{6}$/.test(digits);
    } else if (digits.length === 9 && digits.startsWith("0")) {
      return /^(0)(1|3|4|5|6|7[0-9])[0-9]{6}$/.test(digits);
    }
    return false;
  }

  function validateForm(event) {
    let isValid = true;

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (phoneInput.value.trim() !== "" && !isValidLebanesePhone(phoneInput.value)) {
      showError(phoneInput, "Please enter a valid Lebanese phone number.");
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Message cannot be empty.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      event.preventDefault();
    }
  }

  if (form) {
    form.addEventListener("submit", validateForm);
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      if (isValidEmail(emailInput.value)) clearError(emailInput);
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      if (phoneInput.value.trim() === "" || isValidLebanesePhone(phoneInput.value)) {
        clearError(phoneInput);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim() !== "") clearError(messageInput);
    });
  }

  // Countdown timer on Home Page
  function countdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;

    const targetDate = new Date("May 29, 2025 19:30:00").getTime();
    const now = Date.now();
    const gap = targetDate - now;

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    if (gap > 0) {
      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      document.getElementById("days").textContent = d;
      document.getElementById("hours").textContent = h;
      document.getElementById("minutes").textContent = m;
      document.getElementById("seconds").textContent = s;
    } else {
      countdownEl.textContent = "🎶 The concert has started!";
    }
  }

  setInterval(countdown, 1000);

  // Accessible FAQ toggle
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const answerId = button.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);
      if (!answer) return;

      const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        if (isExpanded) {
          answer.classList.remove("show");
        } else {
          answer.classList.add("show");
        }

    });

    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        button.click();
      }
    });
  });

const btn = document.getElementById("hamburgerBtn");
const nav = document.getElementById("mobileNav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    nav.classList.toggle("d-none");
  });
}
});

//redirect to thank you page after submission

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      // Redirect to your custom thank you page
      window.location.href = 'thank-you.html';
    } else {
      response.json().then(data => {
        if (data.errors) {
          alert(data.errors.map(error => error.message).join(", "));
        } else {
          alert('Oops! There was a problem submitting your form.');
        }
      });
    }
  }).catch(() => {
    alert('Oops! There was a problem submitting your form.');
  });
});

