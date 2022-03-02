import * as React from 'react';
import { Button, View, Text } from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Main Screen</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default MainScreen;