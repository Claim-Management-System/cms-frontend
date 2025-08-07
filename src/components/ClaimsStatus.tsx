import React from 'react';
import { Box, Tabs, Tab, Chip } from '@mui/material';
import type { ClaimCounts } from '../types';

interface ClaimsStatusProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  counts: ClaimCounts
}

const STATUS_MAP = ['total', 'approved', 'rejected', 'pending'];

function ClaimsStatus({ currentStatus, onStatusChange, counts }: ClaimsStatusProps) {

  const renderTabLabel = (label: string, count: number) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'LLCirc', fontWeight: '100' }}>
      <Chip
        label={count}
        size="small"
        sx={{ borderRadius: '4px', fontFamily: 'LLCirc', fontWeight: '100' }}
      />
      {label}
    </Box>
  );

  const tabConfig = [
    { label: 'Total requests', count: counts.total },
    { label: 'Accepted requests', count: counts.accepted },
    { label: 'Denied requests', count: counts.denied },
    { label: 'Pending requests', count: counts.pending },
  ];

  const handleTabChange = (_event: React.ChangeEvent<unknown>, newIndex: number) => {
    onStatusChange(STATUS_MAP[newIndex]);
  };

  return (
    <Tabs
      value={STATUS_MAP.indexOf(currentStatus)}
      onChange={handleTabChange}
      variant="fullWidth"
      TabIndicatorProps={{ style: { backgroundColor: '#1CA8DD' } }}
      sx={{
        '& .Mui-selected': { color: '#1CA8DD' },
        '& .Mui-selected .MuiChip-root': {
          backgroundColor: '#1CA8DD',
          color: 'white',
        },
      }}
    >
      {tabConfig.map((tab) => (
        <Tab
          key={tab.label}
          label={renderTabLabel(tab.label, tab.count)}
        />
      ))}
    </Tabs>
  );
}

export default ClaimsStatus;