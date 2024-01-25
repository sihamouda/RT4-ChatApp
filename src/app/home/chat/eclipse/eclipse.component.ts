import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eclipse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eclipse.component.html',
  styleUrl: './eclipse.component.css'
})
export class EclipseComponent {
  @Input() dimension!:string;
  @Input() background!:string;
  @Input() src!:string;
  @Input() text!:string;
  @Input() hasBool:boolean=false;
  @Input() isActive:boolean = true;
}
