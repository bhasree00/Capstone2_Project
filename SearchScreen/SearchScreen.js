import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import AutoCompleteInput from "react-native-tomtom-autocomplete";
import GetLocation from 'react-native-get-location'

MapboxGL.setAccessToken('pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw');
const tomtom_key = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    height: '80%',
    width: '100%',
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
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

  const [latitude, onChangeLatitude] = React.useState(37.9485);
  const [longitude, onChangeLongitude] = React.useState(-91.7715);

  const coords = React.useRef();
  const updateCoords = React.useCallback(() => {
    coords.current.setCamera({
      centerCoordinate: [lon, lat],
      zoomLevel: 10,
      animationDuration: 3000, 
    });
    setTimeout(() => {
      Alert.alert(
        "For real...?",
        "Are you sure you'd like to travel to this destination?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirm", onPress: () => navigation.navigate('Navigation', {
            // originLat: currentLat,
            // originLon: currentLon,
            destLat: lat,
            destLon: lon
          }) }
        ]
      );
    }, 4000);
  });
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        onPress={() => navigation.navigate('Main')}
      >
        <Text>Main Screen</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Navigation')}
      >
        <Text>Navigation Screen</Text>
      </Pressable>
      <AutoCompleteInput
        inputProps={{
          placeholder: "Where do you want to go?",
        }}
        onPress={(item) => {
          lat = item.position.lat;
          lon = item.position.lon;
          updateCoords();
        }}
        inputContainerStyle={{
          padding: 10,
          margin: 5,
          borderWidth: 4,
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
          borderWidth: 2,
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
            // centerCoordinate={[longitude,latitude]}
            // zoomLevel={2}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

export default SearchScreen;