import { Component, Input } from '@angular/core';
import { USG } from '../USG.types';


@Component({
  selector: 'app-dialog-bubble',
  templateUrl: './dialog-bubble.component.html',
  styleUrls: ['./dialog-bubble.component.scss']
})
export class DialogBubbleComponent {
  @Input() public item?: USG.DialogItem;

}
