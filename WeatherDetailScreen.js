import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info of ${navigation.getParam('city', 'Unknown')}`,
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
    let windspeed = this.state.wind.speed;
    let humidity = this.state.main.humidity;
    var comment;
   
    if(celsius<0){
      comment = "엄청 추운 날씨입니다.\n 꽁꽁 싸메고 가세요~!\n";
    }
    else if (celsius<10){
      comment = "적당히 추운 날씨네요.\n 두꺼운 외투 하나 챙기시길~ \n";
    }
    else if(celsius<20){
      comment = "선선한 날씨네요.\n 가디건 챙기시는거 추천드립니다~\n";
    }
    else if(celsius<30){
      comment = "날씨가 점점 더워지네요.......";
      }
    else {
              comment = "너무 더운 날씨...... 집이 최고...";
        }
    return (
      <View style={styles.container}>
        <Text style={styles.weather}>{celsius.toFixed(1)}°</Text>
        <Image
            style ={styles.img}
            source = {{uri: `http://openweathermap.org/img/w/${icon}.png`}}
            />
      
        <Text style={styles.ws}>바람 세기 : {windspeed}m/s</Text>
        <Text style={styles.ws}>습도 : {humidity}%</Text>
        <Text style={styles.cmt}>{comment}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight,
    
    
  },
  ws:{
    color: 'white',
    textAlign: 'right',
    fontSize: 20,
    marginRight : 10,
  },
  weather:{
    color: 'white',
    fontSize : 100,
    textAlign : "center",
    fontWeight: 'bold',
  },
  cmt:{
    color: 'white',
    fontSize : 20,
    textAlign : "center",
    fontWeight: 'bold',
  },
  img:{
    alignSelf: 'flex-start',
      width : 200,
      height: 180,
     marginLeft : 110,

  }
});
