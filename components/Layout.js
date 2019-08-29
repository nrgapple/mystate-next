import Head from 'next/head'
import NavBar from './NavBar'
import Header from './Header';
import "./Layout.scss";
import "./index.scss";
import "./ListView.scss"
import "./Details.scss"

const Layout = props => {
    const appTitle = `mySTATE`
    return (
        <div className="Layout">
            <Head>
                <title>{props.title} | {appTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <Header appTitle={appTitle}/>
            <div className="Content">
                {props.children}
            </div>
            <NavBar />
            <Scripts />
        </div>
    );
};

const Scripts = () => (
    <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
);

export default Layout;