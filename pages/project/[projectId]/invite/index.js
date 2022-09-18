import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const ViewInvites = () => {
    return <>
        <Head>
            <title>View All Invites - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                View All Invites
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default ViewInvites