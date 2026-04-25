import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-service-icon',
  templateUrl: './service-icon.component.html',
  styleUrl: './service-icon.component.css'
})
export class ServiceIconComponent {
  @Input() iconName!: string;
  @Input() label!: string;
  @Input() color!: string;
  @Output() onClick = new EventEmitter<void>();
}
