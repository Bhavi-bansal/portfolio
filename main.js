// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
const sections = ['home', 'about', 'songs', 'contact'];

// Song data
const songData = [
    {
        title: "Gole Mie",
        year: "2019",
        description: "Traditional Persian ballad inspired by classical poetry and folk melodies"
    },
    {
        title: "Faghat Khoda",
        year: "2020",
        description: "Spiritual composition blending traditional Persian music with contemporary elements"
    },
    {
        title: "Bar Gisoyat",
        year: "2020",
        description: "Persian traditional music inspired from Hafez and known poet Hafez Shirazi"
    },
    {
        title: "Untitled",
        year: "2021",
        description: "Contemporary fusion exploring modern interpretations of classical themes"
    },
    {
        title: "New Composition",
        year: "2022",
        description: "Modern interpretation of traditional Persian musical structures"
    }
];

let currentSong = 2; // Start with "Bar Gisoyat"

// Initialize GSAP animations
const initAnimations = () => {
    // Animate elements on page load
    gsap.timeline()
        .to('.artist-image', {
            duration: 1.2,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
        })
        .to('.artist-name', {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=0.6")
        .to('.artist-title', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=0.4")
        .to('.scroll-indicator, .social-links-bottom', {
            duration: 0.6,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.2");
};

// Update navigation active state and navbar theme
const updateNavigationAndTheme = () => {
    // Get the scroll position of the main container
    const scrollPos = document.querySelector('.main-container').scrollTop;
    let activeSectionId = 'home';
    
    // Determine which section is currently in view
    document.querySelectorAll('.section').forEach(section => {
        if (section.offsetTop <= scrollPos) {
            activeSectionId = section.id;
        }
    });

    // Update the navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === activeSectionId) {
            link.classList.add('active');
        }
    });

    // Update navbar theme based on the active section
    const navbar = document.querySelector('.navbar');
    if (activeSectionId === 'songs' || activeSectionId === 'contact') {
        navbar.classList.add('dark-theme');
    } else {
        navbar.classList.remove('dark-theme');
    }
};

// Setup songs carousel
const setupSongsCarousel = () => {
    const songCards = document.querySelectorAll('.song-card');
    const songTitle = document.querySelector('.song-title');
    const songYear = document.querySelector('.song-year');
    const songDescription = document.querySelector('.song-description');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    const updateSongDisplay = () => {
        // Update active card
        songCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentSong);
        });
        
        // Update song details with animation
        gsap.timeline()
            .to('.song-details', { duration: 0.3, opacity: 0, y: 20 })
            .call(() => {
                songTitle.textContent = songData[currentSong].title;
                songYear.textContent = songData[currentSong].year;
                songDescription.textContent = songData[currentSong].description;
            })
            .to('.song-details', { duration: 0.3, opacity: 1, y: 0 });
    };
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentSong = currentSong > 0 ? currentSong - 1 : songData.length - 1;
        updateSongDisplay();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSong = currentSong < songData.length - 1 ? currentSong + 1 : 0;
        updateSongDisplay();
    });
    
    // Song card clicks
    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentSong = index;
            updateSongDisplay();
        });
    });
    
    // Initialize display
    updateSongDisplay();
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setupSongsCarousel();

    // Event listener for scroll on the main container
    document.querySelector('.main-container').addEventListener('scroll', updateNavigationAndTheme);
    
    // Initial call to set active nav link and theme
    updateNavigationAndTheme();
});