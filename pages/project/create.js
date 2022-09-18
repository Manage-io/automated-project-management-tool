import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

// Components
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



const CreateProject = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        router.push('/login');
    }

    return (<>
        <Head>
            <title>Create Project - Manage.io</title>
        </Head>

        <Container component="main" maxWidth="md">
            <Card sx={{ minWidth: 355, my: 3 }}>
                <CardHeader
                    title={
                        <Typography variant="h4" component="h4">
                            Create New Project
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
                                value=""
                                onChange={() => { }}
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
                            }}>  </Typography>
                            <Button
                                fullWidth
                                size="large"
                                variant='contained'
                                disabled={(status === "loading")}
                                onClick={() => router.push('/project/projectid')}
                                startIcon={false && <CircularProgress color="inherit" size={20} />}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    </>)
}

export default CreateProject;