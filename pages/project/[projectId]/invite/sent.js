import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const SentInvite = () => {
    return <>
        <Head>
            <title>Sent Invites - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Sent Invites
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default SentInvite