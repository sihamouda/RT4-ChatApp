import { Component, Input } from '@angular/core';
import { EclipseComponent } from '../eclipse/eclipse.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [EclipseComponent,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  dimension:string="100px";
  @Input() src!:string;
  @Input() hasBadge:boolean=true;
  @Input() user!:string;
}
