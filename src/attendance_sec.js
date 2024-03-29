import React from 'react';
import {
  Dimensions,
  FlatList,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import User from '../src/UserIdBox';
import Attend from './Image/leave.png';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class monthlyreport extends React.Component {

  render() {


    return (


         <View style={styles.pagecomponent}>
          <Image source={Attend} style={{height:80,width:70,marginTop:0,}}/>
<Text style={{textShadowColor:'green',fontFamily: 'serif'}}>Leaves</Text>

         </View>

    );
}
}

const styles = StyleSheet.create({


  pagecomponent: {
      right:10,
    bottom:0,
    flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
    borderRadius: 0,
    paddingLeft:20,
    paddingRight:20,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:'100%',
    // height:'45%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
});
