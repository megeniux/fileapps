import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

type Props = {
  files: File[];
  isProcessing: boolean;
  onRemove: (idx: number) => void;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
  onReplace: (idx: number) => void;
};

export default function AudioList({ files, isProcessing, onRemove, onMoveUp, onMoveDown, onReplace }: Props) {
  // Memoize audio preview URLs to avoid recreating on every render
  const audioPreviewUrls = React.useMemo(() => files.map(f => URL.createObjectURL(f)), [files]);

  // Cleanup URLs on unmount or when files change
  React.useEffect(() => {
    return () => {
      audioPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [audioPreviewUrls]);

  if (files.length === 0) return null;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Preview</TableCell>
            <TableCell>Filename</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, idx) => (
            <TableRow key={`${file.name}-${idx}`}>
              <TableCell>
                <audio src={audioPreviewUrls[idx]} preload="metadata" controls style={{ width: 230 }} />
              </TableCell>
              <TableCell>
                <Typography color="text.secondary" variant="caption">{file.name}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                <IconButton color='primary' onClick={() => onMoveUp(idx)} title="Move up" disabled={idx === 0 || isProcessing}>
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton color='secondary' onClick={() => onMoveDown(idx)} title="Move down" disabled={idx === files.length - 1 || isProcessing}>
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton color='warning' onClick={() => onReplace(idx)} title="Replace audio" disabled={isProcessing}>
                  <SwapHorizIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onRemove(idx)} title="Delete audio" disabled={isProcessing}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
