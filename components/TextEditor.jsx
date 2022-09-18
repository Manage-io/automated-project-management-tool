import { useContext } from 'react';
import propTypes from 'prop-types';
import dynamic from 'next/dynamic';

// Contexts
import { ThemeContext } from '../context/ThemeContext.js';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Stylesheet
import 'react-quill/dist/quill.snow.css';


const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
})


const TextEditor = (props) => {
    const { heading, placeholder, sx, value, error, errorText, onChange } = props;
    const { themeDark } = useContext(ThemeContext);

    return (
        <Box sx={sx} className={`${themeDark ? 'dark' : 'light'} ${error ? 'error' : ''}`}>
            <Typography
                component='h5'
                variant='h5'
                sx={{
                    px: 1.4, py: 1,
                    color: error ? 'error.main' : 'text.secondary',
                    border: `1px solid`,
                    borderColor: error ? 'error.main' : '#c4c4c4',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    borderBottom: 'none'
                }}
            >
                {heading}
            </Typography>
            <QuillNoSSRWrapper
                placeholder={placeholder}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],

                        ['bold', 'italic', 'underline', 'strike'],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ align: [] }],

                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ list: 'bullet' }, { list: 'ordered' }],
                        ['blockquote', 'code-block'],

                        [{ color: [] }, { background: [] }],

                        ['link', 'image']
                    ],
                    clipboard: { matchVisual: false }
                }}
            />
        </Box>
    )
}

TextEditor.defaultProps = {
    heading: 'Text Editor',
    placeholder: '',
    sx: { width: '100%' },
    error: false
}

TextEditor.propTypes = {
    heading: propTypes.string,
    placeholder: propTypes.string,
    sx: propTypes.object,
    error: propTypes.bool,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
}

export default TextEditor