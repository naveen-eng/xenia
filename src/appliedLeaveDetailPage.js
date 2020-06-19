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
  Picker,
   ScrollView
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../src/Image/side.png';
import RightSide from '../src/Image/side2.png';
import Search from '../src/Image/search.png';
import Watch from '../src/Image/appliedLeaveDetails.png';
import LeaveSectionDesign from '../src/LeaveSectionDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class AppliedLeaveDetailPage extends Component {

  constructor(props){
  super(props)
  this.state={
               loading: false,
               data:'',
               date:'',
               name:'',
               id:'',
               leave_type:'',
               from_date:'',
               to_date:'',
               from_time:'',
               to_time:'',
               leave_replacement:'',
               leave_reason:'',
               can_cancel_leave:'',
               applied_leave_id:'',
               data_two:'123134'
              }
         }
  static navigationOptions = {

          title: "Applied Leave Details",
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
          fontWeight: 'bold',
          width:'70%',

        },
                  };


hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  componentDidUpdate(){
    this.fine_data();

}
// // componentDidMount(){
// //   this.fine_data();
// // }
shouldComponentUpdate(nextProps,nextState){
     console.log("bhai kya kr raha hai nextProps",nextProps.route.params.xyz)
      console.log("bhai kya kr raha hai nextState",this.state.data_two)
    if(nextProps.route.params.xyz !== this.state.data_two){
  return true;
  
    
    }
   
    return false;
   
}

  fine_data(){
  const context=this;
  var data =JSON.parse(context.props.route.params.data);
  // console.log(data)
  var data_two =JSON.parse(context.props.route.params.xyz);
          this.setState({data_two:data_two});
  const date = data.success.leave_detail.created_at;
  const name = data.success.leave_detail.user.employee.fullname;
  const id = data.success.leave_detail.user.employee_code;
  const leave_type = data.success.leave_detail.leave_type.name;
  const from_date = data.success.leave_detail.from_date;
  const to_date = data.success.leave_detail.to_date;
  const from_time = data.success.leave_detail.from_time;
  const to_time = data.success.leave_detail.to_time;
  const can_cancel_leave = data.success.leave_detail.can_cancel_leave;
  const leave_replacement = data.success.leave_detail.leave_replacement;
  const leave_reason = data.success.leave_detail.reason;
  const applied_leave_id = data.success.leave_detail.leave_approval;
  console.log(applied_leave_id)
  this.setState({date:date.substring(0,10)});
  this.setState({name:name});
  this.setState({id:id});
  this.setState({leave_type:leave_type});
  this.setState({from_date:from_date});
  this.setState({to_date:to_date});
  this.setState({from_time:from_time});
  this.setState({to_time:to_time});
  this.setState({leave_reason:leave_reason});
  this.setState({can_cancel_leave:can_cancel_leave});
  // this.setState({applied_leave_id:applied_leave_id});
  // var apllied_at = data.success.leave_detail.created_at;
  //    console.log(apllied_at)
   // if(apllied_at!==null){
   //   this.setState({at:apllied_at});
   // }if(apllied_at===null){
   //   this.setState({data:data});
   // }

   if(leave_replacement===null){
      return;
   }else{
     this.setState({leave_replacement:leave_replacement.user.employee.fullname});
   }


}
canCancelLeave=async()=>{

  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this = this;
  this.showLoader();
  var data = new FormData();
data.append("applied_leave_id", "1032");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {

    if (xhr.readyState !== 4) {
                        return;
   }
   if(xhr.status===200){
      _this.hideLoader();
      var json_obj = JSON.parse(xhr.responseText);
      console.log(this.responseText);
      var success = json_obj.success;
      Alert.alert(success.message)
      console.log(success);
   }
   else{
     _this.hideLoader();
     console.log(this.responseText);
     var json_obj = JSON.parse(xhr.responseText);
     var error = json_obj.error
     Alert.alert(error.substring(40,80))
   }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/cancel-leave");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
conditional=(t)=>{

  if(t==="0"){
     return;
  }if(t==="1"){
    return;
  }
}
canCancelLeave_sec(){
  Alert.alert("don't")
}
back(){
  const context=this;
  
  
  context.props.navigation.navigate("LeaveSection");
 }

    render (){
          const {leaves,message,msg,date,name,id,leave_type,from_date,to_date,from_time,to_time,leave_replacement,leave_reason,can_cancel_leave}= this.state;
          // console.log(date)
          // const apllied_at = data.success.leave_detail.created_at;
          // console.log(apllied_at)
          const context=this;
          // var data =JSON.parse(context.props.route.params.data);
          
		return(
      <View style={{height:'100%'}}>
      <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
      <View style={{left:wp('15%'),top:hp('3.2%')}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Applied Leaves</Text>
              </View>
            <TouchableOpacity style={{right:'0%',bottom:hp('0%')}} onPress={() => this.back()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/back.png')}
                          style={{ width: 25, height: 25, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
      <View style={{height:'85%',top:hp('10%')}}>
      {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'8%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:hp('25%')
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
      
          <View style={{bottom:'12%',left:'17%',flexDirection:'row',justifyContent:'center'}}>
          <Text>Date : </Text>
          <Text style={{color:'rgb(19,111,232)'}}>{date}</Text>
        </View>
      <View style={styles.pagecomponent_thrd}>
      <Text style={{color:'rgb(19,111,232)',fontSize:18,fontWeight:'bold',width:'100%',left:'35%',top:'0%' }}>{name}</Text>
      <Text style={{color:'rgb(19,111,232)',fontSize:15,top:'5%' }}>{id}</Text>
      <Text style={{fontSize:15,top:'9%' }}>{leave_type}</Text>
        <Image source={Watch} style={{height:viewportWidth/4.6,width:viewportWidth/1.3,top:'18%'}}/>
        <View style={{bottom:'4%',flexDirection:'row'}}>
        <Text style={{right:'300%',top:'0%'}}>{from_date}</Text>
        <Text style={{right:'23%',top:'0%'}}>{from_time}</Text>
        <Text style={{left:'290%',bottom:'0%'}}>{to_date}</Text>
        <Text style={{left:'27%',bottom:'0%'}}>{to_time}</Text>
        </View>
      </View>
      <View style={styles.pagecomponent_frth}>
       <Text style={{right:'0%',top:'0%'}}>
       Replacement With :
       </Text>
       <Text style={{left:'10%',bottom:'0%',color:'rgb(19,111,232)'}}>
         {leave_replacement}
       </Text>
      </View>
      <View style={styles.card_view_sec}>
       <Text style={{color:'white'}}>
       Reason for leave:
       </Text>
      </View>
      <Image source={LeftSide} style={{left:wp('31%'),bottom:'8.1%',height:'4.9%',width:50,borderColor:'black',alignItems:'center'}}/>
      <View style={styles.pagecomponent_fifth}>
        <Text style={{bottom:hp('0%'),right:'0%'}}>{leave_reason}</Text>
      </View>
      <View style={styles.pagecomponent_sixth}>
         <Text style={{bottom:'10%'}}>Do you realy want to cancel your applied leave </Text>
         <Button
         style={styles.button}
         onPress={() =>this.canCancelLeave()}>

       Cancel
 </Button>
      </View>
         </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    Approved_first:{ left:'0%',backgroundColor:'#78b341',borderRadius:30,height:50,width:50,color:'white',fontSize:25},
    Approved_Deflt:{backgroundColor:'black',borderRadius:12,height:50,width:50,color:'white'},
    Approved:{

      width:'50%',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:1.5,
      borderColor: 'red',
    },
    pagecomponent_sec: {
                      marginBottom:0,
                      top:'20%',
                       marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      borderRadius: 10,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                        height: '27%',
                      // shadowOffset:{  width: 100,  height: 100,  },

                      shadowOpacity: 0,
                      // shadowRadius: 0,

    },
    pagecomponent_thrd: {
                      
                      bottom:45,
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#cce6ff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: '#adadad',
                      width:viewportWidth/1.03,
                      height:'35%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_frth: {
                       flexDirection:'row',
                       left:15,
                      bottom:30,
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#cce6ff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: '#adadad',
                      width:'90%',
                     height:'8%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_fifth: {
                      left:'0%',
                      bottom:40,
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'95%',
                     height:'15%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_sixth: {
                      bottom:30,
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffe6',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: '#ffffe6',
                      width:'95%',
                     height:'15%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    card_view: {
                  marginBottom:0,
                  top:'0.8%',
                  left:'30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '4.9%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,

    },
    card_view_sec: {
                  bottom:'3.2%',
                  left:'1%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'30%',
                  height: '4.9%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,

    },
    button: {
              width:'100%',
              color: '#DCE4EF',
              marginLeft:0,
              marginBottom: 0,
              paddingTop:10,
              paddingBottom:10,
              paddingLeft:15,
              paddingRight:15,
              backgroundColor:'#cc2900',
              borderRadius:10,
              borderWidth: 1,
              borderColor: 'transparent',
              elevation: 0,
            },
    scroll: {
              margin:10,
              width:'70%',
              backgroundColor:'#ffffff',
              borderRadius: 10,
              borderTopWidth: 1.5,
              borderBottomWidth:1.5,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              borderColor: 'green',
            },
    date_component: {


    },

  });
