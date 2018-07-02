import { Component, OnInit } from '@angular/core';

import { WorkoutDashboardService } from '../../workout-dashboard.service';

import { Workout } from '../../models/workout.interface';

@Component({
  selector: 'workout-dashboard',
  styleUrls: ['workout-dashboard.component.scss'],
  template: `
    <div>
      <workout-count
        [items]="workouts">
      </workout-count>
      <div *ngFor="let workout of workouts;">
        {{ workout.workoutName }}
      </div>
      <workout-detail
        *ngFor="let workout of workouts;"
        [detail]="workout"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </workout-detail>
    </div>
  `
})
export class WorkoutDashboardComponent implements OnInit {
  workouts: Workout[];
  constructor(private workoutService: WorkoutDashboardService) {}
  ngOnInit() {
     this.workoutService
      .getWorkouts()
      .subscribe((data: Workout[]) => this.workouts = data);
  }
  handleEdit(event: Workout) {
    this.workoutService
      .updateWorkout(event)
      .subscribe((data: Workout) => {
        this.workouts = this.workouts.map((workout: Workout) => {
          if (workout.id === event.id) {
            workout = Object.assign({}, workout, event);
          }
          return workout;
        });
      });
  }
  handleRemove(event: Workout) {
    this.workoutService
      .removeWorkout(event)
      .subscribe((data: Workout) => {
        this.workouts = this.workouts.filter((workout: Workout) => {
          return workout.id !== event.id;
        });
      });
  }
}