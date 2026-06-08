/*
  Kim Graphics Company - Interactive CRO Features
  Updated for Kenyan localization and new features
*/

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initExitIntent();
    initScrollTriggers();
    initForms();
    initBlogSearch();
});

// 1. COUNTDOWN TIMER (Resets daily)
function initCountdown() {
    const timerDisplay = document.getElementById('countdown-timer');
    if (!timerDisplay) return;

    function updateTimer() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        let diff = endOfDay - now;

        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerDisplay.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

// 2. EXIT INTENT POPUP (Free Website Conversion Checklist)
function initExitIntent() {
    const popup = document.getElementById('exit-popup');
    if (!popup) return;

    const hasShown = sessionStorage.getItem('exitPopupShown');

    if (!hasShown) {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0) {
                popup.style.display = 'flex';
                sessionStorage.setItem('exitPopupShown', 'true');
                console.log('CRO Trigger: Exit-intent popup (Checklist) displayed');
            }
        });
    }

    window.closePopup = () => {
        popup.style.display = 'none';
    };
}

// 3. SCROLL TRIGGERS (Bottom-left Sticky CTA at 30% scroll)
function initScrollTriggers() {
    const stickyCTA = document.getElementById('sticky-bottom-left');
    let hasTracked25 = false, hasTracked50 = false, hasTracked75 = false;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // Sticky CTA at 30%
        if (scrollPercent > 30 && stickyCTA) {
            stickyCTA.classList.add('active');
        }

        // Analytics tracking
        if (scrollPercent > 25 && !hasTracked25) { console.log('Analytics: Scroll Depth 25%'); hasTracked25 = true; }
        if (scrollPercent > 50 && !hasTracked50) { console.log('Analytics: Scroll Depth 50%'); hasTracked50 = true; }
        if (scrollPercent > 75 && !hasTracked75) { console.log('Analytics: Scroll Depth 75%'); hasTracked75 = true; }
    });
}

// 4. MOCK FORM SUBMISSIONS
function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submission Captured:', {
                page: window.location.pathname,
                data: data,
                source: 'JulesMultiPage'
            });

            // Redirect to thank-you.html
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 300);
        });
    });
}

// 5. BLOG SEARCH (Simple client-side filter)
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const posts = document.querySelectorAll('.blog-card');

        posts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const summary = post.querySelector('p').textContent.toLowerCase();
            if (title.includes(term) || summary.includes(term)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

// PORTFOLIO / INDUSTRY FILTER
window.filterPortfolio = (category, element) => {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active', 'bg-orange', 'text-white'));
    if (element) {
        element.classList.add('active', 'bg-orange', 'text-white');
    }

    items.forEach(item => {
        const itemCategory = item.dataset.category;
        const itemIndustry = item.dataset.industry;

        if (category === 'all' || itemCategory === category || itemIndustry === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    console.log(`Filter Applied: ${category}`);
};

// ROI CALCULATOR (Digital Marketing Page - KES)
window.updateROI = () => {
    const spend = document.getElementById('ad-spend').value;
    const leads = Math.floor(spend / 1500); // Assume KSh 1,500 per lead
    const revenue = leads * 10000; // Assume KSh 10,000 value per lead

    document.getElementById('spend-val').textContent = `KSh ${Number(spend).toLocaleString()}`;
    document.getElementById('leads-val').textContent = leads;
    document.getElementById('revenue-val').textContent = `KSh ${revenue.toLocaleString()}`;
};
