import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-main',
  templateUrl: './loading-main.component.html',
  styleUrls: ['./loading-main.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in')
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('pulse', [
      state('start', style({ transform: 'scale(1)' })),
      state('end', style({ transform: 'scale(1.1)' })),
      transition('start <=> end', animate('600ms ease-in-out'))
    ])
  ]
})
export class LoadingMainComponent {
  @Input() isLoading: boolean = true;
  @Input() fullScreen: boolean = true;
  @Input() message: string = 'Finding the best prices for you...';
  @Input() showLogo: boolean = true;
  
  pulseState = 'start';
  loadingMessages: string[] = [
    'Finding the best prices for you...',
    'Comparing thousands of products...',
    'Hunting for exclusive deals...',
    'Analyzing price trends...',
    'Discovering savings opportunities...'
  ];
  currentMessageIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    // Start the pulse animation
    this.startPulseAnimation();
    
    // Rotate through loading messages if no specific message is provided
    if (this.message === 'Finding the best prices for you...') {
      this.rotateMessages();
    }
  }

  startPulseAnimation(): void {
    setInterval(() => {
      this.pulseState = this.pulseState === 'start' ? 'end' : 'start';
    }, 600);
  }

  rotateMessages(): void {
    setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
      this.message = this.loadingMessages[this.currentMessageIndex];
    }, 3000);
  }
}
