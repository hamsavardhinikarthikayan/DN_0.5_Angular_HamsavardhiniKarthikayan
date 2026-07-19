import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    Highlight,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input()
  course!: any;

  @Output()
  enrollRequested = new EventEmitter<number>();

  // Built-in Pipe Data
  today = new Date();
  courseFee = 5000;
  rating = 4.5678;

  // Expand / Collapse
  isExpanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Course Input Changed");
    console.log(changes);
  }

  enroll() {
    this.enrollRequested.emit(this.course.id);
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  getCardClasses() {
    return {
      'card-enrolled': this.course.gradeStatus === 'passed',
      'card-full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  getBorderColor() {
    switch (this.course.gradeStatus) {

      case 'passed':
        return 'green';

      case 'failed':
        return 'red';

      default:
        return 'orange';
    }
  }
}