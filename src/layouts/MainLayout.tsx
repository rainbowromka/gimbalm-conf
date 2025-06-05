import React, {useState} from "react";
import ListPorts from "../components/ListPorts";
import {
    Box,
    createTheme,
    CssBaseline,
    styled,
    ThemeProvider
} from "@mui/material";
import {grey} from "@mui/material/colors";
import LogoAndConnectSettings from "../components/LogoAndConnectSettings";

const GlobalStyles = styled('div')({
    '& body, & html, & #root': {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
    },
});

const theme = createTheme();

const AppContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minWidth: "1024px",
    minHeight: "720px",
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
});

const TopPanel = styled(Box)({
    width: '100%',
    height: 180,
    backgroundColor: grey[300],
    flexShrink: 0,
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
});

const MainContent = styled(Box)({
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
});

const SidePanel = styled(Box)(({ theme }) => ({
    backgroundColor: grey[200],
    height: 'calc(100vh - 180px)',
    maxHeight: 'calc(100vh - 180px)',
    minHeight: 'calc(720px - 180px)',
    // height: '100%',
    overflowY: 'auto',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
}));

const WorkArea = styled(Box)({
    flex: 1,
    backgroundColor: grey[100],
    overflow: 'auto',
    // padding: 16,
    height: 'calc(100vh - 180px)',
    maxHeight: 'calc(100vh - 180px)',
    minHeight: 'calc(720px - 180px)',
});

const MainLayout = () =>
{
    // const [sidePanelWidth, setSidePanelWidth] = useState<'compact' | 'expanded'>('expanded');

    const [isCompact, setIsCompact] = useState(false);
    const sideBarWidth = isCompact ? 32 : 250;

    const toggleSidePanel = () => {
        setIsCompact(!isCompact)
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <TopPanel>
                <LogoAndConnectSettings/>
            </TopPanel>
            <MainContent>
                <SidePanel sx={{ width: sideBarWidth }}>
                    {/* Содержимое боковой панели */}
                    <button onClick={toggleSidePanel}>Toggle</button>
                    {!isCompact && (
                        <div>
                            <div>Menu Item 1</div>
                            <div>Menu Item 2</div>
                            <div>Menu Item 3</div>
                        </div>
                    )}
                </SidePanel>

                <WorkArea sx={{width: `calc (100% - ${sideBarWidth}px`}}>
                    {/* Содержимое рабочей области */}
                    {/*<ListPorts/>*/}
                </WorkArea>

            </MainContent>

        </ThemeProvider>
    )
}

export default MainLayout;