import React from "react";
import { Title } from "../../../components/title";
import {
  TimeInput,
  type HoursMinutesSeconds,
  type MinutesSeconds,
} from "../../../components/time-input";
import { NumberInput } from "../../../components/number-input";
import { convertTimeToSeconds } from "../../../utils/time";

type Setting = "pace" | "distance" | "time";

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

  const [operations, setOperations] = React.useState<Setting[]>([]);

  const handleConversion = React.useCallback(
    (setting: Setting) => {
      switch (setting) {
        case "pace": {
          const seconds = convertTimeToSeconds(time);
          const secondsPerKm = seconds / distance;
          console.log({ time, seconds, secondsPerKm })
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
    },
    [distance, time]
  );

  const handleOperation = React.useCallback(
    (operation: Setting) => {
      let newOperations = [...operations];
      console.log('incoming', operation, newOperations, operations)
      if (
        operations.length === 0 ||
        operations[operations.length - 1] !== operation
      ) {
        if (operations.length > 1) {
          newOperations = [...operations.slice(1), operation];
        } else {
          newOperations = [...operations, operation];
        }
      }
      if (newOperations.length === 2) {
        const toChange = (["pace", "time", "distance"] as Setting[]).find(
          (otherOp) => !newOperations.includes(otherOp)
        );
        console.log('changes', newOperations, toChange)
        if (toChange) {
          handleConversion(toChange);
        }
      }
      setOperations(newOperations);
    },
    [handleConversion, operations]
  );

  const handlePaceChange = React.useCallback(
    (pace: MinutesSeconds) => {
      setPace(pace);
      handleOperation("pace");
    },
    [handleOperation]
  );

  const handleTimeChange = React.useCallback(
    (time: HoursMinutesSeconds) => {
      setTime(time);
      handleOperation("time");
    },
    [handleOperation]
  );

  const handleDistanceChange = React.useCallback(
    (distance: number) => {
      setDistance(distance);
      handleOperation("distance");
    },
    [handleOperation]
  );

  return (
    <>
      <Title>Pace calculator</Title>

      <div className="flex flex-row gap-4">
        <div>
          <span className="text-xl">Pace</span>
          <TimeInput type="mm:ss" value={pace} onChange={handlePaceChange} />
        </div>
        <div>
          <span className="text-xl">Time</span>
          <TimeInput type="hh:mm:ss" value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <span className="text-xl">Distance</span>
          <div>
            <NumberInput
              allowDecimals
              value={distance}
              onChange={handleDistanceChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
