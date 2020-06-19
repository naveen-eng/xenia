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
   ScrollView,
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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-material-dropdown';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../src/Image/side.png';
import RightSide from '../src/Image/side2.png';
import Search from '../src/Image/search.png';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LeaveSectionDesign from '../src/LeaveSectionDesign';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {

  constructor(props){
  super(props)
  this.state={
                loading: false,
                token:'',
                final_data:'',
                final_data_sec:'',
                language:'',
                language_sec:'',
                tvf:[],
                tvl:[],
                data:[],
                from:'',
                to:'',
                counter_data:'',
                pic_name_data:'',
                emp_code:'',
                leaves:[],
                message:[],
                msg:[],
                xyz:'',
                slideAnimationDialog: false,
                employee:[],
                 sender:[],
                 name:'',
                 status:'',
                 Month:'',
                 Year:'',
                 leave_approvals_id:'',
                 applied_leave_id:'',
                 slideAnimationDialog:'',
                 button_value:'',
                 remark:'',
                 leave_approval_id:''
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

}

show_leaves=async()=>{
  const {language_sec,from,to}=this.state;
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  var name = permissions_fir.success.user.employee.fullname;
  this.setState({name:name})
 
  var data = new FormData();
  data.append("leave_status", this.state.status);
  data.append("month", this.state.Month);
  data.append("year", this.state.Year);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
    return;
}
 if(xhr.status===200){
     _this.hideLoader();
     console.log(xhr.responseText);
    var json_obj = JSON.parse(xhr.responseText);
    var leaves = json_obj.success.leave_approvals;
    

    // console.log(leaves)
     context.setState({leaves:leaves})
     {leaves.map((item) => {
      
        context.setState({leave_approvals_id:item.id})
        context.setState({applied_leave_id:item.applied_leave_id})
      })}
     //context.props.navigation.navigate("AppliedLeaveDetailPage",{leaves:leaves});
     


     // context.setState({message:message})

 }
 else{
  Alert.alert("No Data Found");
   console.log("inside error")

_this.hideLoader();
 }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/approve-leaves");
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);


xhr.send(data);
}
conditional=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "In-progress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
conditional_next=(t)=>{

  if(t=="Approved"){
    return "Approved"
  }
  if(t=="Inprogress"){
    return "Inprogress"
  }
  if(t=="Rejected"){
    return "Rejected"
  }
  if(t=="Cancelled"){
    return "Cancelled"
  }
}
message=()=>{
  const {message,msg,leaves}=this.state;
     // console.log(leaves)
     // Alert.alert("leaves")


        <View>
        <View style={styles.container}>

          <Button
            title="Slide Animation Dialog"
            onPress={() => {
              this.setState({
                slideAnimationDialog: true,
              });
            }}
          />
        </View>



        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="Slide Animation Dialog Sample" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
          <DialogContent>
            <Text>
              Here is an example of slide animation dialog. Please click outside
              to close the the dialog.
            </Text>
          </DialogContent>
        </Dialog>
        </View>



 //console.log(message)
  // Alert.alert({message}

  // )
}
detailPage=async()=>{
  const {leaves,message,msg,xyz}= this.state;
  console.log(xyz)
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;

 console.log(this.state.applied_leave_id)
 console.log(this.state.leave_approvals_id)
  var data = new FormData();
data.append("applied_leave_id",this.state.applied_leave_id );
data.append("leave_approval_id", this.state.leave_approvals_id);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    _this.hideLoader();
      
      var adf = JSON.parse(xhr.responseText);
    var xyz = adf.success.leave_detail.id;
    console.log("xyz",xyz);
     context.props.navigation.navigate("Approve_leaves_detail_page",{data_sec:xhr.responseText});
     context.props.navigation.navigate("Approve_leaves_detail_page",{xyz:xyz});
  }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/leave-detail");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send(data);
}
approveLeave=async()=>{

  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;
  const _this = this;
  this.showLoader();
  var data = new FormData();
  data.append("remark", this.state.remark);
  data.append("leave_approval_id", this.state.leave_approval_id);
  data.append("leave_status", this.state.button_value);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState !== 4) {
      return;
      
    }if(this.readyState === 200) {
      _this.hideLoader();
      console.log("200",xhr.responseText)
      Alert.alert("Leave Approved Successfully")
    }else{
      _this.hideLoader();
      console.log("else",xhr.responseText)
      
      Alert.alert("Leave Session Successfull")
    
  } 
  
  });
  
  xhr.open("POST", "http://erp.xeamventures.com/api/v1/leave-approval");
  xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
  
  xhr.send(data);
}
abc=()=>{
  // const {message}= this.state;
  // console.log("sender");
  // {message.map((item) => {
  // return (
  //   this.setState({sender:item.sender.employee})
  // )})}
}
xyz(){
  this.show_leaves();
  this.abc();
}
goverment = () => {
  
  this.setState({button_value:0});
  this.approveLeave();
  
};
corporate = () => {
  
  this.setState({button_value:1});
  this.approveLeave();
};
Rejected = () => {
  
  this.setState({button_value:2});
  this.approveLeave();
};
    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from}= this.state;
           const context=this;
           //console.log(leaves.secondary_final_status)
            
           console.log(this.state.status)
           console.log(this.state.Month)
           console.log(this.state.Year)
           console.log("leave_approval_id",this.state.leave_approval_id)
           let status = [{value: 'Panding',leave_status:'0'}, {value: 'Approved',leave_status:'1'}, {value: 'Rejected',leave_status:'2'},];
           let Month = [{value: 'January',leave_status:'0'}, {value: 'February',leave_status:'1'}, {value: 'March',leave_status:'2'},{value: 'April',leave_status:'2'},{value: 'May',leave_status:'2'},{value: 'June',leave_status:'2'},{value: 'July',leave_status:'2'},{value: 'August',leave_status:'2'},{value: 'September',leave_status:'2'},{value: 'October',leave_status:'2'},{value: 'November',leave_status:'2'},{value: 'December',leave_status:'2'},];
           let Year = [{value: '2016',leave_status:'0'}, {value: '2017',leave_status:'1'}, {value: '2018',leave_status:'2'}, {value: '2019',leave_status:'2'}, {value: '2020',leave_status:'2'}, {value: '2021',leave_status:'2'}, {value: '2022',leave_status:'2'}, {value: '2023',leave_status:'2'}];
           // console.log(employee)
		return(
      <View>
      <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{top:hp('5%'),left:'15%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Approve leaves list</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
      <View style={{height:'100%',top:'0%',backgroundColor:'white'}}>
      
      <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        visible={this.state.slideAnimationDialog}
        dialogTitle={<DialogTitle title="Approve leaves" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DialogContent>
          <View style={{height:'50%'}}>
          {(this.state.loading) ?
        <View style={{
                   flex:1,flexDirection:'row',width: '50%', backgroundColor: '#EFEFEF',
                   alignItems: 'center', justifyContent: 'center',
                   position: 'absolute', height:'50%',
                   shadowOffset:{  width: 100,  height: 100,  },
                   shadowColor: '#330000',
                   shadowOpacity: 0,
                   shadowRadius: 5,
                   elevation: 10,
                   left:'25%',
                   top:'28%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
          <View style={{top:hp(5)}}>
         <Text style={{bottom:'10%',
         backgroundColor:'#ffffe6',
         textAlign:'center',
         paddingTop:10,
         paddingBottom:10,
         paddingRight:10,
         paddingLeft:10
         }}>This Request require your apporoval </Text>
         <TextInput
                  style={{ height: 90, borderColor: 'black', borderWidth: 1, top:0,width:290,right:0,fontSize:14 }}
                   placeholder={'Remark'}
                  
                  onChangeText={remark => this.setState({ remark })}
                  value={this.state.remark}
                />
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',top:hp(10)}}>

         <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.goverment}>
            {this.state.button_value=== 0 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft:wp(0),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height:hp(4), marginLeft: wp(0),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>None</Text>

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.corporate}>
            {this.state.button_value=== 1 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        }
            </TouchableOpacity> 
            
            <Text style={{color:'rgb(19,111,232)'}}>Approved</Text>
            

            <TouchableOpacity style={{right:'0%',top:'0%'}} onPress={context.Rejected}>
            {this.state.button_value=== 2 ?
            <Image source={require('../src/Image/radio_on.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        :
        <Image source={require('../src/Image/radio_off.png')} style={{ width: wp(7), height: hp(4), marginLeft: wp(1),top:0 }}/>
        }
            </TouchableOpacity> 
            <Text style={{color:'rgb(19,111,232)'}}>Rejected</Text>
       </View>
      </View>
           </View>
        </DialogContent>
      </Dialog>
           
         <View style={styles.date_component}>
              <Text style={{bottom:'6%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Date    </Text>
<View style={{flexDirection:'row',top:0}}>
      
<Dropdown
              containerStyle={{width:'30%',right:10,bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Month}
              label='Month'
              onChangeText={ Month =>{
                if(Month==='January'){
                  context.setState({Month:'1'})
                }
                if(Month==='February'){
                  context.setState({Month:'2'})
                }
                if(Month==='March'){
                  context.setState({Month:'3'})
                }
                if(Month==='April'){
                  context.setState({Month:'4'})
                }
                if(Month==='May'){
                  context.setState({Month:'5'})
                }
                if(Month==='June'){
                  context.setState({Month:'6'})
                }
                if(Month==='July'){
                  context.setState({Month:'7'})
                }
                if(Month==='August'){
                  context.setState({Month:'8'})
                }
                if(Month==='September'){
                  context.setState({Month:'9'})
                }
                if(Month==='October'){
                  context.setState({Month:'10'})
                }
                if(Month==='November'){
                  context.setState({Month:'11'})
                }
                if(Month==='December'){
                  context.setState({Month:'12'})
                }
               } }
              
            />

<Dropdown
              containerStyle={{width:'30%',left:'0%',bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={Year}
              label='Year'
              onChangeText={ Year =>{ context.setState({ Year }) } }
              
            />
       
          <TouchableOpacity style={{top:20}} onPress={()=>this.show_leaves()}>
          <Image
                          source={require('../src/Image/search.png')}
                          style={{ width: 35, height: 35, marginLeft: 20,top:0,borderRadius:0 }}
                        />
      </TouchableOpacity>
    </View>
    <Dropdown
              containerStyle={{width:'80%',right:10,bottom:10}}
              inputContainerStyle={{ borderBottomWidth: 1,borderBottomColor:"rgb(19,111,232)" }}
              data={status}
              label='Status'
              onChangeText={ status =>{
                if(status==='Panding'){
                  context.setState({status:'0'}) ||this.show_leaves()
                }
                if(status==='Approved'){
                  context.setState({status:'1'}) ||this.show_leaves()
                }
                if(status==='Rejected'){
                  context.setState({status:'2'}) ||this.show_leaves()
                }
               } }
              
            />
      </View>
      
      <View style={styles.pagecomponent_thrd}>
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
                   top:'28%'
               }}>

        <ActivityIndicator  size="large" color='rgb(19,111,232)' />
                <Text style={{fontSize:15,left:10}}>Loading..</Text>
        </View>
        : null}
        <View style={{flexDirection:'row',top:'10%',right:100}}>
        <View style={styles.card_view_thrd}>
              <Text style={{color:'#fcfeff',left:5}}>Applied List : </Text>
              </View>
                <Image source={LeftSide} style={{left:'0%',bottom:'0%',height:'100%',width:50,borderColor:'black',}}/>
             </View> 
      <ScrollView style={{width:'100%',top:'10%'}}>
      {leaves.map((item) => {
      return (
                <View>
                  
                <View style={ styles.Approved }>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog: true,
                    leave_approval_id:item.id
                    
                  });
                }} style={{width:'85%',margin:5,}}>
                <Text style={{fontSize:12,fontWeight:'bold'}}> {item.user.employee.fullname}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={{left:'0%',top:'2.5%'}} 
                onPress={() => {
                  this.setState({      
        leave_approvals_id:item.id,
        applied_leave_id:item.applied_leave_id 
                  }) || this.detailPage() }}>
          <Image
                          source={require('../src/Image/eye.png')}
                          style={{ width: 20, height: 13,borderRadius:0 }}
                        />
      </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{margin:5,fontSize:12}}> From  : {item.applied_leave.from_date}    |</Text>
                <Text style={{margin:5,fontSize:12}}> To  : {item.applied_leave.to_date} </Text>
                
                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{margin:5,fontSize:12}}> Employee Code  : {item.user.employee_code}    |</Text>
                <Text style={{margin:5,fontSize:12}}> Status  : {item.applied_leave.secondary_final_status} </Text>
                </View>
                </View>
                
                
                </View>
            )
    })}

    </ScrollView>
      </View>
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    Approved_first:{ left:'0%',backgroundColor:'#78b341',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    In_Progress:{ left:'0%',backgroundColor:'#cc6600',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    rejected:{ left:'0%',backgroundColor:'#c11418',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},
    cancelled:{ left:'0%',backgroundColor:'#adadad',borderRadius:25,height:50,width:50,color:'white',fontSize:25,paddingTop:5,paddingLeft:2,overflow: "hidden"},

    Approved_Deflt:{backgroundColor:'black',borderRadius:12,height:50,width:50,color:'white'},
    Approved:{
      width:'95%',
      backgroundColor:'#ffffff',
      borderRadius: 0,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderLeftColor: '#85b3d1',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      margin:10,
      shadowColor: '#330000',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 5,
    },
    Approved_sec:{
      width:'70%',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#cc6600',
    },
    Approved_thrd:{
      width:'70%',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#c11418',
    },
    Approved_frth:{
      width:'70%',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#adadad',
      overflow: "hidden"
    },
    pagecomponent_sec: {
                      flexDirection:'row',
                      flex:0,
                      bottom:'5%',
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
                      flex:0.7,
                      bottom:2,
                      marginTop:0,
                      marginLeft:5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:'transparent',
                      // borderRadius: 10,
                      // borderTopWidth: 1.5,
                      // borderBottomWidth:1.5,
                      // borderRightWidth:1.5,
                      // borderLeftWidth:1.5,
                      borderColor: 'transparent',
                      width:viewportWidth/1.03,
                      // shadowOffset:{  width: 100,  height: 100,  },
                      shadowColor: 'transparent',
                      shadowOpacity: 0,
                      // shadowRadius: 0,
                      elevation: 0,
    },
    
    date_component: {
      
      left:'4%',
      top:20,
       flexDirection:'column',
      margin:'0%',
      marginBottom:'0%',
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
    button: {
              width:'20%',
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
   
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    card_view_thrd: {
      
      backgroundColor:'#3280e4',
      width:'25%',
      height: '100%',
      // shadowOffset:{  width: 100,  height: 100,  },
      // shadowColor: '#330000',
      shadowOpacity: 0,
      // shadowRadius: 0,
},

  });
