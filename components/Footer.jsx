// MUI Components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Container sx={{ py: 2 }} maxWidth="xxl">
            <Typography variant='subtitle1' color='GrayText' sx={{ textAlign: 'center' }}>
                Copyright © 2022 Manage.io, All rights reserved.
            </Typography>
        </Container>
    )
}

export default Footer;