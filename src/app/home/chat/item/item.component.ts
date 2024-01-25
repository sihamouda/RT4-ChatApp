import { Component, Input } from '@angular/core';
import { EclipseComponent } from '../eclipse/eclipse.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [EclipseComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  public dimension:string="50px";
  @Input() hasBool:boolean=true;
  @Input() isActive:boolean=false;
  @Input() name!:string;
  @Input() message!:string;
  @Input() time!:string;
  @Input() image!:string
}
