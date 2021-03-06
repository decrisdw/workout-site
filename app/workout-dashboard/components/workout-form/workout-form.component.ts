import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Workout } from '../../models/workout.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  selector: 'workout-form',
  styleUrls: ['workout-form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>

      <div>
        Workout name:
        <input
          type="text"
          name="workoutName"
          required
          #workoutName="ngModel"
          [ngModel]="detail?.workoutName">
        <div *ngIf="workoutName.errors?.required && workoutName.dirty" class="error">
          Workout name is required
        </div>
      </div>

      <div>
        Workout ID:
        <input
          type="number"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id">
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          Workout ID is required
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)">
        </label>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check in date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkInDate">
      </div>

      <div>
        Luggage:
        <select
          name="baggage"
          [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage">
            {{ item.value }}
          </option>
        </select>
      </div>

      <button type="submit" [disabled]="form.invalid">
        Update workout
      </button>

    </form>
  `
})
export class WorkoutFormComponent {

  @Input()
  detail: Workout;

  @Output()
  update: EventEmitter<Workout> = new EventEmitter<Workout>();

  baggage: Baggage[] = [{
    key: 'none',
    value: 'No baggage'
  },{
    key: 'hand-only',
    value: 'Hand baggage'
  },{
    key: 'hold-only',
    value: 'Hold baggage'
  },{
    key: 'hand-hold',
    value: 'Hand and hold baggage'
  }];

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(workout: Workout, isValid: boolean) {
    if (isValid) {
      this.update.emit(workout);
    }
  }

}
