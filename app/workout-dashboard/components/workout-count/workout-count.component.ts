import { Component, Input } from '@angular/core';

import { Workout } from '../../models/workout.interface';

@Component({
  selector: 'workout-count',
  template: `
    <div>
      <h3>Airline Workouts!</h3>
      <div>
        Total checked in: {{ checkedInCount() }}/{{ items?.length }}
      </div>
    </div>
  `
})
export class WorkoutCountComponent {
  @Input()
  items: Workout[];
  checkedInCount(): number {
    if (!this.items) return;
    return this.items.filter((workout: Workout) => workout.checkedIn).length;
  }
}