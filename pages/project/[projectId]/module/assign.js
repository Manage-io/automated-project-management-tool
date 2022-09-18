import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const AssignModules = () => {
    return <>
        <Head>
            <title>Assign Modules - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Assign Modules
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default AssignModules