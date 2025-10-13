import React from "react";
import { IMask, IMaskInput } from "react-imask";

export type HoursMinutesSeconds = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type MinutesSeconds = {
  minutes: number;
  seconds: number;
};

type Time =
  | { value: HoursMinutesSeconds; type: "hh:mm:ss" }
  | { value: MinutesSeconds; type: "mm:ss" };

type TimeType = Time["type"]

type Props<T extends HoursMinutesSeconds | MinutesSeconds> = {
  type: TimeType;
  value: T;
  disabled?: boolean
  onChange: (time: T) => void;
};

const divideUnmaskedInputIntoParts = (
  type: TimeType,
  input: string
): number[] | null => {
  if (type === "hh:mm:ss" && input.length !== 6) return null;
  if (type === "mm:ss" && input.length !== 4) return null;

  switch (type) {
    case "hh:mm:ss":
      return [
        parseInt(input.substring(0, 2), 10),
        parseInt(input.substring(2, 4), 10),
        parseInt(input.substring(4, 6), 10),
      ];
    case "mm:ss":
      return [
        parseInt(input.substring(0, 2), 10),
        parseInt(input.substring(2, 4), 10),
      ];
  }
};

const parseStringToValue = <T extends HoursMinutesSeconds | MinutesSeconds>(
  type: TimeType,
  input: string
): T | null => {
  const parts = divideUnmaskedInputIntoParts(type, input);
  if (parts === null) return null;

  if (type === "hh:mm:ss" && parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    if (
      hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59 &&
      seconds >= 0 &&
      seconds <= 59
    ) {
      return { hours, minutes, seconds } as T;
    }
  } else if (type === "mm:ss" && parts.length === 2) {
    const [minutes, seconds] = parts;
    if (minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
      return { minutes, seconds } as T;
    }
  }
  return null;
};

export const TimeInput = <T extends HoursMinutesSeconds | MinutesSeconds>({
  type,
  value,
  disabled,
  onChange,
}: Props<T>) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const formatValueToString = React.useCallback(
    (val: T): string => {
      if (type === "hh:mm:ss" && "hours" in val) {
        return `${val.hours.toString().padStart(2, "0")}:${val.minutes
          .toString()
          .padStart(2, "0")}:${val.seconds.toString().padStart(2, "0")}`;
      } else if (type === "mm:ss" && "minutes" in val) {
        return `${val.minutes.toString().padStart(2, "0")}:${val.seconds
          .toString()
          .padStart(2, "0")}`;
      }
      return "";
    },
    [type]
  );

  const handleAccept = React.useCallback(
    (unmaskedValue: string) => {
      const parsedValue = parseStringToValue<T>(type, unmaskedValue);
      if (parsedValue) {
        onChange(parsedValue);
      }
    },
    [onChange, type]
  );

  const mask = type === "hh:mm:ss" ? "00:00:00" : "00:00";

  return (
    <div className="flex flex-row items-center gap-1">
      <IMaskInput
        mask={mask}
        disabled={disabled}
        value={formatValueToString(value)}
        unmask={true}
        ref={ref}
        onAccept={handleAccept}
        placeholder={type === "hh:mm:ss" ? "hh:mm:ss" : "mm:ss"}
        className="w-32 p-2 bg-zinc-800 active:bg-zinc-900 focus-visible:outline-1 focus-visible:outline-zinc-700 outline-zinc-700 rounded-md transition-all text-left font-mono"
        blocks={maskedInputBlocks}
        definitions={maskedInputDefinitions}
      />
    </div>
  );
};

const maskedInputBlocks = {
  HH: {
    mask: IMask.MaskedRange,
    from: 0,
    to: 23,
    maxLength: 2,
  },
  MM: {
    mask: IMask.MaskedRange,
    from: 0,
    to: 59,
    maxLength: 2,
  },
  SS: {
    mask: IMask.MaskedRange,
    from: 0,
    to: 59,
    maxLength: 2,
  },
};

const maskedInputDefinitions = {
  "0": /[0-9]/,
}