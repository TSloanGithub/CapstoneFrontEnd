import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import {updateUserCredentials} from "../api/userApi.js";
import {useState} from "react";


export default function ShowTabs() {
    const [value, setValue] = React.useState('1');
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSettingsCredentialChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await updateUserCredentials(formData);
            setSuccessMessage("Registration successful!");
        } catch (error) {
            setError(error.message);
        }
    };

    function createData(wordsSolvedNum,totalTimePlayed, numOfGuesses) {
        return { wordsSolvedNum, totalTimePlayed, numOfGuesses};
    }

    const rows = [
        createData(10,150,25 )

    ];

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Statistics" value="1" />
                        <Tab label="Settings" value="2" />
                        <Tab label="Log Out" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Words Solved</TableCell>
                                <TableCell align="right">Total Time Played (Minutes)</TableCell>
                                <TableCell align="right">Total Guesses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.wordsSolvedNum}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.wordsSolvedNum}
                                    </TableCell>
                                    <TableCell align="center">{row.totalTimePlayed}</TableCell>
                                    <TableCell align="center">{row.numOfGuesses}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </TabPanel>
                <TabPanel value="2">
                    {error && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            {error}
                        </p>
                    )}
                    {successMessage && (
                        <p
                            style={{
                                color: "green",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            {successMessage}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue="username"
                                    value={formData.name}
                                    name="username"
                                    onChange={handleSettingsCredentialChange}
                                />
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Required"
                                    defaultValue="password"
                                    value={formData.password}
                                    name="password"
                                    onChange={handleSettingsCredentialChange}
                                />
                            </div>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </TabPanel>
                <TabPanel value="3">Log Out</TabPanel>
            </TabContext>
        </Box>
    );
}