import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Logo from './Image/logo.png';


export default class Header extends Component {

    render () {

		return(
          <View>
          <Image source={Logo} style={{height:40,width:150,marginTop:40,padding:10,marginBottom:40}}/>
          </View>

      );
    }
  }


  const styles = StyleSheet.create({


  });
