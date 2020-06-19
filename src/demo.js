// *******************
// 31-03-2020
// *******************
// Project: Xenia ios app
//
// 1) Working on firebase (FCM).
// 2) messageListener bug resolving(not fixed).
// 3) creating enroll on apple development account.

// 2) Create value picker.
// 3) Worked on Google provider for Geolocation.

//{
  // platform :ios, '9.0'
  // require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
  //
  // target 'xenia' do
  //   # Pods for xenia
  //
  //   pod 'FBLazyVector', :path => "../node_modules/react-native/Libraries/FBLazyVector"
  //   pod 'FBReactNativeSpec', :path => "../node_modules/react-native/Libraries/FBReactNativeSpec"
  //   pod 'RCTRequired', :path => "../node_modules/react-native/Libraries/RCTRequired"
  //   pod 'RCTTypeSafety', :path => "../node_modules/react-native/Libraries/TypeSafety"
  //   pod 'React', :path => '../node_modules/react-native/'
  //   pod 'React-Core', :path => '../node_modules/react-native/'
  //   pod 'React-CoreModules', :path => '../node_modules/react-native/React/CoreModules'
  //   pod 'React-Core/DevSupport', :path => '../node_modules/react-native/'
  //   pod 'React-RCTActionSheet', :path => '../node_modules/react-native/Libraries/ActionSheetIOS'
  //   pod 'React-RCTAnimation', :path => '../node_modules/react-native/Libraries/NativeAnimation'
  //   pod 'React-RCTBlob', :path => '../node_modules/react-native/Libraries/Blob'
  //   pod 'React-RCTImage', :path => '../node_modules/react-native/Libraries/Image'
  //   pod 'React-RCTLinking', :path => '../node_modules/react-native/Libraries/LinkingIOS'
  //   pod 'React-RCTNetwork', :path => '../node_modules/react-native/Libraries/Network'
  //   pod 'React-RCTSettings', :path => '../node_modules/react-native/Libraries/Settings'
  //   pod 'React-RCTText', :path => '../node_modules/react-native/Libraries/Text'
  //   pod 'React-RCTVibration', :path => '../node_modules/react-native/Libraries/Vibration'
  //   pod 'React-Core/RCTWebSocket', :path => '../node_modules/react-native/'
  //
  //   pod 'React-cxxreact', :path => '../node_modules/react-native/ReactCommon/cxxreact'
  //   pod 'React-jsi', :path => '../node_modules/react-native/ReactCommon/jsi'
  //   pod 'React-jsiexecutor', :path => '../node_modules/react-native/ReactCommon/jsiexecutor'
  //   pod 'React-jsinspector', :path => '../node_modules/react-native/ReactCommon/jsinspector'
  //   pod 'ReactCommon/jscallinvoker', :path => "../node_modules/react-native/ReactCommon"
  //   pod 'ReactCommon/turbomodule/core', :path => "../node_modules/react-native/ReactCommon"
  //   pod 'Yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
  //   pod 'GoogleMaps' #ADD THIS LINE TO YOUR CODE IF YOU WANT GOOGLEMAPS IN IOS
  //   pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  //   pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  //   pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  //
  //
  //   pod 'react-native-image-picker', :path => '../node_modules/react-native-image-picker'
  //
  //   pod 'rn-fetch-blob', :path => '../node_modules/rn-fetch-blob'
  //
  //   pod 'react-native-maps', :path => '../node_modules/react-native-maps'
  //
  //   pod 'react-native-google-maps', path: '../node_modules/react-native-maps'  # If you need GoogleMaps support on iOS
  //
  //
  //   pod 'react-native-geolocation', :path => '../node_modules/@react-native-community/geolocation'
  //
  //   pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
  //
  //   pod 'RNFirebase', :path => '../node_modules/react-native-firebase/ios'
  //
  //   target 'xeniaTests' do
  //     inherit! :search_paths
  //     # Pods for testing
  //     pod 'GoogleMaps'
  //     pod 'GooglePlaces'
  //     pod 'Google-Maps-iOS-Utils'
  //     pod 'Firebase/Core'
  //     # add the Firebase pod for Google Analytics
  //     pod 'Firebase/Analytics'
  //     pod 'Firebase/Messaging'
  //     # add pods for any other desired Firebase products
  //     # https://firebase.google.com/docs/ios/setup#available-pods
  //   end
  //
  //   use_native_modules!
  // end
  //
  // target 'xenia-tvOS' do
  //   # Pods for xenia-tvOS
  //
  //   target 'xenia-tvOSTests' do
  //     inherit! :search_paths
  //     # Pods for testing
  //   end
  //
  // end


//   import React, {Component} from 'react';
//   import {
//     AsyncStorage,
//     StyleSheet,
//     KeyboardAvoidingView,
//     View,
//     TextInput,
//     ActivityIndicator,
//     TouchableOpacity,
//     Image,
//     AppRegistry,
//     Text,
//     Dimensions,
//     Picker
//   } from 'react-native';
//   import {
//     Card,
//   } from 'react-native-card-view';
//   import {createAppContainer,createSwitchNavigator} from 'react-navigation';
//   import { createDrawerNavigator } from 'react-navigation-drawer';
//   import { DrawerItems } from 'react-navigation-drawer';
//   import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
//   import Attendance from './src/Attendance_first';
//   import LoginPage from './src/LoginPage';
//   import Welcomepage from './src/Welcomepage';
//   import CameraPage from './src/CameraPage';
//   import Drawer from './src/drawer';
//   import DashBoard from './src/DashBoard';
//   import Monthlyreport from './src/Monthlyreport';
//   import ShowMonthlyReport from './src/ShowMonthlyReport';
//   import Flat from './src/flatlist';
//   import Checkoutpage from './src/checkOutPage';
//   import Leaves from './src/leaves';
//   import Task from './src/Task';
//   import Permission from './src/permissions';
//   import CustomSidebarMenu from './src/CustomSideBarMenu';
//   import AttendanceDetail from './src/attendance-detail';
//   import SelfAttendanceDetail from './src/self_attendance_detail';
//   import Demo from './src/demo';
//   import Hay from './src/hayPage';
//   import LeaveSection from './src/LeaveSection';
//   import LogOutPage from './src/LogOutPage';
//   import AppliedLeaveDetailPage from './src/appliedLeaveDetailPage';
//   import ApplyLeave from './src/Apply-Leave';
//   // const MainNavigator = createStackNavigator({
//   //   login: {screen: LoginPage},
//   //   welcome: {screen: Welcomepage},
//   //   cameraPage: {screen: CameraPage},
//   //   monthlyreport: {screen: Monthlyreport},
//   //   ShowMonthlyReport: {screen: ShowMonthlyReport},
//   //   Flat: {screen: Flat},
//   //   CheckOut: {screen: Checkoutpage},
//   // });
//   //
//   // const App = createAppContainer(MainNavigator);
//   //   export default App;
//
//   class NavigationDrawerStructure extends Component {
//     //Structure for the navigatin Drawer
//
//     constructor(props){
//     super(props)
//     this.state={
//
//                 permissions:[],
//                 language_sec:[],
//                 }
//            }
//
//     componentDidMount(){
//   const {permissions} = this.state;
//   this.value().done();
//
//   }
//
//     value=async()=>{
//
//       var user_token= await AsyncStorage.getItem('user_token');
//       var permissions_fir= JSON.parse(user_token);
//       var permissions_sec=permissions_fir.success.user.permissions;
//
//       this.setState({permissions:permissions_sec});
//     }
//     toggleDrawer = () => {
//       //Props to open/close the drawer
//       this.props.navigationProps.toggleDrawer();
//     };
//     render() {
//   const {permissions,language_sec} = this.state;
//    const context=this;
//       return (
//         <View style={{ flexDirection: 'row',width:'100%'}}>
//
//           <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//             {/*Donute Button Image */}
//             <Image
//               source={require('./src/Image/menu.png')}
//               style={{ width: 35, height: 35, marginLeft: 10 }}
//             />
//           </TouchableOpacity>
//
//         </View>
//       );
//     }
//   }
//   class Navi extends Component {
//     //Structure for the navigatin Drawer
//
//     render() {
//
//       return (
//         <View style={{ flexDirection: 'row',width:'100%'}}>
//
//           <Text>hashf</Text>
//
//         </View>
//       );
//     }
//   }
//
//   const FirstActivity_StackNavigator = createStackNavigator({
//     //All the screen from the Screen1 will be indexed here
//     login: {screen: LoginPage},
//     welcome: {screen: Welcomepage},
//     cameraPage: {screen: CameraPage},
//     monthlyreport: {screen: Monthlyreport},
//     ShowMonthlyReport: {screen: ShowMonthlyReport},
//     Flat: {screen: Flat},
//     CheckOut: {screen: Checkoutpage},
//     Permission: {screen: Permission},
//     CustomSidebarMenu: {screen: CustomSidebarMenu},
//     Leaves: {screen: Leaves},
//     SelfAttendanceDetail: {screen: SelfAttendanceDetail},
//   AppliedLeaveDetailPage: {screen: AppliedLeaveDetailPage},
//   LeaveSection: {screen: LeaveSection},
//   LogOutPage: {screen: LogOutPage},
//
//     First: {
//       screen: Welcomepage,
//       navigationOptions: ({ navigation }) => ({
//
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//       }),
//     },
//   });
//
//   const Screen2_StackNavigator = createStackNavigator({
//     //All the screen from the Screen2 will be indexed here
//
//     Second: {
//       screen: CameraPage,
//       navigationOptions: ({ navigation }) => ({
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//       }),
//     },
//   });
//
//
//   const Screen3_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//
//     Third: {
//       screen: Monthlyreport,
//       navigationOptions: ({ navigation }) => ({
//         title: "My Attendance",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//
//     },
//   });
//
//   const Screen4_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//     fourth: {
//       screen: Leaves,
//       navigationOptions: ({ navigation }) => ({
//         title: "Employee Attendance",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//     },
//   });
//
//   const Screen5_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//     fifth: {
//       screen: AttendanceDetail,
//       navigationOptions: ({ navigation }) => ({
//         title: "Team Attendance",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//     },
//   });
//   const Screen6_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//     sixth: {
//       screen: LeaveSection,
//       navigationOptions: ({ navigation }) => ({
//         title: "Applied Leaves List",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//     },
//   });
//   const Screen7_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//     seventh: {
//       screen: ApplyLeave,
//       navigationOptions: ({ navigation }) => ({
//         title: "Apply Leaves",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//     },
//   });
//   const Screen8_StackNavigator = createStackNavigator({
//     //All the screen from the Screen3 will be indexed here
//     eight: {
//       screen: LogOutPage,
//       navigationOptions: ({ navigation }) => ({
//         // title: "Log Out Page",
//         headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           borderBottomColor: '#b3b3b3',
//           borderBottomWidth: 3,
//           height:80,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//                            justifyContent:'center',
//                            textAlign:'center',
//                            fontWeight: 'bold',
//                            width:'70%'
//                          },
//       }),
//     },
//   });
//
//   const DrawerNavigatorExample = createDrawerNavigator({
//     //Drawer Optons and indexing
//
//     Screen1: {
//       //Title
//
//       screen: FirstActivity_StackNavigator,
//
//       navigationOptions: {
//         headerStyle: {
//           backgroundColor: '#0080FF',
//           width:'20%'
//         },
//         drawerLabel: ({ focused, tintColor }) => (
//           <View style={{top:0}}>
//
//              <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Home</Text>
//
//              <Image
//                source={require('./src/Image/home.png')}
//                style={{ width: 25, height: 25, left: 10,bottom:23 }}
//              />
//           </View>
//         )
//       },
//     },
//
//     Screen3: {
//       //Title
//
//       screen: Screen3_StackNavigator,
//       navigationOptions: {
//         drawerLabel: ({ focused, tintColor }) => (
//
//           <View style={{top:0}}>
//              <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>My Attendance</Text>
//              <Image
//                source={require('./src/Image/attendance.png')}
//                style={{ width: 28, height: 25, left: 10,bottom:23 }}
//              />
//
//           </View>
//         )
//       }
//     },
//
//     Screen4: {
//       //Title
//       screen: Screen4_StackNavigator,
//
//       navigationOptions: {
//         drawerLabel: ({ focused, tintColor }) => (
//           <View style={{top:0}}>
//              <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Employee Attendance</Text>
//              <Image
//                source={require('./src/Image/department.png')}
//                style={{ width: 30, height: 30, left: 10,bottom:23 }}
//              />
//           </View>
//         )
//       }
//     },
//
//     Screen5: {
//       //Title
//        title:<Navi/>,
//       screen: Screen5_StackNavigator,
//       navigationOptions: {
//         drawerLabel: ({ focused, tintColor }) => (
//           <View>
//              <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Team Attendance</Text>
//              <Image
//                source={require('./src/Image/partner.png')}
//                style={{ width: 30, height: 30, left: 10,bottom:23 }}
//              />
//           </View>
//         )
//       }
//     },
//     Screen8: {
//       //Title
//        // title:<Navi/>,
//       screen: Screen8_StackNavigator,
//       navigationOptions: {
//         drawerLabel: ({ focused, tintColor }) => (
//           <View>
//              <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Log Out</Text>
//              <Image
//                source={require('./src/Image/log_out.png')}
//                style={{ width: 25, height: 25, left: 10,bottom:23 }}
//              />
//           </View>
//         )
//       }
//
//     },
//
//
//    Screen6: {
//      //Title
//
//      screen: Screen6_StackNavigator,
//      navigationOptions: {
//        drawerLabel: ({ focused, tintColor }) => (
//          <View style={{top:0}}>
//
//             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Applied Leaves</Text>
//             <Image
//               source={require('./src/Image/partner.png')}
//               style={{ width: 30, height: 30, left: 10,bottom:23 }}
//             />
//
//          </View>
//        )
//      }
//    },
//
//   Screen7: {
//     //Title
//
//     screen: Screen7_StackNavigator,
//     navigationOptions: {
//       drawerLabel: ({ focused, tintColor }) => (
//         <View style={{top:0}}>
//
//            <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Apply Leave</Text>
//            <Image
//              source={require('./src/Image/partner.png')}
//              style={{ width: 30, height: 30, left: 10,bottom:23 }}
//            />
//
//         </View>
//       )
//     }
//   },
//   },
//   // {
//   //     //For the Custom sidebar menu we have to provide our CustomSidebarMenu
//   //        contentComponent: CustomSidebarMenu,
//   //
//   //        drawerHeight:'20%'
//   //     //Sidebar width
//   //
//   //   }
//
//   );
//   export default createAppContainer(DrawerNavigatorExample);
//
//
//
// }
//
//
import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  AppRegistry,
  Text,
  Dimensions,
  Picker
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'Attendance',
    content: 'Lorem ipsum...'
  },
];
export default class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View>
        <Text style={{fontSize:20, color:'blue'}} >{section.title}</Text>
      </View>
    );
  };
show=()=>{
  // const context=this;
  // context.props.navigation.navigate("Leaves");
  console.log("klifksdjhkd")
}
  _renderContent = section => {
    return (
      <TouchableOpacity onPress={()=>this.show()}>
        <Text style={{fontSize:15,color:'blue'}}>{section.content}</Text>
      </TouchableOpacity>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}

        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
