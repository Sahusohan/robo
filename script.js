// script.js
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements on scroll
    const cards = document.querySelectorAll('.robot-card, .stat-item, .product-item, .vision-paragraph');
    
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    // Floating animation for robot icons
    gsap.to('.robot-img i', {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
    });

    // Rotate gears
    gsap.to('.gear1', {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "linear"
    });
    
    gsap.to('.gear2', {
        rotation: -360,
        duration: 50,
        repeat: -1,
        ease: "linear"
    });

    // Glow effect on photo card
    gsap.to('.image-circle', {
        boxShadow: '0 0 40px rgba(74, 163, 255, 0.4)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Hover animations for product items
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Hover for robot cards
    const robotCards = document.querySelectorAll('.robot-card');
    robotCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.robot-img i'), {
                scale: 1.2,
                duration: 0.3,
                ease: "backOut(1.7)"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.robot-img i'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Animate vision paragraphs
    gsap.from('.vision-paragraph', {
        scrollTrigger: {
            trigger: '.vision-block',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
    });
});
