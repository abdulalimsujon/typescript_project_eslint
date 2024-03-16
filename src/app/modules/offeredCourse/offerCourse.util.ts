import { TschuduleTime } from './offerCourse.interface';

export const timeConflict = (
  newSchudules: TschuduleTime,
  assignedSchudules: TschuduleTime[],
) => {
  for (const schedule of assignedSchudules) {
    const existStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const NewStartTime = new Date(`1970-01-01T${newSchudules.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchudules.endTime}`);
    if (NewStartTime < existEndTime && newEndTime > existStartTime) {
      return true;
    }
  }

  return false;
};
