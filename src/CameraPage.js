import React from 'react';
import {
  AsyncStorage,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraImage from './Image/camera.png';
import { Marker } from 'react-native-maps';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, {PROVIDER_GOOGLE, PROVIDER_DEFAULT} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import geolib from 'geolib';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import CommentBoxInput from './CommentBoxInput';
import Listpage from '../src/Listpage';
import Utils from './Utils';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export async function request_camera_runtime_permission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'XENIA Camera Permission',
        'message': 'XENIA App needs access to your Camera '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    }
    else {
      Alert.alert("Camera Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}


export default class App extends React.Component {
  static navigationOptions = {

      title: "Attendance Manager",
      headerStyle: {
      backgroundColor: '#0080FF',
      borderBottomColor: '#b3b3b3',
      borderBottomWidth: 3,
      height:80,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      justifyContent:'center',
      textAlign:'center',
      // fontWeight: 'bold',
      width:'70%',

    },
  };
  constructor(props) {
    super(props)
    this.state = {
      file:'',
      comment:'',
      type:'Check-In',
      isMapReady:false,
      latitude: '',
      longitude: '',
      latitudeDelta: '',
      longitudeDelta: '',
      receivedCurrentLocation:true,
      loading: false,
      animating: true,
      location: null

    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

  }
  selectPhotoTapped() {
    const options = {

      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      cameraType:'front',
      storageOptions: {
       waitUntilSaved: true,
       cameraRoll: true,
       skipBackup : true,
      },
    };
    ImagePicker.launchCamera(options, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri:response.uri,type:response.type,name:response.fileName};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          file: source,
        });
      }
    });
  }

  componentDidMount() {
    this.findCoordinates();
    console.log('componentDidMount');
      this._isMounted = true;
      const context = this;
      context.askPermissions(context);

    }
  askPermissions(context) {
      //Checking for the permission just after component loaded
      async function requestLocationPermission() {
          console.log('requestLocationPermission');
          try {
              const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log('granted');
                  console.log('show location dialog if gps is off');
                  //To Check, If Permission is granted
                  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                      .then(data => {
                          console.log('enabled or already enabled gps');
                          // The user has accepted to enable the location services
                          // data can be :
                          //  - "already-enabled" if the location services has been already enabled
                          //  - "enabled" if user has clicked on OK button in the popup
                        Geolocation.getCurrentPosition(
                              (position) => {
                                  console.log("current position");
                                  console.log(position);

                                  if (context._isMounted) {
                                      context.setState({
                                              latitude: position.coords.latitude,
                                              longitude: position.coords.longitude
                                      })

                                  }
                              },
                              (error) => console.log(error),
                              { enableHighAccuracy: false, timeout: 2000000, maximumAge: 1000000 },
                          );
                      }).catch(err => {
                          // The user has not accepted to enable the location services or something went wrong during the process
                          // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                          // codes :
                          //  - ERR00 : The user has clicked on Cancel button in the popup
                          //  - ERR01 : If the Settings change are unavailable
                          //  - ERR02 : If the popup has failed to open
                          console.log(err)
                          if (err && err.code === 'ERR00') {
                              BackHandler.exitApp()
                          }
                      });
              } else {
                  console.log('permission denied');
                  BackHandler.exitApp()
              }
          } catch (err) {
              console.log('error in runtime permission block');
              console.warn(err)
          }
      }
      if (Utils.isAndroid()) {
          //Calling the permission function
          requestLocationPermission();
      }
  }
  hideLoader = () => {
      this.setState({ loading: false });
    }

    showLoader = () => {
      this.setState({ loading: true });
    }
   submit=async()=>{
     const {file,comment,longitude,latitude,type} = this.state;

     //  this.setState( {type:xyz} )
     //
     //
     // this.setState( {type:cba} )

     console.log("I am going to call submit api")
const _this = this;
this.showLoader();
const context=this;
var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
var successToken = (context.props.route.params.successToken.token);

var userName = (context.props.route.params.userName.fullname);
var user_id = (context.props.route.params.user_id.userid);
var xyz = (context.props.route.params.xyz);
console.log(permissions_four);
console.log(user_id);
console.log(xyz);

// context.props.navigation.navigate("monthlyreport",{successToken:successToken});
// context.props.navigation.navigate("monthlyreport",{user_id:user_id});
var data = new FormData();
data.append("latitude", this.state.latitude);
console.log(this.state.latitude);
data.append("longitude", this.state.longitude);
data.append("comment", this.state.comment);
data.append("file", this.state.file);
data.append("type", xyz);
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
  console.log(xhr.status)
  console.log(xhr.readyState)
  if (xhr.readyState !== 4) {
              return;
  }
  if (xhr.status === 200) {
    _this.hideLoader();
    console.log("Successfully200")
    Alert.alert(userName,"YOUR ATTENDANCE HAS BEEN SUCCESSFULLY SAVED");
    context.props.navigation.navigate("First");
  }else{
    console.log("inside error")
    Alert.alert("PLEASE FILL ALL COMPONENTS","1) TAKE PICTURE\n2) WRITE COMMENT\n3)WAIT FOR LOADING MAP",[{text:'OK'}]);
      _this.hideLoader();
  }
  console.log(this.responseText);

});
xhr.open("POST", "http://erp.xeamventures.com/api/v1/attendance-location");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.send(data);
   }


hide =()=>{
  const a= Keyboard.dismiss();
}
functionCombined() {
    this.submit();
    this.hide();
}
renderMap(){
  return(
  <Text>naveen</Text>
)
}
findCoordinates = () => {
		Geolocation.getCurrentPosition(
			position => {
				const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        console.log(latitude);
        console.log(longitude);
         this.setState({latitude:latitude});
         this.setState({longitude:longitude});
				// this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: false, timeout: 2000000, maximumAge: 1000000 },
		);
  };
  back(){
    const context=this;
    context.props.navigation.navigate("First");
   }
  render() {
    const animating = this.state.animating
    const context=this;
    const {navigate} = this.props.navigation;
    const card = {card: {width: viewportWidth, height: viewportHeight}};
    var userName = (context.props.route.params.userName.fullname);
    console.log(userName);
    // var  coordinate=;
  const latitude=this.state.latitude;
  const longitude = this.state.longitude;
  var region= {
       latitude: Number(this.state.latitude),
       longitude: Number(this.state.longitude),
       latitudeDelta:.1,
       longitudeDelta: .1,
}
// const kayboard=this.state.KeyboardAvoidingView

    return (

      <KeyboardAvoidingView behavior="position" style={styles.container} keyboardShouldPersistTaps={true} >
        <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
    <View style={{left:'12%',top:hp('36%')}}>
     <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}></Text>
      </View>
      <View style={{right:'0%',top:hp('0%')}}>
    <TouchableOpacity  onPress={() => this.back()}>
                {/*Donute Button Image */}
                <Image
                  source={require('../src/Image/back.png')}
                  style={{ width: 25, height: 25, marginLeft: 10,top:0 }}
                />
              </TouchableOpacity>
              </View>
    </View>
      <View style={{height: '90%',}}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {
            marginBottom: 4,
            widht:'100%',


            //
            // shadowOffset:{  width: 0,  height: 0,  },
            // shadowColor: '#330000',
            // shadowOpacity: 0,
            // shadowRadius: 0,
            // elevation: 5,
          }]}>
            {(this.state.file) ? (

              <Image style={styles.avatar} source={this.state.file} ></Image>
            ):(
              <View>
              <Image source={CameraImage} style={{height:70,width:70,marginTop:0,padding:0,marginBottom:0}}></Image>
              <Text style={{fontSize:9}} >TAKE A PICTURE</Text>
              </View>
            )}

            </View>
          </TouchableOpacity>
          <View style={styles.MainContainer}>
            <MapView
              style={styles.mapStyle}
              region={region}
               mapType={"standard"}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              zoomUserLocation={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              showsCompass={true}
              toolbarEnabled={true}
            >

            <MapView.Marker
            coordinate={region}
            title={userName}
            description={"YOUR LOCATION FOR ATTENDANCE"}
         />

            </MapView>

          </View>

          <View style={styles.commentbox}>

          <CommentBoxInput
            placeholder="COMMENT BOX"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onChangeText={comment => this.setState({ comment })}
            autoCorrect={true}/>
            </View>
            {(this.state.loading) ?
               <View style={{
                          flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                          alignItems: 'center', justifyContent: 'center',
                          position: 'absolute', height:'10%',
                          shadowOffset:{  width: 100,  height: 100,  },
                          shadowColor: '#330000',
                          shadowOpacity: 0,
                          shadowRadius: 5,
                          elevation: 10,
                          left:'25%',
                          top:'55%'
                      }}>

               <ActivityIndicator animating = {animating} size="large" color='rgb(19,111,232)' />
                       <Text style={{fontSize:15,left:10}}>Loading..</Text>
               </View>
               : null}
            <View style={{alignItems:'center'}}>
           <Button
               style={styles.button}
                 onPress={() => this.functionCombined()}
                 >
             SUBMIT
           </Button>
           </View >

            </View>

       </KeyboardAvoidingView>


    );
  }
}

const styles = StyleSheet.create({
  button: {
    top:'10%',
    width:'40%',
    height:'42%',
     marginBottom:0,
    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:50,
    paddingRight:50,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 0,
    overflow: "hidden"
  },
  container: {
    height:viewportHeight,
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop:0,
    marginBottom:0
  },
  avatarContainer: {
    borderColor: 'transparent',
    borderWidth: 5 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    width:viewportWidth,
    height: viewportHeight / 2.5,
  },
  MainContainer: {
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    margin:5,
    borderRadius: 8,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderColor:'transparent',
    width: '97%',
    height:'25%',
    shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 7,
  },
  commentbox: {
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    width: '97%',
    margin:4,
    shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 10,
  },
  mapStyle: {
    flex:0,
    flexDirection:'row',
    alignItems:'center',
    margin:5,
    borderRadius: 8,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    width: '98.5%',
    height:'100%',
    shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    shadowRadius: 10,
    elevation: 7,
  },
});
