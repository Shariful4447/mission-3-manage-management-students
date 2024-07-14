import { TDays, TSchedule } from "./offeredCourse.interface";

const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  assignSchedules.forEach((schedule) => {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "startTime and endTime conflict !! This faculty is not availbale on the mentioned day and time "
      );
    }
  });
};
