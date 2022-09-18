import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const CreateBug = () => {
    return <>
        <Head>
            <title>Create Bug - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Create Bug
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default CreateBug