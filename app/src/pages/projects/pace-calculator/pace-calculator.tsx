import React from "react";
import { Title } from "../../../components/title";
import { TimeInput, type HoursMinutesSeconds, type MinutesSeconds } from "../../../components/time-input";

type Setting = 'pace' | 'distance' | 'time'

type Operation = {
  setting: Setting
  value: number
}

export const PaceCalculatorPage: React.FC = () => {
  const [operationsStack, setOperationsStack] = React.useState<Operation[]>([])

  const handlePaceChange = React.useCallback((pace: MinutesSeconds) => {
    console.log('pace changed', pace)
  }, [])
  
  const handleTimeChange = React.useCallback((time: HoursMinutesSeconds) => {
    console.log('time changed', time)
  }, [])

  return (
    <>
      <Title>Pace calculator</Title>
      
      <div className="flex flex-row">
        <TimeInput type='mm:ss' value={{ type: 'mm:ss', minutes: 0, seconds: 0 }} onChange={handlePaceChange} />
        {/* <TimeInput type='hh:mm:ss' value={{ type: 'hh:mm:ss', hours: 0, minutes: 0, seconds: 0 }} onChange={handlePaceChange} /> */}
      </div>
    </>
  );
};
