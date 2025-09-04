import { useCallback } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import { videoCodecs, audioCodecs } from './types';
import { ratioOptions } from './constants';

interface UseSettingsManagerProps {
  resolutionRatio: string;
  width: string;
  setWidth: (width: string) => void;
  setHeight: (height: string) => void;
  setOutputFormat: (format: keyof typeof videoCodecs) => void;
  setVideoCodec: (codec: string) => void;
  setAudioCodec: (codec: string) => void;
  setResolutionRatio: (ratio: string) => void;
}

export function useSettingsManager({
  resolutionRatio,
  width,
  setWidth,
  setHeight,
  setOutputFormat,
  setVideoCodec,
  setAudioCodec,
  setResolutionRatio,
}: UseSettingsManagerProps) {

  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidth(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const w = parseInt(val, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [resolutionRatio, setWidth, setHeight]);

  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeight(val);
    const selected = ratioOptions.find(r => r.value === resolutionRatio);
    if (selected && selected.ratio && val) {
      const h = parseInt(val, 10);
      if (!isNaN(h)) {
        setWidth(String(Math.round(h * selected.ratio)));
      }
    }
  }, [resolutionRatio, width, setWidth, setHeight]);

  const handleRatioChange = useCallback((e: SelectChangeEvent) => {
    const val = e.target.value;
    setResolutionRatio(val);
    const selected = ratioOptions.find(r => r.value === val);
    if (selected && selected.ratio && width) {
      const w = parseInt(width, 10);
      if (!isNaN(w)) {
        setHeight(String(Math.round(w / selected.ratio)));
      }
    }
  }, [width, setResolutionRatio, setHeight]);

  const handleFormatChange = useCallback((e: SelectChangeEvent) => {
    const fmt = e.target.value as keyof typeof videoCodecs;
    setOutputFormat(fmt);
    setVideoCodec(videoCodecs[fmt][0] || '');
    setAudioCodec(audioCodecs[fmt][0] || '');
  }, [setOutputFormat, setVideoCodec, setAudioCodec]);

  return {
    handleWidthChange,
    handleHeightChange,
    handleRatioChange,
    handleFormatChange,
  };
}
