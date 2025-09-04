// MUI Components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// MUI Icons
import ImageIcon from '@mui/icons-material/Image';
import CollectionsIcon from '@mui/icons-material/Collections';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';

interface ModeTabsProps {
  mode: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  show: boolean
}

export default function ModeTabs({ mode, onChange, show }: ModeTabsProps) {
  if (!show) return null;

  return (
    <Tabs
      value={mode}
      onChange={onChange}
      variant="fullWidth"
      sx={{ mb: 2 }}
    >
      <Tab icon={<ImageIcon fontSize="small" />} label="Single Frame" />
      <Tab icon={<CollectionsIcon fontSize="small" />} label="Scrub" />
      <Tab icon={<FilterFramesIcon fontSize="small" />} label="Frames" />
    </Tabs>
  );
}
