import { useState } from 'react';
import { Box, Tabs, Tab, Chip } from '@mui/material'

const STATUS_MAP = ['total', 'accepted', 'denied', 'pending'];

function ClaimsStatus() {
    const [currentStatus, setCurrentStatus] = useState<string>('total');
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
        handleStatusChange(STATUS_MAP[newIndex]);
    };

    const handleStatusChange = (newStatus: string) => {
        setCurrentStatus(newStatus);
        // fetchClaims(newStatus, 1); // Reset to page 1 on status change
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

export default ClaimsStatus