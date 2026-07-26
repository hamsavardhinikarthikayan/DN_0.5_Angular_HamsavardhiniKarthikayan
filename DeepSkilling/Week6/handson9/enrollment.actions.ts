import { createAction, props } from '@ngrx/store';

export const enrollInCourse = createAction(

  '[Enrollment] Enroll In Course',

  props<{

    courseId: number;

  }>()

);

export const unenrollFromCourse = createAction(

  '[Enrollment] Unenroll From Course',

  props<{

    courseId: number;

  }>()

);

export const setEnrolledCourses = createAction(

  '[Enrollment] Set Enrolled Courses',

  props<{

    courseIds: number[];

  }>()

);

export const clearEnrollments = createAction(

  '[Enrollment] Clear Enrollments'

);
