import Head from 'next/head';
import AppBar from './AppBar';
import { CssBaseline, Container } from '@material-ui/core';

const Layout = props => {
    const appTitle = `mySTATE`
    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                {/* <Head>
                    <title>{props.title} | {appTitle}</title>
                    <meta 
                        name="viewport" 
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                    <meta charSet="utf-8" />
                </Head> */}
                <AppBar />
                <main>
                    {props.children}
                </main>

            </Container>
            <Scripts />
        </React.Fragment>
    );
};

const Scripts = () => (
    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
);

export default Layout;