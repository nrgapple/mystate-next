import Link from 'next/link'

function ListView(props) {
    return (
        <div className="grid-container">
            <div className="grid-x grid-padding-x">
                <table>
                    <ListHead />
                    <ListLinks data={props.data} asPath={props.asPath} pathName={props.pathName}/>
                </table>
            </div>
        </div>
    );
}

const ListHead = () => (
    <thead>
        <tr>
            <th>NAME</th>
        </tr>
    </thead>
);

function ListLinks(props) {
    return (
        <tbody>
            {props.data.map(item => {
                return (
                    <Link 
                        as={`/${props.asPath}/${item.id}-${item.name}`} 
                        href={{
                            pathname: props.pathName, 
                            query: {
                                itemId: item.id, 
                                itemName: item.name, 
                                itemLat: item.address.geo.lat,
                                itemLng: item.address.geo.lng
                            }
                        }}
                    >
                        <tr key={item.id}>
                            <td className="name-cell">
                                <div className="name">{item.name}</div>
                            </td>
                        </tr>
                    </Link>
            );})}
        </tbody>
    );
}

export default ListView;