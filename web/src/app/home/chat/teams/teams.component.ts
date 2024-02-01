import { Component, Input } from '@angular/core';
import { EclipseComponent } from '../eclipse/eclipse.component';
import { CommonModule } from '@angular/common';
import { Team } from '../../../Model/Team';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [EclipseComponent,CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  dimension:string="45px";
  @Input() teams!:Team[];
}
