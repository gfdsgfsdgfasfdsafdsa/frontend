import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { css } from '@emotion/react'

const NotFound = () => (
    <>
        <Head>
            <title>
                404 | Material Kit
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Image
                            css={css`
                                marginTop: 50px,
                                display: inline-block,
                                maxWidth: 100%
                            `}
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            width={560}
                            height={500}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotFound;
