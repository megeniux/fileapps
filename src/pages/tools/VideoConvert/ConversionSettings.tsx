import React from 'react';
import { outputFormats, presetValues, ratioOptions, CRF_KEEP, PRESET_KEEP } from './constants';
import { videoCodecs, audioCodecs } from './types';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Types
import type { SelectChangeEvent } from '@mui/material/Select';

interface ConversionSettingsProps {
  outputFormat: keyof typeof videoCodecs;
  videoCodec: string;
  audioCodec: string;
  width: string;
  height: string;
  fps: number | '';
  crf: number | typeof CRF_KEEP;
  preset: string | typeof PRESET_KEEP;
  audioBitrate: string;
  resolutionRatio: string;
  onFormatChange: (e: SelectChangeEvent) => void;
  onVideoCodecChange: (e: SelectChangeEvent) => void;
  onAudioCodecChange: (e: SelectChangeEvent) => void;
  onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFpsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCrfChange: (e: SelectChangeEvent<number | typeof CRF_KEEP>) => void;
  onPresetChange: (e: SelectChangeEvent) => void;
  onAudioBitrateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRatioChange: (e: SelectChangeEvent) => void;
  onCrfInfoClick: (event: React.MouseEvent<HTMLElement>) => void;
  onPresetInfoClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function ConversionSettings({
  outputFormat,
  videoCodec,
  audioCodec,
  width,
  height,
  fps,
  crf,
  preset,
  audioBitrate,
  resolutionRatio,
  onFormatChange,
  onVideoCodecChange,
  onAudioCodecChange,
  onWidthChange,
  onHeightChange,
  onFpsChange,
  onCrfChange,
  onPresetChange,
  onAudioBitrateChange,
  onRatioChange,
  onCrfInfoClick,
  onPresetInfoClick,
}: ConversionSettingsProps) {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Output Format:
        </Typography>
        <Select
          fullWidth
          value={outputFormat}
          onChange={onFormatChange}
        >
          {outputFormats.map(f => (
            <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
          ))}
        </Select>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">Resolution: (in Pixels)</Typography>
        <Box display="flex" alignItems="center" flex={1} gap={1}>
          <TextField
            type="number"
            value={width}
            onChange={onWidthChange}
            placeholder="Width"
            sx={{ flex: 1 }}
            disabled={false}
          />
          <Typography color="text.secondary">x</Typography>
          <TextField
            type="number"
            value={height}
            onChange={onHeightChange}
            placeholder="Height"
            sx={{ flex: 1 }}
            disabled={false}
          />
          <Select
            value={resolutionRatio}
            onChange={onRatioChange}
            sx={{ minWidth: 100 }}
          >
            {ratioOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </Box>
        {resolutionRatio !== 'custom' && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            Ratio locked: {ratioOptions.find(r => r.value === resolutionRatio)?.label}
          </Typography>
        )}
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">Video Codec:</Typography>
        <Select
          fullWidth
          value={videoCodec}
          onChange={onVideoCodecChange}
          disabled={videoCodecs[outputFormat].length === 0}
        >
          {videoCodecs[outputFormat].map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">Audio Codec:</Typography>
        <Select
          fullWidth
          value={audioCodec}
          onChange={onAudioCodecChange}
          disabled={audioCodecs[outputFormat].length === 0}
        >
          {audioCodecs[outputFormat].map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">Audio Bitrate:</Typography>
        <TextField
          fullWidth
          value={audioBitrate}
          onChange={onAudioBitrateChange}
          placeholder="e.g. 128k"
          disabled={audioCodecs[outputFormat].length === 0}
        />
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2">FPS:</Typography>
        <TextField
          fullWidth
          type="number"
          value={fps}
          onChange={onFpsChange}
          placeholder="e.g. 30"
        />
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center">
            Quality:
            <IconButton
              sx={{ ml: 0.5 }}
              onClick={onCrfInfoClick}
              aria-label="CRF info"
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <small>
            {crf === CRF_KEEP ? 'Keep as original' : `${crf} CRF`}
          </small>
        </Typography>
        <Select
          fullWidth
          value={crf}
          onChange={onCrfChange}
          sx={{ mb: 1 }}
        >
          <MenuItem value={CRF_KEEP}>Keep as original</MenuItem>
          {[...Array(19)].map((_, i) => {
            const val = 18 + i;
            return <MenuItem key={val} value={val}>{val} (CRF)</MenuItem>;
          })}
        </Select>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box display="flex" alignItems="center">
            Preset:
            <IconButton
              sx={{ ml: 0.5 }}
              onClick={onPresetInfoClick}
              aria-label="Preset info"
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <small>
            {preset === PRESET_KEEP ? 'Keep as original' : preset}
          </small>
        </Typography>
        <Select
          fullWidth
          value={preset}
          onChange={onPresetChange}
          sx={{ mb: 1 }}
        >
          <MenuItem value={PRESET_KEEP}>Keep as original</MenuItem>
          {presetValues.map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}
