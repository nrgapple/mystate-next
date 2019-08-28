import ListView from "../components/ListView";
import fetch from 'isomorphic-unfetch';
import Layout from "../components/Layout";

function index(props) {
    return (
        <Layout title={"Locations"}>
            <ListView data={props.locations} asPath={"locations"} pathName={"/Details"} />
        </Layout>
    );
}

index.getInitialProps = async function(){
    console.log("Starting getInitialProps in Locations");
    const resLocations = await fetch('https://jsonplaceholder.typicode.com/users');
    const dataLocations = await resLocations.json();

    console.log(`Show data fetched. Count: ${dataLocations.length}`);
    console.log(dataLocations);
    return {
        locations : dataLocations
    };
};

export default index;