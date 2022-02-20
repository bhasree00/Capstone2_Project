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
        console.log(data);
      });
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.inputLabel}>Latitude</Text>
          <TextInput
            onChangeText={onChangeLatitude}
            value={latitude}
            placeholder="37.9485"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Longitude</Text>
          <TextInput
            onChangeText={onChangeLongitude}
            value={longitude}
            placeholder="-91.7715"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={fetchWeather}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Fetch Weather Data</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 10,
  },
  textContainer: {
    height: '40%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 'fit-content'
  },
  buttonText: {
    fontSize: 24,
    padding: 10
  },
  inputLabel: {
    fontSize: 24,
    marginBottom: 5
  },
  input: {
    fontSize: 16,
    marginBottom: 10
  }
});
