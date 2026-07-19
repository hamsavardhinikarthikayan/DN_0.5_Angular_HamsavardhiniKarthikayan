import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.courses = this.courseService.getCourses();

  }

  addSampleCourse(): void {

    const newCourse: Course = {

      id: this.courses.length + 1,

      name: 'Python',

      code: 'PYT601',

      credits: 3,

      gradeStatus: 'pending'

    };

    this.courseService.addCourse(newCourse);

  }

}