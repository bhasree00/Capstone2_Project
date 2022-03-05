import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Restaurants from '../Restaurants/Restaurants';
import GasStations from '../GasStations/GasStations';

const MainScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Main Screen</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Restaurants/>
      <GasStations/>
    </View>
  );
}

export default MainScreen;