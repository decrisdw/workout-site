import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { WorkoutDashboardComponent } from './containers/workout-dashboard/workout-dashboard.component';
import { WorkoutViewerComponent } from './containers/workout-viewer/workout-viewer.component';

// components
import { WorkoutCountComponent } from './components/workout-count/workout-count.component';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

// service
import { WorkoutDashboardService } from './workout-dashboard.service';

const routes: Routes = [
  {
    path: 'workouts',
    children: [
     { path: '', component: WorkoutDashboardComponent },
     { path: ':id', component: WorkoutViewerComponent }
    ]
  }
];

@NgModule({
  declarations: [
    WorkoutDashboardComponent,
    WorkoutViewerComponent,
    WorkoutCountComponent,
    WorkoutDetailComponent,
    WorkoutFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    WorkoutDashboardService
  ]
})
export class WorkoutDashboardModule {}