import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
// import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
  button: {
    padding: '5%',
    borderRadius: 15,
    alignItems: 'center',
    width: '50%',
    margin: '1%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginRight: '5%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'center'
    // marginBottom: '5%',
  },
  container: {
    flex: 1,
    width: '100%'
  },
  map: {
    flex: 1
  },
  popMenu: {
    position: 'absolute'
  },
  temp: {
    padding: 10
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
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: '33%'
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '2%'
  },
  dateBarWrapper: {
    marginBottom: 16,
    // marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dateBar: {
    width: '90%',
    height: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.15,
    flexDirection: 'row'
  },
  dateBarText: {
    fontSize: 16
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginLeft: 8
  },
  rowOne: {
    paddingRight: '5%',
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  rowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  text: {
    fontSize: 20
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: '700'
  }
  // backgroundImage: {
  //   resizeMode: 'cover',
  //   height: 250,
  //   justifyContent: 'flex-end',
  // },
  // headerTextWrapper: {
  //   marginLeft: 16,
  //   paddingBottom: 24
  // },
  // headerTitle: {
  //   fontSize: 28,
  //   color: 'white',
  //   fontWeight: '500'
  // },
  // headerSubTitle: {
  //   fontSize: 12,
  //   color: 'white',
  //   flexDirection:'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center'
  // },
});

// const PlanTripScreen = ({ route, navigation }) => {
const PlanTripScreen = (props) => {
  const navigation = useNavigation();
  // const { name, icon, temp, dist } = route.params;

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ height: '90%', backgroundColor: 'white' }}>
      {/* <ImageBackground
        id="header"
        source={require("../MainScreen/images/headerImage.jpeg")}
        style={styles.backgroundImage}
      >
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>Let's Plan Your Next Trip</Text>
          <Text style={styles.headerSubTitle}>Location</Text>
          <Text style={styles.headerSubTitle}>Weather</Text>
        </View>
      </ImageBackground> */}
      {/* <View style={styles.header}>
        <Pressable style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <Image
            style={styles.backArrow}
            source={require('../images/back-arrow.png')}
          />
        </Pressable>
        <Text style={styles.headerText}>Trip Planner</Text>
      </View> */}
      <View style={styles.rowOne}>
        <View>
          <Text style={styles.locationTitle}>{props.name}</Text>
        </View>
        <Image 
          source={{ uri: props.icon }}
          style={{ width: 60, height: 60, margin: 0 }}
        />
      </View>
      <View style={[styles.rowTwo]}>
        <Text style={styles.text}>{Math.trunc(props.temp)} °F</Text>
        <Text style={styles.text}>{Math.trunc(props.dist)} mi</Text>
      </View>
      <View style={{ width: '100%', backgroundColor: 'black', height: 2, marginTop: '5%'}}/>
      <Text style={styles.sectionHeader}>When do you want to leave?</Text>
      <View
        id="dateWrapper"
        style={styles.dateBarWrapper}
      >
        <Pressable
          onPress={() => setOpen(true)}
          style={styles.dateBar}
        >
          <Image
            style={styles.calendarIcon}
            source={require('../images/calendar-icon.jpeg')}
          />
          <Text style={styles.dateBarText}>
            {date.toDateString()} at {date.getHours()}:{date.getMinutes()}
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={() => console.log('nothing')}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'red': 'blue'
            },
            styles.button
          ]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
      {/* <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'red': 'blue'
          },
          styles.button
        ]}
        onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}>When are you leaving?</Text>
      </Pressable> */}
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

export default PlanTripScreen;