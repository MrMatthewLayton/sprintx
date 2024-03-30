import {Routes} from '@angular/router';
import {ConfigComponent} from "./components/config/config.component";
import {WorkoutComponent} from "./components/workout/workout.component";

export const routes: Routes = [
  {path: "config", component: ConfigComponent},
  {path: "workout", component: WorkoutComponent},
  {path: "**", redirectTo: "/config"}
];
