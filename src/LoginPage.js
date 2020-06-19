import React, {Component} from 'react';
import {
          AsyncStorage,
          View,
          StyleSheet,
          Text,
          KeyboardAvoidingView,
          TouchableOpacity,
          Alert,
          ActivityIndicator,
          Loader,
          Dimensions,
          Keyboard,
          Linking
        } from 'react-native';
        import {createAppContainer,createSwitchNavigator} from 'react-navigation';
        import { createDrawerNavigator } from 'react-navigation-drawer';
        import { DrawerItems } from 'react-navigation-drawer';
        import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import {
        Card,
        CardImage,
        CardTitle,
        CardContent,
        CardAction,
      } from 'react-native-card-view';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
//import firebase  from '../src/firebase';
import UserInput from './UserInput';
import Button from 'react-native-button';
import Welcomepage from '../src/Welcomepage';
import Logo from '../src/header_sec';
import usernameImg from './Image/username.png';
import passwordImg from './Image/password.png';
import Drawer from '../src/drawer';
import Per from '../src/permissions';
import App from '../App';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class LoginPage extends Component {

  static DrawerNavigator = {
                              header: null,
                              drawerLockMode: 'locked-closed',
                              edgeWidth: 0,
                              disableGestures: true
                            };
  	constructor(props){
		super(props)
		this.state={
          			employee_code:'',
          			userPassword:'',
                device_id:'sdfsdfdfd',
                device_type:'',
                loading: false,
                name:'',
                code:'',
                permissions:''
		            }
           }

       componentDidMount(){
         this.value().done();
         // this.value_thrd().done();
         // this.checkPermission().done();
         // this.messageListener().done();

     DeviceInfo.getDevice().then(device => {
      // "walleye"
    });
    //

    const deviceInfo2 = DeviceInfo.getSystemName();

    //alert('deviceInfo1'+deviceInfo1);

    this.setState({device_type : deviceInfo2});


   }
   showAlert = (title, message) => {
   Alert.alert(
     'Xenia',
     'Update your App',
     [
       {text: 'Update', onPress: () => this.update()},
     ],
     {cancelable: false},
   );
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
   value_thrd= async()=>{

     const fcmToken = await firebase.messaging().getToken();
   if (fcmToken) {
     // user has a device token
   } else {
     // user doesn't have a device token yet
   }
   this.setState({device_id : fcmToken});
   }
value=async()=>{
  var value= await AsyncStorage.getItem('user');
  var value_sec= await AsyncStorage.getItem('user_pass');
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  // var permissions_sec=permissions_fir.success.user.permissions;
  //
  // this.setState({permissions:permissions_sec});

  const employee_code=value;
  const userPassword= value_sec
  this.setState({employee_code});
  this.setState({userPassword});
if (user_token!==null){
  const context=this;

  context.props.navigation.navigate("Third",{userObj:user_token});

  context.props.navigation.navigate("First",{userObj:user_token});
}
else {
  const context=this;
  context.props.navigation.navigate("login");
}
}
popup=()=>{

  Alert.alert(
'save user name and Password',
'',
[
 {
   text: 'Cancel',
   onPress: () => console.log('Cancel Pressed'),
   style: 'cancel',
 },
 {text: 'OK',  onPress:()=>this.value().done()},
],
{cancelable: false},
);
}


checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.value_thrd();
  } else {
      this.requestPermission();
  }
}

requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
  } catch (error) {
      // User has rejected permissions
  }
}
messageListener = async () => {
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }

  this.messageListener = firebase.messaging().onMessage((message) => {
    console.log(JSON.stringify(message));
  });
}

    hideLoader = () => {
                this.setState({ loading: false });
              }

    showLoader = () => {
              this.setState({ loading: true });
            }

  	login = () =>{

// console.log(isLoading);
      console.log("I am inside login()")
  		const {employee_code,userPassword,isLoading,device_id,device_type} = this.state;
  	//	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

  		if(employee_code==""){
                            console.log("emp code is empty")
                      			//alert("Please enter Email address");
                      		  // this.setState({employee:'Please enter Employee id'})
                            // this.setState({ isLoading: true });
                            let employee='Please enter Employee id';
                            Alert.alert(employee);
  		                      }

      else if(userPassword==""){
                                console.log('abc')
                              this.setState({userPassword:'Please enter Password'})
                              // this.setState({ isLoading: true });
                                Alert.alert("INVAILD ID");
                              }

  		else {
              console.log("I am going to call login api")
              var data = JSON.stringify({
      				// we will pass our input data to server
      				employee_code: this.state.employee_code,
      				password: this.state.userPassword,
              device_id: this.state.device_id,
              device_type: this.state.device_type,
  			       })

    console.log(device_id);
    console.log(device_type);
    const _this = this;
    this.showLoader();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 60000;
    const context=this;
      xhr.addEventListener("readystatechange", function () {
                                          console.log(xhr.status)
                                          console.log(xhr.readyState)
                                          if (xhr.readyState !== 4) {
                                                                      return;
                                                                    }
                                          if (xhr.status === 200) {
                                            _this.hideLoader();
                                            console.log("Successfully200")
                                            AsyncStorage.setItem('user',employee_code);
                                            AsyncStorage.setItem('user_pass',userPassword);
                                            AsyncStorage.setItem('user_token',xhr.responseText);
                                            AsyncStorage.setItem('userObj',xhr.responseText);
                                            // context.props.navigation.navigate("welcome");

                                            
                                            context.props.navigation.navigate("Third",{userObj:xhr.responseText});
                                            context.props.navigation.navigate("First",{userObj:xhr.responseText});

                                          }
                                          else{
                                            console.log("inside error")
                                             Alert.alert("INVALID ID");
                                              _this.hideLoader();
                                          }
                                        });

                        xhr.open("POST", "http://erp.xeamventures.com/api/v1/login");
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("content-type", "application/json");
                        xhr.send(data);
                          		/*fetch('http://erp.xeamventures.com/api/v1/login',{
                          			method:'post',
                          			header:{
                          				'Accept': 'application/json',
                          				'Content-type': 'application/json'
                          			},
                          			body:JSON.stringify({
                          				// we will pass our input data to server
                          				employee_code: employee_code,
                          				password: userPassword
                          			})
                          		})
                          		.then((response) => if(response.ok){response.json()})
                          		 .then((responseJson)=>{
                          			 if(responseJson == "ok"){
                          				 // redirect to profile page
                          				 alert("Successfully Login");
                          				 this.props.navigation.navigate("Welcomepage");
                          			 }else{
                          				 alert("Wrong Login Details");
                          			 }
                          		 })
                          		 .catch((error)=>{
                          		 console.error(error);
                          		 });
                          		}*/


                          	//	Keyboard.dismiss();
                          	}
                          }


  hide =()=>{
            const a= Keyboard.dismiss();
          }
  functionCombined() {
                  this.login();
                  this.hide();

                  // this.displayData();
                }
  render () {

          const {navigate} = this.props.navigation;
          const card = {card: {width: '100%', height: '100%',backgroundColor: '#edeceb'}};
           const {name,code,permissions} = this.state;
           // console.log(name);
           // console.log(code);

  return (
        <KeyboardAvoidingView behavior="possition" style={styles.container}>
          <Card styles={card}>
          <Logo/>
          <View style={styles.pagecomponent}>
          {(this.state.loading) ?
            <View style={{
              flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
              alignItems: 'center', justifyContent: 'center',
              position: 'absolute', height:'10%',
              shadowOffset:{width:100,height:100},
              shadowColor: '#330000',
              shadowOpacity: 0,
              shadowRadius: 5,
              elevation: 10,
              left:'25%',
              top:'35%'
                }}>
           <ActivityIndicator size="large" color='rgb(19,111,232)' />
           <Text style={{fontSize:15,left:10}}>Loading..</Text>
           </View>
           : null}
              <View style={styles.logintext}>
                <Text style={styles.title}>LOGIN</Text>
                </View>
                  <UserInput
                    source={usernameImg}
                      placeholder="Employee Code"
                        autoCapitalize={'none'}
                            returnKeyType={'done'}
                              onChangeText={employee_code => this.setState({ employee_code })}
                                  autoCorrect={false}
                                    value={this.state.employee_code}
                                    />
                                      <UserInput
                                            source={passwordImg}
                                              secureTextEntry={true}
                                                  placeholder="Password"
                                                        returnKeyType={'done'}
                                                            autoCapitalize={'none'}
                                                        onChangeText={userPassword => this.setState({ userPassword })}
                                                    autoCorrect={false}
                                                     value={this.state.userPassword}
                                                          />
                                                  <TouchableOpacity
                                            activeOpacity={0.7}
                                      style={styles.btnEye}
                                      onPress={this.showPass}>
                                          </TouchableOpacity>
                                      <CardAction >
                                          <Button
                                  style={styles.button}
                                  onPress={() => this.functionCombined()}>
                            LOGIN
                        </Button>
                  </CardAction >
              </View>
          </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
        logintext: {
                    flex:0.7,
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:0,
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {width: 40, height: 60},
                    textShadowRadius: 0,
                    overflow: "hidden"
                   },
        title: {
                  flex:1,
                  flexDirection:'row',
                  textAlign:'center',
                  color: 'rgb(19,111,232)',
                  fontSize: 38,
                  // fontWeight: 'bold',
                },
      button: {
                color: '#DCE4EF',
                marginLeft:0,
                marginBottom: 10,
                paddingTop:23,
                paddingBottom:23,
                paddingLeft:70,
                paddingRight:70,
                backgroundColor:'rgb(19,111,232)',
                borderRadius:10,
                borderWidth: 1,
                borderColor: 'transparent',
                elevation: 0,
                overflow: "hidden"
              },
  pagecomponent: {
                marginTop:0,
                marginBottom:0,
                flex:0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#ffffff',
                borderRadius: 10,
                borderTopWidth: 1.5,
                borderBottomWidth:1.5,
                borderRightWidth:1.5,
                borderLeftWidth:1.5,
                borderColor: '#ffffff',
                width:viewportWidth/1.2,
                height: '70%',
                // shadowOffset:{  width: 100,  height: 100,  },
                shadowColor: '#330000',
                shadowOpacity: 0,
                // shadowRadius: 0,
                elevation: 5,
              },
  separator: {
              marginVertical: 8,
              borderBottomColor: '#2B2929',
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
  container: {
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#edeceb'
            },
  btnEye: {
            position: 'absolute',
            top: 20,
            right: 28,
          },
  iconEye: {
            width: 50,
            height: 50,
            tintColor: "black",
          },

  });
