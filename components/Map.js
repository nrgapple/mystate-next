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
                mapStyle="mapbox://styles/nrgapple/cjzwqbemb11mc1clb5exs0iji"
                mapboxApiAccessToken="pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6d3F6dWw3MGQyMjNtcDA5Zzh6b2dlYSJ9.-fps64V_9TmPtNiide36hQ"
                onViewportChange={viewport => this._onViewportChange(viewport)}
                {...this.state.viewport}
            >
                {this.props.children}
            </ReactMapGL>
        );
    }
}

export default Map;