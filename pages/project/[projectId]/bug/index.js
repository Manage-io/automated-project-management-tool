import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const ViewBugs = () => {
    return <>
        <Head>
            <title>All Bugs - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                View Bugs
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default ViewBugs