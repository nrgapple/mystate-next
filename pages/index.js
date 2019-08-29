import ListView from "../components/ListView";
import fetch from 'isomorphic-unfetch';
import Layout from "../components/Layout";

function index(props) {
    return (
        <Layout title={"Locations"}>
            <ListView data={props.locations} />
        </Layout>
    );
}

index.getInitialProps = async function() {
    console.log("Starting getInitialProps in Locations");
    const resLocations = await fetch('https://jsonplaceholder.typicode.com/users');
    const dataLocations = await resLocations.json();

    console.log(`Show data fetched. Count: ${dataLocations.length}`);
    return {
        locations : dataLocations
    };
};

export default index;