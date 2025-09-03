document.addEventListener('DOMContentLoaded', () => {
    
    gsap.registerPlugin(ScrollTrigger);

    
    const initAnimations = () => {
        
        gsap.timeline()
            .to('.artist-image', { duration: 1.2, opacity: 1, scale: 1, ease: "power3.out" }, 0)
            .to('.artist-name-part', { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "-=0.6")
            .to('.artist-title', { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, "-=0.4")
            .to('.scroll-indicator, .social-links-bottom', { duration: 0.6, opacity: 1, ease: "power2.out" }, "-=0.2");
    };

    
    const updateNavigationAndTheme = () => {
        const mainContainer = document.querySelector('.main-container');
        const navbar = document.querySelector('.navbar');
        if (!mainContainer || !navbar) return;

        const scrollPos = mainContainer.scrollTop;
        const mainContainerHeight = mainContainer.offsetHeight;
        let activeSectionId = 'home';

        document.querySelectorAll('.section').forEach(section => {
            if (section.offsetTop <= scrollPos + mainContainerHeight / 3) {
                activeSectionId = section.id;
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === activeSectionId) {
                link.classList.add('active');
            }
        });

        const currentSection = document.getElementById(activeSectionId);
        if (currentSection && (currentSection.id === 'art' || currentSection.id === 'contact')) {
             
            navbar.style.color = 'white'; 
            document.querySelectorAll('.nav-link').forEach(l => l.style.color = 'white');
        } else {
            navbar.style.color = 'var(--text-dark)';
            document.querySelectorAll('.nav-link').forEach(l => l.style.color = 'var(--text-dark)');
        }
    };

    
    const setupArtCarousel = () => {
        const swiper = new Swiper('.art-carousel', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            initialSlide: 2,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            },
            
            navigation: {
                nextEl: '.nav-next',
                prevEl: '.nav-prev',
            }
        });
    };

   
    const addEventListeners = () => {
        const mainContainer = document.querySelector('.main-container');
        const homeSection = document.querySelector('#home');
        const aboutSection = document.querySelector('#about');
        const downArrow = document.querySelector('#home .scroll-arrow');
        const upArrow = document.querySelector('#contact .scroll-arrow');
        const navLinks = document.querySelectorAll('.nav-link');

        if (mainContainer) {
            mainContainer.addEventListener('scroll', updateNavigationAndTheme);
        }
        
       
        if (downArrow && mainContainer && aboutSection) {
            downArrow.addEventListener('click', () => {
                mainContainer.scrollTo({
                    top: aboutSection.offsetTop,
                    behavior: 'smooth'
                });
            });
        }

        
        if (upArrow && mainContainer && homeSection) {
            upArrow.addEventListener('click', () => {
                mainContainer.scrollTo({
                    top: homeSection.offsetTop,
                    behavior: 'smooth'
                });
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection && mainContainer) {
                    mainContainer.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    
    initAnimations();
    setupArtCarousel();
    addEventListeners();
    updateNavigationAndTheme();
});
