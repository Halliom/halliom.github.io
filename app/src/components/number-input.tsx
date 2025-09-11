import React from "react";

export const NumberInput: React.FC<{
  value: number;
  disabled?: boolean
  allowDecimals?: boolean;
  onChange: (value: number) => void;
}> = ({ value, disabled, allowDecimals = false, onChange }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = 0;
      if (allowDecimals) {
        newValue = Number(event.target.value);
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
      disabled={disabled}
      onChange={handleChange}
    />
  );
};
