import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Button from 'react-native-button';
import CustomHeader from '../src/Header';
import CameraPage from '../src/CameraPage';
import Monthlyreport from '../src/Monthlyreport';
import Logo from './Image/logo.png';
import abc from '../src/ExpandableViewSeparate';
import Header_drawer from '../src/header_width_drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Welcomepage extends Component {
  static navigationOptions = {
      headerBackground:<View style={{alignItems:'center',justifyContent:'center'}}><Image source={Logo} style={{height:30,width:120,marginTop:20,}}/></View>,

                  };

        constructor(props){
              super(props)
                  this.state={
                                successToken:'',
                                userName:'',
                                loading: false,
                                device:'',
                                deviceVersion:'',
                                rendum_value:'',
                              }
  }

componentDidMount(){
 this.device_id();
 
 // this.puch_notification().done();
}
device_id(){
  const deviceInfo2 = DeviceInfo.getSystemName();
  const deviceVersion = DeviceInfo.getVersion();
  //alert('deviceInfo1'+deviceInfo1);
  console.log(deviceVersion)
  this.setState({device : deviceInfo2})
  this.setState({deviceVersion : deviceVersion})
  // console.log(deviceInfo2)
}
puch_notification=async()=>{
   const context=this;
  console.log("puch_notification")
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.secret_token;
  var data = new FormData();
data.append("version", this.state.deviceVersion);
data.append("device_type", this.state.device);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  console.log(xhr.status)
  console.log(xhr.readyState)
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {

console.log(xhr.responseText)
  }
  else{
    var json_obj = JSON.parse(xhr.responseText);
    var c = json_obj.error;
    Alert.alert(
      'Xenia',
      c,
      [
        {text: 'Update', onPress: () => context.update()},
      ],
      {cancelable: false},
    );

  }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/app-version");

xhr.setRequestHeader("Authorization", "Bearer " + permissions_sec);


xhr.send(data);
}
update(){
  const url='https://play.google.com/store/apps/details?id=com.xenia';
  Linking.canOpenURL(url)
  .then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch((err) => console.error('An error occurred', err));

}

hideLoader = () => {
                      this.setState({ loading: false });
                    }

showLoader = () => {
                      this.setState({ loading: true });
                    }

_menu = null;

setMenuRef = ref => {
                        this._menu = ref;
                      };

hideMenu = () => {
                    this._menu.hide();
                  };

showMenu = () => {
                  this._menu.show();
                };

chekIn = () =>{
                    console.log("I am inside chekIn")
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    context.props.navigation.navigate("cameraPage",{successToken:successToken});
                    context.props.navigation.navigate("cameraPage",{userName:userName});
                    context.props.navigation.navigate("cameraPage",{user_id:user_id});
                    var xyz="Check-In";
                    context.props.navigation.navigate("cameraPage",{xyz:xyz});
                  }
  chekOut = () =>{
                    console.log("I am inside checkOutPage")
                    // const _this = this;
                    // this.showLoader();
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken={token:userObj.success.secret_token};
                    var user_id ={userid:userObj.success.user.employee.user_id}
                    var userName={fullname:userObj.success.user.employee.fullname}
                    context.props.navigation.navigate("CheckOut",{successToken:successToken});
                    context.props.navigation.navigate("CheckOut",{userName:userName});
                    context.props.navigation.navigate("CheckOut",{user_id:user_id});
                    var xyz="Check-Out";
                    context.props.navigation.navigate("CheckOut",{xyz:xyz});
                  }
otherPage = () => {
                    const context=this;
                    var userObj = JSON.parse(context.props.route.params.userObj);
                    var successToken=(userObj.success.secret_token);
                    var user_id =(userObj.success.user.employee.user_id);
                    context.props.navigation.navigate("monthlyreport",{successToken});
                    context.props.navigation.navigate("monthlyreport",{user_id});
                }
sec_otherPage = () => {
                        Alert.alert("\nthis service not activate right now !");
                  }
thrd_otherPage = () => {
                        Alert.alert("\nthis service not activate right now !");
                  }

                  _onItemPressed(item){
                    
                    this.value().done();
                }
dwaerButton(){
  const context=this;
  context.props.navigation.toggleDrawer();
  this._onItemPressed.bind(this);
}

    render ()
                {
                  
                  const card = {card: {width: viewportWidth/1, height: viewportHeight,}};
                  const context=this;
                  var userObj = JSON.parse(context.props.route.params.userObj);

                  // console.log(userObj.success.user.employee.profile_picture);
                  
                  var profile_picture={uri:userObj.success.user.employee.profile_picture};
                  


		return(

           <View style={{height:hp('100%')}}>
                <View style={{backgroundColor:'rgb(19,111,232)',height:'13%'}}>
                <View style={{alignItems:'center',top:'30%'}}>
                <Image source={Logo} style={{bottom:0,height:50,width:200,borderColor:'rgb(19,111,232)',borderWidth:1}}/>
                  </View>
                <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => this.dwaerButton()}>
                            {/*Donute Button Image */}
                            <Image
                              source={require('../src/Image/menu.png')}
                              style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                            />
                          </TouchableOpacity>
                </View>
                   <View style={{height:viewportHeight/4}}>
                   <View style={{flex:1,alignItems:'center',top:'5%'}}>
                   <Image source={profile_picture} style={{bottom:0,height:150,width:150,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'rgb(19,111,232)',borderWidth:1}}/>
                     </View>

                          <Text style={{fontSize:50, color: 'black',top:'100%',textAlignVertical:'center',textAlign:'center'}}>WELCOME</Text>

                         <View style={{top:'120%',alignItems:'center'}}>
                         <Text style={{fontSize:30, color: 'black',alignItems: 'center',textAlignVertical:'center',textAlign:'right'}}>{userObj.success.user.employee.fullname}</Text>  
                                    </View>
                                             
                                             

                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',top:hp('40%'),}}>
                                            <TouchableOpacity 
                                              onPress={() =>this.chekIn()}>
                                              <Text style={styles.button1}>Check In</Text>
                                              </TouchableOpacity>
                                              <TouchableOpacity 
                                                onPress={() =>this.chekOut()}>
                                                <Text style={styles.button2}>Check Out</Text>
                                                </TouchableOpacity>
                                                

                                        </View>
                                       
                                               

            <Text style={{top:hp('58%') ,fontSize:10,textAlign:'center'}}>© Copyright 2020 XEAM Ventures Pvt. Ltd. All Rights Reserved</Text>
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({

    button1: {
              
             
              flex:0,
              margin: 0,

              left: 0,
              alignItems: 'center',
              justifyContent: 'center',

              marginTop:0,
              marginBottom:'0%',
              marginRight:10,
              paddingTop:25,
              paddingBottom:25,
              paddingLeft:40,
              paddingRight:40,
               backgroundColor:'rgb(19,111,232)',
               color:'white',
              borderRadius:10,
              borderWidth: 1,
              borderColor: 'transparent',
              elevation: 0,
              overflow: "hidden"
            },
    button2: {
      
      

              flex:0,
              margin: 0,
              marginTop:0,
              marginLeft:0,
              marginRight:0,
              marginBottom:'0%',
              right:0,

              alignItems: 'center',
              justifyContent: 'center',
              marginLeft:10,
              paddingTop:25,
              paddingBottom:25,
              paddingLeft:40,
              paddingRight:40,
               backgroundColor:'rgb(19,111,232)',
               color:'white',
              borderRadius:10,
              borderWidth: 1,
              borderColor: 'transparent',
              elevation: 0,
              overflow: "hidden"
            },
  separator: {
              marginVertical: 8,
              borderBottomColor: '#2B2929',
              borderBottomWidth: StyleSheet.hairlineWidth,
          },
  container: {
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
          },
  btnEye: {
              position: 'absolute',
              top: 20,
              right: 28,
          },
  icon: {
            top:10,
            width: 100,
            height: 100,
            // tintColor: "black",
        },

  });
