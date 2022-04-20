import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image, TurboModuleRegistry } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location'
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import PlanTripScreen from '../PlanTripScreen/PlanTripScreen';

MapboxGL.setAccessToken('pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw');

// keys that are cycled
// const tomtom_key1 = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';
// const tomtom_key2 = 'ky9TBTZk20BliDqyHlAfKTCxBMCt0Lbl';
// const tomtom_key3 = 'jQGF4OYhMbnQd9gRfb2RNlNYsROkKM3D';
// const tomtom_key4 = 'qmwAbUj1JosnSAGZUEL1x6YH4xyiq0wq';
// const tomtom_key5 = 'SvfsAu9el7zEw1LccBA0a20hTAGPHv0A';
// const tomtom_key6 = 'G6qbP5T58DVy27maIeP1ZeNqhi4PYjTn';
// const tomtom_key7 = 'm6Ze4jgMbTvaFILWUTgMpGIreiBQJdk6';
// const tomtom_key8 = '7X5Givn1tjt56RUnuksiUsJ6moibPGvw';
// const tomtom_key9 = 'Or0pgtGzGjiwytKjc9quLgmkAFpAjhzB';
// const tomtom_key10 = '22JKckl6DfcZPC54LWlMTpRi5VAwUhSd';
// const tomtom_arr = [
//   tomtom_key1,
//   tomtom_key2,
//   tomtom_key3,
//   tomtom_key4,
//   tomtom_key5,
//   tomtom_key6,
//   tomtom_key7,
//   tomtom_key8,
//   tomtom_key9,
//   tomtom_key10
// ];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '30%',
    width: '100%',
    backgroundColor: 'white',
    paddingRight: '10%',
    paddingLeft: '10%',
    paddingTop: '5%'
  },
  button: {
    padding: '5%',
    paddingLeft: '10%',
    paddingRight: '10%',
    borderRadius: 15
  },
  rowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  rowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '8%',
    marginTop: '1%'
  },
  rowThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  text: {
    fontSize: 20
  },
  header: {
    fontSize: 24,
    fontWeight: '700'
  },
  xIcon: {
    width: 25,
    height: 25
  }
});

const PopMenu = (props) => {
  const mapbox_token = 'pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw';
  
  const navigation = useNavigation();

  // Associated with using current location:~~~~~~~~~~~~~~~~~~~
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

  // Associated with city names:~~~~~~~~~~~~~~~~
  // let tomtomCount = 0;
  // let tomtom_key = tomtom_key1;

  // Potential Weather issues:
  let thunderstorm = false; // id = 2xx
  let drizzle = false; // id = 3xx
  let rain = false; // id = 5xx
  let snow = false; // id = 6xx
  let fog = false; // id = 741
  let weatherCondition = "";

  const [latitude, onChangeLatitude] = React.useState(37.9485);
  const [longitude, onChangeLongitude] = React.useState(-91.7715);
  const [showModal, onChangeShowModal] = React.useState(false);

  // const coords = React.useRef();
  const updateCoords = React.useCallback(() => {
    checkWeather();
    // console.log(props.weatherArr);
    // for(let i = 0; i < props.weatherArr.length; i++) {
    //   // Associated with the name of cities:~~~~~~~~~~~~~~~~~~~~`
    //   // tomtomCount++;
    //   // if(tomtomCount >= tomtom_arr.length) {
    //   //   tomtomCount = 0;
    //   // }
    //   // tomtom_key = tomtom_arr[tomtomCount];
      
    //   // console.log(props.weatherArr[i].weather.weather[0].id);
    //   // console.log(props.weatherArr.length);
    //   const lat = props.weatherArr[i].lat;
    //   const lon = props.weatherArr[i].lon;

    //   // This was all about getting the name of cities associated with the 50 mile
    //   // weather checks:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //   // const index = i;
    //   // fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${tomtom_key}`)
    //   //   .then(resp => resp.json())
    //   //   .then(loc => {
    //   //     console.log(index + ": " + loc.addresses[0].address.municipality + ", " + loc.addresses[0].address.countrySubdivision);
    //   //     // console.log(locName);
    //   //   })
    //   //   .catch(err => {
    //   //     // do nothing
    //   //   });
    // }
    Alert.alert(
      "Weather Conditions",
      `${weatherCondition}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Proceed", onPress: () => navigation.navigate('Navigation', {
          // originLat: currentLat,
          // originLon: currentLon,
          destLat: props.lat,
          destLon: props.lon
        }) }
      ]
    );
  });

  const checkWeather = () => {
    // reset weather alers (should be redundant)
    thunderstorm = false; // id = 2xx
    drizzle = false; // id = 3xx
    rain = false; // id = 5xx
    snow = false; // id = 6xx
    fog = false; // id = 741
    weatherCondition = "";

    for(let i = 0; i < props.weatherArr.length; i++) {
      console.log(props.weatherArr[i].weather.weather[0].id);

      // check for thunderstorms
      if(props.weatherArr[i].weather.weather[0].id >= 200 && props.weatherArr[i].weather.weather[0].id < 300)
      {
        thunderstorm = true;
      }
      // check for drizzle
      else if(props.weatherArr[i].weather.weather[0].id >= 300 && props.weatherArr[i].weather.weather[0].id < 400)
      {
        drizzle = true;
      }
      // check for rain
      else if(props.weatherArr[i].weather.weather[0].id >= 500 && props.weatherArr[i].weather.weather[0].id < 600)
      {
        rain = true;
      }
      // check for snow
      else if(props.weatherArr[i].weather.weather[0].id >= 600 && props.weatherArr[i].weather.weather[0].id < 700)
      {
        snow = true;
      }
      // check for fog
      else if(props.weatherArr[i].weather.weather[0].id == 741)
      {
        fog = true;
      }

      // Associated with the name of cities:~~~~~~~~~~~~~~~~~~~~`
      // tomtomCount++;
      // if(tomtomCount >= tomtom_arr.length) {
      //   tomtomCount = 0;
      // }
      // tomtom_key = tomtom_arr[tomtomCount];
      
      // console.log(props.weatherArr.length);
      // const lat = props.weatherArr[i].lat;
      // const lon = props.weatherArr[i].lon;

      // This was all about getting the name of cities associated with the 50 mile
      // weather checks:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // const index = i;
      // fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${tomtom_key}`)
      //   .then(resp => resp.json())
      //   .then(loc => {
      //     console.log(index + ": " + loc.addresses[0].address.municipality + ", " + loc.addresses[0].address.countrySubdivision);
      //     // console.log(locName);
      //   })
      //   .catch(err => {
      //     // do nothing
      //   });
    }

    // Determine Alert message
    if(snow) {
      if(thunderstorm) {
        weatherCondition = "You'll be driving through snow and thunderstorms... do you really have to travel??";
      }
      else if(rain) {
        weatherCondition = "You might drive through some snow and rain... maybe just stay home...?";
      }
      else if(fog) {
        weatherCondition = "You might drive through some snow and fog... drive slow and get some new headlights for crying out loud!";
      }
      else {
        weatherCondition = "Looks like you might drive through some snow... Drive SLOW";
      }
    }
    else if(thunderstorm) {
      if(fog) {
        weatherCondition = "Thunderstorm + fog = wait a day (or two, or three)";
      }
      else {
        weatherCondition = "Looks like you'll be driving through thunderstorms... maybe just don't go";
      }
    }
    else if(rain) {
      if(fog) {
        weatherCondition = "Gonna be driving through rain and fog... so now's a good time to replace those ancient headlights";
      }
      else {
        weatherCondition = "You might drive through some rain... use those wipers!";
      }
    }
    else if(drizzle) {
      weatherCondition = "You might drive through a little drizzle... you can handle that (probably)";
    }
    else if(fog) {
      weatherCondition = "There could be fog on your route... might want to replace those headlights finally";
    }
    else {
      weatherCondition = "Looks like a smooth ride... don't do anything stupid:)"
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.rowOne}>
        <View>
          <Text style={styles.header}>{props.name}</Text>
        </View>
        <Image 
          source={{ uri: `https://openweathermap.org/img/wn/${props.icon}.png` }}
          style={{ width: 60, height: 60, margin: 0 }}
        />
      </View>
      <View style={[styles.rowTwo]}>
        <Text style={styles.text}>{Math.trunc(props.temp)} °F</Text>
        <Text style={styles.text}>{Math.trunc(props.dist)} mi</Text>
      </View>
      <View style={styles.rowThree}>
        <Pressable
          onPress={updateCoords}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'red': 'blue'
            },
            styles.button
          ]}
        >
          <Text style={styles.buttonText}>Directions</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => navigation.navigate('PlanTrip', {
            name: props.name,
            icon: `https://openweathermap.org/img/wn/${props.icon}.png`,
            temp: props.temp,
            dist: props.dist
          })}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'red': 'blue'
            },
            styles.button
          ]}
        >
          <Text style={styles.buttonText}>Plan Trip</Text>
        </Pressable> */}
        <Pressable
          onPress={() => onChangeShowModal(true)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'red': 'blue'
            },
            styles.button
          ]}
        >
          <Text style={styles.buttonText}>Plan Trip</Text>
        </Pressable>
      </View>
      <Modal isVisible={showModal}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, height: '75%'}}>
          <Pressable
            onPress={() => onChangeShowModal(false)}
            style={{ marginLeft: 'auto', marginRight: '5%', marginTop: '5%' }}
          >
            <Image
              style={styles.xIcon}
              source={require('../images/x-icon.png')}
            />
          </Pressable>
          <PlanTripScreen
            name={props.name}
            icon={`https://openweathermap.org/img/wn/${props.icon}.png`}
            temp={props.temp}
            dist={props.dist}
            lat={props.lat}
            lon={props.lon}
          />
        </View>
      </Modal>
    </View>
  );
}

export default PopMenu;