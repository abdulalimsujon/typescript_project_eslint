export type Tmonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'Semtember'
  | 'October'
  | 'November'
  | 'December';

export type TsemesterName = 'Autumn' | 'Summer' | 'Fall';
export type Tcode = '01' | '02' | '03';
export type TAcademicSemester = {
  name: TsemesterName;
  code: Tcode;
  year: string;
  startMonth: Tmonth;
  endMonth: Tmonth;
};
