import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../components/BackButton";
import dynamic from 'next/dynamic'

const Map = dynamic((props) => import('../components/Map'), {
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
                <Map lat={query.itemLat} lng={query.itemLng} />
            </section>
        </Layout>
    );
});

export default Details;