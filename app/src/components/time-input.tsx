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

const PhoneTimeInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      if (Number.isNaN(newValue)) return;

      onChange(newValue);
    },
    [onChange]
  );

  return (
    <input
      type="number"
      className="w-16 p-2 outline-1 outline-zinc-900 focus-visible:outline-1 focus-visible:outline-zinc-700 rounded-md transition-all"
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
      if (seconds < 0) {
        seconds = seconds % 60;
        minutes -= 1;
      }
      if (seconds > 59) {
        seconds = seconds % 60;
        minutes += 1;
      }
      if (minutes < 0) {
        if (hours) {
          minutes = minutes % 60;
          hours -= 1;
        } else {
          minutes = 0;
        }
      }
      if (minutes > 59) {
        if (hours) {
          minutes = minutes % 60;
          hours += 1;
        } else {
          minutes = 59;
        }
      }
      if (hours && hours < 0) {
        hours = 0;
      }
      if (hours && hours > 59) {
        hours = 59;
      }

      setInternalValue({ seconds, minutes, hours });
      onChange(hours ? { seconds, minutes, hours } : { seconds, minutes });
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

  console.log("state", internalValue);

  return (
    <div className="flex flex-row gap-1">
      {type === "hh:mm:ss" && (
        <PhoneTimeInput
          value={(internalValue as HoursMinutesSeconds).hours}
          onChange={handleChange("hours")}
        />
      )}
      <PhoneTimeInput
        value={internalValue.minutes}
        onChange={handleChange("minutes")}
      />
      <PhoneTimeInput
        value={internalValue.seconds}
        onChange={handleChange("seconds")}
      />
    </div>
  );
};
