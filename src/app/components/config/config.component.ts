import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormatTimePipe} from "../../pipes/format-time.pipe";
import {WorkoutService} from "../../services/workout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  public constructor(public readonly service: WorkoutService, public readonly router: Router) {
  }

  protected readonly WorkoutService = WorkoutService;
}
