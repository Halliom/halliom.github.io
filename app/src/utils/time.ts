import type {
  HoursMinutesSeconds,
  MinutesSeconds,
} from "../components/time-input";

export const convertTimeToSeconds = (
  time: HoursMinutesSeconds | MinutesSeconds
): number => {
  const seconds = time.minutes * 60 + time.seconds;
  if ("hours" in time) {
    return seconds + time.hours * 60 * 60;
  }
  return seconds;
};

export const convertSecondsToTime = (
  inputSeconds: number
): HoursMinutesSeconds => {
  const totalSeconds = Math.floor(Math.abs(inputSeconds));
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return {
    hours,
    minutes,
    seconds,
  };
};
