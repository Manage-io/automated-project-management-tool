import { getSession } from "next-auth/react";
import { useState } from 'react';
import Head from 'next/head';

// Components
import Footer from '../../components/Footer';
import TextEditor from '../../components/TextEditor';

// MUI Components
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';


export const getServerSideProps = async (context) => {
    const { req, query } = context;
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: { session },
        }
    } else {
        console.log(query.id);

        return {
            props: {
                userId: session.user.id,
                data: {
                    id: "nmdaskmnkmkmdam",
                    name: "Some Project Name.",
                    description: ''
                }
            },
        };
    }
};

const EditProject = ({ userId, data }) => {
    const [project, setProject] = useState(data);
    const [error, setError] = useState("");

    return <>
        <Head>
            <title>Project Edit - Manage.io</title>
        </Head>

        <Container component="main" maxWidth="md">
            <Card sx={{ minWidth: 355, my: 3 }}>
                <CardHeader
                    title={
                        <Typography variant="h4" component="h4">
                            Edit Project
                        </Typography>
                    }
                    sx={{
                        textAlign: 'center',
                        px: { xs: 2, sm: 3 },
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}
                />
                <CardContent sx={{ pt: 3 }}>
                    <Grid container rowSpacing={1} columnSpacing={0}>
                        <Grid item xs={12} px={{ sm: 1 }}>
                            <TextField
                                type="text"
                                label="Project Name"
                                variant="outlined"
                                error={false}
                                value={project.name}
                                onChange={({ target }) => setProject(e => ({ ...e, name: target.value }))}
                                sx={{
                                    mb: 2, width: '100%', '& input': {
                                        boxShadow: 'none !important'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} px={{ sm: 1 }}>
                            <TextEditor
                                sx={{ mb: 1 }}
                                heading="Description"
                                placeholder="Write Here ..."
                                value={project.description}
                                onChange={({ target }) => setProject(e => ({ ...e, description: target.value }))}
                                error={false}
                            />
                        </Grid>
                        <Grid item xs={12} px={{ sm: 1 }}>
                            <Typography variant="body2" sx={{
                                mb: 1,
                                lineHeight: 1,
                                minHeight: '14px',
                                color: 'error.main',
                                textAlign: 'center',
                            }}> {error} </Typography>
                            <Button
                                fullWidth
                                size="large"
                                variant='contained'
                                onClick={() => router.push('/project/projectid')}
                                startIcon={false && <CircularProgress color="inherit" size={20} />}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>

        <Footer />
    </>
}

export default EditProject