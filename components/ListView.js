import Link from 'next/link'

const ListView = props => {
    return (
        <section className="ListView" id="ListView">
            <ListLinks data={props.data} />
        </section>
    );
}

function ListLinks(props) {
    return (
        <ul>
            {props.data.map(item => {
                return (
                    <Link 
                        as={`/l/${item.name.replace(' ', '-')}`} 
                        href={{
                            pathname: "/l/[id]", 
                            query: {
                                itemId: item.id, 
                                itemName: item.name, 
                                itemLat: item.address.geo.lat,
                                itemLng: item.address.geo.lng
                            }
                        }}
                    >
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                        </li>
                    </Link>
            );})}
        </ul>
    );
}

export default ListView;