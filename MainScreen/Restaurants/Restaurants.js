import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import RestaurantComponent from './RestaurantComponent';
import styles from '../style';

const Restaurants = ({navigation}) => {
  const [latitude, onChangeLatitude] = React.useState(37.9485);
  const [longitude, onChangeLongitude] = React.useState(-91.7715);

  const API_KEY = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL' // tom tom
  const LIMIT = 20 // number of total responses
  const RADIUS = 1000 // search radius (in meters)
  const RESTAURANTS = 7315 // category code found in example: https://developer.tomtom.com/search-api/documentation/search-service/category-search

  const fetchRestaurants = () => {
    // This element will hold all photos
    const container = document.getElementById("restaurantPhotoContainer");

    // find nearby restaurants
    fetch(`https://api.tomtom.com/search/2/poiSearch/.json?key=${API_KEY}&limit=${LIMIT}&lat=${latitude}&lon=${longitude}&radius=${RADIUS}&categorySet=${RESTAURANTS}`)
      .then(resp => resp.json()) // have to use another then because resp.json returns a Promise
      .then(data => {
        // console.log('poi category search successful');

        // this will sort by distance from latitude and longitude
        data.results.sort((r1,r2) => r1.dist - r2.dist);
        // console.log(data.results);

        // the following for loop will get more info for each restaurant
        for (let i = 0; i < data.results.length; i++) {
          // This will return address even if something is missing
          let address = "";
          if (data.results[i].address.hasOwnProperty('streetNumber')) {
            address += (data.results[i].address.streetNumber + " ");
          }
          if (data.results[i].address.hasOwnProperty('streetName')) {
            address += (data.results[i].address.streetName + ", ");
          }
          if (data.results[i].address.hasOwnProperty('municipality')) {
            address += (data.results[i].address.municipality);
          }
          // console.log('Address -> ', address);

          // This will display the distance by converting meters to miles
          // console.log('Distance: ', data.results[i].dist * 0.000621);

          // we will only look for more details if this poi has more details
          if (data.results[i].hasOwnProperty('dataSources')) {
            // console.log('Name =', data.results[i].poi.name);

            // this will return address only if whole address is there
            if (data.results[i].address.hasOwnProperty('streetNumber') && data.results[i].address.hasOwnProperty('streetName') && data.results[i].address.hasOwnProperty('municipality')) {
              // console.log('Address: %s %s, %s', data.results[i].address.streetNumber, data.results[i].address.streetName, data.results[i].address.municipality);
            }

            // get more details (rating, price, photo)
            fetch(`https://api.tomtom.com/search/2/poiDetails.json?key=${API_KEY}&id=${data.results[i].dataSources.poiDetails[0].id}`)
            .then(resp => resp.json())
            .then(details => {
              // console.log('poi details search successful');
              // console.log(details);

              if (details.result.hasOwnProperty('rating')) {
                // console.log('Rate (max is 10) =', details.result.rating.value);
              }

              if (details.result.hasOwnProperty('priceRange')) {
                // console.log('Price (max is 4) =', details.result.priceRange.value);
              }

              // next we will grab the first photo for each business (if they have a photo)
              if (details.result.hasOwnProperty('photos')) {
                const photo = document.createElement("img");
                photo.src = `https://api.tomtom.com/search/2/poiPhoto?key=${API_KEY}&id=${details.result.photos[0].id}&width=100&height=100`;
                //container.append(photo);

                // fetch(`https://api.tomtom.com/search/2/poiPhoto?key=${API_KEY}&id=${details.result.photos[0].id}&width=100&height=100`)
                //   .then(image => {
                //     console.log(image);
                //   })
              }
            });
          }
        }
    });
  }

  return (
    <View style={styles.sectionWrapper}>
      {/* <Button
        title="Fetch Restaurants"
        onPress={fetchRestaurants}
      />
      <div id="restaurantPhotoContainer"></div> */}
      <Text style={styles.sectionHeader}>Explore Restaurants</Text>
      <RestaurantComponent/>
    </View>
  );
}

// const styles = StyleSheet.create({
//   sectionWrapper: {
//     flex: 1,
//     minHeight: 'fit-content',
//     marginTop: '1rem',
//     marginBottom: '1rem'
//   }
// });

export default Restaurants;