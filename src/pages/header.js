import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';

export default function ButtonAppBar() {

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate();
    const { login, user,logout} = useContext(AuthContext);

    const handlelogout = () => {
        if (window.confirm("ログアウトしますか？")) {
            logout();
            handleNavigation('');
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
        setDrawerOpen(open);
    }

    const handleNavigation = (route) => {
        toggleDrawer(false);
        navigate(route)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                        <List>
                            <ListItemButton onClick={() => handleNavigation('/admin/')}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                TOPPAGE
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/inventory_update/')}>
                                <ListItemIcon>
                                    <UpdateIcon />
                                </ListItemIcon>
                                在庫データ更新
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/product_update/')}>
                                <ListItemIcon>
                                    <UpdateIcon />
                                </ListItemIcon>
                                商品データ更新
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/search/')}>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                商品検索＆更新
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/under_orderpoint/')}>
                                <ListItemIcon>
                                    <ProductionQuantityLimitsIcon />
                                </ListItemIcon>
                                在庫が少ないアイテム
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/checked_item/')}>
                                <ListItemIcon>
                                    <ProductionQuantityLimitsIcon />
                                </ListItemIcon>
                                チェックしたアイテム
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => handleNavigation('/todo/')}>
                                <ListItemIcon>
                                    <ListAltIcon />
                                </ListItemIcon> 
                                発注TODO
                            </ListItemButton>
                            <Divider />
                        </List>
                    </Drawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      酒やの鍵本
                    </Typography>
                    {user ? (
                        <Button color="inherit" onClick={handlelogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => handleNavigation('/')}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}