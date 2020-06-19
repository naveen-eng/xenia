import React from 'react';
import {
          AsyncStorage,
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
 // import {ListView} from 'deprecated-react-native-listview';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import {
          Card,
          CardImage,
          CardTitle,
          CardContent,
          CardAction,
        } from 'react-native-card-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import Logo from './Image/logo.png';
import Search from '../src/Image/search.png';
import Header from '../src/cameraHeader';
import Year from '../src/YearBox';
import Month from '../src/MonthBox';
import User from '../src/UserIdBox';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class monthlyreport extends React.Component {
  static navigationOptions = {

    headerLeft: null,
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
                      width:viewportWidth/1.1,
                    },
  };

  constructor(props) {
    super(props)
    this.state = {
                  date:'',
                  user_id:'',
                  loading: false,
                  monthly:'',
                  uri:'',
                  name:'',
                  data:[],
                  counter_data:'',
                  pic_name_data:'',
                  s_date:'',
                  color:"p",
                  value:'',
                  status:'',
                  status_data:'',
                  backgroundColor:'',
                  week_off:'Week-Off'
                 };
  }
data_submit=async()=>{
}
componentDidMount(){
  if("Present"){
    backgroundColor:'green'
  }
}
show_fast(){
  this.show();
  this.show_last();
}
show_last=()=>{
  const {data,value,status}=this.state;
  console.log("status")
  if(status==="Present"){

    this.setState({color:'green'})
  }else if (status==="Week-Off") {
    this.setState({status_data:"w"})
  }
}
  hideLoader = () => {
      this.setState({ loading: false });
    }

    showLoader = () => {
      this.setState({ loading: true });
    }
   show =async() =>{
     const {user_id} = this.state;


     console.log("I am going to call show api")
     var data = JSON.stringify({
       // we will pass our input data to server
       year: this.state.year,
       month: this.state.month,
       user_id: this.state.user_id,
     })

const _this = this;
this.showLoader();
const context=this;
var userObj = JSON.parse(context.props.route.params.userObj);
var successToken=(userObj.success.secret_token);
var userid =(userObj.success.user.employee.user_id);
console.log(userid);
console.log(successToken);
var data = new FormData();
const {date} = this.state;
const year = date[0]+date[1]+date[2]+date[3];
const month = date[5]+date[6];
console.log(year);
console.log(month);
data.append("year", year);
data.append("month", month);
data.append("user_id", userid);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState !== 4) {
              return;
  }
  if (xhr.status === 200) {
 _this.hideLoader();
    console.log("Successfully200")
    var json_obj = JSON.parse(xhr.responseText);
    var c = json_obj.success.user.monthly_data;
    var counter=json_obj.success.user.counter_data;
    var pic_name=json_obj.success.user.employee;
    context.setState({counter_data:counter});
    context.setState({pic_name_data:pic_name});
    context.setState({data:c});
    {c.map((item) => {
      return(
        context.setState({status:item.status})
      );
    })}
    // context.props.navigation.navigate("welcome");

// console.log(xhr.responseText);
 // var abc=xhr.responseText;
 //
 //        context.props.navigation.navigate("ShowMonthlyReport",{abc});

  }

  else{
    console.log("inside error")
     Alert.alert("Invaild data");
_this.hideLoader();
  }
}
);

xhr.open("POST", "http://erp.xeamventures.com/api/v1/monthly-attendance-report");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Authorization", "Bearer " + successToken);
xhr.send(data);
   }



   _menu = '';

     setMenuRef = ref => {
       this._menu = ref;
     };

     hideMenu = () => {
       const value = this.value;
       this.setState({value});
       console.log(value);
     };

     showMenu = () => {
       this._menu.show();
     };

conditional=(t)=>{

  if(t=="Present"){
    return "Present"
  }if(t=="Absent"){
    return "Absent"
  }if(t=="Week-Off"){
    return "Week-Off"
  }if(t=="Holiday"){
    return "Holiday"
  }if(t=="Leave"){
    return "Leave"
  }
}
time_conditional=(t)=>{
  if(t ==""){
    return ""
  }if(t !==""){
    return ""
  }
}

  render() {
    const card = {card: {width: '100%', height: '100%',bottom:'35%'}};
const {monthly,uri,name,data,counter_data,pic_name_data,date,s_date,status,status_data,backgroundColor}=this.state;
const t=[counter_data]
const Options= [{Date:'Date',Status:'Status',First_Punch:'First punch',Last_Punch:'Last punch'}]
var pic={uri:pic_name_data.profile_picture};
const context=this;

// var date ="";
//   for (i = 0; i < monthly.length; i++) {
//       date += monthly[i].on_date.split('').join('')+'\n'+'\n';
//   };
//       var status ="";
//         for (i = 0; i < monthly.length; i++) {
//             status += monthly[i].status.split().join('')+'\n'+'\n';
//
//         };
//       //
//           var first_punch ="";
//             for (i = 0; i < monthly.length; i++) {
//                 first_punch += monthly[i].first_punch.split().join('')+'\n'+'\n';
//             };
//                   var last_punch ="";
//                     for (i = 0; i < monthly.length; i++) {
//                         last_punch+=monthly[i].last_punch.split().join('')+'\n'+'\n';
//                     };
  // console.log(last_punch);

    return (
      <View style={{height:viewportHeight}}>
      <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{left:'15%',top:'45%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Attendance Manager</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
      <View>
         <View style={styles.pagecomponent}>
         <TouchableOpacity style={{top:30,left:'35%'}} onPress={()=>this.show()}>
            <Text style={{borderRadius: 8,color:'white',backgroundColor:'rgb(19,111,232)',paddingTop:5,paddingBottom:5,paddingLeft:10,paddingRight:10,overflow: "hidden"}}>Search</Text>
         </TouchableOpacity>
         <Text style={{right:'25%',top:5,fontSize:15}}>Select Month :  </Text>
        <View style={{margin:0,left:'0%',bottom:25}}>
      <DatePicker
          style={{width: 110}}
          date={this.state.date}
          mode="date"
          placeholder="YYYY-MM"
          format="YYYY-MM"
          minDate="2016-01"
          maxDate="2022-12"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          
          onDateChange={(date) => {this.setState({date: date})}}
        />

          </View>
      </View>
      <View style={{top:'3%',alignItems:'center'}}>
      <Image source={pic} style={{height:80,width:80,borderRadius:75,borderColor:'black',}}/>
      <Text style={{fontSize:20, color: 'black',top:'6%',alignItems: 'center',textAlignVertical:'center',textAlign:'right',marginBottom:'0%'}}>{pic_name_data.fullname}</Text>
      </View>
      
      {t.map((item) => {
      return (
        <View style={{marginLeft:5,marginRight:5}}>
        <Text style={[
        (this.time_conditional(item.Present))==""?styles.pre:styles.data_trd,
        styles.data_trd,
      ]}> Present:{item.Present} </Text>
       <Text style={[
       (this.time_conditional(item.Absent))==""?styles.ab:styles.data_trd,
       styles.data_trd,
     ]}>Absent:{item.Absent}</Text>
       <Text style={[
       (this.time_conditional(item.Leave))==""?styles.lea:styles.data_trd,
       styles.data_trd,
     ]}> Leave:{item.Leave}</Text>
       <Text style={[
       (this.time_conditional(item.Holiday))==""?styles.holy:styles.data_trd,
       styles.data_trd,
     ]}>Holiday:{item.Holiday}</Text>
       </View>);
      })}
      <View style={styles.drowline}/>
            <View style={styles.card_view}>
            <Text style={{color:'#fcfeff',right:5,top:'35%'}}>Monthly Days Details</Text>
            </View>
             <View style={styles.CardView_sec}>
             {(this.state.loading) ?
               <View style={{
                          flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                          alignItems: 'center', justifyContent: 'center',
                          position: 'absolute', height:'20%',
                          shadowOffset:{  width: 100,  height: 100,  },
                          shadowColor: '#330000',
                          shadowOpacity: 0,
                          shadowRadius: 5,
                          elevation: 10,
                          left:'25%',
                          top:'30%'
                      }}>

               <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                       <Text style={{fontSize:15,left:10}}>Loading..</Text>
               </View>
               : null}
            <View style={{marginTop:'2%',marginBottom:'2%',backgroundColor:'#cdcfd1',height:'15%',width:'100%',borderRadius: 0}}>
            {Options.map((item) => {
            return (
              <View style={{width:'100%'}}>
              <Text style={{top:10,left:'5%'}}>{item.Date}</Text>
              <Text style={{bottom:'10%',left:'30%'}}>{item.Status}</Text>
              <Text style={{bottom:'35%',left:'55%'}}>{item.First_Punch}</Text>
              <Text style={{bottom:'60%',left:'80%'}}>{item.Last_Punch}</Text>
                 </View>
            );
            })}
            </View>

<ScrollView style={{width:'100%',}} >
{data.map((item) => {
return (
     <View>
    <Text style={{top:'20%',left:'2%'}}>{item.on_date}</Text>
    <Text style={[
      (this.conditional(item.status)=="Present")?styles.present:styles.data_sec,
      (this.conditional(item.status)=="Absent")?styles.absent:styles.data_sec,
      (this.conditional(item.status)=="Week-Off")?styles.week_off:styles.data_sec,
      (this.conditional(item.status)=="Holiday")?styles.Holiday:styles.data_sec,
      (this.conditional(item.status)=="Leave")?styles.Leave:styles.data_sec,
        styles.data_sec
    ]}>  {item.status.substring(0,1)}</Text>
      <Text style={{left:'55%',bottom:'30%'}}>{item.first_punch}</Text>
        <Text style={{left:'80%',bottom:'55%'}}>{item.last_punch}</Text>
      </View>
);
})}
      </ScrollView>
      </View>
      </View>
      </View>

    );
}
}

const styles = StyleSheet.create({
  present:{backgroundColor:'#78b341',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  absent:{backgroundColor:'#c11418',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  week_off:{backgroundColor:'#ffbf80',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  Holiday:{backgroundColor:'#adadad',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  Leave:{backgroundColor:'#76cae4',borderRadius:12,height:23,width:25,color:'white',overflow: "hidden"},
  pre:{backgroundColor:'#78b341',color:'white',left:'0.5%',top:'80%',borderRadius:4,paddingLeft:4,width:'26%',overflow: "hidden"},
    ab:{backgroundColor:'red',color:'white',left:'28%',top:'55%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    lea:{backgroundColor:'#76cae4',color:'white',left:'52%',top:'30%',borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
    holy:{backgroundColor:'#adadad',color:'white',left:'76%',top:'5%',marginBottom:0,borderRadius:4,paddingLeft:4,width:'23%',overflow: "hidden"},
  time:{color:'red'},
  data_sec:{
    top:0,
    alignItems:'center',
    left:'32%',
  },
  data_trd:{
    bottom:0
  },
  data:{
    margin:10,
    width:'100%',
  },

  button: {
zIndex: 100,

    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 0,
  },
  button_sec: {
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
  CardView: {
    marginTop:200,
    flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'rgb(0,0,0)',
    width:viewportWidth/1.03,
    height: viewportHeight / 1.5,
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent: {
    top:'2%',
     left:'1%',
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:viewportWidth/1.02,
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width:viewportWidth,
    height:viewportHeight
  },
  info: {
    width:'20%',
        flexGrow: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 15,

    },
drowline: {
          top:10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#cdcfd1',
            width:'100%',
            height: '0.1%',
            // shadowOffset:{  width: 100,  height: 100,  },
            // shadowColor: '#330000',
            shadowOpacity: 0,
            // shadowRadius: 0,
            elevation: 1,
          },
card_view: {
            marginTop:'5%',
            marginBottom:'2%',
            right:'0%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomEndRadius: 150,
            borderTopWidth: 1.5,
            borderBottomWidth:1,
            borderRightWidth:1.5,
            borderLeftWidth:1.5,
            borderColor: 'rgb(19,111,232)',
            backgroundColor:'rgb(19,111,232)',
            width:'40%',
            height: '7%',
            // shadowOffset:{  width: 100,  height: 100,  },
            // shadowColor: '#330000',
            shadowOpacity: 0,
            // shadowRadius: 0,
             elevation: 5,
           },
CardView_sec: {
           marginTop:0,
           flex:0,
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 0,
           borderTopWidth: 1.5,
           borderBottomWidth:1.5,
           borderRightWidth:1.5,
           borderLeftWidth:1.5,
           borderColor: 'rgb(19,111,232)',
           width:viewportWidth,
           height: '50%',
           // shadowOffset:{  width: 100,  height: 100,  },
           // shadowColor: '#330000',
           shadowOpacity: 0,
           // shadowRadius: 0,
           // elevation: 5,
         },
  // commentbox: {
  //   widht:20,
  //   height:10,
  //   margin:4,
  //   shadowOffset:{  width: 100,  height: 100,  },
  //   shadowColor: '#330000',
  //   shadowOpacity: 0,
  //   shadowRadius: 5,
  //   elevation: 10,
  // },

});
