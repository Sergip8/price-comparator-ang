import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  
  // Footer links organized by category
  footerLinks = [
    
    {
      category: 'For Shoppers',
      links: [
        { title: 'How It Works', url: '/how-it-works' },
        { title: 'Price Alerts', url: '/price-alerts' },
        { title: 'Deals', url: '/deals' },
        { title: 'App Download', url: '/app' }
      ]
    },
    {
      category: 'For Retailers',
      links: [
        { title: 'Partner with Us', url: '/partners' },
        { title: 'Merchant Login', url: '/merchant' },
        { title: 'Affiliate Program', url: '/affiliate' }
      ]
    },
    {
      category: 'Resources',
      links: [
        { title: 'Blog', url: '/blog' },
        { title: 'Help Center', url: '/help' },
        { title: 'Privacy Policy', url: '/privacy' },
        { title: 'Terms of Service', url: '/terms' }
      ]
    }
  ];
  
  // Social media links
  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'fa-facebook-f' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'fa-instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fa-linkedin-in' }
  ];
}
