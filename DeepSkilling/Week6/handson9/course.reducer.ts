import { createReducer, on } from '@ngrx/store';

import * as CourseActions from './course.actions';
import { Course } from '../../models/course.model';

export interface CourseState {

  courses: Course[];

  loading: boolean;

  error: string | null;

  selectedCourseId: number | null;

}

export const initialState: CourseState = {

  courses: [],

  loading: false,

  error: null,

  selectedCourseId: null

};

export const courseReducer = createReducer(

  initialState,

  on(
    CourseActions.loadCourses,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  on(
    CourseActions.loadCoursesSuccess,
    (state, { courses }) => ({
      ...state,
      loading: false,
      courses
    })
  ),

  on(
    CourseActions.loadCoursesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(
    CourseActions.addCourse,
    (state, { course }) => ({
      ...state,
      courses: [...state.courses, course]
    })
  ),

  on(
    CourseActions.updateCourse,
    (state, { course }) => ({
      ...state,
      courses: state.courses.map(c =>
        c.id === course.id ? course : c
      )
    })
  ),

  on(
    CourseActions.deleteCourse,
    (state, { id }) => ({
      ...state,
      courses: state.courses.filter(c => c.id !== id)
    })
  ),

  on(
    CourseActions.selectCourse,
    (state, { id }) => ({
      ...state,
      selectedCourseId: id
    })
  ),

  on(
    CourseActions.clearSelectedCourse,
    (state) => ({
      ...state,
      selectedCourseId: null
    })
  )

);
