import Link from 'next/link'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const ListView = props => {
    return (
        <section className="ListView" id="ListView">
            <ListLinks data={props.data} />
        </section>
    );
}

function ListLinks(props) {
    return (
        <List>
            {props.data.map(item => {
                return (
                    <div>
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
                            <ListItem button alignItems="flex-start">
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                        <Divider component="li" />
                    </div>
            );})}
        </List>
    );
}

export default ListView;