/*
  Kim Graphics Company - Centralized CRO & Interaction Logic
  Localization: Nairobi, Kenya
*/

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initForms();
    initExitIntent();
    initCountdown();
    initPortfolioFilter();
    initScrollCTA();
    initTicker();
    initBASlider();
    initLightbox();
    initMultiStepForm();
});

// 1. MOBILE MENU
function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// 2. FORMS & ANALYTICS
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const isMultiStep = form.id === 'multi-step-form';
            if (isMultiStep) {
                 const currentStep = form.querySelector('.form-step.active');
                 const nextStep = currentStep.nextElementSibling;
                 if (nextStep && nextStep.classList.contains('form-step')) {
                     e.preventDefault();
                     return;
                 }
            }

            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Conversion Captured:', {
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                source: 'JulesMultiPage',
                ...data
            });

            // Tracking scroll depth at conversion
            const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            console.log(`Lead Scroll Depth: ${scrollDepth}%`);

            window.location.href = 'thank-you.html';
        });
    });
}

// 3. EXIT INTENT (Session Managed)
function initExitIntent() {
    const modal = document.getElementById('exit-popup');
    if (!modal) return;

    if (!sessionStorage.getItem('exitPopupShown')) {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 20) {
                modal.style.display = 'flex';
                sessionStorage.setItem('exitPopupShown', 'true');
                console.log('CRO Event: Exit intent triggered');
            }
        });
    }

    const close = modal.querySelector('.modal-close');
    if (close) close.onclick = () => modal.style.display = 'none';
}

// 4. DAILY RESET COUNTDOWN
function initCountdown() {
    const timer = document.getElementById('countdown-timer');
    if (!timer) return;

    function update() {
        const now = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const diff = end - now;

        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        timer.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    setInterval(update, 1000);
    update();
}

// 5. SCROLL TRIGGERED CTA (50% depth)
function initScrollCTA() {
    const cta = document.querySelector('.slide-in-cta');
    if (!cta) return;

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrolled > 50) {
            cta.classList.add('active');
        } else {
            cta.classList.remove('active');
        }
    });

    const close = cta.querySelector('.close-cta');
    if (close) {
        close.onclick = () => {
            cta.style.display = 'none';
            console.log('CRO Event: Slide-in CTA dismissed');
        };
    }
}

// 6. SOCIAL PROOF TICKER (Infinite loop)
function initTicker() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;
    // Duplicate items for seamless loop
    ticker.innerHTML += ticker.innerHTML;
}

// 7. BEFORE/AFTER SLIDER
function initBASlider() {
    const container = document.querySelector('.ba-container');
    if (!container) return;

    const slider = container.querySelector('.ba-slider');
    const afterImg = container.querySelector('.ba-after');

    container.addEventListener('mousemove', (e) => {
        let x = e.pageX - container.offsetLeft;
        let width = container.offsetWidth;
        if (x < 0) x = 0;
        if (x > width) x = width;
        let percent = (x / width) * 100;
        slider.style.left = percent + '%';
        afterImg.style.width = percent + '%';
    });
}

// 8. LIGHTBOX & POPUP LEAD
function initLightbox() {
    const items = document.querySelectorAll('[data-lightbox]');
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const src = item.getAttribute('href');
            lightbox.querySelector('img').src = src;
            lightbox.style.display = 'flex';
        });
    });

    lightbox.onclick = () => {
        lightbox.style.display = 'none';
        // After closing lightbox, show a lead form if not shown recently
        if (!sessionStorage.getItem('lightboxLeadShown')) {
             setTimeout(() => {
                 const exitModal = document.getElementById('exit-popup');
                 if(exitModal) exitModal.style.display = 'flex';
                 sessionStorage.setItem('lightboxLeadShown', 'true');
             }, 500);
        }
    };
}

// 9. MULTI-STEP FORM LOGIC
function initMultiStepForm() {
    const form = document.getElementById('multi-step-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const nextBtns = form.querySelectorAll('.next-step');
    const prevBtns = form.querySelectorAll('.prev-step');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = form.querySelector('.form-step.active');
            // Basic validation for current step
            const inputs = currentStep.querySelectorAll('input, select, textarea');
            let valid = true;
            inputs.forEach(i => { if(i.hasAttribute('required') && !i.value) valid = false; });

            if (valid) {
                currentStep.classList.remove('active');
                currentStep.nextElementSibling.classList.add('active');
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = form.querySelector('.form-step.active');
            currentStep.classList.remove('active');
            currentStep.previousElementSibling.classList.add('active');
        });
    });
}

// 10. PORTFOLIO FILTER
function initPortfolioFilter() {
    const btns = document.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('[data-category]');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            btns.forEach(b => b.classList.remove('bg-orange', 'text-white'));
            btn.classList.add('bg-orange', 'text-white');

            items.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
