document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Mobile Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 2. Custom Cursor (Enabled on desktop only)
    if (window.innerWidth > 1024) {
        const cursor = document.getElementById('custom-cursor');
        const follower = document.getElementById('cursor-follower');

        if(cursor && follower) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 5 + 'px';
                cursor.style.top = e.clientY - 5 + 'px';
                
                // Use requestAnimationFrame for smoother following
                requestAnimationFrame(() => {
                    follower.style.left = e.clientX - 20 + 'px';
                    follower.style.top = e.clientY - 20 + 'px';
                });
            });

            // Hover interactions
            document.querySelectorAll('a, button, .bento-item').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                    follower.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    follower.style.transform = 'scale(1)';
                });
            });
        }
    }

    // 3. Reveal System
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Calculators
    const btnBMI = document.getElementById('btn-bmi');
    if(btnBMI) {
        btnBMI.addEventListener('click', (e) => {
            e.preventDefault();
            const w = parseFloat(document.getElementById('bmi-weight').value);
            const h = parseFloat(document.getElementById('bmi-height').value);
            const res = document.getElementById('bmi-result');
            if (w && h) {
                const bmi = (w / ((h/100)*(h/100))).toFixed(1);
                document.getElementById('bmi-val').innerText = bmi;
                document.getElementById('bmi-text').innerText = "BMI Score Ready";
                res.style.display = 'block';
            }
        });
    }

    const btnDiet = document.getElementById('btn-diet');
    if(btnDiet) {
        btnDiet.addEventListener('click', (e) => {
            e.preventDefault();
            const w = parseFloat(document.getElementById('diet-weight').value);
            const h = parseFloat(document.getElementById('diet-height').value);
            const a = parseFloat(document.getElementById('diet-age').value);
            const res = document.getElementById('diet-result');
            if (w && h && a) {
                let calories = (10 * w) + (6.25 * h) - (5 * a) + 5; // Default male
                calories = Math.round(calories * 1.55); // Moderate activity
                document.getElementById('tdee-val').innerText = calories;
                res.style.display = 'block';
                // Macros
                document.getElementById('mac-pro').innerText = Math.round(calories * 0.3 / 4) + 'g';
                document.getElementById('mac-fat').innerText = Math.round(calories * 0.25 / 9) + 'g';
                document.getElementById('mac-carb').innerText = Math.round(calories * 0.45 / 4) + 'g';
            }
        });
    }

    // 5. Gallery Selection
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    if (filters.length > 0) {
        filters.forEach(f => {
            f.addEventListener('click', () => {
                filters.forEach(btn => btn.classList.remove('active'));
                f.classList.add('active');
                const cat = f.getAttribute('data-filter');
                items.forEach(i => {
                    if (cat === 'all' || i.getAttribute('data-category') === cat) {
                        i.style.display = 'block';
                    } else {
                        i.style.display = 'none';
                    }
                });
            });
        });
    }

});
