import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import SimpleCalendar from './calender';

const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ marginTop: 4 }}>
            <SimpleCalendar />
        </Box>
        <Box sx={{ width: '100%', backgroundColor: 'grey.100', marginTop: 2 }}>
            <List>
                <ListItem button key="オプション1">
                     <ListItemText primary="オプション1" />
                </ListItem>
                <ListItem button key="オプション2">
                    <ListItemText primary="オプション2" />
                </ListItem>
                <ListItem button key="オプション3">
                    <ListItemText primary="オプション3" />
                </ListItem>
            </List>
        </Box>
    </Box>
  );
};

export default Sidebar;
