import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const CreateModule = () => {
    return <>
        <Head>
            <title>Create Module - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Create Module
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default CreateModule