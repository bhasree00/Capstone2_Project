import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
// import CalendarPicker from 'react-native-calendar-picker';

const weather_key = '12c996b575d9fdecc82ac92b59ebd3aa';

const tomtom_key1 = '9OEKF3EUekl4qDOM8AVGCmoTPtlo57KL';
const tomtom_key2 = 'ky9TBTZk20BliDqyHlAfKTCxBMCt0Lbl';
const tomtom_key3 = 'jQGF4OYhMbnQd9gRfb2RNlNYsROkKM3D';
const tomtom_key4 = 'qmwAbUj1JosnSAGZUEL1x6YH4xyiq0wq';
const tomtom_key5 = 'SvfsAu9el7zEw1LccBA0a20hTAGPHv0A';
const tomtom_key6 = 'G6qbP5T58DVy27maIeP1ZeNqhi4PYjTn';
const tomtom_key7 = 'm6Ze4jgMbTvaFILWUTgMpGIreiBQJdk6';
const tomtom_key8 = '7X5Givn1tjt56RUnuksiUsJ6moibPGvw';
const tomtom_key9 = 'Or0pgtGzGjiwytKjc9quLgmkAFpAjhzB';
const tomtom_key10 = '22JKckl6DfcZPC54LWlMTpRi5VAwUhSd';

const tomtom_arr = [
  tomtom_key1,
  tomtom_key2,
  tomtom_key3,
  tomtom_key4,
  tomtom_key5,
  tomtom_key6,
  tomtom_key7,
  tomtom_key8,
  tomtom_key9,
  tomtom_key10
];

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

  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [weatherArr, onChangeWeatherArr] = React.useState([]);
  const [distance, onChangeDistance] = React.useState(0);

  const currentLat = 37.9485;
  const currentLon = -91.7715;

  let index = 0;
  let tempArr = [];
  let locName = "";
  let tomtomCount = 0;
  let tomtom_key = tomtom_key1;
  let tempOffset = 0;

  // Potential Weather issues:
  let thunderstorm = false; // id = 2xx
  let drizzle = false; // id = 3xx
  let rain = false; // id = 5xx
  let snow = false; // id = 6xx
  let fog = false; // id = 741
  let weatherCondition = "";

  const handleClose = (date) => {
    setDate(date);
    updateCoords(date);
  }

  const coords = React.useRef();
  const updateCoords = (date) => {
    // Get current desination weather
    // getWeather(lat, lon);

    // Get offset from current datetime
    tempOffset = Math.trunc(Math.abs(date - new Date()) / (1000*3600));
    setOffset(tempOffset);
    // console.log(tempOffset);

    // if offset is greater than 7 days, then we don't have reliable weather data
    if (tempOffset >= 168) {
      Alert.alert(
        "Weather Conditions",
        "Sorry, we can only forecast reliably up to 7 days in advance",
        [
          {
            text: "Close",
            onPress: () => console.log("Close Pressed"),
            style: "cancel"
          }
        ]
      );
    }
    else {
      // Calculate Distance and show the menu
      getDist(currentLat, currentLon, props.lat, props.lon);
    }
  }

  const getWeather = () => {
    checkWeather();
    Alert.alert(
      "Weather Conditions",
      `${weatherCondition}`,
      [
        {
          text: "Close",
          onPress: () => console.log("Close Pressed"),
          style: "cancel"
        }
      ]
    );
  }

  const getDist = (originLat, originLon, destLat, destLon) => {
    index = 0;
    tempArr = [];
    tomtomCount = 0;
    onChangeWeatherArr([]);

    // calcualte total route
    fetch(`https://api.tomtom.com/routing/1/calculateRoute/${originLat},${originLon}:${destLat},${destLon}/json?&computeBestOrder=true&key=${tomtom_key1}`)
      .then(resp => resp.json()) // have to use another then because resp.json returns a Promise
      .then(total => {
        // console.log(Math.trunc(data.routes[0].summary.travelTimeInSeconds/3600));
        const totalLength = total.routes[0].legs[0].points.length;
        // console.log(totalLength);

        // for every ~50 miles, find the weather
        while(index < totalLength)
        {
          tomtomCount++;
          if(tomtomCount >= tomtom_arr.length) {
            tomtomCount = 0;
          }
          tomtom_key = tomtom_arr[tomtomCount];
          // console.log(data.routes[0].legs[0].points[index]);
          const tempLat = total.routes[0].legs[0].points[index].latitude;
          const tempLon = total.routes[0].legs[0].points[index].longitude;

          // calculate route (for the time) to the next ~50 mile marker
          fetch(`https://api.tomtom.com/routing/1/calculateRoute/${originLat},${originLon}:${tempLat},${tempLon}/json?&computeBestOrder=true&key=${tomtom_key}`)
            .then(resp => resp.json())
            .then(segment => {
              // get the time it takes to get there in hours (used as an index to forecast)
              const hour = Math.trunc(segment.routes[0].summary.travelTimeInSeconds/3600) + tempOffset;

              // only have weather up to 7 days our
              if (hour <= 168) {
                // use hourly forecast if hour < 48 (only have 2 days of hourly forecast)
                if (hour < 48) {
                  // find the weather at this next ~50 mile marker
                  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${weather_key}`)
                  .then(resp => resp.json())
                  .then(data => {
                    // console.log(tempLat);
                    // console.log(hour);
                    // console.log(data.hourly[hour]);
                    const locationWeather = {
                      lat: tempLat,
                      lon: tempLon,
                      weather: data.hourly[hour]
                    };
                    tempArr.push(locationWeather);
                    // console.log(weatherArr.length);
                    // onChangeDestTemp(data.main.temp);
                    // onChangeWeatherIcon(data.weather[0].icon);
                  });
                }
                // otherwise, use the daily forecast
                else {
                  // find the weather at this next ~50 mile marker
                  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${weather_key}`)
                  .then(resp => resp.json())
                  .then(data => {
                    // console.log(data.daily[7].weather[0]);
                    // console.log(tempLat);
                    // console.log(hour);
                    // console.log(data.hourly[hour]);
                    const locationWeather = {
                      lat: tempLat,
                      lon: tempLon,
                      weather: data.daily[Math.trunc(hour/24)]
                    };
                    tempArr.push(locationWeather);
                    // console.log(weatherArr.length);
                    // onChangeDestTemp(data.main.temp);
                    // onChangeWeatherIcon(data.weather[0].icon);
                  });
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
          // this adds ~50 miles to the index
          index += 800;
          // console.log(index);
        }
        onChangeWeatherArr(tempArr);
        // get the distance from the response and display in miles
        // console.log(data.routes[0].legs[0].points.length);
        // console.log(data.routes[0].summary.lengthInMeters*0.000621371);
        // console.log(data.routes[0].summary.lengthInMeters);
        onChangeDistance(total.routes[0].summary.lengthInMeters*0.000621371);
      });
  }

  const checkWeather = () => {
    // reset weather alers (should be redundant)
    thunderstorm = false; // id = 2xx
    drizzle = false; // id = 3xx
    rain = false; // id = 5xx
    snow = false; // id = 6xx
    fog = false; // id = 741
    weatherCondition = "";
    // console.log(weatherArr);

    for(let i = 0; i < weatherArr.length; i++) {
      // console.log(weatherArr);
      // console.log(weatherArr[i].weather.weather[0].id);

      // check for thunderstorms
      if(weatherArr[i].weather.weather[0].id >= 200 && weatherArr[i].weather.weather[0].id < 300)
      {
        thunderstorm = true;
      }
      // check for drizzle
      else if(weatherArr[i].weather.weather[0].id >= 300 && weatherArr[i].weather.weather[0].id < 400)
      {
        drizzle = true;
      }
      // check for rain
      else if(weatherArr[i].weather.weather[0].id >= 500 && weatherArr[i].weather.weather[0].id < 600)
      {
        rain = true;
      }
      // check for snow
      else if(weatherArr[i].weather.weather[0].id >= 600 && weatherArr[i].weather.weather[0].id < 700)
      {
        snow = true;
      }
      // check for fog
      else if(weatherArr[i].weather.weather[0].id == 741)
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
      <Text style={styles.sectionHeader}>When are you leaving?</Text>
      <View
        id="dateWrapper"
        style={styles.dateBarWrapper}
      >
        <Pressable
          onPress={() => {
            setOpen(true);
          }}
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
      <Text style={styles.sectionHeader}>Where are you leaving from?</Text>
      <View
        id="originWrapper"
        style={styles.dateBarWrapper}
      >
        <Pressable
          style={styles.dateBar}
        >
          <Image
            style={styles.calendarIcon}
            source={require('../images/pin-icon.png')}
          />
          <Text style={styles.dateBarText}>
            Rolla, MO
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={getWeather}
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
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          handleClose(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

export default PlanTripScreen;