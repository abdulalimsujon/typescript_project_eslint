import {
  TacademivSemesterCodeMapper,
  Tcode,
  Tmonth,
  TsemesterName,
} from './AcademicSemester.interface';

export const months: Tmonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemesterTimeWrapper: TacademivSemesterCodeMapper = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
};
export const semesterName: TsemesterName[] = ['Spring', 'Summer', 'Fall'];
export const code: Tcode[] = ['01', '02', '03'];
