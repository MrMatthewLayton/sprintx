import {AfterViewInit, Component} from '@angular/core';
import {WorkoutService} from "../../services/workout.service";
import {FormatTimePipe} from "../../pipes/format-time.pipe";

type Item = {
  time: number;
  text: string;
  theme: string;
}

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [
    FormatTimePipe
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent implements AfterViewInit {

  public totalSeconds: number = 0;
  public remainingSeconds: number = 0;
  public theme: string = "";
  public text: string = "";

  public get percentage(): number {
    return Math.ceil(100 - (this.remainingSeconds / this.totalSeconds) * 100);
  }

  public get progress(): string {
    return `--progress: ${this.percentage};`;
  }

  public constructor(public readonly service: WorkoutService) {
  }

  public async ngAfterViewInit(): Promise<void> {
    for (const item of this.initializeArray()) {

      this.theme = item.theme;
      this.totalSeconds = item.time;
      this.text = item.text;

      for (let seconds = item.time; seconds >= 0; seconds--) {
        this.remainingSeconds = seconds;
        await this.sleep();
      }
    }

    setTimeout(async () => await this.service.stop(), 2000);
  }

  private initializeArray(): Item[] {
    const array: Item[] = [];

    array.push({time: this.service.warmup, text: "WARM UP", theme: "bg-warning"});

    for (let sprint = 1; sprint <= this.service.sprints; sprint++) {
      array.push({time: this.service.sprint, text: `SPRINT ${sprint} / ${this.service.sprints}`, theme: "bg-danger"});
      array.push({time: this.service.rest, text: `REST ${sprint} / ${this.service.sprints}`, theme: "bg-success"});
    }

    array.push({time: this.service.cooldown, text: "COOL DOWN", theme: "bg-primary"});

    return array;
  }

  private async sleep(milliseconds: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
