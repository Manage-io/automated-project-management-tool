import { useState, useEffect } from 'react';
import Router from 'next/router';

// MUI Components
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        var interval = false;

        const progressStart = (path) => {
            if (window.location.pathname !== path && !interval) {
                interval = setInterval(() => {
                    setProgress(e => (e < 70 ? e + 5 : e));
                }, 100);

                setProgress(0.1);
            }
        }

        const progressEnd = () => {
            if (interval !== false) {
                clearInterval(interval);
                setProgress(100);

                setTimeout(() => {
                    setProgress(0);
                }, 500);
            }

            interval = false;
        }

        Router.events.on('routeChangeStart', progressStart);
        Router.events.on('routeChangeComplete', progressEnd);
        Router.events.on('routeChangeError', progressEnd);

        return () => {
            Router.events.off("routeChangeStart", progressStart);
            Router.events.off("routeChangeComplete", progressEnd);
            Router.events.off("routeChangeError", progressEnd);
        }

    }, [])


    return ((progress > 0) &&
        <LinearProgress
            color='secondary'
            variant="determinate"
            value={progress}
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                height: '2px',
                zIndex: 'tooltip',
                background: 'transparent'
            }}
        />
    )
}

export default ProgressBar;