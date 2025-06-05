import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import type { Store } from "../App";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import UsbIcon from '@mui/icons-material/Usb';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    store?: Store;
}

export const ListPortsFunc = (props: Props) => {    

    const {mainStore} = props.store;
    const {ports, selectedPort, error, isConnecting} = mainStore;

    useEffect(() => {
        if (navigator.serial)
        {
            mainStore.listPorts();
        }
    }, [mainStore])

    const handleRequestNewPort = async ()=> {
        await mainStore.requestPermission();
    }

     const handlePortSelect = async (port: SerialPort) => {
      await mainStore.openPort(port);
    };

    const handleRefresh = async () => {
      await serialPortStore.listPorts();
    };

    const getPortLabel = (port: SerialPort) => {
        const info = port.getInfo();
        return  `COM Port (Vendor: ${info.usbVendorId || 'N/A'}, Product: ${info.usbProductId || 'N/A'})`;
    }

    return !navigator.serial
        ? (<Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography color="error">
                Web Serial API не поддерживается вашим браузером.
                Используйте Chrome/Edge версии 89 или новее.
            </Typography>
        </Paper>)
        : (<Paper elevation={3} sx={{p:3, mt:3}}>
            <Typography variant="h6" gutterBottom>
                Выбор COM порта                
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2}}>
                    Ошибка: {error}
                </Typography>
            )}

            <Box sx={{display: 'flex', gap: 2, alignItems: 'center', mb: 3}}>
                <FormControl fullWidth>
                    <InputLabel id="port-select-label">Доступные поры</InputLabel>
                    <Select
                        labelId="port-select-label"
                        label="Доступные порты"
                        onChange={(e) => handlePortSelect(ports[Number(e.target.value)])}
                        value={selectedPort ? ports.indexOf(selectedPort) : ''}
                        disabled={isConnecting || ports.length === 0}
                    >
                        {ports.map((port, index) => (
                            <MenuItem key={index} value={index}>
                                {getPortLabel(port)}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="outlined"
                        onClick={handleRefresh}
                        disabled={isConnecting}
                        startIcon={isConnecting ? <CircularProgress size={20} /> : <RefreshIcon />}
                    >
                        Обновить
                    </Button>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleRequestNewPort}
                    disabled={isConnecting}
                    startIcon={isConnecting ? <CircularProgress size={20} /> : <UsbIcon />}
                    fullWidth
                >
                    {isConnecting ? 'Подключение...' : 'Выбрать новый порт'}
                </Button>
            </Box>

        </Paper>)
};


export const ListPorts = inject("store")(observer(ListPortsFunc));

export default ListPorts;