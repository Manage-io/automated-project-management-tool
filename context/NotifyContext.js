import { createContext, useRef } from "react";
import { SnackbarProvider } from 'notistack';

// Metarial UI Components
import IconButton from '@mui/material/IconButton';

// Metarial UI Icons
import CloseIcon from '@mui/icons-material/Close';


export const NotifyContext = createContext();

const NotifyProvider = ({ children }) => {
    const providerRef = useRef();

    const notify = (type, message = `This is a ${type} message.`, hideDuration = 5000) => {

        providerRef.current.enqueueSnackbar(message, {
            variant: type,
            autoHideDuration: hideDuration,
            action: key => (
                <IconButton onClick={() => { providerRef.current.closeSnackbar(key) }}>
                    <CloseIcon />
                </IconButton>
            )
        });
    }

    return (
        <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            ref={providerRef}
            disableWindowBlurListener
            sx={{
                '& .SnackbarItem-variantSuccess': {
                    backgroundColor: 'success.main'
                },
                '& .SnackbarItem-variantWarning': {
                    backgroundColor: 'warning.main'
                },
                '& .SnackbarItem-variantError': {
                    backgroundColor: 'error.main'
                },
                '& .SnackbarItem-variantInfo': {
                    backgroundColor: 'info.main'
                },
                '& .SnackbarItem-contentRoot': {
                    '& .SnackbarItem-message': {
                        lineHeight: 1.5,
                        color: 'success.contrastText'
                    },
                    '& button': {
                        color: 'success.contrastText'
                    }
                }
            }}
        >
            <NotifyContext.Provider value={{ notify }}>
                {children}
            </NotifyContext.Provider>
        </SnackbarProvider>
    )
}

export default NotifyProvider;