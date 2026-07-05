(function() {
    'use strict';

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navbar = document.querySelector(".navbar");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute("id");
            const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(".nav-menu a").forEach(a => a.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    if (typedTextSpan) {
        const textArray = ["Web Developer", "Desktop App Developer", "Python Programmer", "Database Designer", "Tech Enthusiast"];
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            if (isPaused) return;

            const currentText = textArray[textArrayIndex];

            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    cursorSpan.classList.remove("typing");
                    type();
                }, 2000);
                cursorSpan.classList.add("typing");
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    cursorSpan.classList.remove("typing");
                    type();
                }, 500);
                cursorSpan.classList.add("typing");
                return;
            }

            const delay = isDeleting ? 50 : 100;
            setTimeout(type, delay);
        }

        type();
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        const stats = document.querySelector('.stats');
        if (!stats) return;

        const rect = stats.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (isNaN(target)) return;
                let current = 0;
                const increment = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + '+';
                }, 25);
            });
            animated = true;
            window.removeEventListener('scroll', animateStats);
        }
    }

    window.addEventListener('scroll', animateStats);

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.featured-card, .service-card, .skill-category').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % testimonials.length;
        showSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(parseInt(dot.getAttribute('data-index')));
            startSlideShow();
        });
    });

    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);
        startSlideShow();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        animateStats();
        setTimeout(() => {
            document.querySelectorAll('.featured-card, .service-card, .skill-category').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        }, 300);
    });

})();
