import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router';

const StyledCard = styled(Card)({
    width: '90%',
    paddingBottom: '85%',
    position: 'relative',
    marginBottom: '30px',
    marginTop: '60px',
    backgroundColor: '#f5f5f5',

    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform .3s',
      backgroundColor: '#1976d2',
      color: '#FFF'
    },
    '&:active': {
      transform: 'scale(.95)',
      transition: 'transform .1s',
    },
  });
  

const contentStyle = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // 内容を垂直方向に中央に
  alignItems: 'center', // 内容を水平方向に中央に
};

const gridContainerStyle = {marginBottom: '30px',marginTop: '30px'}

const TopPage = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
      <div style={{ display: 'flex', height:'auto' }}>
            <Sidebar />
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="space-around">
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/inventory_update/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">在庫データを更新</Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/inventory_update/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">商品データを更新</Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/search/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">商品マスタの検索</Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent="space-around">
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/under_orderpoint/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">発注点を下回る商品 </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/checked_item/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">Check済みアイテム </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={4} style={{ width: '100%' }}>
                        <StyledCard onClick={() => handleNavigation('/todo/')}>
                            <CardContent style={contentStyle}>
                                <Typography variant="h5">発注TODO </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>
            </Container>
      </div>
    );
  };
  
export default TopPage;
