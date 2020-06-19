import React, { Component } from 'react';
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
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
import time from '../src/Image/menu.png'
import Triangle from '../src/triangle'
import LeftSide from '../src/Image/side.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        Prospect_name:'',
        button_value:'',
    };
  }

  goverment = () => {
    this.setState({leaveType:"Short"});
    this.setState({button_value:0});
    
  };
  corporate = () => {
    this.setState({leaveType:"Short"});
    this.setState({button_value:1});
    
  };

  render (){
         const context=this;
         console.log(this.state.Prospect_name)
         let status = [{value: 'all',}, {value: 'Today Tasks',}, {value: 'Delayed Tasks',},{value: 'Upcoming Tasks', },{value: "This Week's Tasks",},{value: "This Month's Tasks",},];
  return (
    <View style={{height:viewportHeight,width:viewportWidth,backgroundColor:'white'}}>
    <View style={{backgroundColor:'rgb(19,111,232)',height:hp('10%')}}>
            <View style={{top:hp(4),left:wp(15)}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Create Lead</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.props.navigation.toggleDrawer()}>
            <Image source={require('../src/Image/menu.png')} style={{ width: wp(8), height: hp(5), marginLeft:wp(2),top:0 }}/>
            </TouchableOpacity>
            </View>
            <View style={styles.pagecomponent_thrd}>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/Prospect.png')} style={{  marginLeft: wp(2),top:hp(3) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(2),borderBottomWidth:hp(0.1),}}
    label={'Prospect Name'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>

    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/Location.png')} style={{ marginLeft: wp(2),top:hp(2) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft: wp(4),borderBottomWidth:hp(0.1)}}
    label={'Address'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>
     <View style={{flexDirection:'row'}}>
         <View style={{flexDirection:'row'}}>
         <Image source={require('../src/Image/Industry.png')} style={{ marginLeft: wp(2),top:hp(4) }}/>  
     <Dropdown
               containerStyle={{width:wp('31%'),left:wp('3%'),}}
               inputContainerStyle={{ borderBottomWidth:wp(0.2),borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
               data={status}
               label='Industry'
               onChangeText={status => this.setState({ status })}
             />
        </View>
        <View style={{flexDirection:'row',left:wp(10)}}>
        <Image source={require('../src/Image/Source.png')} style={{  marginRight: 0,top:hp(4) }}/> 
    <Dropdown
               containerStyle={{width:wp('31%'),left:wp('2%'),}}
               inputContainerStyle={{ borderBottomWidth:wp(0.2),borderBottomColor:"rgb(19,111,232)",fontSize:hp(2) }}
               data={status}
               label='Source'
               onChangeText={status => this.setState({ status })}
             />
        </View>
     </View>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:hp(3)}}>
       <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.goverment}>
            {this.state.button_value=== 0 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Government Business</Text>

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.corporate}>
            {this.state.button_value=== 1 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Corporate Business</Text>
       </View>

       <View style={styles.pagecomponent_nine}>
           
              <Text style={{top:hp(3),backgroundColor:'white',color:'rgb(19,111,232)'}}>    Contect Person Detail    </Text>
              <View style={{top:hp(5)}}>
              <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/name.png')} style={{ top:hp(2.5) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Name'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>
    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/mail.png')} style={{ top:hp(4) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'E-Mail'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>
    <View style={{flexDirection:'row'}}>
        <Image source={require('../src/Image/phone.png')} style={{ top:hp(3) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Mobile Number'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>
    <View style={{flexDirection:'row',marginBottom:20}}>
        <Image source={require('../src/Image/phone.png')} style={{ top:hp(3) }}/>
    <Hoshi
    style={{width:wp('70%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(3) ,borderBottomWidth:1,}}
    label={'Alternet Number'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={35}
    labelStyle={{ fontSize:14 }}
    inputStyle={{ color: 'black',fontSize:15, }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
  </View>
    </View>
   </View>
     
   <View style={{flexDirection:'row',alignItems:'center',margin:10,}}>
                <View>
            <DatePicker
                style={{width:wp ('45%'),}}
                date={this.state.from_time}
                mode="date"
                placeholder="Choose From Time"
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                
                onDateChange={(date) => {this.setState({from_time: date})}}
              />
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'90%',top:'0%',left:'10%'}}/>
             </View>
            <View>
            <DatePicker
                style={{width: wp('45%'),bottom:'0%',marginLeft:'0%'}}
                date={this.state.to_time}
                mode="time"
                placeholder="Choose To Time"
                format="hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../src/Image/Time.png')}
                onDateChange={(date) => {this.setState({to_time: date})}}
              />
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'90%',top:'0%',left:'10%'}}/>
              </View>
              
            </View>
    
            <View style={{flexDirection:'row',marginBottom:20}}>
        <Image source={require('../src/Image/Services.png')} style={{  marginLeft: wp(2),top:hp(3) }}/>
    <Hoshi
    style={{width:wp('80%'),borderBottomColor:'rgb(19,111,232)',marginLeft:wp(2),borderBottomWidth:hp(0.1),}}
    label={'Service Required'}
    borderColor={'rgb(19,111,232)'}
    borderHeight={1}
    inputPadding={16}
    height={hp(5)}
    labelStyle={{ fontSize:hp(2) }}
    inputStyle={{ color: 'black',fontSize:hp(2.5), }}
    backgroundColor={'transparent'}
    onChangeText={Prospect_name => this.setState({ Prospect_name })}
                  value={this.state.Prospect_name}
  />
    </View>
    
    <View style={styles.card_view_thrd}>
        <Text style={{top:20,color:'white'}}>Service Description</Text>
       <Image source={LeftSide} style={{left:wp(25),bottom:hp('1.4%'),height:hp('5%'),width:wp('10%'),borderColor:'black',alignItems:'center'}}/>
       </View>
    
<TextInput
                  style={{ height: 100, borderColor: 'rgb(19,111,232)',borderRadius:10, borderWidth: 1, top:35,width:'90%',fontSize:15,left:15 }}
                  placeholder={''}
                  keyboardType="default"
                  onChangeText={value_sec => this.setState({ value_sec })}
                  value={this.state.value_sec}
                />
   
    <View style={{height:'50%',top:60,paddingBottom:200}}>
<TouchableOpacity style={{alignItems:'center',right: 20,height:'100%'}} onPress={()=>this.apply_leave_post()}>
<Text style={{fontSize:15,backgroundColor:'rgb(19,111,232)',color:'white',paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30,borderRadius: 10,overflow: "hidden"}}>Apply</Text>
</TouchableOpacity>
</View>

    </ScrollView>
    </SafeAreaView>
    </View>
    </View>
    );
}

}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  container: {
    flex: 0,
    flexDirection:'column',
    left:'0%',
    width:wp('100%'),
    height:hp('90%'),

  },
  scrollView: {
    margin:100,
    
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
    height:'0%',
    top:'0%',
   

  },
  pagecomponent_nine: {
    
    left:'4%',
    top:'0%',
    padding:10,
    margin:'15%',
    marginBottom:'0%',
    marginLeft:0,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    borderRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1,
    borderLeftWidth:1,
    borderColor: 'rgb(19,111,232)',
    width:wp('90%'),
    
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 1,

},
pagecomponent_thrd: {
    
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    // borderRadius: 10,
    // borderTopWidth: 1.5,
    // borderBottomWidth:1.5,
    // borderRightWidth:1.5,
    // borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:wp('100%'),
    height:hp('90%'),
     
     
    // shadowOffset:{  width: 100,  height: 100,  },
    // shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 0,
    overflow: "hidden"
},
card_view_thrd: {
      
    
    top:'0%',
    right:'0%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 0,

    backgroundColor:'#3280e4',
    width:wp('40%'),
    height:hp ('5%'),
    // shadowOffset:{  width: 100,  height: 100,  },
    // shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
},
});
