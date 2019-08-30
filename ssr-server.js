
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 4000;

const request = require('request');

const MAPS_PLACE = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
const MAPS_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json?";
const MAPS_KEY = "AIzaSyAjk5dJAYbkZnm2tmKg6O0DqMx4d0BJRMs";

app
  .prepare()
  .then(() => {
    // initialize express server.
    const server = express();

    server.get('/l/:id', (req, res) => {
      console.log("Start Requests and Render for location");
      //res.send('SEND: Start Requests and Render for location')
      const location = req.params.id.replace(/-/g, '%20');
      console.log(`Location string: ${location}`);
      const apiParts = {
        'input': 'input=',
        'inputtype': '&inputtype=',
        'placeid' : 'placeid=',
        'apikey': '&key=',
      };

      const apiValues = {
        'base': MAPS_PLACE,
        'input': location,
        'inputtype': 'textquery',
        'apikey': MAPS_KEY,
      }

      const apiUrl = ''.concat(
        apiValues.base,
        apiParts.input,
        apiValues.input,
        apiParts.inputtype,
        apiValues.inputtype,
        apiParts.apikey,
        apiValues.apikey
      );
      console.log(`Place Search URL: ${apiUrl}`);

      request(apiUrl, (error, response, body) => {
        console.log(`Place Search request responded with code: ${response.statusCode}`);
        if (error) {
          return next(error);
        } else if (!error && response.statusCode == 200){
          const data = JSON.parse(body);
          console.log(data);
          var placeId;
          try {
            placeId = data.candidates[0].place_id;
          } catch (e) {
            throw e;
          }
          if (placeId) {
            console.log(`Got place_id: ${placeId}`);

            const detailsApiValues = {
              'base': MAPS_DETAILS,
              'placeid': placeId,
            }

            const detailsApiUrl = ''.concat(
              detailsApiValues.base,
              apiParts.placeid,
              detailsApiValues.placeid,
              apiParts.apikey,
              apiValues.apikey
            );

            request(detailsApiUrl, (err, response, body) => {
              if (err) {
                return next(err);
              } else if (!err && response.statusCode == 200) {
                const data = JSON.parse(body);
                console.log(data);
                const actualPage = '/l/[id]';
                const queryParams = {
                  itemId: data.result.id, 
                  itemName: data.result.name, 
                  itemLat: data.result.geometry.location.lat,
                  itemLng: data.result.geometry.location.lng,
                };

                app.render(req, res, actualPage, queryParams);
              }
            })
          } else {
            throw Error(`place_id: ${data.candidates[0].place_id}`);
          };
        }
      });
    });

    // catch all routes.
    server.get('*', (req, res) => {
      // return it to handler function above.  
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