import { Class } from '../interfaces/types';

export const convert24hourTo12HourFormat = (time: string) => {
  let [hour, minute] = time.split(':');

  let meridiem = 'AM';

  if (+hour >= 12) {
    meridiem = 'PM';
  }
  if (+hour > 12) {
    hour = String(+hour - 12);
  }

  const formattedTime = `${hour}:${minute} ${meridiem}`;

  return formattedTime;
};

export const calculateEndTime = (startTime: string) => {
  let [hour, minute] = startTime.split(':');

  minute = String(+minute + 40);

  console.log(minute);

  if (+minute >= 60) {
    hour = String(+hour + 1);
    minute = String(+minute - 60);
  }

  if (String(minute).length === 1) {
    minute = '0' + minute;
  }

  const endTime = `${hour}:${minute}`;

  return endTime;
};

export const compareStartTime = (a: Class, b: Class) => {
  if (convertTimeToNumber(a.startTime) < convertTimeToNumber(b.startTime)) {
    return -1;
  }
  if (convertTimeToNumber(a.startTime) > convertTimeToNumber(b.startTime)) {
    return 1;
  }
  return 0;
};

export const compareTime = (a: string, b: string) => {
  return convertTimeToNumber(a) - convertTimeToNumber(b);
};

export const convertTimeToNumber = (time: string) => {
  return parseInt(time?.replace(':', ''));
};
