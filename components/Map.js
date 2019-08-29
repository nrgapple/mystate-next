import ReactMapGL from 'react-map-gl'
import { SizeMe } from 'react-sizeme'

const MAP_BOX_TOKEN = "pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6eDUxNGl1MHZsYzNucDBvOGZjZGduMyJ9.NjL4IkeudK0D6E30G1nzqg";

const Map = props => {
    const [viewport, setViewPort ] = React.useState({
        width: "100vw",
        height: "100vh",
        latitude: Number(props.lat),
        longitude: Number(props.lng),
        zoom: 2
    });

    const _onViewportChange = viewport => {
        console.log("Changing viewport");
        setViewPort({...viewport});
    }

    return (
        //three dots spreads out the properties: https://stackoverflow.com/a/31049016/3106919
        <SizeMe>{({size}) => (
            <>
                <ReactMapGL
                    mapStyle="mapbox://styles/mapbox/light-v10"
                    mapboxApiAccessToken={MAP_BOX_TOKEN}
                    onViewportChange={_onViewportChange}
                    width={size.width}
                    height={size.height}
                    {...viewport}
                >
                    
                </ReactMapGL>
            </>
        )}</SizeMe>
    );
};

export default Map;