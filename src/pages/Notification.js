import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info'; 

const NewsItem = ({ date, title, details }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <InfoIcon color="primary" />
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {details}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default NewsItem;
