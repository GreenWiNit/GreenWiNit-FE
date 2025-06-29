import BottomNavigationMui from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useState } from 'react'

function BottomNavigation() {
  const [value, setValue] = useState(0)

  return (
    <BottomNavigationMui
      showLabels
      value={value}
      onChange={(_event, newValue) => {
        setValue(newValue)
      }}
      sx={{
        '.Mui-selected': { color: 'black' },
        '& .MuiBottomNavigationAction-label': {
          fontSize: '0.875rem',
          marginTop: '0.25rem',
        },
      }}
    >
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/home.svg" />}
        label="홈"
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/share.svg" />}
        label="정보공유"
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/shop.svg" />}
        label="포인트상점"
      />
      <BottomNavigationAction
        sx={{ paddingTop: '4px' }}
        icon={<img src="/icons/person.svg" />}
        label="마이페이지"
      />
    </BottomNavigationMui>
  )
}

export default BottomNavigation
