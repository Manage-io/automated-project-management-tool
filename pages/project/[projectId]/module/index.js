import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const ViewModules = () => {
    return <>
        <Head>
            <title>All Modules - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                View Modules
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default ViewModules