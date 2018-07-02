import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Workout } from './models/workout.interface';

const WORKOUT_API: string = '/api/workouts';

@Injectable()
export class WorkoutDashboardService {
  constructor(private http: Http) {}

  getWorkouts(): Observable<Workout[]> {
    return this.http
      .get(WORKOUT_API)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getWorkout(id: number): Observable<Workout> {
    return this.http
      .get(`${WORKOUT_API}/${id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateWorkout(workout: Workout): Observable<Workout> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http
      .put(`${WORKOUT_API}/${workout.id}`, workout, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeWorkout(workout: Workout): Observable<Workout> {
    return this.http
      .delete(`${WORKOUT_API}/${workout.id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

}