// next.config.js
const withcss = require('@zeit/next-css');
module.exports = {
  webpack(config, {dev}) {
    if (!dev) {
      config.devtool = 'source-map';
      for (const plugin of config.plugins) {
        if (plugin['constructor']['name'] === 'UglifyJsPlugin') {
          plugin.options.sourceMap = true;
          break;
        }
      }
    }
    return config
  },
  withcss(){},
  serverRuntimeConfig: { // Will only be available on the server side
    MAP_BOX_TOKEN : "pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6eDUxNGl1MHZsYzNucDBvOGZjZGduMyJ9.NjL4IkeudK0D6E30G1nzqg",
    PSU_FETCH : "https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+Penn+State+University+Park&key=AIzaSyAjk5dJAYbkZnm2tmKg6O0DqMx4d0BJRMs",
    MAPS_PLACE : "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?",
    MAPS_DETAILS: "https://maps.googleapis.com/maps/api/place/details/json?",
  },
  publicRuntimeConfig: { // Will be available on both server and client
    MAP_BOX_TOKEN : "pk.eyJ1IjoibnJnYXBwbGUiLCJhIjoiY2p6eDUxNGl1MHZsYzNucDBvOGZjZGduMyJ9.NjL4IkeudK0D6E30G1nzqg",
    PSU_FETCH : "https://maps.googleapis.com/maps/api/place/textsearch/json?query=places+in+Penn+State+University+Park&key=AIzaSyAjk5dJAYbkZnm2tmKg6O0DqMx4d0BJRMs",
    MAP_KEY : "AIzaSyAjk5dJAYbkZnm2tmKg6O0DqMx4d0BJRMs",
  }
}