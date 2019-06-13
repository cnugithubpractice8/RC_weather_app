import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
     const city = navigation.getParam('city', null);
    //const city = 'Daejeon';

    //fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=a07f11d84de6507dc80bc526b7a44511&q=${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let icon = this.state.weather[0].icon;
    var comment;
   
    if(celsius<20){
      comment= "날이 춥네요";
    }
    else{
      comment="날이 덥네요";
    }
    return (
      <View style={styles.container}>
        <Text style={styles.weather}>{celsius.toFixed(1)}°</Text>
        <Image
            style ={styles.img}
            source = {{uri: `http://openweathermap.org/img/w/${icon}.png`}}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  weather:{
    fontSize : 120,
    textAlign : "center",
    fontWeight: 'bold',
  },
  img:{
      width : 200,
      height: 200,
     

  }
});
