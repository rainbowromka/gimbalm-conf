import React from 'react';
import ListPorts from "./ListPorts";
import {MenuItem, Select, Toolbar, Typography} from "@mui/material";

const LogoAndConnectSettings = () => {
    return (
        <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
            <Typography variant="h4" color="primary">
                GimbalM
            </Typography>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px'
            }}>
                <Select
                    sx={{
                        width: 250,
                        height: 24,
                        '& .MuiSelect-select': {
                            padding: '6px 12px'
                        }
                    }}
                    value={1}
                >
                    <MenuItem value={1}>Вариант 1</MenuItem>
                    <MenuItem value={2}>Вариант 2</MenuItem>
                    <MenuItem value={3}>Вариант 3</MenuItem>
                </Select>
            </div>

        </Toolbar>
    )
    // <ListPorts/>

}

export default LogoAndConnectSettings;