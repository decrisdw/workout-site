import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { WorkoutDashboardService } from '../../workout-dashboard.service';

import { Workout } from '../../models/workout.interface';

@Component({
  selector: 'workout-viewer',
  styleUrls: ['workout-viewer.component.scss'],
  template: `
    <div>
      <workout-form
        [detail]="workout"
        (update)="onUpdateWorkout($event)">
      </workout-form>
    </div>
  `
})
export class WorkoutViewerComponent implements OnInit {
  workout: Workout;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutDashboardService
  ) {}
  ngOnInit() {
    this.route.params
      .switchMap((data: Workout) => this.workoutService.getWorkout(data.id))
      .subscribe((data: Workout) => this.workout = data);
  }
  onUpdateWorkout(event: Workout) {
    this.workoutService
      .updateWorkout(event)
      .subscribe((data: Workout) => {
        this.workout = Object.assign({}, this.workout, event);
      });
  }
}