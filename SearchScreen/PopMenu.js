import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GetLocation from 'react-native-get-location'
import { useNavigation } from '@react-navigation/native';

MapboxGL.setAccessToken('pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw');
const tomtom_key = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';

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
  }
});

const PopMenu = (props) => {
  const mapbox_token = 'pk.eyJ1Ijoibmlja2Z1bGxlciIsImEiOiJjbDBzY2ZtdW8wMDRrM2xuM3dwbXozdzNjIn0.hSoWZ6hIKLCOSpLfO0lrPw';
  // const { lat, lon } = dest;
  const navigation = useNavigation();

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
          destLat: props.lat,
          destLon: props.lon
        }) }
      ]
    );
  });
  
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
        <Pressable
          onPress={() => navigation.navigate('PlanTrip')}
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
    </View>
  );
}

export default PopMenu;