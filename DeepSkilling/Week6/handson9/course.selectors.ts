import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { CourseState } from './course.reducer';

export const selectCourseState =
  createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(

  selectCourseState,

  (state) => state.courses

);

export const selectCoursesLoading = createSelector(

  selectCourseState,

  (state) => state.loading

);

export const selectCoursesError = createSelector(

  selectCourseState,

  (state) => state.error

);

export const selectSelectedCourseId = createSelector(

  selectCourseState,

  (state) => state.selectedCourseId

);

export const selectSelectedCourse = createSelector(

  selectAllCourses,

  selectSelectedCourseId,

  (courses, id) =>

    courses.find(course => course.id === id) ?? null

);

export const selectTotalCourses = createSelector(

  selectAllCourses,

  (courses) => courses.length

);

export const selectPassedCourses = createSelector(

  selectAllCourses,

  (courses) =>

    courses.filter(c => c.gradeStatus === 'passed')

);

export const selectPendingCourses = createSelector(

  selectAllCourses,

  (courses) =>

    courses.filter(c => c.gradeStatus === 'pending')

);

export const selectFailedCourses = createSelector(

  selectAllCourses,

  (courses) =>

    courses.filter(c => c.gradeStatus === 'failed')

);

export const selectPassedCount = createSelector(

  selectPassedCourses,

  (courses) => courses.length

);

export const selectPendingCount = createSelector(

  selectPendingCourses,

  (courses) => courses.length

);

export const selectFailedCount = createSelector(

  selectFailedCourses,

  (courses) => courses.length

);
