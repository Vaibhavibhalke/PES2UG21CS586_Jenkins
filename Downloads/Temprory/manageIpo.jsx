import React, { useState } from 'react';
import {
    Box,
    Button,
    Drawer,
    Typography,
    TextField,
    Select,
    MenuItem,
    Paper,
    IconButton,
    Stack,
    Avatar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    InputAdornment,
    Divider,
    styled,
    Tabs,
    Tab
} from '@mui/material';
import {
    Search,
    Notifications,
    Dashboard,
    PieChart,
    Description,
    Settings,
    Api,
    AccountCircle,
    HelpOutline,
    CloudUpload,
    Delete,
    Info,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#F1F2F7',
    },
});

export default function IPODashboard() {
    const [status, setStatus] = useState('');
    const [issueType, setIssueType] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <StyledDrawer variant="permanent">
                    <Stack p={3} spacing={4}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 10 }} />
                            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#8F95C5' }}>
                                Bluestock Fintech
                            </Typography>
                        </Box>

                        <Stack spacing={3}>
                            <Box>
                                <Typography color="text.secondary" variant="caption" sx={{ px: 2, mb: 1, display: 'block' }}>
                                    MENU
                                </Typography>
                                <List disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{color:'#9296C5'}}>
                                            <Dashboard fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                    <ListItemButton selected sx={{ bgcolor: 'primary.lighter' }}>
                                        <ListItemIcon sx={{color:'#9296C5'}}>
                                            <PieChart fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Manage IPO"/>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon sx={{color:'#9296C5'}}>
                                            <Description fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="IPO Subscription" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon sx={{color:'#9296C5'}}>
                                            <Description fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="IPO Allotment" />
                                    </ListItemButton>
                                </List>
                            </Box>

                            <Box>
                                <Typography color="text.secondary" variant="caption" sx={{ px: 2, mb: 1, display: 'block' }}>
                                    OTHER
                                </Typography>
                                <List disablePadding>
                                    {[
                                        { icon: <Settings fontSize="small" />, text: 'Settings' },
                                        { icon: <Api fontSize="small" />, text: 'API Manager' },
                                        { icon: <AccountCircle fontSize="small" />, text: 'Accounts' },
                                        { icon: <HelpOutline fontSize="small" />, text: 'Help' },
                                    ].map((item, index) => (
                                        <ListItemButton key={index}>
                                            <ListItemIcon sx={{color:'#9296C5'}}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                        </Stack>
                    </Stack>
                </StyledDrawer>

                <Box component="main" sx={{ flexGrow: 1 }}>
                    {/* Header */}
                    <Paper elevation={0} sx={{ borderRadius: 0 }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ px: 3, height: 64, borderBottom: 1, borderColor: "divider" }}
                        >
                            <TextField
                                size="small"
                                placeholder="Search..."
                                sx={{ width: 600, backgroundColor: '#F1F2F7' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar src="https://via.placeholder.com/32" sx={{ width: 32, height: 32 }} />
                                    <Box textAlign="right">
                                        <Typography variant="subtitle2">Hi, Vinod!</Typography>
                                    </Box>
                                </Stack>
                                <IconButton size="small" sx={{ position: 'relative' }}>
                                    <Notifications />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            height: 16,
                                            width: 16,
                                            borderRadius: '50%',
                                            bgcolor: 'error.main',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        2
                                    </Box>
                                </IconButton>

                            </Stack>
                        </Stack>
                    </Paper>

                    <Box sx={{ p: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                            <Box>
                                <Typography variant="h5" fontWeight={600} gutterBottom>
                                    Upcoming IPO Information
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Manage your IPO Details
                                </Typography>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained">Register</Button>
                                <Button variant="outlined">Cancel</Button>
                            </Stack>
                        </Stack>
                        <Stack spacing={3} direction="row">
                            <Stack sx={{ maxWidth: '20%' }}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={0}
                                    sx={{
                                        "& .Mui-selected": { backgroundColor: "#E5ECFC",borderRadius:2 }, // Custom color for selected tab
                                    }}
                                >
                                    <Tab label="IPO Information" icon={<Info sx={{fontSize:"14px"}}/>} iconPosition="start" sx={{fontSize:"10px"}}/>
                                    <Tab label="IPO Info" icon={<Description sx={{fontSize:"14px"}}/>} iconPosition="start" sx={{fontSize:"10px"}}/>
                                </Tabs>
                            </Stack>
                            <Paper sx={{ p: 3, minWidth: '80%' }}>
                                <Stack spacing={3}>
                                    <Box sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 2 }}>
                                        <Typography variant="h6" gutterBottom>
                                            IPO Information
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Enter IPO Details
                                        </Typography>
                                    </Box>

                                    {/* Company Logo */}
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Company Logo
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar
                                                src="https://yt3.googleusercontent.com/oD7NO6ZJ1u_a9D64WjaJqDXrFvlbfpbgxMYMaw7zMKvyS03xg3ZGQW2olFkfoi4c6n0V8nmD=s900-c-k-c0x00ffffff-no-rj"
                                                variant="rounded"
                                                sx={{ width: 64, height: 64 }}
                                            />
                                            <Stack direction="row" spacing={1}>
                                                <Button startIcon={<CloudUpload />} variant="outlined" size="small">
                                                    Upload Logo
                                                </Button>
                                                <Button startIcon={<Delete />} variant="outlined" size="small">
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Box>

                                    {/* Form Grid */}
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                            gap: 3,
                                        }}
                                    >
                                        <TextField label="Company Name" defaultValue="Vodafone Idea" />
                                        <TextField label="Price Band" defaultValue="Not Issued" />
                                        <TextField label="Open" defaultValue="Not Issued" />
                                        <TextField label="Close" defaultValue="Not Issued" />
                                        <TextField label="Issue Size" defaultValue="2300 Cr." />
                                        <Select
                                            value={issueType}
                                            onChange={(e) => setIssueType(e.target.value)}
                                            displayEmpty
                                            label="Issue Type"
                                        >
                                            <MenuItem value="">Select type</MenuItem>
                                            <MenuItem value="book-building">Book Building</MenuItem>
                                            <MenuItem value="fixed-price">Fixed Price</MenuItem>
                                        </Select>
                                        <TextField label="Listing Date" defaultValue="Not Issued" />
                                        <Select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            displayEmpty
                                            label="Status"
                                        >
                                            <MenuItem value="">Select status</MenuItem>
                                            <MenuItem value="upcoming">Upcoming</MenuItem>
                                            <MenuItem value="open">Open</MenuItem>
                                            <MenuItem value="closed">Closed</MenuItem>
                                            <MenuItem value="listed">Listed</MenuItem>
                                        </Select>
                                    </Box>

                                    <Divider />

                                    {/* New Listed IPO Details */}
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                            NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                gap: 3,
                                            }}
                                        >
                                            <TextField label="IPO PRICE" defaultValue="₹ 383" />
                                            <TextField label="LISTING PRICE" defaultValue="₹ 435" />
                                            <TextField label="LISTING GAIN" defaultValue="13.58 %" />
                                            <TextField label="LISTING DATE" defaultValue="2024-05-30" />
                                            <TextField label="CMP" defaultValue="₹410" />
                                            <TextField label="CURRENT RETURN" defaultValue="7.05 %" />
                                            <TextField label="RHP" placeholder="Enter RHP PDF Link" />
                                            <TextField label="DRHP" placeholder="Enter DRHP PDF Link" />
                                        </Box>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
