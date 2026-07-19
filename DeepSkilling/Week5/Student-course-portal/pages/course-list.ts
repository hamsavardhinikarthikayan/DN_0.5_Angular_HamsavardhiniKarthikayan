import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses: Course[] = [];

  filteredCourses: Course[] = [];

  selectedCourseId: number | null = null;

  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.courses = this.courseService.getCourses();

    const search = this.route.snapshot.queryParamMap.get('search');

    if (search) {
      this.searchTerm = search;
      this.searchCourses();
    } else {
      this.filteredCourses = [...this.courses];
    }

  }

  searchCourses(): void {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm
      },
      queryParamsHandling: 'merge'
    });

    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }

  onEnroll(courseId: number): void {

    this.selectedCourseId = courseId;

  }

  viewCourse(course: Course): void {

    this.router.navigate(['/courses', course.id]);

  }

}