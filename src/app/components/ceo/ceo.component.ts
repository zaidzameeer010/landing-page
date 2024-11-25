import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-ceo',
  standalone: true,
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.css']
})
export class CeoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('parallaxBg') parallaxBg!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('imageWrapper') imageWrapper!: ElementRef;
  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit() {
    // Initialize the intersection observer for reveal animations
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
  }

  ngAfterViewInit() {
    // Initialize GSAP animations
    this.initAnimations();
    
    // Observe elements with reveal animations
    const elementsToAnimate = document.querySelectorAll(
      '.reveal-slide-up, .reveal-slide-right, .reveal-slide-left'
    );
    elementsToAnimate.forEach(element => {
      this.observer?.observe(element);
    });
  }

  ngOnDestroy() {
    // Clean up observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initAnimations() {
    // Parallax effect for background with optimized performance
    gsap.to(this.parallaxBg.nativeElement, {
      scrollTrigger: {
        trigger: this.parallaxBg.nativeElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,  // Reduced scrub time for smoother parallax
        invalidateOnRefresh: true  // Ensure proper updates on resize
      },
      y: '20%',  // Reduced movement range
      ease: 'none',
      force3D: true  // Hardware acceleration
    });

    // Floating animation for decorative elements with reduced movement
    const decorativeElements = document.querySelectorAll('.backdrop-blur-lg');
    decorativeElements.forEach((element: Element) => {
      gsap.to(element, {
        y: 'random(-5, 5)',  // Reduced movement range
        duration: 'random(3, 4)',  // Slower animation
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true  // Hardware acceleration
      });
    });
  }
}