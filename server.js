const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 4000;

const request = require('request');

app
  .prepare()
  .then(() => {
    const server = express();

    // server.get('/location/:id', (req, res) => {
    //     var apiUrl = 'https://jsonplaceholder.typicode.com/users/' + req.params.id;

    //     request(apiUrl, function (error, response, body) {
    //         var locationName = "";

    //         if (error) {
    //             return next(error);
    //         } else if (!error && response.statusCode == 200) {
    //             const data = JSON.parse(body);
    //             if( data.name ){
    //               locationName = data.name;
    //             }
    //         } else {
    //           locationName = "Location Page";
    //         }

    //         const actualPage = '/Details';
    //         const queryParams = {
    //           itemId: item.id, 
    //           itemName: item.name, 
    //           itemLat: item.address.geo.lat,
    //           itemLng: item.address.geo.lng
    //         }
    //         app.render(req, res, actualPage, queryParams);
    //     });
    // });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });