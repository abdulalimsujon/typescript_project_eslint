export type Tmonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TacademivSemesterCodeMapper = {
  Spring: '01';
  Summer: '02';
  Fall: '03';
};
export type TsemesterName = 'Spring' | 'Summer' | 'Fall';
export type Tcode = '01' | '02' | '03';
export type TAcademicSemester = {
  name: TsemesterName;
  code: Tcode;
  year: string;
  startMonth: Tmonth;
  endMonth: Tmonth;
};
export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
