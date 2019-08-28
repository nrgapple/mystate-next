import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../components/BackButton";

const Details = withRouter( props => {
    const query = props.router.query;
    return (
        <Layout>
            <BackButton />
            <h3>{query.itemName}</h3>
        </Layout>
    );
});

export default Details;