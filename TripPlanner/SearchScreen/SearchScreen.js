import * as React from 'react';
import { View, Text, Pressable} from 'react-native';

const SearchScreen = ({navigation}) => {
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

    </View>
  );
}

export default SearchScreen;