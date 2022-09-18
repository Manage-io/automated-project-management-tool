import Link from 'next/link';


// MUI Components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

// MUI Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const TableWrapper = ({ children, heading, action, tableData, total, setTableData, pageNo, setPageNo, rowCount, setRowCount, showDownList }) => {

    const onRowCountChange = (count) => {
        setPageNo(1);
        setRowCount(count);
    }

    const onSearch = (keyword) => {
        setPageNo(1);

        if (keyword !== '') {
            const tempTable = tableData.filter(row => {
                let rowStr = '';

                for (var key in row) {
                    rowStr += row[key].toString();
                }

                return (rowStr.toLowerCase()).includes(keyword.toLowerCase());
            })

            setTableData(tempTable);
        } else {
            setTableData(tableData);
        }
    }

    return (children &&
        <Card sx={{ minWidth: 350, my: 5 }}>
            <CardHeader
                title={<Typography variant="h4" component="h4">{heading}</Typography>}
                action={action && <Link href={action.link} passHref>
                    <Button variant='contained' color="secondary">
                        {action.text}
                    </Button>
                </Link>}
                sx={{
                    px: { xs: 2, sm: 3 },
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '& .MuiCardHeader-action': {
                        m: 0, py: '2px'
                    }
                }}
            />
            <CardContent>
                {(tableData && rowCount && showDownList) && <Stack
                    justifyContent="space-between"
                    direction="row" sx={{ mb: 2 }}
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Typography variant="body1" sx={{ height: 'max-content' }} >
                            Show
                        </Typography>
                        <Select displayEmpty
                            value={rowCount}
                            onChange={({ target }) => onRowCountChange(target.value)}
                            sx={{
                                minWidth: 70, mx: 1,
                                '.MuiSelect-select': { py: 1 }
                            }}
                        >
                            {showDownList.map(data => <MenuItem key={data} value={data}>{data}</MenuItem>)}
                        </Select>
                        <Typography variant="body1" sx={{ height: 'max-content' }}>
                            entries
                        </Typography>
                    </Stack>
                    <TextField
                        label="Search"
                        variant="outlined"
                        onChange={({ target }) => onSearch(target.value)}
                        sx={{
                            '.MuiOutlinedInput-root': { borderRadius: '50rem' },
                            '.MuiOutlinedInput-input': { py: 1, pl: '18px' },
                            '.MuiInputLabel-root': {
                                transform: 'translate(18px, 9px) scale(1)',
                                '&:is(.Mui-focused, .MuiFormLabel-filled)': {
                                    transform: 'translate(15px, -9px) scale(.75)',
                                }
                            }
                        }}
                    />
                </Stack>}
                <TableContainer sx={{
                    maxHeight: 590,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderBottom: 'none'
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        {children}
                    </Table>
                </TableContainer>
                {(pageNo && rowCount && total) && <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    sx={{ mt: 2 }}
                >
                    <Typography variant="body1" sx={{ height: 'max-content' }} >
                        Showing {(pageNo - 1) * rowCount} to {pageNo * rowCount} of {total} items
                    </Typography>
                    <Stack spacing={1} direction="row" sx={{
                        'button': { px: 1, minWidth: 40 }
                    }}>
                        <Button
                            variant="outlined"
                            disabled={pageNo === 1}
                            onClick={() => setPageNo(e => (e - 1))}
                        >
                            <KeyboardArrowLeftIcon />
                        </Button>
                        <Button
                            variant="contained"
                            disableElevation
                            disabled
                            sx={{
                                '&.Mui-disabled': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText'
                                }
                            }}
                        >
                            {pageNo}
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={rowCount * pageNo >= total}
                            onClick={() => setPageNo(e => (e + 1))}
                        >
                            <KeyboardArrowRightIcon />
                        </Button>
                    </Stack>
                </Stack>}
            </CardContent>
        </Card>
    )
}

TableWrapper.defaultProps = {
    heading: "A Demo Table",
    action: {
        text: 'Create Project',
        link: './project/create'
    },
    tableData: [],
    setTableData: () => { },
    showDownList: [2, 4, 6]
}

export default TableWrapper