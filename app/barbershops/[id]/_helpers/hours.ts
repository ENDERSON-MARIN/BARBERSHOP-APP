import { setHours, setMinutes, format, addMinutes, isBefore } from "date-fns";

// export function generateDayTimeList(date: Date): string[] {
//   const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
//   const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
//   const interval = 45; // interval in minutes
//   const timeList: string[] = [];

//   let currentTime = startTime;

//   while (currentTime <= endTime) {
//     timeList.push(format(currentTime, "HH:mm"));
//     currentTime = addMinutes(currentTime, interval);
//   }

//   return timeList;
// }

/* asegurarte de que la hora de inicio sea a las 9 am, hora final sea 9pm y que no permita reservar horas pasadas del día actual */
export function generateDayTimeList(date: Date): string[] {
  const now = new Date();
  const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // Set end time to 21:00
  const interval = 45; // interval in minutes
  const timeList: string[] = [];

  let currentTime = startTime;

  // Ensure the start time is not in the past
  if (isBefore(currentTime, now)) {
    currentTime = now;
  }

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
