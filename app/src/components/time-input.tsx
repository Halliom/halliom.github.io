import React from "react";

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

type Props<T extends HoursMinutesSeconds | MinutesSeconds> = {
  type: Time["type"];
  value: T;
  onChange: (time: T) => void;
};

export const NumberInput: React.FC<{
  value: number;
  allowDecimals?: boolean;
  onChange: (value: number) => void;
}> = ({ value, allowDecimals = false, onChange }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = 0
      if (allowDecimals) {
        newValue = Number(event.target.value)
      } else {
        newValue = parseInt(event.target.value, 10);
      }
      if (Number.isNaN(newValue)) return;
      onChange(newValue);
    },
    [allowDecimals, onChange]
  );

  return (
    <input
      type="number"
      className="w-16 p-2 bg-zinc-800 active:bg-zinc-900 focus-visible:outline-1 focus-visible:outline-zinc-700 outline-zinc-700 rounded-md transition-all"
      value={value}
      onChange={handleChange}
    />
  );
};

export const TimeInput = <T extends HoursMinutesSeconds | MinutesSeconds>({
  type,
  value,
  onChange,
}: Props<T>) => {
  const [internalValue, setInternalValue] = React.useState<
    HoursMinutesSeconds | MinutesSeconds
  >(value);

  const updateValue = React.useCallback(
    (seconds: number, minutes: number, hours?: number) => {
      // Handle seconds
      while (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      while (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
      }

      // Handle minutes
      while (minutes < 0) {
        if (hours) {
          minutes += 60;
          hours -= 1;
        } else {
          minutes = 0;
          break;
        }
      }
      while (minutes >= 60) {
        if (hours) {
          minutes -= 60;
          hours += 1;
        } else {
          minutes = 59;
          break;
        }
      }
      if (hours !== undefined) {
        hours = Math.max(0, Math.min(99, hours));
      }

      setInternalValue({ seconds, minutes, hours });
      onChange(
        (hours ? { seconds, minutes, hours } : { seconds, minutes }) as T
      );
    },
    [onChange]
  );

  const handleChange = React.useCallback(
    (changeType: "hours" | "minutes" | "seconds") => (newValue: number) => {
      switch (changeType) {
        case "hours":
          if ("hours" in internalValue)
            updateValue(internalValue.seconds, internalValue.minutes, newValue);
          return;
        case "minutes":
          updateValue(
            internalValue.seconds,
            newValue,
            "hours" in internalValue ? internalValue.hours : undefined
          );
          return;
        case "seconds":
          updateValue(
            newValue,
            internalValue.minutes,
            "hours" in internalValue ? internalValue.hours : undefined
          );
          return;
      }
    },
    [internalValue, updateValue]
  );

  return (
    <div className="flex flex-row items-center gap-1">
      {type === "hh:mm:ss" && (
        <>
          <NumberInput
            value={(internalValue as HoursMinutesSeconds).hours}
            onChange={handleChange("hours")}
          />
          <span className="text-xl">:</span>
        </>
      )}
      <NumberInput
        value={internalValue.minutes}
        onChange={handleChange("minutes")}
      />
      <span className="text-xl">:</span>
      <NumberInput
        value={internalValue.seconds}
        onChange={handleChange("seconds")}
      />
    </div>
  );
};
