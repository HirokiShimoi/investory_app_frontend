import React from 'react';
import ListItem from '@mui/material/ListItem';
import { Box, List, ListItemButton, ListItemText,Divider,ListItemIcon } from '@mui/material';
import ShopIcon from '@mui/icons-material/Shop';
import SimpleCalendar from './calender';
import { useNavigate } from 'react-router';
import News from './Notification';


const Sidebar = () => {
const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ marginTop: 4 }}>
            <SimpleCalendar />
        </Box>
        <Box sx={{ width: '100%', backgroundColor: 'grey.100', marginTop: 2 }}>
            <List>
                <ListItemButton key="酒やの鍵本MakeShop" onClick={() => navigate('/path-for-makeshop')} sx={{ paddingBottom: 2 }}>
                    <ListItemIcon>
                        <ShopIcon />
                    </ListItemIcon>
                     <ListItemText primary="酒やの鍵本MakeShop" />
                </ListItemButton>
                <Divider />
                <ListItemButton key="酒やの鍵本B-CART" onClick={() => navigate('/path-for-bcart')} sx={{ paddingBottom: 2 }}>
                    <ListItemIcon>
                        <ShopIcon />
                    </ListItemIcon>
                    <ListItemText primary="酒やの鍵本B-CART" />
                </ListItemButton>
                <Divider />
                <ListItemButton key="TempViser" onClick={() => navigate('/path-for-tempviser')} sx={{ paddingBottom: 2 }}>
                    <ListItemIcon>
                        <ShopIcon />
                    </ListItemIcon>
                    <ListItemText primary="TempViser" />
                </ListItemButton>
            </List>
        </Box>
        <Box sx={{  width: '100%',  maxHeight: '200px', overflowY: 'auto', padding: 1, marginTop: 2}}>
            <News date="2023-09-23" title="新商品のお知らせ" details="新しい商品が店舗に追加されました。詳しくはこちらをクリックしてください。" />
            <News date="2023-09-23" title="新商品のお知らせ" details="新しい商品が店舗に追加されました。詳しくはこちらをクリックしてください。" />
            <News date="2023-09-23" title="新商品のお知らせ" details="新しい商品が店舗に追加されました。詳しくはこちらをクリックしてください。" />
            <News date="2023-09-23" title="新商品のお知らせ" details="新しい商品が店舗に追加されました。詳しくはこちらをクリックしてください。" />
        </Box>
    </Box>
  );
};

export default Sidebar;
