import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Alert,
    AlertTitle
} from '@mui/material';
import {
    Speed as SpeedIcon,
    Security as SecurityIcon,
    Memory as MemoryIcon,
    Tab as TabIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

interface PerformanceInfoDialogProps {
    open: boolean;
    onClose: () => void;
}

const PerformanceInfoDialog: React.FC<PerformanceInfoDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { maxHeight: '80vh' }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h6" component="span">
                    Why is processing slow? What you should know
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Typography variant="body1" paragraph>
                    Our video converter runs entirely in your browser using advanced web technologies.
                    Here's everything you need to know about performance and privacy:
                </Typography>

                <Box mb={3}>
                    <Typography variant="h6" gutterBottom color="info">
                        <SecurityIcon color="info" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Privacy & Security
                    </Typography>
                    <List dense>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <SecurityIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="100% Local Processing"
                                secondary="Your files never leave your device - everything happens in your browser"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <SecurityIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="No File Uploads"
                                secondary="We don't store, access, or transmit your files to any servers"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <SecurityIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Privacy Policy"
                                secondary="Check our privacy policy for complete details about data handling"
                            />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mb={3}>
                    <Typography variant="h6" gutterBottom color="info">
                        <MemoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Performance Factors
                    </Typography>
                    <List dense>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <MemoryIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Your System Performance"
                                secondary="Processing speed depends on your CPU, RAM, and browser performance"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <SpeedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="File Size & Quality"
                                secondary="Larger files and higher quality settings take more time to process"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                                <TabIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Browser Resource Sharing"
                                secondary="Multiple tabs and other applications can affect processing speed"
                            />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mb={2}>
                    <Typography variant="h6" gutterBottom color="info">
                        Tips for Better Performance
                    </Typography>
                    <List dense>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText
                                primary="• Close unnecessary browser tabs and applications"
                                secondary="Free up system resources for faster processing"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText
                                primary="• Use a dedicated browser window"
                                secondary="Minimize resource sharing with other tabs"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText
                                primary="• Consider lower quality settings for faster conversion"
                                secondary="Adjust CRF, preset, and resolution settings if speed is priority"
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <ListItemText
                                primary="• Ensure stable power supply on laptops"
                                secondary="Processing can be slower when running on battery"
                            />
                        </ListItem>
                    </List>
                </Box>
                <Alert icon={false} severity="info">
                    <AlertTitle><Typography variant='subtitle1' fontWeight={600}>The Bottom Line:</Typography></AlertTitle>
                    While processing might seem slow compared to server-based solutions,
                    the trade-off is complete privacy and security. Your sensitive files stay on your device,
                    and you have full control over the conversion process.
                </Alert>
            </DialogContent>

            <DialogActions>
                <Button color='info' onClick={onClose} variant="contained" startIcon={<CloseIcon />}>
                    Got it
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PerformanceInfoDialog;
