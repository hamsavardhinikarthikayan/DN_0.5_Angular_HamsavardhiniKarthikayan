import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { CourseList } from './course-list';

describe('CourseList', () => {

  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses = [

    {
      id: 1,
      name: 'Angular',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },

    {
      id: 2,
      name: 'Java',
      code: 'JAVA201',
      credits: 3,
      gradeStatus: 'pending'
    }

  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        CourseList
      ],

      providers: [

        provideMockStore({

          initialState: {

            course: {

              courses: mockCourses,

              loading: false,

              error: null,

              selectedCourseId: null

            }

          }

        })

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);

    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course cards', () => {

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(

      By.css('app-course-card')

    );

    expect(cards.length).toBe(2);

  });

  it('should render Angular course', () => {

    fixture.detectChanges();

    const html = fixture.nativeElement.textContent;

    expect(html).toContain('Angular');

  });

  it('should show loading indicator', () => {

    store.setState({

      course: {

        courses: [],

        loading: true,

        error: null,

        selectedCourseId: null

      }

    });

    store.refreshState();

    fixture.detectChanges();

    expect(

      fixture.nativeElement.textContent

    ).toContain(

      'Loading'

    );

  });

  it('should show error message', () => {

    store.setState({

      course: {

        courses: [],

        loading: false,

        error: 'Server Error',

        selectedCourseId: null

      }

    });

    store.refreshState();

    fixture.detectChanges();

    expect(

      fixture.nativeElement.textContent

    ).toContain(

      'Server Error'

    );

  });

  it('should update when state changes', () => {

    store.setState({

      course: {

        courses: [

          ...mockCourses,

          {

            id: 3,

            name: 'Spring Boot',

            code: 'SPR301',

            credits: 4,

            gradeStatus: 'pending'

          }

        ],

        loading: false,

        error: null,

        selectedCourseId: null

      }

    });

    store.refreshState();

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(

      By.css('app-course-card')

    );

    expect(cards.length).toBe(3);

  });

});
