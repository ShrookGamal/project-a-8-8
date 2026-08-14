window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 2000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sideOpen = document.getElementById('side-open');
    const sideClose = document.getElementById('side-close');

    if (sideOpen && sidebar) {
        sideOpen.addEventListener('click', () => sidebar.classList.add('active'));
    }
    if (sideClose && sidebar) {
        sideClose.addEventListener('click', () => sidebar.classList.remove('active'));
    }

    const nav = document.querySelector('.super-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-anchor');
    const sideLinks = document.querySelectorAll('.side-anchor');

    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        const updateLinks = (links) => {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        };

        updateLinks(navLinks);
        updateLinks(sideLinks);
    });

    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'show');
                
                const counters = entry.target.querySelectorAll('.counter, .exp-number, .count-up');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateValue(counter);
                        counter.classList.add('animated');
                    }
                });
            }
        });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.reveal, .fade-in, .service-card, .truck-card, .stat-unit');
    revealTargets.forEach(target => revealObserver.observe(target));

    function animateValue(obj) {
        const targetValue = +obj.getAttribute('data-target') || +obj.getAttribute('data-count') || 0;
        let startTimestamp = null;
        const duration = 2000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * targetValue);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerText = targetValue + (obj.innerText.includes('%') ? '%' : (targetValue > 20 ? '+' : ''));
            }
        };
        window.requestAnimationFrame(step);
    }

    const orderForm = document.getElementById('main-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('fname').value;
            const service = document.getElementById('fservice').value;
            const loc = document.getElementById('floc').value;
            const phone = "966594368198";
            const msg = `طلب خدمة جديد من الموقع:%0A- العميل: ${name}%0A- الخدمة: ${service}%0A- الموقع: ${loc}`;
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        });
    }

    const contactForm = document.getElementById('contact-form-baas');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = "966594368198";
            window.open(`https://wa.me/${phone}?text=استفسار جديد من صفحة تواصل معنا`, '_blank');
        });
    }

    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
        .reveal, .fade-in, .service-card, .truck-card { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active, .fade-in.show, .service-card.show, .truck-card.show { opacity: 1; transform: translateY(0); }
        .truck-card { transform: scale(0.9); }
        .truck-card.show { transform: scale(1); }
    `;
    document.head.appendChild(globalStyle);
});
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        observer.observe(el);
    });
});

const revealStyles = document.createElement('style');
revealStyles.innerHTML = `
    .reveal.active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyles);
document.getElementById('side-open').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('side-close').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
});

document.querySelectorAll('.side-anchor').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('active');
    });
});