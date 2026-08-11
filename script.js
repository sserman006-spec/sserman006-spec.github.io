// ========== Mobile nav toggle ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ========== Scroll spy ==========
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.tab-links a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            current = section.id;
        }
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
    });
}

// ========== Scroll progress + back to top ==========
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
}

function updateBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    updateActiveLink();
    updateScrollProgress();
    updateBackToTop();
});

updateActiveLink();
updateScrollProgress();
updateBackToTop();

// ========== Scroll reveal ==========
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 50);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ========== Toast helper ==========
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ========== Copy handle ==========
const copyHandleBtn = document.getElementById('copyHandleBtn');
copyHandleBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('N4MR3S').then(() => showToast('Alias copied to clipboard'));
});

// ========== Tap-to-reveal redaction (touch devices) ==========
document.querySelectorAll('.redact').forEach(el => {
    el.addEventListener('click', (e) => {
        if (window.matchMedia('(hover: none)').matches) {
            e.preventDefault();
            el.classList.toggle('revealed');
        }
    });
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.classList.toggle('revealed');
        }
    });
});

// ========== Typewriter brief ==========
const typewriterEl = document.getElementById('typewriter');
const briefText = "Breaking things on purpose, then writing about it. Capture-the-flag competitor, builder of small offline tools, and full-time computer science student.";

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typewriterEl.textContent = briefText;
} else {
    let i = 0;
    function typeChar() {
        if (i <= briefText.length) {
            typewriterEl.textContent = briefText.slice(0, i);
            i++;
            setTimeout(typeChar, 14);
        }
    }
    typeChar();
}
