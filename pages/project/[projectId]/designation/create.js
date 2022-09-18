import Head from 'next/head';

// Components
import TableWrapper from '../../../../components/TableWrapper';
import ProjectPageWrapper from '../../../../components/ProjectPageWrapper';

// MUI Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const CreateDesignation = () => {
    return <>
        <Head>
            <title>Create Designation - Manage.io</title>
        </Head>

        <ProjectPageWrapper>
            <Typography variant="h4" color='text.primary' gutterBottom>
                Create Designation
            </Typography>

            <TableWrapper heading="Create Designation">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> Project </TableCell>
                        <TableCell align="center"> Designation </TableCell>
                        <TableCell align="center"> Invite </TableCell>
                        <TableCell align="center"> Module </TableCell>
                        <TableCell align="center"> Bug </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    '& tr': {
                        '& button': {
                            minWidth: 105
                        }
                    }
                }}>
                    <TableRow hover tabIndex={-1}>
                        <TableCell align="center">
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                View
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                View
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                View
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <FormControl width={116}>
                                <InputLabel id="demo-simple-select-label">View</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="View"
                                    sx={{
                                        maxWidth: 116, fontSize: '0.875rem', fontWeight: 'bold',
                                        '.MuiSelect-select': { py: 1 }
                                    }}
                                >
                                    <MenuItem value={false}>FALSE</MenuItem>
                                    <MenuItem value={'Assigned'}>Assigned</MenuItem>
                                    <MenuItem value={'Completed'}>Completed</MenuItem>
                                    <MenuItem value={'All'}>All</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell align="center">
                            <FormControl width={116}>
                                <InputLabel id="demo-simple-select-label">View</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="View"
                                    sx={{
                                        maxWidth: 116, fontSize: '0.875rem', fontWeight: 'bold',
                                        '.MuiSelect-select': { py: 1 }
                                    }}
                                >
                                    <MenuItem value={false}>FALSE</MenuItem>
                                    <MenuItem value={'Assigned'}>Assigned</MenuItem>
                                    <MenuItem value={'Completed'}>Completed</MenuItem>
                                    <MenuItem value={'All'}>All</MenuItem>
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1}>
                        <TableCell align='center'>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Create
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Create
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Create
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Create
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Create
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1}>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Edit
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1}>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='success'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="success"
                                        defaultChecked={true}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow hover tabIndex={-1}>
                        <TableCell align='center'>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Assign
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Assign
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                disabled
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        disabled
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Assign
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Assign
                            </Button>
                        </TableCell>
                        <TableCell align='center'>
                            <Button
                                color='error'
                                variant="outlined"
                                startIcon={
                                    <Checkbox
                                        size="small"
                                        color="error"
                                        defaultChecked={false}
                                        sx={{ height: 18, width: 18 }}
                                    />
                                }
                            >
                                Assign
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </TableWrapper>
        </ProjectPageWrapper>
    </>
}

export default CreateDesignation