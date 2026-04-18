document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();

    const response = await fetch('content.json');
    const data = await response.json();

    const elements = {
        navbar: document.getElementById('navbar'),
        mobileMenu: document.getElementById('mobile-menu'),
        menuToggle: document.getElementById('menu-toggle'),
        closeMenu: document.getElementById('close-menu'),
        issuesGrid: document.getElementById('issues-grid'),
        storiesContainer: document.getElementById('stories-container'),
        hotlinesList: document.getElementById('hotlines-list'),
        guidesList: document.getElementById('guides-list'),
        eventsContainer: document.getElementById('events-container'),
        volunteerForm: document.getElementById('volunteer-form'),
        quickExit: document.getElementById('quick-exit'),
        newsletterForm: document.getElementById('newsletter-form')
    };


    elements.quickExit.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.replace("https://www.google.com");
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('scrolled-nav');
        } else {
            elements.navbar.classList.remove('scrolled-nav');
        }
    });

    elements.menuToggle.addEventListener('click', () => {
        elements.mobileMenu.classList.remove('hidden');
        elements.mobileMenu.classList.add('flex');
    });

    elements.closeMenu.addEventListener('click', () => {
        elements.mobileMenu.classList.add('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => elements.mobileMenu.classList.add('hidden'));
    });


    data.issues.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'issue-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100';
        card.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${issue.image}" alt="${issue.title}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
            </div>
            <div class="p-8">
                <h4 class="text-xl font-bold text-teal-900 mb-2">${issue.title}</h4>
                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${issue.definition}</p>
                <ul class="space-y-2 mb-6">
                    ${issue.points.map(p => `<li class="text-sm flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-orange-500 mt-1 shrink-0"></i> <span>${p}</span></li>`).join('')}
                </ul>
                <a href="#get-involved" class="inline-flex items-center gap-2 text-teal-700 font-bold border-b-2 border-teal-700 hover:text-orange-600 hover:border-orange-600 transition-all text-sm uppercase tracking-wider">
                    ${issue.cta} <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        `;
        elements.issuesGrid.appendChild(card);
    });


    data.stories.forEach(item => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'reveal glass p-10 rounded-3xl border border-white/20';
        storyDiv.innerHTML = `
            <i data-lucide="quote" class="text-orange-400 w-10 h-10 mb-6"></i>
            <p class="text-xl leading-relaxed mb-8 italic">"${item.story}"</p>
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-teal-900 font-bold">
                    ${item.name.charAt(0)}
                </div>
                <div>
                    <h5 class="font-bold text-white">${item.name}</h5>
                    <p class="text-teal-300 text-sm">${item.status}</p>
                </div>
            </div>
        `;
        elements.storiesContainer.appendChild(storyDiv);
    });


    data.hotlines.forEach(h => {
        const item = document.createElement('div');
        item.className = 'flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100';
        item.innerHTML = `
            <div>
                <p class="text-xs text-orange-800 font-bold uppercase tracking-wide">${h.name}</p>
                <p class="text-lg font-bold text-slate-900">${h.num}</p>
            </div>
            <a href="tel:${h.num.replace(new RegExp('[^0-9]', 'g'), '')}" class="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-colors">
                <i data-lucide="phone" class="w-5 h-5"></i>
            </a>
        `;
        elements.hotlinesList.appendChild(item);
    });


    data.guides.forEach(g => {
        const guide = document.createElement('div');
        guide.className = 'p-6 bg-teal-50 rounded-2xl border border-teal-100';
        guide.innerHTML = `
            <h4 class="font-bold text-teal-900 mb-4 flex items-center gap-2">
                <span class="w-2 h-2 bg-teal-500 rounded-full"></span> ${g.title}
            </h4>
            <ul class="space-y-3">
                ${g.steps.map(s => `<li class="text-sm text-slate-700 flex gap-2"><span>•</span> ${s}</li>`).join('')}
            </ul>
        `;
        elements.guidesList.appendChild(guide);
    });


    data.events.forEach(ev => {
        const evCard = document.createElement('div');
        evCard.className = 'flex flex-col sm:flex-row gap-6 p-6 bg-white border border-stone-100 rounded-2xl hover:shadow-md transition-shadow';
        evCard.innerHTML = `
            <div class="sm:w-32 flex-shrink-0 flex flex-col items-center justify-center bg-teal-50 text-teal-800 rounded-xl py-4">
                <span class="text-xs font-bold uppercase">${ev.date.split(' ')[0]}</span>
                <span class="text-3xl font-serif font-bold">${ev.date.split(' ')[1].replace(',', '')}</span>
            </div>
            <div class="flex-grow">
                <span class="inline-block px-3 py-1 bg-stone-100 text-slate-600 text-[10px] font-bold uppercase rounded-full mb-2">${ev.type}</span>
                <h4 class="text-lg font-bold text-slate-900 mb-1">${ev.title}</h4>
                <p class="text-sm text-slate-500 flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-3 h-3"></i> ${ev.location}
                </p>
            </div>
            <div class="flex items-center">
                <button class="w-full sm:w-auto px-6 py-2 border-2 border-teal-600 text-teal-700 text-sm font-bold rounded-full hover:bg-teal-600 hover:text-white transition-all">Sign Up</button>
            </div>
        `;
        elements.eventsContainer.appendChild(evCard);
    });

    lucide.createIcons();


    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.fade-in').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
        });
    });


    elements.volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Sending...";
        btn.disabled = true;

        setTimeout(() => {
            alert("Salamat! Thank you for your interest! Our team will contact you soon. Magkaisa tayo!");
            btn.innerText = originalText;
            btn.disabled = false;
            e.target.reset();
        }, 1200);
    });

    elements.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Success! You're now subscribed to the Abante Babae newsletter.");
        e.target.reset();
    });
});
