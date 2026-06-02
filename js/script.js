"use strict";

(() => {
    
    // Runs everything once the HTML elements are fully parsed
    const init = () => {
        setupMobileMenu();
        setupCountdown();
        setupContactForm();
    };

    // Handles open/close toggle for mobile view navigation
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!menuToggle || !navLinks) return;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });
    };

    // Live countdown clock for the show date (August 15, 2026 at 8:00 PM)
    const setupCountdown = () => {
        const dayBox = document.getElementById('days');
        if (!dayBox) return; // Keeps the script from breaking on sub-pages without a clock

        const hourBox = document.getElementById('hours');
        const minBox = document.getElementById('minutes');
        const secBox = document.getElementById('seconds');

        const showDate = new Date("August 15, 2026 20:00:00").getTime();

        const updateClock = () => {
            const now = new Date().getTime();
            const distance = showDate - now;

            if (distance < 0) {
                clearInterval(clockInterval);
                return;
            }

            // Calculations for days, hours, minutes, and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Makes sure numbers under 10 look clean (adds a leading zero, like '07' instead of '7')
            dayBox.textContent = String(days).padStart(2, '0');
            hourBox.textContent = String(hours).padStart(2, '0');
            minBox.textContent = String(minutes).padStart(2, '0');
            secBox.textContent = String(seconds).padStart(2, '0');
        };

        // Run immediately to stop the screen from flashing '00' on initial page load
        updateClock();
        const clockInterval = setInterval(updateClock, 1000);
    };

    // Intercepts the contact form to do a seamless custom redirect
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const form = this;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Block double submission spam while waiting for the network response
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch('https://formspree.io/f/mwvzlrpl', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Send user directly to our custom success page layout
                    window.location.href = "https://roudyhb.github.io/Beats-Of-Beirut-Updated/thank-you.html";
                } else {
                    throw new Error("Formspree rejected submission");
                }

            } catch (err) {
                console.error("Form error:", err);
                alert("Something went wrong while sending your message. Please try again.");
                
                // Re-enable form button if the message failed to send
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    };

    document.addEventListener('DOMContentLoaded', init);

})();
