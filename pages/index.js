import ListView from "../components/ListView";
import fetch from 'isomorphic-unfetch';
import Layout from "../components/Layout";
import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

function index(props) {
    return (
        <Layout title={"Locations"}>
            <ListView data={props.locations} />
        </Layout>
    );
}

index.getInitialProps = async function() {
    console.log("Starting getInitialProps in Locations");

    console.log(`Fetch= ${publicRuntimeConfig.PSU_FETCH}`);
    const resMapBoxLocations = await fetch(publicRuntimeConfig.PSU_FETCH);
    
    const data = await resMapBoxLocations.json();
    const results = data.results;
    //console.log(results);
    console.log(`Show data fetched. Count: ${results[1].formatted_address}`);
    return {
        locations : results
    };
};

export default index;