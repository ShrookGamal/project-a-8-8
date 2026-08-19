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
    const sideLinks = document.querySelectorAll('.side-anchor');
    const nav = document.querySelector('.super-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-anchor');
    const contactTrigger = document.getElementById('contactTrigger');
    const contactOptions = document.getElementById('contactOptions');
    const orderForm = document.getElementById('main-order-form');
    const contactForm = document.getElementById('contact-form-baas');

    if (sideOpen && sidebar) {
        sideOpen.addEventListener('click', () => sidebar.classList.add('active'));
    }
    if (sideClose && sidebar) {
        sideClose.addEventListener('click', () => sidebar.classList.remove('active'));
    }
    sideLinks.forEach(link => {
        link.addEventListener('click', () => sidebar.classList.remove('active'));
    });

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

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'show');
                const counters = entry.target.querySelectorAll('.counter, .exp-number, .count-up, .val');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateValue(counter);
                        counter.classList.add('animated');
                    }
                });
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .fade-in, .service-card, .truck-card, .stat-unit, .masonry-item').forEach(el => revealObserver.observe(el));

    function animateValue(obj) {
        const targetValue = +obj.getAttribute('data-target') || +obj.getAttribute('data-count') || +obj.getAttribute('data-goal') || 0;
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

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('fname').value;
            const service = document.getElementById('fservice').value;
            const loc = document.getElementById('floc').value;
            let targetPhone = "";
            switch (service) {
                case "توانك":
                case "حاويات":
                case "توريد بناء":
                    targetPhone = "966594368198"; 
                    break;

                case "قلابات":
                case "سطحات":
                case "بوكلينات":
                    targetPhone = "966539263398"; 
                    break;

                case "شراء سكراب":
                    targetPhone = "966594368198"; 
                    break;

                default:
                    targetPhone = "966594368198";
            }
            const msg = `طلب خدمة جديد من الموقع:%0A- العميل: ${name}%0A- الخدمة: ${service}%0A- الموقع: ${loc}`;
            window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.open(`https://wa.me/966594368198?text=استفسار جديد من صفحة تواصل معنا`, '_blank');
        });
    }

    if (contactTrigger && contactOptions) {
        contactTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            contactTrigger.classList.toggle('active');
            contactOptions.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            contactTrigger.classList.remove('active');
            contactOptions.classList.remove('active');
        });
        contactOptions.addEventListener('click', (e) => e.stopPropagation());
    }

    const globalInjectedStyle = document.createElement('style');
    globalInjectedStyle.innerHTML = `
        .reveal, .fade-in, .service-card, .truck-card, .masonry-item { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); }
        .reveal.active, .fade-in.show, .service-card.show, .truck-card.show, .masonry-item.active { opacity: 1; transform: translateY(0); }
        .truck-card { transform: scale(0.9); }
        .truck-card.show { transform: scale(1); }
    `;
    document.head.appendChild(globalInjectedStyle);
});