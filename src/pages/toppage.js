import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const cardStyle = {
  width: '90%',
  paddingBottom: '90%', // アスペクト比を維持
  position: 'relative', // CardContentを中央に配置するため
};

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

const TopPage = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        上部のカード
      </Typography>
      <Grid container spacing={3} justifyContent="space-around">
        {[1, 2, 3].map((item) => (
          <Grid item xs={4} key={item} style={{ width: '100%' }}>
            <Card style={cardStyle}>
              <CardContent style={contentStyle}>
                <Typography variant="h5">上のカード {item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
        下部のカード
      </Typography>
      <Grid container spacing={3} justifyContent="space-around">
        {[1, 2, 3].map((item) => (
          <Grid item xs={4} key={item} style={{ width: '100%' }}>
            <Card style={cardStyle}>
              <CardContent style={contentStyle}>
                <Typography variant="h5">下のカード {item}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopPage;
