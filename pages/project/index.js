import { getSession } from "next-auth/react";
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Components
import TableWrapper from '../../components/TableWrapper';

// MUI Components
import Box from "@mui/system/Box";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import PreviewIcon from '@mui/icons-material/Preview';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export const getServerSideProps = async (context) => {
    const { req } = context;
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
        // console.log(session);

        return {
            props: {
                userId: session.user.id,
                data: [
                    { id: 1, name: 'Name', Creator: 'Creator', status: true },
                    { id: 2, name: 'Name', Creator: 'Creator', status: false },
                    { id: 3, name: 'Name', Creator: 'Creator', status: true },
                    { id: 4, name: 'Name', Creator: 'Creator', status: false },
                    { id: 5, name: 'Name', Creator: 'Creator', status: true },
                    { id: 6, name: 'Name', Creator: 'Creator', status: false },
                    { id: 7, name: 'Name', Creator: 'Creator', status: true },
                    { id: 8, name: 'Name', Creator: 'Creator', status: false },
                ]
            },
        };
    }
};

const AssigndProject = ({ data }) => {
    const [pageNo, setPageNo] = useState(1);
    const [rowCount, setRowCount] = useState(2);
    const [projects, setProjects] = useState(data);

    return <>
        <Head>
            <title>My Projects - Manage.io</title>
        </Head>

        <Container component="main" maxWidth={"xl"} sx={{
            display: projects.length > 0 ? 'block' : 'flex',
            alignItems: 'center'
        }}>
            {(projects.length < 1) && <Paper Paper elevation={2} sx={{
                color: 'text.primary',
                textAlign: 'center',
                mx: 'auto',
                p: 4
            }}>
                <Typography component='p' variant="h6" color="text.secondary">
                    No Projects To Show.
                </Typography>
                <Typography component='h6' variant="h5" mb={4}>
                    Want to create your own project?
                </Typography>
                <Link href="./project/create" passHref>
                    <Button component="a" variant="contained" color="secondary" size="large">
                        Create Now
                    </Button>
                </Link>
            </Paper>}

            {(projects.length > 0) && <TableWrapper
                tableData={data}
                total={projects.length}
                setTableData={setProjects}
                pageNo={pageNo} setPageNo={setPageNo}
                rowCount={rowCount} setRowCount={setRowCount}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> # </TableCell>
                        <TableCell align="left"> Name </TableCell>
                        <TableCell align="center"> Creator </TableCell>
                        <TableCell align="center"> Status </TableCell>
                        <TableCell align="center"> Action </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.slice(rowCount * (pageNo - 1), rowCount * pageNo)
                        .map((row, i) => {
                            return <TableRow hover key={i} tabIndex={-1}>
                                <TableCell align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">
                                    Name-{row.id}
                                </TableCell>
                                <TableCell align="center">
                                    Creator-{row.id}
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1 }}>
                                    <Button
                                        color={row.status ? 'success' : 'error'}
                                        variant="outlined"
                                    >
                                        {row.status ? 'Published' : 'Inactive'}
                                    </Button>
                                </TableCell>
                                <TableCell align="center" sx={{ py: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Link href={`./project/projectId`} passHref>
                                            <Tooltip title="View Project">
                                                <Button
                                                    component="a"
                                                    color='success'
                                                    variant="outlined"
                                                    sx={{ px: 1, minWidth: 40 }}
                                                >
                                                    <PreviewIcon />
                                                </Button>
                                            </Tooltip>
                                        </Link>

                                        <Link href={`./project/edit?id=some-project-id`} passHref>
                                            <Tooltip title="Edit Project">
                                                <Button
                                                    component="a"
                                                    color='secondary'
                                                    variant="outlined"
                                                    sx={{ px: 1, minWidth: 40, ml: 1 }}
                                                >
                                                    <EditRoadIcon />
                                                </Button>
                                            </Tooltip>
                                        </Link>

                                        <Tooltip title="Delete Project">
                                            <Button
                                                color='error'
                                                variant="outlined"
                                                sx={{ px: 1, minWidth: 40, ml: 1 }}
                                            >
                                                <DeleteOutlineIcon />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        })}
                </TableBody>
            </TableWrapper>}
        </Container>
    </>
}

export default AssigndProject