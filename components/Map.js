import {Component} from 'react'
import ReactMapGL from 'react-map-gl'

class Map extends Component {
    constructor(props) {
        super(props);
        console.log(`lat: ${props.lat} | lng: ${props.lng}`)
        this.state = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHight,
                latitude: Number(props.lat),
                longitude: Number(props.lng),
                zoom: 3
            }
        };
    }
    
    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    _onViewportChange = (viewport) => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        });
    }

    _resize = () => {
        this._onViewportChange({
          width: window.innerWidth,
          height: window.innerHeight
        });
    }

    render() {
        return (
            //three dots spreads out the properties: https://stackoverflow.com/a/31049016/3106919
            <ReactMapGL
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxApiAccessToken="pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6dm9va2I0MHQ0bzNibWw0ajkzcGRscyJ9.xDlCnMwplZSIG7_sxyHm9g"
                onViewportChange={viewport => this._onViewportChange(viewport)}
                {...this.state.viewport}
            >
                {/* <Marker 
                        latitude={Number(this.props.lat)}
                        longitude={Number(this.props.lng)}
                        offsetLeft={-20} 
                        offsetTop={-10}
                >
                    <div>{this..itemName}</div>
                </Marker> */}
            </ReactMapGL>
        );
    }
}

export default Map;