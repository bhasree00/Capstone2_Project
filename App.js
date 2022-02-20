import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// API Key: 12c996b575d9fdecc82ac92b59ebd3aa
export default function App() {
  let API_KEY = '12c996b575d9fdecc82ac92b59ebd3aa';

  const [latitude, onChangeLatitude] = React.useState('37.9485');
  const [longitude, onChangeLongitude] = React.useState('-91.7715');

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&units=imperial&appid=${API_KEY}`)
      .then(resp => resp.json()) // have to use another then because resp.json returns a Promise
      .then(data => {
        console.log(data.current);
      });
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Latitude</Text>
        <TextInput
          onChangeText={onChangeLatitude}
          value={latitude}
          placeholder="37.9485"
          keyboardType="numeric"
        />
        <Text>Longitude</Text>
        <TextInput
          onChangeText={onChangeLongitude}
          value={longitude}
          placeholder="-91.7715"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={fetchWeather}>
          <Text>Fetch Weather Data</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
