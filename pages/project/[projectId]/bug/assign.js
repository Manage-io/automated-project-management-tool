import Head from 'next/head';

// Components
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';

const AssignBugs = () => {
    return <>
        <Head>
            <title>Assign Bugs - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Assign Bugs
            </Typography>
        </ProjectPageWrapper>
    </>
}

export default AssignBugs