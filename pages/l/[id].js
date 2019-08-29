import Layout from "../../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../../components/BackButton";
import dynamic from 'next/dynamic'
import Marker from 'react-map-gl'

const ALL_POSTS = "https://jsonplaceholder.typicode.com/post/";

const Map = dynamic(() => import('../../components/Map'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const Details = withRouter( props => {
    const query = props.router.query;
    console.log(query);
    return (
        <Layout title={query.itemName}>
            <BackButton />
            <section className="Details">
                <h3>{query.itemName}</h3>
            </section>
            <section className="Map">
                <Map lat={query.itemLat} lng={query.itemLng}>
                    <Marker className="mapboxgl-marker"
                            coordinates={[Number(query.itemLat), Number(query.itemLng)]}
                            offsetLeft={-20} 
                            offsetTop={-10}
                    >
                    </Marker>
                </Map>
            </section>
        </Layout>
    );
});

Details.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await(ALL_POSTS);
    const posts = await res.json();

    console.log(`Fetched posts count: ${posts.length}`)

    return { posts };
}

export default Details;