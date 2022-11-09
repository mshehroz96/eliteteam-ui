/**
 * App Calendar Events
 */

'use strict';

let date = new Date();
let endtime = new Date();
let nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
// prettier-ignore
let nextMonth = date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
// prettier-ignore
let prevMonth = date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);


let events = [
  {
    id: 1,
    url: '',
    title: 'My Company',
    start: new Date(2022, 3, 22, 11, 30, 0) ,
    end: new Date(2022, 3, 22, 12, 0, 0) ,
    allDay: false,
    extendedProps: {
      calendar: 'InterviewInPerson',
      job_title: '[ClientMeeting]'
    }
  },
  {
    id: 2,
    url: '',
    title: 'ACME Corp',
    start: new Date(2022, 3, 21, 12, 0, 0) ,
    end: new Date(2022, 3, 21, 12,30, 0) ,
    allDay: false,
    extendedProps: {
      calendar: 'InterviewInPerson',
      job_title: '[ClientMeeting]'
    }
  },
  {
    id: 3,
    url: '',
    title: 'Rachel Conray',
    start: new Date(2022, 3, 24, 12, 0, 0) ,
    end: new Date(2022, 3, 24, 12,30, 0) ,
    allDay: false,
    extendedProps: {
      calendar: 'InterviewZoom',
      job_title: 'Registered Nurse'
    }
  },
  {
    id: 4,
    url: '',
    title: 'John Livington',
    start: new Date(2022, 3, 8, 12, 0, 0) ,
    end: new Date(2022, 3, 8, 12, 30, 0) ,
    allDay: false,
    extendedProps: {
      calendar: 'InterviewZoom',
      job_title: 'Network Engineer'
    }
  },
  {
    id: 5,
    url: '',
    title: 'Micheal Cordian',
    start: new Date(2022, 3, 4, 11, 0, 0) ,
    end: new Date(2022, 3, 4, 11,30, 0) ,
    allDay: false,
    extendedProps: {
      calendar: 'InterviewZoom',
      job_title: 'Registered Nurse'
    }
  },
  {
    id: 100,
    url: '',
    title: 'Available',
    daysOfWeek: [ '1','2','4','5' ],
    startTime: '10:45:00',
    endTime: '12:45:00',
    //start: date,
   // end: nextDay,  
    extendedProps: {
      calendar: 'Availability',
      job_title: '[MyAvailability]'
    }
  }
];
