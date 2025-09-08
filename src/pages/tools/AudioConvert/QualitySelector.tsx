import { Select, MenuItem, Typography } from '@mui/material';
import { outputFormats } from './constants';

type Props = {
  outputFormat: string;
  value: number;
  onChange: (idx: number) => void;
  disabled?: boolean;
};

export default function QualitySelector({ outputFormat, value, onChange, disabled }: Props) {
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>Quality</Typography>
      <Select fullWidth value={value} onChange={(e) => onChange(Number(e.target.value))} disabled={disabled}>
        {outputFormats
          .filter(f => f.value === outputFormat)
          .map((option) => (
            <MenuItem key={outputFormats.indexOf(option)} value={outputFormats.indexOf(option)}>
              {option.label.split('(')[1]?.replace(')', '') || option.label}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
}
