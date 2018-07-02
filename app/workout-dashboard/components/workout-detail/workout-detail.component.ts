import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Workout } from '../../models/workout.interface';

@Component({
  selector: 'workout-detail',
  styleUrls: ['workout-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input 
          type="text" 
          [value]="detail.workoutName"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.workoutName }}
      </div>
      <div class="date">
        Check in date: 
        {{ detail.checkInDate ? (detail.checkInDate | date: 'yMMMMd' | uppercase) : 'Not checked in' }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? 'Done' : 'Edit' }}
      </button>
      <button (click)="onRemove()">
        Remove
      </button>
    </div>
  `
})
export class WorkoutDetailComponent implements OnChanges {

  @Input()
  detail: Workout;

  @Output()
  edit: EventEmitter<Workout> = new EventEmitter<Workout>();

  @Output()
  remove: EventEmitter<Workout> = new EventEmitter<Workout>();

  editing: boolean = false;
  
  constructor() {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }
  
  onNameChange(value: string) {
    this.detail.workoutName = value;
  }
  
  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }
  onRemove() {
    this.remove.emit(this.detail);
  }
}