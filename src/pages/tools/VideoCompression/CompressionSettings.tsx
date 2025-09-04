import { useState } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Utils
import { estimateSizeMB } from '../../../helpers';
import { presetValues, CRF_MIN, CRF_MAX } from './constants';

interface CompressionSettingsProps {
  crf: number;
  preset: string;
  totalDuration: number;
  isProcessing: boolean;
  onCrfChange: (value: number) => void;
  onPresetChange: (preset: string) => void;
}

export default function CompressionSettings({
  crf,
  preset,
  totalDuration,
  isProcessing,
  onCrfChange,
  onPresetChange
}: CompressionSettingsProps) {
  const [crfAnchor, setCrfAnchor] = useState<null | HTMLElement>(null);
  const [presetAnchor, setPresetAnchor] = useState<null | HTMLElement>(null);

  const handleCrfInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setCrfAnchor(event.currentTarget);
  };

  const handleCrfInfoClose = () => {
    setCrfAnchor(null);
  };

  const handlePresetInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setPresetAnchor(event.currentTarget);
  };

  const handlePresetInfoClose = () => {
    setPresetAnchor(null);
  };

  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center">
              Quality:
              <IconButton
                sx={{ ml: 0.5 }}
                onClick={handleCrfInfoClick}
                aria-label="CRF info"
              >
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <small> {crf} CRF / Est. size: {estimateSizeMB(totalDuration, crf)} MB </small>
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton 
              onClick={() => onCrfChange(Math.max(CRF_MIN, crf - 1))} 
              disabled={isProcessing}
            >
              <RemoveIcon />
            </IconButton>
            <Slider 
              min={CRF_MIN} 
              max={CRF_MAX} 
              step={1} 
              value={crf} 
              onChange={(_, val) => onCrfChange(val as number)} 
              valueLabelDisplay="auto" 
              sx={{ mx: 1, flex: 1 }} 
            />
            <IconButton 
              onClick={() => onCrfChange(Math.min(CRF_MAX, crf + 1))} 
              disabled={isProcessing}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box display="flex" alignItems="center">
              Preset:
              <IconButton
                sx={{ ml: 0.5 }}
                onClick={handlePresetInfoClick}
                aria-label="Preset info"
              >
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <small>{preset}</small>
          </Typography>
          <Slider 
            min={0} 
            max={8} 
            step={1} 
            value={presetValues.indexOf(preset)} 
            onChange={(_, val) => onPresetChange(presetValues[val as number])} 
            valueLabelDisplay="off" 
          />
        </Grid>
      </Grid>

      {/* Compression Info Popover */}
      <Popover
        open={Boolean(crfAnchor)}
        anchorEl={crfAnchor}
        onClose={handleCrfInfoClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Typography variant="body2" px={2} py={1}>
          <b>CRF (Constant Rate Factor):</b><br />
          Lower CRF means higher quality and larger file size.<br />
          Higher CRF reduces file size but may make the video look blurry.<br />
          Typical values: 18 (high quality) to 36 (low quality).
        </Typography>
      </Popover>

      {/* Preset Info Popover */}
      <Popover
        open={Boolean(presetAnchor)}
        anchorEl={presetAnchor}
        onClose={handlePresetInfoClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Typography variant="body2" px={2} py={1}>
          <b>Preset:</b><br />
          Controls compression speed vs. efficiency.<br />
          Slower presets take more time but produce smaller files.<br />
          Faster presets are quicker but result in larger files.<br />
          Choose "slower" for best compression, "ultrafast" for fastest processing.
        </Typography>
      </Popover>
    </>
  );
}
