import fetch from 'isomorphic-unfetch';
import Layout from "../../components/Layout";
import { withRouter } from 'next/router';
import BackButton from "../../components/BackButton";
import dynamic from 'next/dynamic'
import Marker from 'react-map-gl'
import { makeStyles, Grid, Paper, CircularProgress, Typography, Card, CardContent } from "@material-ui/core";
import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

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
        height: '20%'
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

const Details = props => {
    const classes = useStyles();

    return (
        <Layout title={props.place.name}>
            <div className={classes.root}>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.mainLocationHeader}>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainLocationHeaderContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {props.place.name}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.mapPaper} height={"100%"}>
                    <Grid container>
                        <Map lat={props.place.geometry.location.lat} lng={props.place.geometry.location.lng} />
                    </Grid>
                </Paper>
            </div>
        </Layout>
    );
};

Details.getInitialProps = async ({query}) => {
    const placeId = query.itemId;
    console.log(`placeid: ${placeId}`)
    const apiParts = {
        'input': 'input=',
        'inputtype': '&inputtype=',
        'placeid' : 'placeid=',
        'apikey': '&key=',
    };
    
    const detailsApiUrl = ''.concat(
        publicRuntimeConfig.MAPS_DETAILS,
        apiParts.placeid,
        placeId,
        apiParts.apikey,
        publicRuntimeConfig.MAP_KEY
    );

    const res = await fetch(detailsApiUrl);
    const data = await res.json();
    return ({
        place: data.result,
    });
}

export default Details;