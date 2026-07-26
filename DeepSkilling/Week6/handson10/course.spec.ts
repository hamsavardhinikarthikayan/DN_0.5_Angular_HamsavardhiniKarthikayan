import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {

  let service: CourseService;

  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/courses';

  const mockCourses: Course[] = [

    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },

    {
      id: 2,
      name: 'Angular',
      code: 'CS202',
      credits: 3,
      gradeStatus: 'pending'
    }

  ];

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [

        HttpClientTestingModule

      ],

      providers: [

        CourseService

      ]

    });

    service = TestBed.inject(CourseService);

    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpMock.verify();

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should return all courses', () => {

    service.getCourses().subscribe(courses => {

      expect(courses.length).toBe(2);

      expect(courses).toEqual(mockCourses);

    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('GET');

    request.flush(mockCourses);

  });

  it('should return one course by id', () => {

    service.getCourseById(1).subscribe(course => {

      expect(course.id).toBe(1);

      expect(course.name).toBe('Data Structures');

    });

    const request = httpMock.expectOne(

      `${apiUrl}/1`

    );

    expect(request.request.method).toBe('GET');

    request.flush(mockCourses[0]);

  });

  it('should create a course', () => {

    const newCourse = {

      name: 'Java',

      code: 'CS303',

      credits: 4,

      gradeStatus: 'pending' as const

    };

    service.createCourse(newCourse).subscribe(course => {

      expect(course.name).toBe('Java');

      expect(course.id).toBe(3);

    });

    const request = httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('POST');

    request.flush({

      id: 3,

      ...newCourse

    });

  });

  it('should handle server error', () => {

    service.getCourses().subscribe({

      next: () => fail('Expected an error'),

      error: (error) => {

        expect(error).toBeTruthy();

      }

    });

    const request = httpMock.expectOne(apiUrl);

    request.flush(

      'Internal Server Error',

      {

        status: 500,

        statusText: 'Server Error'

      }

    );

  });

});
