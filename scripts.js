/* ============================================
   Portfolio — Dynamic Rendering from resume.json
   ============================================ */

(async function () {
    'use strict';

    // --- Data Loading ---
    let data;
    try {
        const res = await fetch('data/resume.json');
        data = await res.json();
    } catch (err) {
        console.error('Failed to load resume data:', err);
        return;
    }

    // --- SVG Icons ---
    const icons = {
        email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
        github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>',
        linkedin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        award: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    };

    // --- Hero ---
    document.getElementById('hero-name').textContent = data.name;
    document.getElementById('hero-title').textContent = data.title;
    document.getElementById('hero-headline').textContent = data.headline;
    document.getElementById('hero-resume-btn').href = data.resumePdf;
    document.getElementById('hero-resume-btn').setAttribute('download', '');

    const highlights = [
        { label: 'AWS Certified', bold: false },
        { label: '90% faster', bold: true, sub: 'dashboard creation' },
        { label: '52,000+', bold: true, sub: 'files processed' },
        { label: 'ICPC 1st Place', bold: false },
    ];
    const hlContainer = document.getElementById('hero-highlights');
    highlights.forEach(h => {
        const span = document.createElement('span');
        span.className = 'hero-highlight';
        span.innerHTML = h.bold
            ? `<strong>${h.label}</strong> ${h.sub}`
            : h.label;
        hlContainer.appendChild(span);
    });

    // --- About ---
    const aboutImg = document.getElementById('about-img');
    aboutImg.src = data.profileImage;
    aboutImg.alt = data.name;

    const aboutText = document.getElementById('about-text');
    let aboutHTML = `<p>${data.about}</p>`;

    if (data.education && data.education.length > 0) {
        const edu = data.education[0];
        aboutHTML += `
            <div class="about-education">
                <h3>${icons.award} Education</h3>
                <p>${edu.degree} — ${edu.school}</p>
                <p class="dates">${edu.dates} · ${edu.location}</p>
            </div>`;
    }

    if (data.certifications && data.certifications.length > 0) {
        aboutHTML += `
            <div class="about-certs">
                <h3>${icons.award} Certifications</h3>
                ${data.certifications.map(c => `<p>${c}</p>`).join('')}
            </div>`;
    }

    if (data.competitions && data.competitions.length > 0) {
        const comp = data.competitions[0];
        aboutHTML += `
            <div class="about-certs">
                <h3>${icons.award} Competitions</h3>
                <p><strong>${comp.name}</strong> — ${comp.event}</p>
                <p class="dates">${comp.achievement}</p>
            </div>`;
    }

    aboutText.innerHTML = aboutHTML;

    // --- Experience ---
    const expList = document.getElementById('experience-list');
    data.experience.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'exp-card reveal';
        card.innerHTML = `
            <div class="exp-header">
                <div>
                    <div class="exp-company">${exp.company}</div>
                    <div class="exp-role">${exp.role}</div>
                </div>
                <div class="exp-meta">
                    <div>${exp.dates}</div>
                    <div>${exp.location}</div>
                </div>
            </div>
            <ul class="exp-bullets">
                ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>`;
        expList.appendChild(card);
    });

    // --- Projects ---
    const projGrid = document.getElementById('projects-grid');
    data.projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.innerHTML = `
            <div class="project-name">${proj.name}</div>
            <div class="project-tech">
                ${proj.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <ul class="project-bullets">
                ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>`;
        projGrid.appendChild(card);
    });

    // --- Skills ---
    const skillsGrid = document.getElementById('skills-grid');
    Object.entries(data.skills).forEach(([group, skills]) => {
        const div = document.createElement('div');
        div.className = 'skill-group reveal';
        div.innerHTML = `
            <div class="skill-group-title">${group}</div>
            <div class="skill-chips">
                ${skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
            </div>`;
        skillsGrid.appendChild(div);
    });

    // --- Resume Embed ---
    const embedContainer = document.getElementById('resume-embed');
    const iframe = document.createElement('iframe');
    iframe.src = data.resumePdf;
    iframe.title = 'Resume PDF';
    iframe.loading = 'lazy';
    embedContainer.appendChild(iframe);

    document.getElementById('resume-download-btn').href = data.resumePdf;
    document.getElementById('resume-download-btn').setAttribute('download', '');

    // --- Contact ---
    const contactContainer = document.getElementById('contact-links');
    const contactItems = [];

    if (data.email) {
        contactItems.push({
            href: `mailto:${data.email}`,
            icon: icons.email,
            label: data.email,
        });
    }
    if (data.github) {
        contactItems.push({
            href: data.github,
            icon: icons.github,
            label: 'GitHub',
        });
    }
    if (data.linkedin) {
        contactItems.push({
            href: data.linkedin,
            icon: icons.linkedin,
            label: 'LinkedIn',
        });
    }

    contactItems.forEach(item => {
        const a = document.createElement('a');
        a.className = 'contact-item';
        a.href = item.href;
        a.target = item.href.startsWith('mailto') ? '_self' : '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `${item.icon} <span>${item.label}</span>`;
        contactContainer.appendChild(a);
    });

    // --- Footer Year ---
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // --- Navigation: scroll state ---
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
        const scrolled = window.scrollY > 50;
        nav.classList.toggle('scrolled', scrolled);
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Navigation: active link highlighting ---
    const sections = document.querySelectorAll('main .section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinksContainer.classList.remove('open');
        });
    });

    // --- Back to Top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach(el => el.classList.add('visible'));
    }
})();
