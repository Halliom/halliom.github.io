import React from "react";
import { Title } from "../../../components/title";
import {
  TimeInput,
  type HoursMinutesSeconds,
  type MinutesSeconds,
} from "../../../components/time-input";
import { NumberInput } from "../../../components/number-input";
import { convertTimeToSeconds } from "../../../utils/time";
import clsx from "clsx";

type Setting = "pace" | "distance" | "time";

const SettingSelectorButton: React.FC<React.ComponentProps<"button">> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <div
      className={clsx(
        disabled
          ? "bg-zinc-500/10 !cursor-default outline-2 !outline-amber-500"
          : "bg-zinc-800 hover:outline-zinc-400 hover:bg-zinc-900",
        "px-3 py-2 hover:outline-2 outline-2 outline-zinc-800",
        "rounded-lg",
        "flex flex-row gap-2",
        "transition-all duration-200"
      )}
    >
      {!disabled && (
        <div>
          <button
            className={clsx(
              "py-1 px-2 border border-transparent rounded-md transition-all",
              "hover:border-amber-600 focus-visible:border-amber-600",
              "focus-visible:outline-none"
            )}
            {...props}
          >
            🔒
          </button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export const PaceCalculatorPage: React.FC = () => {
  const [pace, setPace] = React.useState<MinutesSeconds>({
    minutes: 0,
    seconds: 0,
  });
  const [time, setTime] = React.useState<HoursMinutesSeconds>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [distance, setDistance] = React.useState<number>(10);

  const [lockedSetting, setLockedSetting] = React.useState<Setting>("pace");

  const handleConversion = React.useCallback(
    (input: {
      pace: MinutesSeconds;
      time: HoursMinutesSeconds;
      distance: number;
    }) => {
      switch (lockedSetting) {
        case "pace": {
          const seconds = convertTimeToSeconds(input.time);
          const secondsPerKm = seconds / input.distance;
          setPace({
            minutes: Math.floor(secondsPerKm / 60),
            seconds: secondsPerKm % 60,
          });
          break;
        }
        case "time":
          break;
        case "distance":
          break;
      }
    },
    [lockedSetting]
  );

  const handlePaceChange = React.useCallback(
    (newPace: MinutesSeconds) => {
      setPace(newPace);
      handleConversion({ pace: newPace, time, distance });
    },
    [distance, handleConversion, time]
  );

  const handleTimeChange = React.useCallback(
    (newTime: HoursMinutesSeconds) => {
      setTime(newTime);
      handleConversion({ pace, time: newTime, distance });
    },
    [distance, handleConversion, pace]
  );

  const handleDistanceChange = React.useCallback(
    (newDistance: number) => {
      setDistance(newDistance);
      handleConversion({ pace, time, distance: newDistance });
    },
    [handleConversion, pace, time]
  );

  const makeLockedSettingChangeHandler = React.useCallback(
    (setting: Setting) => () => setLockedSetting(setting),
    []
  );

  return (
    <>
      <Title>Pace calculator</Title>

      <div className="flex flex-row gap-4">
        <SettingSelectorButton
          disabled={lockedSetting === "pace"}
          onClick={makeLockedSettingChangeHandler("pace")}
        >
          <span className="text-xl">Pace</span>
          <TimeInput
            type="mm:ss"
            value={pace}
            onChange={handlePaceChange}
            disabled={lockedSetting === "pace"}
          />
        </SettingSelectorButton>
        <SettingSelectorButton
          disabled={lockedSetting === "time"}
          onClick={makeLockedSettingChangeHandler("time")}
        >
          <span className="text-xl">Time</span>
          <TimeInput
            type="hh:mm:ss"
            value={time}
            onChange={handleTimeChange}
            disabled={lockedSetting === "time"}
          />
        </SettingSelectorButton>
        <SettingSelectorButton
          disabled={lockedSetting === "distance"}
          onClick={makeLockedSettingChangeHandler("distance")}
        >
          <span className="text-xl">Distance</span>
          <div>
            <NumberInput
              allowDecimals
              value={distance}
              disabled={lockedSetting === "distance"}
              onChange={handleDistanceChange}
            />
          </div>
        </SettingSelectorButton>
      </div>
    </>
  );
};
