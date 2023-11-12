import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { buttonColor } from '../common/enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ MatButtonModule ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() 
  label: string = "Button";

  @Input()
  color: buttonColor = buttonColor.PRIMARY;

  @Input()
  dataTestId: string = "";
}
