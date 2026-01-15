export const WEBSITE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="page-title">Luxury Real Estate Template</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        monarch: {
                            dark: '#1a2e28',     
                            darker: '#0f1c18',   
                            gold: '#c5a880',     
                            cream: '#f3f0e9',    
                            gray: '#8a8a8a',
                        }
                    },
                    fontFamily: {
                        serif: ['"Cormorant Garamond"', 'serif'],
                        sans: ['"Montserrat"', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <style>
        .reveal-text { animation: reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards; opacity: 0; transform: translateY(50px); }
        @keyframes reveal { to { opacity: 1; transform: translateY(0); } }
        .hotspot-pulse::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.6); animation: pulse-ring 2s infinite; }
        @keyframes pulse-ring { 0% { width: 100%; height: 100%; opacity: 1; } 100% { width: 250%; height: 250%; opacity: 0; } }
        .timer-circle-svg circle { transition: stroke-dashoffset 0.5s ease-in-out; transform: rotate(-90deg); transform-origin: 50% 50%; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a2e28; }
        ::-webkit-scrollbar-thumb { background: #c5a880; border-radius: 4px; }
        .tab-content { display: none; opacity: 0; transition: opacity 0.5s ease; }
        .tab-content.active { display: block; opacity: 1; }
        .nav-link { position: relative; }
        .nav-link::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -4px; left: 0; background-color: #c5a880; transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }
    </style>
</head>
<body class="bg-monarch-cream text-monarch-dark font-sans overflow-x-hidden">

    <nav class="fixed w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-300" id="navbar">
        <div class="flex flex-col text-white mix-blend-difference z-50">
            <div id="nav-agent-name" class="text-2xl font-serif font-bold tracking-widest leading-none">AGENT NAME</div>
            <div id="nav-brokerage" class="text-[10px] tracking-[0.3em] uppercase opacity-80 mt-1">BROKERAGE</div>
        </div>
        
        <div class="hidden md:flex space-x-12 text-xs font-medium tracking-[0.2em] text-white mix-blend-difference z-50">
            <a href="#hero" class="nav-link hover:text-monarch-gold transition-colors">HOME</a>
            <a href="#philosophy" class="nav-link hover:text-monarch-gold transition-colors">PHILOSOPHY</a>
            <a href="#portfolio" class="nav-link hover:text-monarch-gold transition-colors">PORTFOLIO</a>
            <a href="#location" class="nav-link hover:text-monarch-gold transition-colors">LOCATION</a>
        </div>

        <button class="md:hidden text-white mix-blend-difference text-xl z-50">
            <i class="fas fa-bars"></i>
        </button>
    </nav>

    <header id="hero" class="relative h-screen w-full bg-monarch-darker flex items-center justify-center overflow-hidden">
        <div id="hero-bg" class="absolute inset-0 opacity-60 bg-cover bg-center parallax-bg"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-monarch-darker"></div>
        
        <div class="relative z-10 text-center px-4 max-w-6xl">
            <h1 id="hero-headline" class="font-serif text-5xl md:text-7xl lg:text-8xl text-monarch-cream leading-[1.1] mb-8 reveal-text" style="animation-delay: 0.2s;">
                LOADING...
            </h1>
            
            <div class="reveal-text flex flex-col items-center mt-16" style="animation-delay: 0.8s;">
                <div class="h-20 w-[1px] bg-monarch-gold mb-6"></div>
                <span class="text-[10px] tracking-[0.3em] text-monarch-cream uppercase">Scroll to Discover</span>
            </div>
        </div>
    </header>

    <section id="philosophy" class="py-32 bg-monarch-cream relative">
        <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            <div class="order-2 md:order-1 relative">
                <div class="absolute -top-12 -left-12 w-full h-full border border-monarch-gold/30 z-0"></div>
                <img id="phil-image" src="" alt="Philosophy" class="relative z-10 w-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                
                <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-monarch-dark p-8 text-monarch-cream z-20 shadow-2xl hidden lg:flex flex-col justify-center items-center text-center">
                    <span id="phil-stat-producer" class="text-4xl font-serif font-bold block mb-2"></span>
                    <span id="phil-label-producer" class="text-[10px] tracking-[0.2em] uppercase opacity-80"></span>
                </div>
            </div>
            
            <div class="order-1 md:order-2">
                <span class="text-monarch-gold tracking-[0.25em] text-xs font-bold uppercase mb-6 block">The Approach</span>
                <h2 id="phil-headline" class="font-serif text-5xl md:text-6xl text-monarch-dark mb-10 leading-tight"></h2>
                <p id="phil-text" class="text-monarch-dark/70 leading-relaxed mb-10 font-light max-w-md text-sm md:text-base"></p>
                <a href="#contact" class="inline-block border-b border-monarch-dark pb-1 text-xs tracking-[0.2em] uppercase hover:text-monarch-gold hover:border-monarch-gold transition-colors">
                    Contact Me
                </a>
            </div>
        </div>
    </section>

    <section id="portfolio" class="bg-monarch-dark text-monarch-cream py-24 relative overflow-hidden">
        <div class="flex justify-center mb-16">
            <div class="inline-flex border border-white/10 rounded-full p-1 bg-white/5 backdrop-blur-sm">
                <button onclick="switchTab('sold')" id="btn-sold" class="px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-300 hover:bg-white/5 opacity-60">SOLD</button>
                <button onclick="switchTab('active')" id="btn-active" class="px-10 py-4 rounded-full bg-monarch-gold text-monarch-dark text-[10px] font-bold tracking-[0.2em] shadow-lg">ACTIVE</button>
            </div>
        </div>

        <div class="container mx-auto px-4 relative">
            <div class="text-center mb-12">
                <h2 class="font-serif text-5xl md:text-7xl mb-4"><span class="italic text-monarch-gold">Featured</span> PROPERTIES</h2>
                <p id="portfolio-location" class="text-white/60 text-xs tracking-widest uppercase"></p>
            </div>

            <div id="active-content" class="tab-content active relative w-full max-w-7xl mx-auto h-[70vh] bg-black rounded-sm overflow-hidden shadow-2xl group">
                <img id="active-img" src="" class="w-full h-full object-cover transition-transform duration-[30s] ease-linear group-hover:scale-110 opacity-80" alt="Active Listing">
                
                <div class="absolute top-[65%] left-[25%] group/spot">
                    <button class="relative w-8 h-8 bg-monarch-gold rounded-full flex items-center justify-center text-monarch-dark font-bold text-xs hotspot-pulse z-20 cursor-pointer shadow-lg hover:scale-110 transition-transform">1</button>
                    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur text-monarch-dark p-6 shadow-xl opacity-0 group-hover/spot:opacity-100 transition-all duration-500 translate-y-4 group-hover/spot:translate-y-0 pointer-events-none z-30">
                        <h4 id="hotspot-1-title" class="font-serif font-bold text-xl mb-2"></h4>
                        <p id="hotspot-1-desc" class="text-xs leading-relaxed text-gray-600"></p>
                    </div>
                </div>

                <div class="absolute top-[35%] left-[60%] group/spot">
                    <button class="relative w-8 h-8 bg-monarch-dark border border-white/30 text-white rounded-full flex items-center justify-center font-bold text-xs hotspot-pulse z-20 cursor-pointer shadow-lg hover:scale-110 transition-transform">2</button>
                    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur text-monarch-dark p-6 shadow-xl opacity-0 group-hover/spot:opacity-100 transition-all duration-500 translate-y-4 group-hover/spot:translate-y-0 pointer-events-none z-30">
                        <h4 id="hotspot-2-title" class="font-serif font-bold text-xl mb-2"></h4>
                        <p id="hotspot-2-desc" class="text-xs leading-relaxed text-gray-600"></p>
                    </div>
                </div>

                <div class="absolute bottom-10 left-10 text-white z-20">
                    <div class="h-[1px] w-12 bg-monarch-gold mb-4"></div>
                    <h3 id="active-title" class="text-4xl font-serif mb-2"></h3>
                    <p id="active-specs" class="text-xs tracking-widest uppercase opacity-80"></p>
                </div>
            </div>

            <div id="sold-content" class="tab-content hidden w-full max-w-7xl mx-auto h-[70vh] bg-gray-800 rounded-sm relative overflow-hidden group">
                <img id="sold-img" src="" class="w-full h-full object-cover transition-transform duration-[30s] ease-linear group-hover:scale-110 opacity-70" alt="Sold Property">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center p-12 border border-white/20 backdrop-blur-md bg-monarch-darker/60">
                        <h3 id="sold-title" class="text-5xl font-serif text-white mb-4"></h3>
                        <p id="sold-status" class="text-monarch-gold text-xs tracking-[0.3em] uppercase"></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="location" class="bg-monarch-cream py-32 flex flex-col items-center justify-center min-h-[80vh]">
        <div class="relative w-80 h-80 md:w-[400px] md:h-[400px] flex items-center justify-center">
            <svg class="absolute inset-0 w-full h-full timer-circle-svg transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e5e5" stroke-width="1" />
                <circle id="timer-progress" cx="50" cy="50" r="45" fill="none" stroke="#c5a880" stroke-width="2" stroke-dasharray="283" stroke-dashoffset="0" stroke-linecap="round" />
            </svg>
            <div class="text-center z-10 flex flex-col items-center animate-fade">
                <div id="location-time" class="text-9xl md:text-[10rem] font-serif text-monarch-dark font-normal leading-none mb-4 transition-all duration-500"></div>
                <div class="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-monarch-gray max-w-[180px] leading-relaxed">
                    Minutes to<br>Destination
                </div>
            </div>
        </div>
        <div class="mt-16 text-center px-4 h-40">
            <p class="text-monarch-gold text-xs tracking-[0.3em] uppercase mb-6 font-bold">CONNECTIVITY</p>
            <h3 id="location-dest" class="text-4xl md:text-6xl font-serif text-monarch-dark max-w-4xl mx-auto leading-tight transition-opacity duration-500"></h3>
            <div class="mt-12">
                <a href="#contact" class="bg-monarch-dark text-white px-10 py-4 text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-monarch-gold transition-colors">
                    Explore Area
                </a>
            </div>
        </div>
    </section>

    <section class="py-32 bg-monarch-darker text-monarch-cream overflow-hidden">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-12 mb-12">
                <h2 class="text-6xl md:text-9xl font-serif leading-none">THE<br><span class="text-monarch-gold italic">ADVANTAGE</span></h2>
                <div class="max-w-xs mt-8 md:mt-0">
                    <p class="text-xs font-light opacity-70 leading-relaxed tracking-wide">
                        Leveraging extensive networks to showcase your property to qualified buyers around the world.
                    </p>
                </div>
            </div>
            
            <div id="services-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                 </div>
        </div>
    </section>

    <footer id="contact" class="bg-black text-white pt-32 pb-12">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-start mb-24">
                <div class="mb-12 md:mb-0">
                    <h2 id="footer-name" class="text-5xl md:text-7xl font-serif mb-4 text-white"></h2>
                    <p id="footer-brokerage" class="text-xl font-serif text-monarch-gold mb-8 italic"></p>
                    
                    <div class="flex flex-col space-y-2">
                        <a id="footer-email" href="" class="text-2xl md:text-3xl font-serif hover:text-monarch-gold transition-colors"></a>
                        <a id="footer-phone" href="" class="text-xl md:text-2xl font-serif hover:text-monarch-gold transition-colors"></a>
                    </div>
                    
                    <div id="footer-note" class="mt-10 text-[10px] tracking-[0.2em] uppercase opacity-50 border-l border-white/30 pl-4"></div>
                </div>
                
                <div class="flex space-x-16 text-[10px] tracking-[0.2em] uppercase font-bold">
                    <div class="flex flex-col space-y-6">
                        <a href="#" class="hover:text-monarch-gold transition-colors">Home</a>
                        <a href="#" class="hover:text-monarch-gold transition-colors">Portfolio</a>
                        <a href="#" class="hover:text-monarch-gold transition-colors">Philosophy</a>
                    </div>
                    <div class="flex flex-col space-y-6">
                        <a id="link-insta" href="#" class="hover:text-monarch-gold transition-colors">Instagram</a>
                        <a id="link-linkedin" href="#" class="hover:text-monarch-gold transition-colors">LinkedIn</a>
                        <a id="link-zillow" href="#" class="hover:text-monarch-gold transition-colors">Zillow</a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase opacity-30">
                <p>&copy; <span id="copyright-year"></span> <span id="copyright-name"></span>.</p>
                <p class="mt-2 md:mt-0">HANDCRAFTED BY AI</p>
            </div>
        </div>
    </footer>

    {{AGENT_CONFIG_SCRIPT}}
    <script>
        // --- 1. Load Data from agent-config.js ---
        document.addEventListener("DOMContentLoaded", () => {
            if(typeof agentConfig === 'undefined') {
                alert("Error: agent-config.js not found. Please ensure both files are in the same folder.");
                return;
            }

            // General
            document.title = agentConfig.name + " | " + agentConfig.title;
            document.getElementById('nav-agent-name').innerText = agentConfig.name;
            document.getElementById('nav-brokerage').innerText = agentConfig.brokerage;
            document.getElementById('copyright-name').innerText = agentConfig.name;
            document.getElementById('copyright-year').innerText = new Date().getFullYear();

            // Hero
            document.getElementById('hero-headline').innerHTML = agentConfig.hero.headline;
            document.getElementById('hero-bg').style.backgroundImage = "url('" + agentConfig.hero.backgroundImage + "')";

            // Philosophy
            document.getElementById('phil-headline').innerHTML = agentConfig.philosophy.headline;
            document.getElementById('phil-text').innerText = agentConfig.philosophy.text;
            document.getElementById('phil-stat-producer').innerText = agentConfig.philosophy.stats.producer;
            document.getElementById('phil-label-producer').innerText = agentConfig.philosophy.stats.producerLabel;
            document.getElementById('phil-image').src = agentConfig.philosophy.image;

            // Portfolio
            document.getElementById('portfolio-location').innerText = agentConfig.location;
            
            // Active Listing
            document.getElementById('active-title').innerText = agentConfig.portfolio.active.title;
            document.getElementById('active-specs').innerText = agentConfig.portfolio.active.price + " | " + agentConfig.portfolio.active.specs;
            document.getElementById('active-img').src = agentConfig.portfolio.active.image;
            document.getElementById('hotspot-1-title').innerText = agentConfig.portfolio.active.hotspots[0].title;
            document.getElementById('hotspot-1-desc').innerText = agentConfig.portfolio.active.hotspots[0].desc;
            document.getElementById('hotspot-2-title').innerText = agentConfig.portfolio.active.hotspots[1].title;
            document.getElementById('hotspot-2-desc').innerText = agentConfig.portfolio.active.hotspots[1].desc;

            // Sold Listing
            document.getElementById('sold-title').innerText = agentConfig.portfolio.sold.title;
            document.getElementById('sold-status').innerText = agentConfig.portfolio.sold.status;
            document.getElementById('sold-img').src = agentConfig.portfolio.sold.image;

            // Services Grid
            const servicesContainer = document.getElementById('services-grid');
            agentConfig.services.forEach((service, index) => {
                const isMiddle = index === 1 ? 'md:-mt-12 bg-white/5' : '';
                const html = '<div class="p-8 border border-white/5 hover:border-monarch-gold/30 transition-colors duration-500 ' + isMiddle + '">' +
                    '<span class="text-monarch-gold text-2xl mb-4 block"><i class="fas ' + service.icon + '"></i></span>' +
                    '<h4 class="font-serif text-2xl mb-2">' + service.title + '</h4>' +
                    '<p class="text-xs opacity-60 leading-relaxed">' + service.desc + '</p>' +
                 '</div>';
                 servicesContainer.innerHTML += html;
            });

            // Contact / Footer
            document.getElementById('footer-name').innerText = agentConfig.name;
            document.getElementById('footer-brokerage').innerText = agentConfig.brokerage;
            document.getElementById('footer-email').innerText = agentConfig.email;
            document.getElementById('footer-email').href = "mailto:" + agentConfig.email;
            document.getElementById('footer-phone').innerText = agentConfig.phone;
            document.getElementById('footer-phone').href = "tel:" + agentConfig.phoneClean;
            document.getElementById('footer-note').innerHTML = agentConfig.location + "<br>" + agentConfig.brokerPageNote;
            
            document.getElementById('link-insta').href = agentConfig.social.instagram;
            document.getElementById('link-linkedin').href = agentConfig.social.linkedin;
            document.getElementById('link-zillow').href = agentConfig.social.zillow;

            // Initialize Timer
            startTimer(agentConfig.locationData);
        });

        // --- 2. Timer Logic ---
        function startTimer(data) {
            let currentIndex = 0;
            const timeElement = document.getElementById('location-time');
            const destElement = document.getElementById('location-dest');
            const progressCircle = document.getElementById('timer-progress');
            const totalDash = 283; 

            function update() {
                timeElement.style.opacity = '0';
                destElement.style.opacity = '0';
                progressCircle.style.transition = 'none';
                progressCircle.style.strokeDashoffset = totalDash;

                setTimeout(() => {
                    const item = data[currentIndex];
                    timeElement.innerText = item.time;
                    destElement.innerHTML = item.text;
                    
                    timeElement.style.opacity = '1';
                    destElement.style.opacity = '1';

                    progressCircle.style.transition = 'stroke-dashoffset 2s ease-out';
                    const percentage = item.time / 40; 
                    const offset = totalDash - (totalDash * percentage);
                    progressCircle.style.strokeDashoffset = offset;

                    currentIndex = (currentIndex + 1) % data.length;
                }, 500);
            }
            update();
            setInterval(update, 4000);
        }

        // --- 3. Tab Switching Logic ---
        function switchTab(tabName) {
            const btnSold = document.getElementById('btn-sold');
            const btnActive = document.getElementById('btn-active');
            const contentSold = document.getElementById('sold-content');
            const contentActive = document.getElementById('active-content');

            if (tabName === 'sold') {
                btnSold.classList.remove('opacity-60', 'hover:bg-white/5');
                btnSold.classList.add('bg-monarch-gold', 'text-monarch-dark', 'shadow-lg', 'opacity-100');
                
                btnActive.classList.remove('bg-monarch-gold', 'text-monarch-dark', 'shadow-lg');
                btnActive.classList.add('opacity-60', 'hover:bg-white/5');

                contentActive.classList.remove('active');
                setTimeout(() => {
                    contentActive.classList.add('hidden');
                    contentSold.classList.remove('hidden');
                    setTimeout(() => contentSold.classList.add('active'), 10);
                }, 300);

            } else {
                btnActive.classList.remove('opacity-60', 'hover:bg-white/5');
                btnActive.classList.add('bg-monarch-gold', 'text-monarch-dark', 'shadow-lg', 'opacity-100');
                
                btnSold.classList.remove('bg-monarch-gold', 'text-monarch-dark', 'shadow-lg');
                btnSold.classList.add('opacity-60', 'hover:bg-white/5');

                contentSold.classList.remove('active');
                setTimeout(() => {
                    contentSold.classList.add('hidden');
                    contentActive.classList.remove('hidden');
                    setTimeout(() => contentActive.classList.add('active'), 10);
                }, 300);
            }
        }

        // --- 4. Navbar Scroll Effect ---
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.classList.add('bg-monarch-darker/90', 'backdrop-blur-md', 'py-4');
                nav.classList.remove('py-6');
            } else {
                nav.classList.remove('bg-monarch-darker/90', 'backdrop-blur-md', 'py-4');
                nav.classList.add('py-6');
            }
        });
    </script>
</body>
</html>
`;
