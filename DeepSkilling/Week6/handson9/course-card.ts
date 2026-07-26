import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard {

  @Input() course!: Course;

  enrolledIds$ = this.store.select(selectEnrolledIds);

  constructor(
    private store: Store
  ) {}

  enroll(): void {

    this.store.dispatch(

      enrollInCourse({

        courseId: this.course.id

      })

    );

  }

  unenroll(): void {

    this.store.dispatch(

      unenrollFromCourse({

        courseId: this.course.id

      })

    );

  }

}
