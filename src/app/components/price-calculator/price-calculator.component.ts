import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface PricingItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  subItems?: { name: string; price: number; }[];
}

const PRICING_ITEMS: PricingItem[] = [
  {
    id: '1',
    name: 'Psychometric Assessment',
    price: 100,
    description: 'Current Mental Status'
  },
  {
    id: '2',
    name: 'Personality Improvement Package',
    price: 500,
    description: 'Communication, Leadership, negotiation Essentials'
  },
  {
    id: '3',
    name: 'Practical Training',
    price: 2500,
    description: 'Concepts & Market Value',
    subItems: [
      { name: 'Technology', price: 0 },
      { name: 'Management Quality', price: 0 }
    ]
  },
  {
    id: '4',
    name: 'Project Package',
    price: 1200,
    subItems: [
      { name: 'Mentorship', price: 300 },
      { name: 'Architecture approval', price: 300 },
      { name: 'Creating Portfolio', price: 300 },
      { name: 'Project Assignment', price: 300 }
    ]
  },
  {
    id: '5',
    name: 'Interview Practice Package',
    price: 150,
    description: 'App - apple and android',
    subItems: [
      { name: 'Corporate Delegate', price: 100 },
      { name: 'Real-Time Questions with scenarios', price: 50 }
    ]
  },
  {
    id: '7',
    name: 'Post Job Support',
    price: 300,
    description: 'Continuous support after securing your position'
  }
];

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PriceCalculatorComponent implements OnInit {
  mainPricingItems = PRICING_ITEMS;
  selectedSubItems: { [key: string]: boolean } = {};

  getTotalPrice(): number {
    return this.mainPricingItems.reduce((total, item) => {
      // Always add the base price
      let itemTotal = item.price;

      // Only add sub-item prices if they are marked as selected
      if (item.subItems) {
        // For now, we'll consider only the base prices since sub-items appear to be included
        // in the main item price or are optional add-ons that need user selection
        // itemTotal += item.subItems.reduce((subTotal, subItem) => subTotal + subItem.price, 0);
      }
      return total + itemTotal;
    }, 0);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeAnimations();
  }

  initializeAnimations() {
    gsap.from('.pricing-card', {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}
