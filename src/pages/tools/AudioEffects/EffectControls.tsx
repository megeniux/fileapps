import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';

type Props = {
    speed: number;
    onSpeedChange: (v: number) => void;
    pitch: number;
    onPitchChange: (v: number) => void;
    volume: number;
    onVolumeChange: (v: number) => void;
    fadeIn: number;
    onFadeInChange: (v: number) => void;
    fadeOut: number;
    onFadeOutChange: (v: number) => void;
    normalize: boolean;
    onNormalizeChange: (v: boolean) => void;
    isProcessing: boolean;
    duration: number;
    eqGains?: number[];
    setEqGains?: (g: number[]) => void;
};

export default function EffectControls({ speed, onSpeedChange, pitch, onPitchChange, volume, onVolumeChange, fadeIn, onFadeInChange, fadeOut, onFadeOutChange, normalize, onNormalizeChange, isProcessing, duration }: Props) {
    const EQ_FREQS = [60, 250, 1000, 4000, 10000];
    // ...existing code...
    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Speed <small>({speed}x)</small>
                </Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onSpeedChange(Number((speed - 0.01).toFixed(2)))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider value={speed} min={-3} max={3} step={0.01} onChange={(_, v) => typeof v === 'number' && onSpeedChange(v)} valueLabelDisplay="auto" disabled={isProcessing} sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => onSpeedChange(Number((speed + 0.01).toFixed(2)))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Pitch <small>({pitch} semitones)</small>
                </Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onPitchChange(Math.max(-12, pitch - 1))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider value={pitch} min={-12} max={12} step={1} onChange={(_, v) => typeof v === 'number' && onPitchChange(v)} valueLabelDisplay="auto" disabled={isProcessing} sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => onPitchChange(Math.min(12, pitch + 1))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Volume</Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onVolumeChange(Number((volume - 0.01).toFixed(2)))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider value={volume} min={0} max={3} step={0.01} onChange={(_, v) => typeof v === 'number' && onVolumeChange(v)} valueLabelDisplay="auto" disabled={isProcessing} sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => onVolumeChange(Number((volume + 0.01).toFixed(2)))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Fade In <small>({fadeIn}s)</small></Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onFadeInChange(Number((Math.max(0, fadeIn - 0.5)).toFixed(1)))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider value={fadeIn} min={0} max={Math.floor(duration)} step={0.1} onChange={(_, v) => typeof v === 'number' && onFadeInChange(v)} valueLabelDisplay="auto" disabled={isProcessing} sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => onFadeInChange(Number((Math.min(Math.floor(duration), fadeIn + 0.5)).toFixed(1)))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Fade Out <small>({fadeOut}s)</small></Typography>
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onFadeOutChange(Number((Math.max(0, fadeOut - 0.5)).toFixed(1)))} disabled={isProcessing}><RemoveIcon /></IconButton>
                    <Slider value={fadeOut} min={0} max={Math.floor(duration)} step={0.1} onChange={(_, v) => typeof v === 'number' && onFadeOutChange(v)} valueLabelDisplay="auto" disabled={isProcessing} sx={{ mx: 1, flex: 1 }} />
                    <IconButton onClick={() => onFadeOutChange(Number((Math.min(Math.floor(duration), fadeOut + 0.5)).toFixed(1)))} disabled={isProcessing}><AddIcon /></IconButton>
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Normalize</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <input type="checkbox" checked={normalize} onChange={(e) => onNormalizeChange(e.target.checked)} disabled={isProcessing} />
                    <Typography variant="caption" color="text.secondary">Auto volume normalization</Typography>
                </Box>
            </Grid>

            {/* Equalizer band sliders (display only if props provided) */}
            {typeof (arguments[0] as any)?.eqGains !== 'undefined' && (
                <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle2" gutterBottom>Equalizer</Typography>
                    <Box display="flex" gap={2} justifyContent="center" alignItems="center" flexWrap="wrap">
                        {EQ_FREQS.map((f, i) => (
                            <Box key={f} sx={{ width: 60 }} display="flex" alignItems="center" flexDirection="column">
                                <Slider value={(arguments[0] as any).eqGains[i]} min={-12} max={12} step={0.5} onChange={(_, v) => {
                                    if (typeof v === 'number' && (arguments[0] as any).setEqGains) {
                                        const arr = [...(arguments[0] as any).eqGains]; arr[i] = v; (arguments[0] as any).setEqGains(arr);
                                    }
                                }} valueLabelDisplay="auto" disabled={isProcessing} orientation="vertical" sx={{ height: 100 }} />
                                <Typography variant="caption" mt={1}>{f / 1000}KHz</Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}
