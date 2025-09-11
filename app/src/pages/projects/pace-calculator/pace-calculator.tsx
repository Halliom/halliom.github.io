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
  // TODO: Do focus and similar classes as well
  return (
    <div
      className={clsx(
        disabled
          ? "bg-zinc-500/10 !cursor-default outline-2 !outline-amber-500"
          : "bg-zinc-800 hover:outline-zinc-400 hover:bg-zinc-900",
          "px-3 py-2 hover:outline-2 outline-2 outline-zinc-800",
          "rounded-lg",
          "transition-all duration-200"
      )}
    >
      <button {...props} disabled={disabled}>O</button>
      {children}
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

  const handleConversion = React.useCallback(() => {
    switch (lockedSetting) {
      case "pace": {
        const seconds = convertTimeToSeconds(time);
        const secondsPerKm = seconds / distance;
        console.log({ time, seconds, secondsPerKm });
        setPace(() => ({
          minutes: Math.floor(secondsPerKm / 60),
          seconds: secondsPerKm % 60,
        }));
        break;
      }
      case "time":
        break;
      case "distance":
        break;
    }
  }, [distance, lockedSetting, time]);

  const handlePaceChange = React.useCallback(
    (pace: MinutesSeconds) => {
      setPace(pace);
      handleConversion();
    },
    [handleConversion]
  );

  const handleTimeChange = React.useCallback(
    (time: HoursMinutesSeconds) => {
      setTime(time);
      handleConversion();
    },
    [handleConversion]
  );

  const handleDistanceChange = React.useCallback(
    (distance: number) => {
      setDistance(distance);
      handleConversion();
    },
    [handleConversion]
  );

  const makeLockedSettingChangeHandler = React.useCallback(
    (setting: Setting) => () => {
      setLockedSetting(setting);
    },
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
          <TimeInput type="mm:ss" value={pace} onChange={handlePaceChange} disabled={lockedSetting === "pace"} />
        </SettingSelectorButton>
        <SettingSelectorButton
          disabled={lockedSetting === "time"}
          onClick={makeLockedSettingChangeHandler("time")}
        >
          <span className="text-xl">Time</span>
          <TimeInput type="hh:mm:ss" value={time} onChange={handleTimeChange} disabled={lockedSetting === "time"} />
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
