import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CourseList } from '../course-list/course-list';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';

import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CourseList,
    CourseSummaryWidget
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  portalName = 'Student Course Portal';

  isPortalActive = true;

  message = '';

  searchTerm = '';

  availableCourses = 0;

  constructor(

    private courseService: CourseService

  ){}

  ngOnInit(): void {

    this.refreshCount();

  }

  ngOnDestroy(): void {

    console.log("Home Destroyed");

  }

  refreshCount(){

    this.availableCourses=this.courseService.getCourses().length;

  }

  onEnrollClick(){

    this.message="Enrollment Opened!";

    this.refreshCount();

  }

}