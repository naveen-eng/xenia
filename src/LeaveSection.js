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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import LeftSide from '../src/Image/side.png';
import RightSide from '../src/Image/side2.png';
import Search from '../src/Image/search.png';
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
                 name:''
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
data.append("from_date", this.state.from);
data.append("to_date", this.state.to);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if (xhr.readyState !== 4) {
                      return;
 }
 if(xhr.status===200){
     _this.hideLoader();
    var json_obj = JSON.parse(xhr.responseText);
    var leaves = json_obj.success.leaves;
    var message = leaves.messages;

    // console.log(leaves)
     context.setState({leaves:leaves})
     //context.props.navigation.navigate("AppliedLeaveDetailPage",{leaves:leaves});
     {leaves.map((item) => {
     return (
          context.setState({message:item.messages})

     )})}


     // context.setState({message:message})

 }
 else{
   return;
   console.log("inside error")

_this.hideLoader();
 }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/applied-leaves");
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
  console.log("xyz detailPage",xyz)
  const context=this;
  const _this = this;
  this.showLoader();
  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_four=permissions_fir.success.secret_token;


  var data = new FormData();
data.append("applied_leave_id", this.state.xyz);
data.append("leave_approval_id", "0");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    _this.hideLoader();
    var adf = JSON.parse(xhr.responseText);
    var xyz = adf.success.leave_detail.id;
    console.log("xyz",xyz);
     context.props.navigation.navigate("AppliedLeaveDetailPage",{data:xhr.responseText});
     context.props.navigation.navigate("AppliedLeaveDetailPage",{xyz:xyz});
     return;
  }
});

xhr.open("POST", "http://erp.xeamventures.com/api/v1/leave-detail");
xhr.setRequestHeader("Authorization", "Bearer " + permissions_four);
xhr.setRequestHeader("Content-Type", "multipart/form-data");
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
    render (){
          const {leaves,message,msg,xyz,employee,sender,name,from}= this.state;
           const context=this;
           //console.log(leaves.secondary_final_status)
            
           console.log("xyz render",xyz)

           // console.log(employee)
		return(
      <View>
      <View style={{backgroundColor:'rgb(19,111,232)',height:'10%'}}>
            <View style={{top:hp('5%'),left:'15%'}}>
             <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Applied leaves list</Text>
              </View>
            <TouchableOpacity style={{right:'0%',top:hp('0%')}} onPress={() => context.props.navigation.toggleDrawer()}>
                        {/*Donute Button Image */}
                        <Image
                          source={require('../src/Image/menu.png')}
                          style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                        />
                      </TouchableOpacity>
            </View>
      <View style={{height:'100%',top:'8%',backgroundColor:'white'}}>
      <Dialog
        onDismiss={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        onTouchOutside={() => {
          this.setState({ slideAnimationDialog: false });
        }}
        visible={this.state.slideAnimationDialog}
        dialogTitle={<DialogTitle title="Messages List" />}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}>
        <DialogContent>
        {message.map((item) => {
        return (
          <View>
          <Text>
          Send by :   {item.sender.employee.fullname}{"\n"}{"\n"}Received by:   {name}{"\n"}{"\n"}{item.message}{"\n"}{"\n"}{"\n"}
          </Text>
          </View>
        )})}
        </DialogContent>
      </Dialog>
           <View style={{alignItems:'center',}}>
         <LeaveSectionDesign/>
         </View>
         <View style={styles.date_component}>
              <Text style={{bottom:'20%',backgroundColor:'white',color:'rgb(19,111,232)'}}>    Search for Particular Date    </Text>
<View style={{flexDirection:'row',bottom:'1%'}}>
      
      <DatePicker
          style={{width: 120,right:0,top:0}}
          date={this.state.from}
          mode="date"
          placeholder="From date"
          format="YYYY-MM-DD"
          minDate="2016-01"
          maxDate="2022-12"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          
          onDateChange={(from) => {this.setState({from: from})}}
        />
        
        <DatePicker
            style={{width: 120,bottom:0,left:0}}
            date={this.state.to}
            mode="date"
            placeholder="To date"
            format="YYYY-MM-DD"
            minDate="2016-01"
            maxDate="2022-12"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            
            onDateChange={(to) => {this.setState({to: to})}}
          />
          <TouchableOpacity  onPress={()=>this.show_leaves()}>
          <Image
                          source={require('../src/Image/search.png')}
                          style={{ width: 35, height: 35, marginLeft: 20,top:0,borderRadius:0 }}
                        />
      </TouchableOpacity>
    </View>
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
      <ScrollView style={{width:'100%'}}>
      {leaves.map((item) => {
      return (
                <View style={{margin:-15,marginTop:'3%',marginLeft:'2%'}}>
                <View style={[
                  (this.conditional_next(item.secondary_final_status)=="Approved")?styles.Approved:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Inprogress")?styles.Approved_sec:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Rejected")?styles.Approved_thrd:styles.sc,
                  (this.conditional_next(item.secondary_final_status)=="Cancelled")?styles.Approved_frth:styles.sc,
                  ]}>
                <TouchableOpacity onPress={()=>this.setState({xyz:item.id})||this.detailPage()}>
                <Text style={{margin:5}}> From: {item.from_date}     To:  {item.to_date}</Text>
                <Text style={{margin:5}}> Leave Type  :  {item.leave_type.name}</Text>
                <Text style={{margin:5}}> Applied At  :  {item.created_at}</Text>
                </TouchableOpacity>
                </View>

                <View style={{left:wp('75%'),bottom:hp('10%')}}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    slideAnimationDialog: true,
                  });
                }} >
                <Text style={[
                  (this.conditional(item.secondary_final_status)=="Approved")?styles.Approved_first:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="In-progress")?styles.In_Progress:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="Rejected")?styles.rejected:styles.Approved.Deflt,
                  (this.conditional(item.secondary_final_status)=="Cancelled")?styles.cancelled:styles.Approved.Deflt,
                ]}>   {item.secondary_final_status.substring(0,1)}</Text>
                </TouchableOpacity>
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
      width:'70%',
      backgroundColor:'#ffffff',
      borderRadius: 10,
      borderTopWidth: 1.5,
      borderBottomWidth:1.5,
      borderRightWidth:1.5,
      borderLeftWidth:5.5,
      borderColor: '#78b341',
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
      flex:0,
      left:'4%',
      bottom:'2%',
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

  });
