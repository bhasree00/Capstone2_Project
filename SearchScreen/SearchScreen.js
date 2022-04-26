import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import AutoCompleteInput from "react-native-tomtom-autocomplete";
import GetLocation from 'react-native-get-location'
import PopMenu from './PopMenu';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Possible...']); // Ignore log notification by message

MapboxGL.setAccessToken('pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw');
const weather_key = '12c996b575d9fdecc82ac92b59ebd3aa';

// there is a max of 5 requests per second per key so to get around that, I have ten
// keys that are cycled
const tomtom_key1 = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';
const tomtom_key2 = 'ky9TBTZk20BliDqyHlAfKTCxBMCt0Lbl';
const tomtom_key3 = 'jQGF4OYhMbnQd9gRfb2RNlNYsROkKM3D';
const tomtom_key4 = 'qmwAbUj1JosnSAGZUEL1x6YH4xyiq0wq';
const tomtom_key5 = 'SvfsAu9el7zEw1LccBA0a20hTAGPHv0A';
const tomtom_key6 = 'G6qbP5T58DVy27maIeP1ZeNqhi4PYjTn';
const tomtom_key7 = 'm6Ze4jgMbTvaFILWUTgMpGIreiBQJdk6';
const tomtom_key8 = '7X5Givn1tjt56RUnuksiUsJ6moibPGvw';
const tomtom_key9 = 'Or0pgtGzGjiwytKjc9quLgmkAFpAjhzB';
const tomtom_key10 = '22JKckl6DfcZPC54LWlMTpRi5VAwUhSd';

const tomtom_arr = [
  tomtom_key1,
  tomtom_key2,
  tomtom_key3,
  tomtom_key4,
  tomtom_key5,
  tomtom_key6,
  tomtom_key7,
  tomtom_key8,
  tomtom_key9,
  tomtom_key10
];

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1
  },
  popMenu: {
    position: 'absolute'
  },
  temp: {
    height: '5%'
  },
  backArrow: {
    width: 30,
    height: 30
  },
  arrowContainer: {
    marginRight: 'auto',
  },
  header: {
    width: '100%',
    marginTop: '10%',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: '33%'
  }
});

const SearchScreen = ({navigation}) => {
  const mapbox_token = 'pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw';
  let lat;
  let lon;
  let index = 0;
  let tempArr = [];
  let locName = "";
  let tomtomCount = 0;
  let tomtom_key = tomtom_key1;

  // let currentLat;
  // let currentLon;

  // GetLocation.getCurrentPosition({
  //   enableHighAccuracy: true,
  //   timeout: 15000,
  // })
  // .then(location => {
  //   console.log(location);
  //   currentLat = location.latitude;
  //   currentLon = location.longitude;
  // })
  // .catch(error => {
  //   const { code, message } = error;
  //   console.warn(code, message);
  // })
  const currentLat = 37.9485;
  const currentLon = -91.7715;

  const [latitude, onChangeLatitude] = React.useState(37.9485);
  const [longitude, onChangeLongitude] = React.useState(-91.7715);
  const [destName, onChangeDestName] = React.useState("Hello");
  const [distance, onChangeDistance] = React.useState(0);
  const [destTemp, onChangeDestTemp] = React.useState(0);
  const [weatherIcon, onChangeWeatherIcon] = React.useState("13d");
  const [weatherArr, onChangeWeatherArr] = React.useState([]);

  const [showMenu, onSetShowMenu] = React.useState(false);

  const coords = React.useRef();
  const updateCoords = React.useCallback(() => {
    // Reset menu
    onSetShowMenu(false);

    // Get current desination weather
    getWeather(lat, lon);

    // Calculate Distance and show the menu
    getDist(currentLat, currentLon, lat, lon);

    // show menu after 2 seconds (give api requests time)
    setTimeout(() => {
      onSetShowMenu(true);
    }, 2000);

    // Move camera
    coords.current.setCamera({
      centerCoordinate: [lon, lat],
      zoomLevel: 10,
      animationDuration: 3000,
    });
  });

  const getWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weather_key}`)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        onChangeDestTemp(data.main.temp);
        onChangeWeatherIcon(data.weather[0].icon);
      });
  }

  const getDist = (originLat, originLon, destLat, destLon) => {
    index = 0;
    tempArr = [];
    tomtomCount = 0;

    // calcualte total route
    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${originLat},${originLon}:${destLat},${destLon}/json?&computeBestOrder=true&key=${tomtom_key1}`)
      .then(resp => resp.json()) // have to use another then because resp.json returns a Promise
      .then(total => {
        // console.log(Math.trunc(data.routes[0].summary.travelTimeInSeconds/3600));
        const totalLength = total.routes[0].legs[0].points.length;
        // console.log(totalLength);

        // for every ~50 miles, find the weather
        while(index < totalLength)
        {
          tomtomCount++;
          if(tomtomCount >= tomtom_arr.length) {
            tomtomCount = 0;
          }
          tomtom_key = tomtom_arr[tomtomCount];
          // console.log(data.routes[0].legs[0].points[index]);
          const tempLat = total.routes[0].legs[0].points[index].latitude;
          const tempLon = total.routes[0].legs[0].points[index].longitude;

          // calculate route (for the time) to the next ~50 mile marker
          fetch(`https://api.tomtom.com/routing/1/calculateRoute/${originLat},${originLon}:${tempLat},${tempLon}/json?&computeBestOrder=true&key=${tomtom_key}`)
            .then(resp => resp.json())
            .then(segment => {
              // get the time it takes to get there in hours (used as an index to forecast)
              const hour = Math.trunc(segment.routes[0].summary.travelTimeInSeconds/3600);

              // find the weather at this next ~50 mile marker
              fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${weather_key}`)
                .then(resp => resp.json())
                .then(data => {
                  // console.log(tempLat);
                  // console.log(hour);
                  // console.log(data.hourly[hour]);
                  const locationWeather = {
                    lat: tempLat,
                    lon: tempLon,
                    weather: data.hourly[hour]
                  };
                  tempArr.push(locationWeather);
                  // console.log(weatherArr.length);
                  // onChangeDestTemp(data.main.temp);
                  // onChangeWeatherIcon(data.weather[0].icon);
                });
            })
            .catch((error) => {
              // DO NOTHING
              console.log(error);
            });
          // this adds ~50 miles to the index
          index += 800;
          // console.log(index);
        }
        onChangeWeatherArr(tempArr);
        // get the distance from the response and display in miles
        // console.log(data.routes[0].legs[0].points.length);
        // console.log(data.routes[0].summary.lengthInMeters*0.000621371);
        // console.log(data.routes[0].summary.lengthInMeters);
        onChangeDistance(total.routes[0].summary.lengthInMeters*0.000621371);
      });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Pressable
        onPress={() => navigation.navigate('Main')}
        style={styles.temp}
      >
        <Text>Main Screen</Text>
      </Pressable> */}
      <View style={styles.header}>
        <Pressable style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <Image
            style={styles.backArrow}
            source={require('../images/back-arrow.png')}
          />
        </Pressable>
        <Text style={styles.headerText}>Trip Planner</Text>
      </View>
      <AutoCompleteInput
        inputProps={{
          placeholder: "Where do you want to go?",
        }}
        onPress={(item) => {
          // console.log(item);
          onChangeDestName(item.address.freeformAddress);
          lat = item.position.lat;
          onChangeLatitude(item.position.lat);
          onChangeLongitude(item.position.lon);
          lon = item.position.lon;
          updateCoords();
        }}
        inputContainerStyle={{
          padding: 10,
          margin: 5,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          shadowOffset: {
            width: 0,
            height: 4
          },
          shadowRadius: 4,
          shadowOpacity: 0.15,
          width: '85%'
        }}
        listItemsContainerStyle={{
          padding: 10,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "grey"
        }}
        bottomDivider
        tomtomOptions={{ key: tomtom_key }}
      />
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
        >
          <MapboxGL.Camera
            ref={coords}
          />
        </MapboxGL.MapView>
      </View>
      {showMenu ? <PopMenu
        style={styles.popMenu}
        lat={latitude}
        lon={longitude}
        name={destName}
        dist={distance}
        temp={destTemp}
        icon={weatherIcon}
        weatherArr={weatherArr}
      /> : null}
    </View>
  );
}

export default SearchScreen;