import { Box, Tabs, Tab, Chip } from '@mui/material'

interface ClaimsStatusProps {
    currentStatus: string;
    onStatusChange: (newStatus: string) => void;
}

const STATUS_MAP = ['total', 'accepted', 'denied', 'pending'];

export default function ClaimsStatus({ currentStatus, onStatusChange }: ClaimsStatusProps) {
    const counts: { [key: string]: number } = { total: 10, accepted: 40, denied: 20, pending: 30 };

    const renderTabLabel = (label: string, count: number) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
                label={count}
                size="small"
                sx={{ borderRadius: '4px' }}
            />
            {label}
        </Box>
    );

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        onStatusChange(STATUS_MAP[newIndex]);
    };

    return (
        <Tabs
            value={STATUS_MAP.indexOf(currentStatus)}
            onChange={handleTabChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: '#1CA8DD' } }}
            sx={{ '& .Mui-selected': { color: '#1CA8DD' } }}
        >
            <Tab label={renderTabLabel('Total requests', counts.total)} />
            <Tab label={renderTabLabel('Accepted requests', counts.accepted)} />
            <Tab label={renderTabLabel('Denied requests', counts.denied)} />
            <Tab label={renderTabLabel('Pending requests', counts.pending)} />
        </Tabs>
    )
}