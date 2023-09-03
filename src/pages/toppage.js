import React from 'react';
import Header from './header';  // 作成済みのヘッダーコンポーネント
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const styles = {
    card: {
      width: 'px',
      height: '400px',
    },
  };

function TopPage() {
  return (
    <div>
      <Header />
      <Container>
        <Grid container spacing={3}>
          {/* 上段のカード 3枚 */}
          <Grid item xs={4}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5">弥生在庫CSV整形</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">CSVデータをインポート</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">発注点を下回る在庫</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* 下段のカード 2枚 */}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">商品データの編集</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">発注コメント</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default TopPage;
