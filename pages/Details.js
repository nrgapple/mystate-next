import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../components/BackButton";
import dynamic from 'next/dynamic'

const Map = dynamic((props) => import('../components/Map'), {
    ssr: false
});

const Details = withRouter( props => {
    const query = props.router.query;
    console.log(query);
    return (
        <Layout title={query.itemName}>
            <BackButton />
            <h3>{query.itemName}</h3>
            <Map lat={query.itemLat} lng={query.itemLng}/>
        </Layout>
    );
});

export default Details;