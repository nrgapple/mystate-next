import React from 'react'
import NextHead from 'next/head'

function Layout(props) {
    return (
        <div>
            <Header title={props.title} />
            <div className="contentContainer">
                {/*TODO: NavBar*/}
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const Header = ({ title }) => (
    <NextHead>
        <meta charset="utf-8"/>
        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
        <title>{title} | myState</title>
    </NextHead>
);

export default Layout;