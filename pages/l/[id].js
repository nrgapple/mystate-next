import fetch from 'isomorphic-unfetch';
import Layout from "../../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../../components/BackButton";
import dynamic from 'next/dynamic'
import Marker from 'react-map-gl'
import { makeStyles, Grid, Paper, CircularProgress, Typography, Card, CardContent } from "@material-ui/core";

const ALL_POSTS = "https://jsonplaceholder.typicode.com/posts/";

const Map = dynamic(() => import('../../components/Map'), {
    loading: () => <CircularProgress />,
    ssr: false
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    mapPaper: {
        position: 'relative',
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
    },
    mainLocationHeader: {
        position: 'relative',
        // backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.black,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    mainLocationHeaderContent: {
      position: 'relative',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
      }  
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    appBarSpacer: theme.mixins.toolbar,
}));

const Details = withRouter( props => {
    const query = props.router.query;
    const classes = useStyles();

    console.log(query);
    return (
        <Layout title={query.itemName}>
            <div className={classes.root}>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.mainLocationHeader}>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainLocationHeaderContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {query.itemName}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.mapPaper}>
                    <Grid container>
                        <Map lat={query.itemLat} lng={query.itemLng}>
                        
                        </Map>
                    </Grid>
                </Paper>
            </div>
        </Layout>
    );
});

Details.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(ALL_POSTS);
    const posts = await res.json();

    console.log(`Fetched posts count: ${posts.length}`)

    return { posts };
}

export default Details;