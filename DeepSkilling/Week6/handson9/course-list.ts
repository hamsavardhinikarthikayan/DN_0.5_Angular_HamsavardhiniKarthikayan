import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';

import { CourseCard } from '../../components/course-card/course-card';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses$!: Observable<Course[]>;

  loading$!: Observable<boolean>;

  error$!: Observable<string | null>;

  constructor(

    private store: Store

  ) {}

  ngOnInit(): void {

    this.courses$ = this.store.select(

      selectAllCourses

    );

    this.loading$ = this.store.select(

      selectCoursesLoading

    );

    this.error$ = this.store.select(

      selectCoursesError

    );

    this.store.dispatch(

      loadCourses()

    );

  }

}
