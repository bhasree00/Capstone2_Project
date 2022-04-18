import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import AutoCompleteInput from "react-native-tomtom-autocomplete";
import GetLocation from 'react-native-get-location'
import PopMenu from './PopMenu';

MapboxGL.setAccessToken('pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw');
const tomtom_key = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';
const weather_key = '12c996b575d9fdecc82ac92b59ebd3aa';

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
  }
});

const SearchScreen = ({navigation}) => {
  const mapbox_token = 'pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw';
  let lat;
  let lon;


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

  const [showMenu, onSetShowMenu] = React.useState(false);

  const coords = React.useRef();
  const updateCoords = React.useCallback(() => {
    // Reset menu
    onSetShowMenu(false);

    // Get current desination weather
    getWeather(lat, lon);

    // Calculate Distance and show the menu
    getDist(currentLat, currentLon, lat, lon);

    // show menu
    onSetShowMenu(true);

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
        console.log(data);
        onChangeDestTemp(data.main.temp);
        onChangeWeatherIcon(data.weather[0].icon);
      });
  }

  const getDist = (originLat, originLon, destLat, destLon) => {
    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${originLat},${originLon}:${destLat},${destLon}/json?&key=${tomtom_key}`)
      .then(resp => resp.json()) // have to use another then because resp.json returns a Promise
      .then(data => {
        // get the distance from the response and display in miles
        onChangeDistance(data.routes[0].summary.lengthInMeters*0.000621371);
      });
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        onPress={() => navigation.navigate('Main')}
        style={styles.temp}
      >
        <Text>Main Screen</Text>
      </Pressable>
      <AutoCompleteInput
        inputProps={{
          placeholder: "Where do you want to go?",
        }}
        onPress={(item) => {
          console.log(item);
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
          // padding: 10,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "grey",
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
      /> : null}
    </View>
  );
}

export default SearchScreen;