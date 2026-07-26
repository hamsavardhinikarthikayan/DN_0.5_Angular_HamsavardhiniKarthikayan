import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {

    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'

  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [CourseCard],

      providers: [

        provideMockStore({

          initialState: {

            enrollment: {

              enrolledCourseIds: []

            }

          }

        })

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);

    component = fixture.componentInstance;

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course name', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const title = fixture.debugElement.query(

      By.css('h3')

    ).nativeElement;

    expect(title.textContent).toContain(

      'Data Structures'

    );

  });

  it('should display course code', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('CS101');

  });

  it('should dispatch enroll action', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    spyOn(component, 'enroll');

    const button = fixture.debugElement.query(

      By.css('button')

    ).nativeElement;

    button.click();

    expect(component.enroll).toHaveBeenCalled();

  });

  it('should call ngOnChanges', () => {

    spyOn(console, 'log');

    component.course = mockCourse;

    component.ngOnChanges({

      course: {

        previousValue: null,

        currentValue: mockCourse,

        firstChange: true,

        isFirstChange: () => true

      }

    });

    expect(console.log).toHaveBeenCalled();

  });

});
