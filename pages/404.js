import Head from 'next/head';
import Link from 'next/link';

// Components
import Footer from '../components/Footer';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ErrorPage = () => {
    return (<>
        <Head>
            <title>Page Not Found - Manage.io</title>
        </Head>

        <Container component="main" maxWidth="sm" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box mb={5} sx={{
                textAlign: 'center',
                lineHeight: 1.15
            }}>
                <Typography component="h6" variant="h3" sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary'
                }}>
                    Sorry, page not found!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
                    mistyped the URL? Be sure to check your spelling.
                </Typography>
            </Box>

            <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="100%" viewBox="0 0 480 360">
                <defs>
                    <linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%">
                        <stop offset="0%" stopColor="#7635dc" />
                        <stop offset="100%" stopColor="#7635dc" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path fill="url(#BG)" fillRule="nonzero" d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z" opacity="0.2" />
                <linearGradient id="SUN" x1="64.297" x2="111.109" y1="95.623" y2="142.436" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE16A" />
                    <stop offset="1" stopColor="#B78103" />
                </linearGradient>
                <path fill="#FFC107" d="M111.109 140.247c24.644 0 44.623-19.979 44.623-44.624 0-24.645-19.979-44.623-44.623-44.623-24.645 0-44.624 19.978-44.624 44.623 0 24.645 19.979 44.624 44.624 44.624z" opacity="0.15" />
                <path fill="url(#SUN)" d="M111.109 119.029c12.927 0 23.406-10.479 23.406-23.406 0-12.926-10.479-23.406-23.406-23.406s-23.406 10.48-23.406 23.406c0 12.927 10.48 23.406 23.406 23.406z" />
                <path fill="#7635dc" d="M425.621 117.222a8.267 8.267 0 00-9.599-8.157 11.129 11.129 0 00-9.784-5.87h-.403a13.23 13.23 0 00-20.365-14.078 13.23 13.23 0 00-5.316 14.078h-.403a11.153 11.153 0 100 22.293h38.68v-.073a8.279 8.279 0 007.19-8.193zM104.258 199.045a7.093 7.093 0 00-7.093-7.092c-.381.007-.761.04-1.138.097a9.552 9.552 0 00-8.425-5.026h-.343a11.348 11.348 0 10-22.012 0h-.342a9.564 9.564 0 100 19.114h33.177v-.061a7.107 7.107 0 006.176-7.032z" opacity="0.24" />
                <path fill="#200A69" d="M244.878 181.46c34.559 0 62.575 28.016 62.575 62.576 0 34.559-28.016 62.575-62.575 62.575-34.56 0-62.576-28.016-62.576-62.575 0-34.56 28.016-62.576 62.576-62.576zm0 23.186c-21.754 0-39.389 17.635-39.389 39.39 0 21.754 17.635 39.389 39.389 39.389s39.389-17.635 39.389-39.389c0-21.755-17.635-39.39-39.389-39.39z" />
                <path fill="#7635dc" d="M174.965 264.592c0-4.133-1.492-5.625-5.637-5.625h-11.373v-66.611c0-4.476-1.492-5.637-5.638-5.637h-9.172a9.867 9.867 0 00-7.948 3.974l-55.03 68.274a11.006 11.006 0 00-1.957 6.787v5.968c0 4.145 1.492 5.637 5.625 5.637h54.676v21.707c0 4.133 1.492 5.625 5.625 5.625h8.12c4.146 0 5.638-1.492 5.638-5.625v-21.707h11.434c4.414 0 5.637-1.492 5.637-5.637v-7.13zm-72.42-5.625l35.966-44.415v44.415h-35.966zM411.607 264.592c0-4.133-1.492-5.625-5.638-5.625h-11.421v-66.611c0-4.476-1.492-5.637-5.638-5.637h-9.11a9.869 9.869 0 00-7.949 3.974l-55.03 68.274a10.998 10.998 0 00-1.981 6.787v5.968c0 4.145 1.491 5.637 5.625 5.637h54.688v21.707c0 4.133 1.491 5.625 5.625 5.625h8.12c4.145 0 5.637-1.492 5.637-5.625v-21.707h11.434c4.476 0 5.638-1.492 5.638-5.637v-7.13zm-72.42-5.625l35.966-44.415v44.415h-35.966z" />
            </svg>

            <Link href="/" passHref>
                <Button component="a" variant="contained"
                    color="secondary" size="large"
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        mt: 5,
                        boxShadow: 4
                    }}
                >
                    Go To Home
                </Button>
            </Link>
        </Container>

        <Footer />
    </>)
}

export default ErrorPage