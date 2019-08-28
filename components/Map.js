import {Component} from 'react'
import ReactMapGL from 'react-map-gl'

class Map extends Component {
    constructor(props) {
        super(props);
        console.log(`lat: ${props.lat} | lng: ${props.lng}`)
        this.state = {
            viewport: {
                width: '100vw',
                height: '100vh',
                latitude: Number(props.lat),
                longitude: Number(props.lng),
                zoom: 3
            }
        };
    }
    

    render() {
        return (
            //three dots spreads out the properties: https://stackoverflow.com/a/31049016/3106919
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6dm9va2I0MHQ0bzNibWw0ajkzcGRscyJ9.xDlCnMwplZSIG7_sxyHm9g"
                onViewportChange={(viewport) => this.setState({viewport})}
                {...this.state.viewport}
            />
        );
    }
}

export default Map;