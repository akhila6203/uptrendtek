document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    let started = false;

    function animateCounters() {

        if (started) return;

        const section = document.querySelector(".about-counter-section");

        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight - 120) {

            started = true;

            counters.forEach(counter => {

                const target = Number(counter.dataset.target);

                let current = 0;

                const speed = target / 80;

                const timer = setInterval(() => {

                    current += speed;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    if (target === 5000) {

                        counter.textContent = Math.floor(current / 1000) + "K";

                    }

                    else if (target === 5) {

                        counter.textContent = Math.floor(current) + "+";

                    }

                    else if (target === 100) {

                        counter.textContent = Math.floor(current) + "%";

                    }

                    else {

                        counter.textContent = Math.floor(current);

                    }

                }, 20);

            });

        }

    }

    animateCounters();

    window.addEventListener("scroll", animateCounters);

});