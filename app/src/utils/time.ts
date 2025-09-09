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
