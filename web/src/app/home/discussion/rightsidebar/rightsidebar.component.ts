import { Component, Input } from '@angular/core';
import { UserComponent } from '../../chat/user/user.component';

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './rightsidebar.component.html',
  styleUrl: './rightsidebar.component.css',
})
export class RightsidebarComponent {
  @Input() recieverSourceImg!: string;
  @Input() recieverFirst_Name!: string;
  @Input() recieverlast_Name!: string;
  public hasBadge: boolean = false;
}
