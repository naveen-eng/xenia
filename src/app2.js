import React, { Component } from 'react';
import {
    View,
  } from 'react-native';
  import ManagerDrawerNavigator from './ManagerDrawerNavigator'
import EmployeeDrawerNavigator from './EmployeeDrawerNavigator';
import Stacknavigation from './stacknavigation';
export default class App2 extends React.Component{
  toggleDrawer = () => {
    //Props to open/close the drawer
     this.props.navigationProps.toggleDrawer();

  };
    render(){
        if(true){
            return (
                 
                 
                <EmployeeDrawerNavigator />
                
            )
        }else{
          return (
              <ManagerDrawerNavigator />
          )
        }
        
    }
}
