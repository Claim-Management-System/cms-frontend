import { Box, CircularProgress } from '@mui/material';
import logo from '../../assets/logo.svg'
import './LoadingScreen.css'

export default function ContentLoader() {
  return (
    <Box className='main-container'>
      <Box className='loader-content'>
        <CircularProgress
          variant="determinate"
          className='spinner-track'
          size={150}
          thickness={2}
          value={100}
        />

        <CircularProgress
          disableShrink
          className='spinner-mover'
          size={150}
          thickness={2}
        />
        
        <Box className='logo-container' >
          <img src={logo} alt="Company Logo" />
        </Box>
      </Box>
    </Box>
  );
}
