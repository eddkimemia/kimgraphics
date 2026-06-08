/*
  Kim Graphics Company - Interactive CRO Features
*/

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initExitIntent();
    initScrollTriggers();
    initForms();
    initLiveChat();
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

// 2. EXIT INTENT POPUP (Local Storage to show once per session)
function initExitIntent() {
    const popup = document.getElementById('exit-popup');
    if (!popup) return;

    const hasShown = sessionStorage.getItem('exitPopupShown');

    if (!hasShown) {
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0) {
                popup.style.display = 'flex';
                sessionStorage.setItem('exitPopupShown', 'true');
                console.log('CRO Trigger: Exit-intent popup displayed');
            }
        });
    }

    window.closePopup = () => {
        popup.style.display = 'none';
    };
}

// 3. SCROLL TRIGGERS (Slide-in CTA at 50% scroll)
function initScrollTriggers() {
    const slideIn = document.getElementById('slide-in-cta');
    let hasTracked25 = false, hasTracked50 = false, hasTracked75 = false;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // Slide-in CTA at 50%
        if (scrollPercent > 50 && slideIn) {
            slideIn.classList.add('active');
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

            // Hidden field tracking
            const sourceField = document.createElement('input');
            sourceField.type = 'hidden';
            sourceField.name = 'source';
            sourceField.value = 'JulesMultiPage';
            form.appendChild(sourceField);

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submission Captured:', {
                page: window.location.pathname,
                data: data
            });

            // Redirect to thank-you.html after short delay
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 500);
        });
    });
}

// 5. LIVE CHAT MOCKUP
function initLiveChat() {
    const chatBubble = document.getElementById('live-chat-bubble');
    if (!chatBubble) return;

    chatBubble.addEventListener('click', () => {
        console.log('CRO Action: Live chat clicked');
        // In real world, open widget. Here, redirect to WhatsApp or Contact
        window.location.href = 'contact.html';
    });
}

// ROI CALCULATOR (Digital Marketing Page)
window.updateROI = () => {
    const spend = document.getElementById('ad-spend').value;
    const leads = Math.floor(spend / 15); // Assume $15 per lead
    const revenue = leads * 100; // Assume $100 value per lead

    document.getElementById('spend-val').textContent = `$${spend}`;
    document.getElementById('leads-val').textContent = leads;
    document.getElementById('revenue-val').textContent = `$${revenue}`;
};

// PORTFOLIO FILTER
window.filterPortfolio = (category, element) => {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    console.log(`Portfolio Filter: ${category}`);
};
