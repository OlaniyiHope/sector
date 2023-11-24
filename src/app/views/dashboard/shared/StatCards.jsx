import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Breadcrumb } from 'app/components';
import { Small, H3 } from 'app/components/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  return (
    <div>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Quick actions' }]} />
      </Box>
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        <Grid item xs={4} md={4}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="AccountBalanceWalletIcon"></Icon>
              <Icon>account_balance</Icon>
              <h5>
                <a style={{ fontSize: '15px', color: 'black' }} href="">
                  Audit
                </a>
              </h5>
            </ContentBox>
          </StyledCard>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon>account_balance_wallet</Icon>
              <h5>
                <a style={{ fontSize: '15px', color: 'black' }} href="">
                  Journal Entries
                </a>
              </h5>
            </ContentBox>
          </StyledCard>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon>monetization_on</Icon>
              <h5>
                <a style={{ fontSize: '15px', color: 'black' }} href="">
                  Document Guidiance
                </a>
              </h5>
            </ContentBox>
          </StyledCard>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        <Grid item xs={4} md={4}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="AccountBalanceWalletIcon"></Icon>
              <Icon>account_balance</Icon>
              <h5>
                <a style={{ fontSize: '15px', color: 'black' }} href="">
                  {' '}
                  Profit & Loss
                </a>
              </h5>
            </ContentBox>
          </StyledCard>
        </Grid>
        <Grid item xs={4} md={4}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon>account_balance_wallet</Icon>
              <h5>
                <a style={{ fontSize: '15px', color: 'black' }} href="">
                  Others
                </a>
              </h5>
            </ContentBox>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatCards;
