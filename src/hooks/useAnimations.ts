import { useEffect } from 'react';

export const useAnimations = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Observer for section transitions
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-section');
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            bgImage.style.opacity = '1';
          }
        } else {
          entry.target.classList.remove('active-section');
          const bgImage = entry.target.querySelector('img');
          if (bgImage) {
            bgImage.style.opacity = '0.8';
          }
        }
      });
    }, { 
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '-10% 0px -10% 0px'
    });

    // Apply observers to elements
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in');
    fadeElements.forEach(element => {
      fadeObserver.observe(element);
    });
    
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      fadeElements.forEach(element => {
        fadeObserver.unobserve(element);
      });
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Add scrolling effects for parallax
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.clientHeight;
        const scrollPercent = (scrollPosition - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);
        
        const bgImage = section.querySelector('img');
        if (bgImage && scrollPercent >= 0 && scrollPercent <= 1) {
          const translateY = scrollPercent * 50;
          bgImage.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}; 