import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

const Sidebar = () => {
  return (

        <Box sx={{ width: '30%', backgroundColor: 'grey.100'}}>
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
  );
};

export default Sidebar;
