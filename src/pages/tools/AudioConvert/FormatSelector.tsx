import { Select, MenuItem, Typography } from '@mui/material';
import { outputFormats } from './constants';

type Props = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

export default function FormatSelector({ value, onChange, disabled }: Props) {
  return (
    <div>
      <Typography variant="subtitle2" gutterBottom>Output Format</Typography>
      <Select fullWidth value={value} onChange={(e) => onChange(e.target.value as string)} disabled={disabled}>
        {Array.from(new Set(outputFormats.map(f => f.value))).map((format) => (
          <MenuItem key={format} value={format}>
            {format.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
