import React, {Component} from 'react';
import {
  TimePickerAndroid,
  DatePickerAndroid,
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
   ScrollView,
   SafeAreaView,
   TextInput
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
import LeaveSectionDesign from '../src/LeaveSectionDesign';
import { Dropdown } from 'react-native-material-dropdown';
import { CustomPicker } from 'react-native-custom-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
                loading: false,
                leave_types:[],
                language_sec:'',
                language_thrd:'',
                countries_Value:'',
                states_Value:'',
                cities_Value:'',
                departments_Value:'',
                employees_Value:'',
                from_time:'',
                from_date:'',
                to_time:'',
                to_date:'',
                number_of_days:'',
                countries:[],
                states:[],
                cities:[],
                departments:[],
                employees:[],
                value:'',
                value_sec:'',
                value_thrd:'',
                replacement_id:'',
                excluded_dates:'',
                included_dates:'',
                fileInput:'',
                types1: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1}],
                value1: 0,
                value1Index: 0,
                value1_1: 0,
                value1_1Index: 0,
                types2: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1},],
                value2: 0,
                value2Index: 0,
                types3: [{label: 'First Half', value: 0}, {label: 'Second Half', value: 1},],
                value3: 0,
                value3Index: 0,
                show: true,
                show_sec: true,
                leaveType:'',
                button_value:''
              }
         }
  static navigationOptions = {
                     
                  };

hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }
componentDidMount(){
this.apply_leave().done();
this.ShowHideComponent_short();

}
apply_leave=async()=>{

  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {

  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
    _this.hideLoader();
      // console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var leave_types = json_obj.success.leave_data.leave_types;
      var countries = json_obj.success.leave_data.countries;
      var states = json_obj.success.leave_data.states;
      var departments = json_obj.success.leave_data.departments;
      // console.log(leave_types)
      context.setState({leave_types:leave_types})
      context.setState({countries:countries})
      context.setState({states:states})
      context.setState({departments:departments})
  }

  else{
    console.log("inside error")
     Alert.alert("Internet connection lost");
_this.hideLoader();

  }
  // if(this.readyState === 4) {
  //
  // }
});

xhr.open("GET", "http://erp.xeamventures.com/api/v1/apply-leave");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);

xhr.send(data);
}
between_leave_holidays=async()=>{
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
  console.log(this.state.from_date)
data.append("from_date", this.state.from_date);
data.append("to_date", this.state.to_date);
data.append("secondary_leave_type", this.state.leaveType);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
      // console.log(this.responseText);
      _this.hideLoader();
       console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var number_of_days = json_obj.success.number_of_days;
      var excluded_dates = json_obj.success.excluded_dates;
      var included_dates = json_obj.success.included_dates;
      console.log(number_of_days)
      context.setState({number_of_days:number_of_days})
      context.setState({excluded_dates:excluded_dates})
      context.setState({included_dates:included_dates})
  }

  else{
    console.log("inside error")

_this.hideLoader();

  }
  // if(this.readyState === 4) {

  // }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/between-leave-holidays");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

cities=async()=>{
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
  console.log(this.state.states_Value)
data.append("state_ids", this.state.states_Value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
      // console.log(this.responseText);
      _this.hideLoader();
     console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var cities = json_obj.success.cities;
      context.setState({cities:cities})
  }

  else{
    console.log("inside error")
     Alert.alert("Internet connection lost");
_this.hideLoader();

  }
  // if(this.readyState === 4) {

  // }
});

xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/states-wise-cities");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

leave_replacement_availability=async()=>{
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var data = new FormData();
data.append("from_date", this.state.from_date);
data.append("to_date", this.state.to_date);
data.append("department_id", this.state.departments_Value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (xhr.status === 200) {
       console.log(this.responseText);
      _this.hideLoader();
       // console.log(this.responseText);
      var json_obj = JSON.parse(xhr.responseText);
      var employees = json_obj.success.employees;


      context.setState({employees:employees})
      // context.setState({replacement_id:replacement_id})
      }

  else{
    console.log("inside error")
     // Alert.alert("Plase select date");
_this.hideLoader();

  }
});

xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/leave-replacement-availability");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}

apply_leave_post=async()=>{
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var fileInput= "";
   console.log(this.state.to_date)
   console.log(this.state.from_date)
   console.log(this.state.employees_Value)
   console.log(this.state.value_sec)
   console.log(this.state.number_of_days)
   console.log(this.state.language_sec)
   console.log(this.state.from_time)
   console.log(this.state.to_time)
   console.log(this.state.countries_Value)
   console.log(this.state.states_Value)
   console.log(this.state.cities_Value)
   console.log(this.state.value)
   console.log(this.state.excluded_dates)
   console.log(this.state.included_dates)

  var data = new FormData();
data.append("to_date", this.state.to_date);
data.append("from_date", this.state.from_date);
data.append("reason", this.state.value_thrd);
data.append("replacement_id", this.state.employees_Value);
data.append("tasks", this.state.value_sec);
data.append("number_of_days", this.state.number_of_days);
data.append("secondary_leave_type", this.state.leaveType);
data.append("leave_type_id", this.state.language_sec);
data.append("from_time", this.state.from_time);
data.append("to_time", this.state.to_time);
data.append("country_id", this.state.countries_Value);
data.append("state_id", this.state.states_Value);
data.append("city_id", this.state.cities_Value);
data.append("mobile_country_id", "1");
data.append("mobile_number", this.state.value);
data.append("excluded_dates", this.state.excluded_dates);
data.append("leave_half", this.state.types2[this.state.value2Index].label);
data.append("leave_documents", "");
data.append("included_dates", this.state.included_dates);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                              return;
                            }
  if (this.status === 200) {
       console.log("200",this.responseText);
      _this.hideLoader();
       // console.log(this.responseText);
      Alert.alert("Leave Applied Successfully")
      // Alert.alert(this.responseText)
        return;
      }
      

  else{
    _this.hideLoader();
        var json_obj = JSON.stringify(xhr.responseText);
        var error = json_obj.error;
          console.log("error",error);
          Alert.alert(json_obj.substring(14,163));
          return;

  }
});

xhr.open("POST", "http://erpportaltest.xeamventures.com/api/v1/apply-leave");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");

xhr.send(data);
}


from_date=async()=>{
  try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 3, 25),
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
    this.setState({
                  from_date: year+"-"+month+"-"+day
              });
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
}

to_date=async()=>{
  try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 3, 25),
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
    this.setState({
                  to_date: year+"-"+month+"-"+day
              });
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
this.between_leave_holidays();
}
combo(){
  this.between_leave_holidays();
this.to_date();

}
ShowHideComponent_short = () => {
  this.setState({leaveType:"Short"});
  this.setState({button_value:0});
  this.between_leave_holidays();
  if (this.state.show == false) {
    this.setState({ show: true });
  }
  if (this.state.show_sec == true) {
    this.setState({ show_sec: false });
  }
};
ShowHideComponent_half = () => {
  this.setState({leaveType:"Half"});
  this.setState({button_value:1});
  this.between_leave_holidays();
  if (this.state.show == true) {
    this.setState({ show: false });
  }
  if (this.state.show_sec == false) {
    this.setState({ show_sec: true });
  }
};
ShowHideComponent_full = () => {
  this.setState({leaveType:"Full"});
  this.setState({button_value:2});
  this.between_leave_holidays();
  if (this.state.show == true) {
    this.setState({ show: false });
  }
  if (this.state.show_sec == true) {
    this.setState({ show_sec: false });
  }
};
    render (){
           const {leave_types,language_sec,language_thrd,from_time,from_date,to_time,to_date,number_of_days,countries,states,cities,states_Value,departments,employees,value,value_thrd,replacement_id,employees_Value,cities_Value,excluded_dates,included_dates,button_value,departments_Value}= this.state;
          const Options= [
            {time:'1 AM',id:'1 AM'},{time:'2 AM',id:'2 AM'},{time:'3 AM',id:'3 AM'},{time:'4 AM',id:'4 AM'},{time:'5 AM',id:'5 AM'},{time:'6 AM',id:'6 AM'},{time:'7 AM',id:'7 AM'},{time:'8 AM',id:'8 AM'},{time:'9 AM',id:'9 AM'},{time:'10 AM',id:'10 AM'},{time:'11 AM',id:'11 AM'},{time:'12 AM',id:'12 AM'},

          ]
          const context=this;
           // console.log(this.state.types2[this.state.value2Index].label)
             // console.log(excluded_dates)
             // console.log(included_dates)
           // console.log(value)
           console.log(departments_Value)
           console.log(employees_Value)
           //
           // console.log(from_date)
           // const context=this;

		return(
            <View>
              <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{top:hp('5%'),left:'15%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Apply Leave</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
            <View style={{height:'100%',width:'100%',backgroundColor:'white'}}>

           
            
             <View style={styles.compo}>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.ShowHideComponent_short}>
            <Text style={[button_value=== 0 ? styles.button_value_one :styles.button_value_sec ]}>
               Short
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{left:'0%',bottom:'0%'}} onPress={this.ShowHideComponent_half}>
            <Text  style={[button_value=== 1 ? styles.button_value_one :styles.button_value_sec ]}>
               Half
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{left:'0%',bottom:'0%'}} onPress={this.ShowHideComponent_full}>
              <Text style={[button_value=== 2 ? styles.button_value_one :styles.button_value_sec ]}>
               Full
              </Text>
            </TouchableOpacity>
             </View>
            <View style={styles.pagecomponent_thrd}>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

            {(this.state.loading) ?
              <View style={{
                         flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                         alignItems: 'center', justifyContent: 'center',
                         position: 'absolute', height:'5%',
                         shadowOffset:{  width: 100,  height: 100,},
                         shadowColor: '#330000',
                         shadowOpacity: 0,
                         shadowRadius: 5,
                         elevation: 10,
                         left:'25%',
                         top:'40%'
                     }}>

              <ActivityIndicator  size="large" color='rgb(19,111,232)'/>
                      <Text style={{fontSize:15,left:10}}>Loading..</Text>
              </View>
              : null}

            
            <Dropdown
              containerStyle={{width:'90%',left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.leave_types}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Select leave type'
              onChangeText={language_sec => this.setState({ language_sec })}
            />

           
            {this.state.show ? (
              
              <View style={{flexDirection:'row'}}>
                <View>
            <DatePicker
                style={{width: 160,top:'0%',left:'0%',}}
                date={this.state.from_time}
                mode="time"
                placeholder="Choose From Time"
                format="hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../src/Image/Time.png')}
                onDateChange={(date) => {this.setState({from_time: date})}}
              />
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'90%',top:'0%',left:'5%'}}/>
             </View>
            <View>
            <DatePicker
                style={{width: 150,bottom:'0%',marginLeft:'0%'}}
                date={this.state.to_time}
                mode="time"
                placeholder="Choose To Time"
                format="hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require('../src/Image/Time.png')}
                onDateChange={(date) => {this.setState({to_time: date})}}
              />
              <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'90%',top:'0%',left:'5%'}}/>
              </View>
              
            </View>
            
           
) : null}
       {this.state.show_sec ? (
         <View style={{height:'7%'}}>
     <Text style={{top:'35%',fontSize:15}}>Time Interval:</Text>
     <View style={styles.radioStyle}>
       <RadioForm
         formHorizontal={true}
         animation={true}

       >
         {this.state.types2.map((obj, i) => {
           var that = this;
           var is_selected = this.state.value2Index == i;
           return (
             <View key={i} style={styles.radioButtonWrap}>
               <RadioButton
                 isSelected={is_selected}
                 obj={obj}
                 index={i}
                 labelHorizontal={false}
                 buttonColor={'#2196f3'}
                 labelColor={'#000'}
                 style={[i !== this.state.types2.length-1 && styles.radioStyle]}
                 onPress={(value, index) => {
                   this.setState({value2:value})
                   this.setState({value2Index: index});

                 }}
               />
             </View>
           )
         })}
       </RadioForm>

     </View>
     <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'90%',bottom:hp('0%'),right:'0%'}}/>
     </View>
   ) : null}
              <View style={{flexDirection:'row',top:'4%',}}>
                <View>
              <DatePicker
                  style={{width: 160,top:'0%',left:'0%'}}
                  date={this.state.from_date}
                  mode="date"
                  placeholder="Choose From Date"
                  format="YYYY-MM-DD"
                  minDate="2016-01"
                  maxDate="2022-12"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                 
                  onDateChange={(date) => {this.setState({from_date: date})}}
                />
               <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                </View>
              <View>
                <DatePicker
                    style={{width: 150,marginLeft:'0%'}}
                    date={this.state.to_date}
                    mode="date"
                    placeholder="Choose To Date"
                    format="YYYY-MM-DD"
                    minDate="2016-01"
                    maxDate="2022-12"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    
                    onDateChange={(date) => {this.setState({to_date: date})||this.between_leave_holidays()}}
                  />
                  <View style={{backgroundColor:'rgb(19,111,232)',height:'1.4%',width:'92%',top:'0%',left:'5%'}}/>
                  </View>
            </View>
            
            
            <View style={styles.pagecomponent_eight}>
            <Text style={{right:"15%"}}>Number Of Days  :                        {number_of_days}</Text>
            </View>

            <View style={styles.pagecomponent_nine}>
              <Text style={{bottom:'15%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Your Visiting Location Where You Go    </Text>

             <View style={{flexDirection:'row',bottom:'4%'}}> 
              <Dropdown
              containerStyle={{width:'25%',right:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.countries}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Country'
              onChangeText={countries_Value => this.setState({ countries_Value })}
            />
            <Dropdown
              containerStyle={{width:'25%',left:'5%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.states}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='State'
              onChangeText={states_Value => this.setState({ states_Value })||this.cities()}
            />
            <Dropdown
              containerStyle={{width:'25%',left:'10%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.cities}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='City'
              onChangeText={cities_Value => this.setState({ cities_Value })}
            />
            </View>
             </View>
             <View style={styles.pagecomponent_ten}>

             <TextInput
                  style={{ height: 90, borderColor: 'transparent', borderWidth: 1, top:30,width:290,right:20,fontSize:14 }}
                   placeholder={'Enter Your Mobile Number During Leave'}
                  keyboardType="numeric"
                  onChangeText={value => this.setState({ value })}
                  value={this.state.value}
                />
             </View>
             <View style={styles.card_view_sec}>
             <Text style={{color:'#fcfeff',right:5}}>Handover Tasks : </Text>
             </View>
               <Image source={LeftSide} style={{left:'39.9%',bottom:'5%',height:'2%',width:50,borderColor:'black',alignItems:'center'}}/>
             <View style={styles.pagecomponent_one_one}>
             <TextInput
                  style={{ height: 80, borderColor: 'transparent', borderWidth: 1, top:50,width:'100%',fontSize:15,left:5 }}
                  placeholder={'Enter Your Task'}
                  keyboardType="default"
                  onChangeText={value_sec => this.setState({ value_sec })}
                  value={this.state.value_sec}
                />
             </View>
             <View style={styles.pagecomponent_one_two}>
               <Text style={{top:'6%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Replacement Person Details    </Text>

                  <View style={{flexDirection:'row'}}>
                  <Dropdown
              containerStyle={{width:'35%',left:'0%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.departments}
              valueExtractor={({id})=> id}
              labelExtractor={({name})=> name}
              label='Depatment'
              onChangeText={departments_Value => this.setState({ departments_Value })||this.leave_replacement_availability()}
            />
              
               <Dropdown
              containerStyle={{width:'35%',left:'10%'}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={this.state.employees}
              valueExtractor={({user_id})=> user_id}
              labelExtractor={({fullname})=> fullname}
              label='Employee'
              onChangeText={employees_Value => this.setState({ employees_Value })}
            />
            </View>
              </View>
              <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',right:5}}>Reason : </Text>
              </View>
                <Image source={LeftSide} style={{left:'39.9%',bottom:'10%',height:'2%',width:50,borderColor:'black',alignItems:'center'}}/>
              <View style={styles.pagecomponent_one_thrd}>
              <TextInput
                   style={{ height: 110, borderColor: 'transparent', borderWidth: 1, top:15,width:'100%',fontSize:15,left:5 }}
                   placeholder={'Enter Reason'}
                   keyboardType="default"
                   onChangeText={value_thrd => this.setState({ value_thrd })}
                   value={this.state.value_thrd}
                 />
              </View>
              <TouchableOpacity style={{bottom:'7%',alignItems:'center',right: 20}} onPress={()=>this.apply_leave_post()}>

               <Text style={{fontSize:15,backgroundColor:'rgb(19,111,232)',color:'white',paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30,borderRadius: 10,overflow: "hidden"}}>Apply</Text>

              </TouchableOpacity>
            </ScrollView>
            </SafeAreaView>
            </View>
            </View>
            </View>
      );
    }

    renderField(settings) {
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={styles.container_sec}>
          <View>
            {!selectedItem && <Text style={[styles.text, { color: 'black' }]}>{defaultText}</Text>}
            {selectedItem && (
              <View style={styles.innerContainer}>

                <Text style={[styles.text, { color: selectedItem.color }]}>
                  {getLabel(selectedItem)}
                </Text>
              </View>
            )}
          </View>
        </View>
      )
    }

    renderHeader() {
      return (
        <View style={styles.headerFooterContainer}>
          <Text>Leave Type</Text>
        </View>
      )
    }
    renderHeader_sec() {
      return (
        <View style={styles.headerFooterContainer}>
          <Text>Select Employee</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
    flex: 0,
    flexDirection:'column',
    left:'5%',
    width:'100%',
    height:'100%',

  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    marginVertical: 0,
    height:'0%',
    top:'0%',

  },

    pagecomponent_sec: {
                      flex:0.4,
                      bottom:40,
                      marginTop:0,
                      marginLeft:15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 10,
                      borderTopWidth: 1.5,
                      borderBottomWidth:1.5,
                      borderRightWidth:1.5,
                      borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth/1.1,
                      height: '10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
    },
    pagecomponent_thrd: {

                      top:hp('2%'),
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'white',
                      // borderRadius: 10,
                      // borderTopWidth: 1.5,
                      // borderBottomWidth:1.5,
                      // borderRightWidth:1.5,
                      // borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth,
                       height:'70%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      // shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden"
    },
    pagecomponent_fifth: {
                      left:'0%',
                      bottom:'0%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_sixth: {
                      left:'0%',
                      bottom:'55%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_half: {
                      left:'0%',
                      bottom:'40%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_seven: {
                      left:'0%',
                      bottom:'30%',
                      marginTop:0,
                      marginLeft:0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'#ffffff',
                      borderRadius: 0,
                      borderTopWidth: 1,
                      borderBottomWidth:1,
                      borderRightWidth:1,
                      borderLeftWidth:1,
                      borderColor: 'rgb(19,111,232)',
                      width:'90%',
                     height:'0%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_eight: {
                      top:'0%',
                      left:'0%',
                      bottom:'0%',
                      margin:20,
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
                      width:'90%',
                     height:'5%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
                      overflow: "hidden"
    },

    pagecomponent_nine: {
                      flex:0,
                      left:'0%',
                      top:'1%',

                      margin:'0%',
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
                      width:'90%',
                      
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,

    },
    pagecomponent_ten: {
                      top:'3%',
                      left:'0%',
                      bottom:'0%',
                      margin:0,
                      marginBottom:'20%',
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
                      width:'90%',
                     height:'5%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
                      overflow: "hidden"
    },
    pagecomponent_one_one: {
                      top:'-3%',
                      left:'0%',
                      bottom:'0%',
                      margin:0,
                      marginBottom:'20%',
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
                      width:'90%',
                     height:'8%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    pagecomponent_one_two: {
                      top:'-10%',
                      flex:0,
                      left:'0%',
                      bottom:'3%',
                      margin:'5%',
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
                      width:'90%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
    },
    pagecomponent_one_thrd: {
                      top:'-9%',
                      flex:0,
                      left:'0%',
                      bottom:'3%',
                      margin:'5%',
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
                      width:'90%',
                      height:'10%',
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 1,
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
                  marginBottom:0,
                  top:'-3%',
                  right:'0%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '2%',
                  // shadowOffset:{  width: 100,  height: 100,  },
                  // shadowColor: '#330000',
                  shadowOpacity: 0,
                  // shadowRadius: 0,
    },
    card_view_thrd: {
                  marginBottom:0,
                  top:'-8%',
                  right:'0%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomEndRadius: 0,

                  backgroundColor:'#3280e4',
                  width:'40%',
                  height: '2%',
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
                  paddingTop:0,
                  paddingBottom:0,
                  paddingLeft:0,
                  paddingRight:0,
                  backgroundColor:'rgb(19,111,232)',
                  borderRadius:10,
                  borderWidth: 1,
                  borderColor: 'transparent',
                  elevation: 0,
            },
    scroll: {
                  margin:5,
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
    headerFooterContainer: {
      padding: 10,
      alignItems: 'center'
    },
    container_sec: {
      borderColor: 'grey',
      borderWidth: 0,
      padding: 15
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    text: {
      fontSize:16,

    },
    compo: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 0,
      top:hp('2%')
    },
    radioStyle: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      marginBottom: 0,
      bottom:hp('0%')

    },
    button_value_one:{
      
      fontSize:18,
      backgroundColor:'#adadad',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden"
    },
    button_value_sec:{
      fontSize:18,
      backgroundColor:'rgb(19,111,232)',
      color:'white',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:30,
      paddingRight:30,
      borderRadius: 0,
      overflow: "hidden" 
    },
  });
