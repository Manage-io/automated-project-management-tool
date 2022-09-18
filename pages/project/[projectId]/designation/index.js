import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const ViewDesignations = () => {
    return <>
        <Head>
            <title>All Designations - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                View Designations
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default ViewDesignations