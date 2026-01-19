export const MINIMAL_TEMPLATE = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{site_title}} | {{tagline}}</title>
    <meta name="description" content="{{meta_description}}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        neutral: {
                            950: '#0a0a0a',
                            900: '#171717',
                            800: '#262626',
                            700: '#404040',
                            600: '#525252',
                            500: '#737373',
                            400: '#a3a3a3',
                            300: '#d4d4d4',
                            200: '#e5e5e5',
                            100: '#f5f5f5',
                            50: '#fafafa'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['Inter', 'system-ui', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', system-ui, sans-serif; }
        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }
        .reveal-on-scroll.visible { opacity: 1; transform: translateY(0); }
    </style>
    {{AGENT_CONFIG_SCRIPT}}
</head>
<body class="bg-neutral-950 text-neutral-100 antialiased">
    <!-- Navigation -->
    <nav class="fixed w-full z-50 px-6 py-4 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800/50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <button class="md:hidden text-neutral-400 hover:text-white transition-colors">
                <i data-lucide="menu" class="w-6 h-6"></i>
                <span class="sr-only">Menu</span>
            </button>
            
            <a href="#" class="text-xl font-semibold tracking-tight">
                {{brand_name}}
            </a>
            
            <a href="#contact" class="text-sm font-medium px-4 py-2 bg-white text-neutral-950 rounded-full hover:bg-neutral-200 transition-colors">
                Contact Us
            </a>
        </div>
    </nav>

    <!-- Hero Section -->
    <header id="hero" class="min-h-screen flex items-center justify-center pt-20">
        <div class="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8">
                <div class="reveal-on-scroll">
                    <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                        {{{hero_headline}}}<span class="text-neutral-500">.</span>
                    </h1>
                </div>
                <div class="reveal-on-scroll">
                    <p class="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-lg">
                        {{hero_subtext}}
                    </p>
                </div>
            </div>
            <div class="reveal-on-scroll hidden lg:block">
                <!-- Optional hero image/graphic -->
            </div>
        </div>
    </header>

    <!-- Projects Section -->
    <section id="projects" class="py-24 bg-neutral-900">
        <div class="max-w-6xl mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold mb-16 reveal-on-scroll">Our Projects</h2>
            
            <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {{#each projects}}
                <div class="group reveal-on-scroll">
                    <div class="bg-neutral-800 rounded-2xl p-8 h-full border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300">
                        <span class="text-6xl font-bold text-neutral-700 group-hover:text-neutral-600 transition-colors">
                            {{this.number}}
                        </span>
                        <h3 class="text-xl font-semibold mt-6 text-neutral-100">
                            {{this.title}}
                        </h3>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <footer id="contact" class="py-24 bg-neutral-950 border-t border-neutral-800">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div class="reveal-on-scroll">
                    <h2 class="text-4xl md:text-5xl font-bold leading-tight">
                        Let's build<br>your future.
                    </h2>
                </div>
                <div class="reveal-on-scroll space-y-4">
                    <a href="mailto:{{contact_email}}" class="block text-lg text-neutral-400 hover:text-white transition-colors">
                        {{contact_email}}
                    </a>
                    <a href="tel:{{contact_phone}}" class="block text-lg text-neutral-400 hover:text-white transition-colors">
                        {{contact_phone}}
                    </a>
                </div>
            </div>
            
            <div class="mt-24 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-neutral-500">
                    © ${new Date().getFullYear()} {{brand_name}}. All rights reserved.
                </p>
                <div class="flex gap-6">
                    <a href="#" class="text-neutral-500 hover:text-white transition-colors">
                        <i data-lucide="twitter" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="text-neutral-500 hover:text-white transition-colors">
                        <i data-lucide="linkedin" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="text-neutral-500 hover:text-white transition-colors">
                        <i data-lucide="instagram" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Scroll reveal animation
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        
        // Populate dynamic content if agentConfig is available
        if (typeof agentConfig !== 'undefined' && agentConfig) {
            const config = agentConfig;
            
            // Update title and meta
            if (config.site_title) document.title = config.site_title + (config.tagline ? ' | ' + config.tagline : '');
            if (config.meta_description) document.querySelector('meta[name="description"]').content = config.meta_description;
            
            // Update brand name
            document.querySelectorAll('[data-brand]').forEach(el => {
                if (config.brand_name) el.textContent = config.brand_name;
            });
            
            // Update hero content
            const heroHeadline = document.querySelector('[data-hero-headline]');
            if (heroHeadline && config.hero_headline) heroHeadline.innerHTML = config.hero_headline;
            
            const heroSubtext = document.querySelector('[data-hero-subtext]');
            if (heroSubtext && config.hero_subtext) heroSubtext.textContent = config.hero_subtext;
            
            // Update contact info
            const emailLinks = document.querySelectorAll('[data-contact-email]');
            emailLinks.forEach(el => {
                if (config.contact_email) {
                    el.href = 'mailto:' + config.contact_email;
                    el.textContent = config.contact_email;
                }
            });
            
            const phoneLinks = document.querySelectorAll('[data-contact-phone]');
            phoneLinks.forEach(el => {
                if (config.contact_phone) {
                    el.href = 'tel:' + config.contact_phone;
                    el.textContent = config.contact_phone;
                }
            });
            
            // Render projects
            if (config.projects && Array.isArray(config.projects)) {
                const projectsGrid = document.getElementById('projects-grid');
                if (projectsGrid) {
                    projectsGrid.innerHTML = config.projects.map((project, index) => \`
                        <div class="group reveal-on-scroll visible">
                            <div class="bg-neutral-800 rounded-2xl p-8 h-full border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300">
                                <span class="text-6xl font-bold text-neutral-700 group-hover:text-neutral-600 transition-colors">
                                    \${project.number || String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 class="text-xl font-semibold mt-6 text-neutral-100">
                                    \${project.title || 'Project ' + (index + 1)}
                                </h3>
                            </div>
                        </div>
                    \`).join('');
                }
            }
        }
    </script>
</body>
</html>`;
