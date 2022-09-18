import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';


const ProjectDashboard = () => {
    return <>
        <Head>
            <title>Project Dashboard - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Project Dashboard
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default ProjectDashboard