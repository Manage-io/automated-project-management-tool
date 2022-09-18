import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { createContext, useState, useEffect } from "react";

const lightPalette = {
    mode: 'light',
    primary: {
        main: '#55185d',
        light: '#77467d',
        dark: '#3b1041'
    },
    secondary: {
        main: '#ecb602',
        light: '#efc434',
        dark: '#a57f01'
    }
}

const darkPalette = {
    mode: 'dark',
    primary: {
        main: '#7635dc',
        light: '#915de3',
        dark: '#52259a'
    },
    secondary: {
        main: '#00e5ff',
        light: '#33eaff',
        dark: '#00a0b2'
    }
}

export const ThemeContext = createContext();

const CustomThemeProvider = ({ children }) => {
    const [themeDark, setThemeDark] = useState(false);

    const theme = responsiveFontSizes(createTheme({
        breakpoints: {
            keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                xxl: 1536
            }
        },
        palette: themeDark ? darkPalette : lightPalette,
    }));

    const toggleTheme = () => {
        setThemeDark(!themeDark);
        localStorage.setItem('theme', !themeDark ? 'dark' : 'light');
    }


    useEffect(() => {
        if (localStorage.getItem('theme') == 'dark') {
            setThemeDark(true);
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ themeDark, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}

export default CustomThemeProvider;