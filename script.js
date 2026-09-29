/* =========================
   PAGE LOADER
========================= */

const pageLoader = document.getElementById("pageLoader");

if (pageLoader) {
    setTimeout(() => {
        pageLoader.classList.add("hide");
    }, 1000);
}
/* ==============================
   PHOTO SLIDER
============================== */

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("profileDots");

let currentSlide = 0;


if (slides.length && dotsContainer) {

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.className = "profile-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);

    });

}


const dots =
    document.querySelectorAll(".profile-dot");


function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });


    currentSlide = index;

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

}


if (slides.length > 1) {

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 3500);

}



/* ==============================
   TYPING EFFECT
============================== */

const typingText =
    document.getElementById("typingText");


const words = [
    "Web Developer",
    "Frontend Developer",
    "JavaScript Learner"
];


let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingText) return;


    const word = words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            word.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === word.length) {

            deleting = true;

            setTimeout(typeEffect, 1400);

            return;
        }

    } else {

        typingText.textContent =
            word.substring(0, charIndex - 1);

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 55 : 90
    );

}


typeEffect();

/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    // Saved theme check
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.textContent = "☀";
    } else {
        themeBtn.textContent = "☾";
    }


    // Button click
    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        if (isDark) {
            themeBtn.textContent = "☀";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.textContent = "☾";
            localStorage.setItem("theme", "light");
        }

    });

}





/* ==============================
   MOBILE MENU
============================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");


    menuBtn.textContent =
        navLinks.classList.contains("active")
            ? "×"
            : "☰";

});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});



/* ==============================
   PROJECT FILTER
============================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projectCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});



/* ==============================
   PROJECT MODAL
============================== */

const modal =
    document.getElementById("projectModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTech =
    document.getElementById("modalTech");

const modalType =
    document.getElementById("modalType");


const detailsButtons =
    document.querySelectorAll(".details-btn");


detailsButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent =
            button.dataset.title;

        modalDescription.textContent =
            button.dataset.description;

        modalTech.textContent =
            button.dataset.tech;

        modalType.textContent =
            button.dataset.type;


        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


document.querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModal
    );


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});



/* ==============================
   COPY BUTTON
============================== */

const copyButtons =
    document.querySelectorAll(".copy-btn");

const toast =
    document.getElementById("toast");


copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const text =
            button.dataset.copy;


        try {

            await navigator.clipboard.writeText(text);

            showToast("Copied successfully ✓");

        } catch {

            showToast("Copy failed");

        }

    });

});


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}



/* ==============================
   SCROLL PROGRESS
============================== */

const scrollProgress =
    document.getElementById("scrollProgress");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;


    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    const percentage =
        pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;


    scrollProgress.style.width =
        percentage + "%";

}, { passive: true });



/* ==============================
   BACK TO TOP
============================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}, { passive: true });


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* ==============================
   ACTIVE NAV
============================== */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            threshold: 0.3
        }
    );


sections.forEach(section => {

    observer.observe(section);

});



/* ==============================
   CONSOLE
============================== */

console.log(
    "🚀 Ashish Kumar Portfolio loaded successfully!"
);
/* =========================================
   ABOUT COUNTERS
========================================= */

const counters =
    document.querySelectorAll("[data-counter]");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.counter);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 40));

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    current + (
                        target === 100
                            ? "%"
                            : "+"
                    );

            }, 35);

    });

}


const aboutSection =
    document.querySelector("#about");

if (aboutSection) {

    const aboutObserver =
        new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    startCounters();

                    aboutObserver.disconnect();

                }

            },
            {
                threshold: .25
            }
        );

    aboutObserver.observe(aboutSection);

}
/* =========================================
   SKILLS ANIMATION
========================================= */

const skillsSection =
    document.querySelector(".skills-section");

const skillFills =
    document.querySelectorAll(".skill-fill");

let skillsAnimated = false;

if (skillsSection) {

    const skillsObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting &&
                    !skillsAnimated
                ) {

                    skillsAnimated = true;

                    skillFills.forEach(fill => {

                        fill.style.width =
                            fill.dataset.width;

                    });

                    skillsObserver.disconnect();

                }

            },
            {
                threshold: .25
            }
        );

    skillsObserver.observe(skillsSection);

}
function openCertificate(name) {
    showToast(name + " section selected");
}
function sendContactMessage() {

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
        showToast("Please fill all fields");
        return;
    }

    const subject = encodeURIComponent(
        "Portfolio Contact - " + name
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
        `mailto:ashishsharm7739@gmail.com?subject=${subject}&body=${body}`;

    showToast("Opening your email...");
}
/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .project-card, " +
    ".achievement-card, .contact-info, .contact-card, " +
    ".skills-layout, .whatsapp-cta"
);

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    if (index % 3 === 1) {
        element.classList.add("reveal-delay-1");
    }

    if (index % 3 === 2) {
        element.classList.add("reveal-delay-2");
    }
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (event) => {

    if (!cursorGlow) return;

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});
/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.textContent = "☀";
    } else {
        themeBtn.textContent = "☾";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const isDark =
            document.body.classList.contains("dark-theme");

        if (isDark) {
            themeBtn.textContent = "☀";
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.textContent = "☾";
            localStorage.setItem("theme", "light");
        }

    });

}
/* =========================
   MOBILE NAVBAR
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.textContent =
            navLinks.classList.contains("active")
                ? "✕"
                : "☰";

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";

        });

    });

}
/* =========================
   FINAL DARK MODE
========================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-theme");

    const button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-theme")) {

        button.textContent = "☀";

        localStorage.setItem("theme", "dark");

    } else {

        button.textContent = "☾";

        localStorage.setItem("theme", "light");

    }
}


/* Remember selected theme */

window.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("themeBtn");

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-theme");

        if (button) {
            button.textContent = "☀";
        }

    }

});