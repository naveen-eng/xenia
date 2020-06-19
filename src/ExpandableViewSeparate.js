import * as React from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
    Image,
    AsyncStorage
  } from 'react-native';
import moment from "moment";
import TextTicker from 'react-native-text-ticker';
class ExpandableItemComponent extends React.Component {
    //Custom Component for the Expandable List
    constructor() {
      super();
      this.state = {
        layoutHeight: 0,
        image:'',
        date:'',
        wish:'',
        
        isExpanded_sec:true,

        currentDate: new Date(),
       markedDate: moment(new Date()).format("YYYY-MM-DD")
      };
    }
   
    // value_sec=async()=>{
      
    //   var value= await AsyncStorage.getItem('userObj');
    //   var userObj = JSON.parse(value);
    //   var permission_value = userObj.success.user.permissions;
    //   {permission_value.map((item) => {
    //     this.setState({rendum_value:item})
    //   })}
    // }

    componentWillReceiveProps(nextProps) {
      
      if (nextProps.item.isExpanded) {
        this.setState(() => {
          return {
            layoutHeight: null,
          };
        });
      } else {
        this.setState(() => {
          return {
            layoutHeight: 0,
          };
        });
      }
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      // console.log("this.state.nextProps",nextProps)
      // console.log("nextState.nextState",nextState)
      if (this.state.layoutHeight !== nextState.layoutHeight) {
        
        return true;
      }
      if (this.state.rendum_value == nextState.rendum_value) {
        return true;
      }
     
      return false;

    }

    render() {
        const context = this;
      return (
        <View>

          {/*Header of the Expandable List Item*/}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onClickFunction}
            style={styles.header}>
            <Image
              source={this.props.item.image}
              style={{ width: 25, height: 25, left:'0%',top:'0%' }}
            />
            <Text style={styles.headerText}>  {this.props.item.category_name}</Text>
          </TouchableOpacity>

          <View
            style={{
              height: this.state.layoutHeight,
              overflow: 'hidden',
            }}>

            {/*Content under the header of the Expandable List Item*/}
            {this.props.item.subcategory.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.content}
                onPress={() =>
                  context.props.navObj.navigate(item.type)
                }>
                <Image
                  source={require('../src/Image/bluedott.png')}
                  style={{ width: 15, height: 15, left:'15%',top:'0%' }}
                />
                <Text style={styles.text}>
                  {item.val}
                </Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            ))}

          </View>

        </View>

      );
    }
  }
export default class ExpandableViewSeparate extends React.Component {
    //Main View defined under this Class
    constructor() {
      super();
      // if (Platform.OS === 'ios') {
      //   UIManager.setLayoutAnimationEnabledExperimental(true);
      // }
      this.state = {
         listDataSource: CONTENT,
         listDataSource_sec: CONTENT_SEC,
         permissions:'',
         abc:[],
         rendum_value:'',
         layoutValue:0,
         h: 0, counter:0,
         emp:'4545345',
         emp_two:'873737388'
        };
    }
   
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log("this.props",nextProps)
    // //  console.log("counter",this.state.counter)
    //   console.log("nextState.nextState",nextState.emp_two)

    //   if (this.state.emp!==nextState.emp_two) {
        
    //     return true;
    //   }
      
    //   return false;
       
    // }
   
    updateLayout = index => {

      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...this.state.listDataSource];
      array[index]['isExpanded'] = !array[index]['isExpanded'];
      this.setState(() => {
        return {
          listDataSource: array,
        };
      });

    };
    updateLayout_sec = index => {

      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const array = [...this.state.listDataSource_sec];
      array[index]['isExpanded'] = !array[index]['isExpanded'];
      this.setState(() => {
        return {
          listDataSource_sec: array,
        };
      });

    };
    permission(){
      if(this.state.permissions==="apply-leave"){
        this.setState({abc:this.state.listDataSource})
      }if(this.state.permissions==="approve-leave"){
        this.setState({abc:this.state.listDataSource_sec})
      }
    }
    value=async()=>{
      console.log("Value function")
      var value= await AsyncStorage.getItem('userObj');
      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var userObj = JSON.parse(value);
      // console.log("userObj",userObj.success.user.employee_code)
      // emp = userObj.success.user.employee_code;
      // this.setState({emp:emp});
      // this.setState({emp_two:emp_two});
      
       if(userObj!==null){
        var tag_value = userObj.success.user;
        console.log("tag_value",tag_value)
      var permission_value = userObj.success.user.permissions;
      {permission_value.map((item) => {
        this.setState({rendum_value:item})
      })}
     }else(userObj===null)
      
      if(userObj!==null){
        var profile_picture={uri:userObj.success.user.employee.profile_picture};
        this.setState({image:profile_picture});
      }else(userObj===null)
       
      
    }
    time(){
      var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year ,
    });
    }
    wish(){
      var dt = new Date().getHours();
        if (dt >= 0 && dt < 12){
         console.log('GM')
         this.setState({wish:"Good Morning"})
       }else if (dt >= 12 && dt <= 16){
          this.setState({wish:"Good Afternoon"})
         console.log('Good Afternoon!')
        }else {
         console.log('GE')
         this.setState({wish:"Good Evening"})
        }
    }
    refresh(){
      this.value().done(); 
        this.time();
         this.wish();
    }
    componentDidMount(){
     
        this.value().done(); 
        this.time();
        this.wish();  
    }
      
      
    
  //  componentDidUpdate =async()=>{
  //   var value= await AsyncStorage.getItem('userObj');
  //     var userObj = JSON.parse(value);
  //     var permission_value = userObj.success.user.permissions;
  //     {permission_value.map((item) => {
  //       this.setState({rendum_value:item})
  //     })}
  //  }
    render() {
      this.state.counter++;
     
      console.log("rendum_value ===",this.state.rendum_value)
      const today = this.state.currentDate;
      const day = moment(today).format("ddd");
      const date = moment(today).format("MMMM D, YYYY");
      const pic=this.state.image;
        if(this.state.permissions==="apply-leave"){
          const listDataSource = this.state.listDataSource;
        }else{
          const listDataSource = this.state.listDataSource_sec;
        }
      return (
        <View>
        <View style={{flex:2,backgroundColor:'rgb(19,111,232)',bottom:'6%'}}>
          <Image source={pic} style={{left:'5%',bottom:0,height:80,width:80,borderRadius:75,borderColor:'black',alignItems:'center',borderColor:'transparent',borderWidth:1,top:'25%'}}/>
           <Text style={{fontSize: 14,left:'40%',color:'white',fontWeight: 'bold',bottom:'20%'}}>{this.state.wish}</Text>
          <Text
          style={{fontSize: 14,marginTop: 16,left:'40%',color:'white',fontWeight: 'bold',bottom:'25%'}}>
          {day}, {date}
        </Text>
        <View style={{flexDirection:'row',bottom:'2%',width:'70%',marginLeft:5}}>
        <TextTicker
          style={{ fontSize: 13 ,color:'white'}}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
        >
          Don't see any permission then press this button.
        </TextTicker>
          
          <TouchableOpacity onPress={()=>this.refresh()}  >
            <Text style={{backgroundColor:'#f1f1f1',paddingLeft:5,paddingRight:5,borderRadius:5}}>
              Refresh
            </Text>
          </TouchableOpacity>
          </View>
          </View>
          <View style={styles.container}>
          <TouchableOpacity
          onPress={() => this.props.navObj.navigate('First')}
           style={styles.header}
          >
          <Image
            source={require('../src/Image/home.png')}
            style={{ width: 20, height: 20, left: 0,top:'55%' }}
          />
            <Text style={{fontSize:13,color:'rgb(19,111,232)',fontWeight: 'bold',left:'15%',top:'10%'}}>Home</Text>
          </TouchableOpacity>

         {this.state.rendum_value==='approve-travel-claim' ?
          <ScrollView>

            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.category_name}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
                navObj={this.props.navObj}
              />
            ))}
          </ScrollView>
          :
          <ScrollView>

            {this.state.listDataSource_sec.map((item, key) => (
              <ExpandableItemComponent
                key={item.category_name}
                onClickFunction={this.updateLayout_sec.bind(this, key)}
                item={item}
                navObj={this.props.navObj}
                />
                ))}
              </ScrollView>}
          <TouchableOpacity
          onPress={() => this.props.navObj.navigate('LogOutPage')}
           style={styles.header}
          >
          <Image
            source={require('../src/Image/log_out.png')}
            style={{ width: 20, height: 20, left: 0,bottom:0 }}
          />
            <Text style={{fontSize:13,color:'rgb(19,111,232)',fontWeight: 'bold',left:'12%',bottom:'50%'}}>  Log Out</Text>
          </TouchableOpacity>
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      bottom:'5%'

    },
    topHeading: {
      paddingLeft: 10,
      fontSize: 20,
    },
    header: {

      padding: 16,
    },
    headerText: {
      fontSize: 13,
      fontWeight: 'bold',
      color:'rgb(19,111,232)',
      bottom:'50%',
      left:'15%',
      margin:'-4%'
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
      bottom:'40%'
    },
    text: {
      left:'25%',
      fontSize: 13,
      color: 'rgb(19,111,232)',
      padding: 5,
      bottom:'50%'
    },
    content: {

      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },
  });

  //Dummy content to show
  //You can also use dynamic data by calling webservice
  const CONTENT = [

    {
      isExpanded: false,
      category_name: ' Attendance Management ',
      image:require('../src/Image/atten.png'),
      subcategory: [{ id: 1, val: 'My Attendance',type:'Third' },{ id: 1, val: 'Employee Attendance',type:'Leaves' },{ id: 1, val: 'Team Attendance',type:'AttendanceDetail' }, ],
    },
    {
      isExpanded: false,
      category_name: ' Leaves Management',
      image:require('../src/Image/partner.png'),
      subcategory: [{ id: 1, val: 'Apply for leave',type:'ApplyLeave' },{ id: 1, val: 'Applied Leaves',type:'LeaveSection' }, { id: 1, val: 'Approve Leaves',type:'Approve_leave' } ,{ id: 1, val: 'Leave Balance',type:'Leave_balance' }],
    },
    {
      isExpanded: false,
      category_name: ' Task Management',
      image:require('../src/Image/task_2.png'),
      subcategory: [{ id: 1, val: 'Assigned Tasks',type:'task_self_team' },{ id: 1, val: 'Add Task',type:'add_task' } ],
    },
    

  ];
  const CONTENT_SEC = [

    {
      isExpanded: false,
      category_name: ' Attendance Management ',
      image:require('../src/Image/atten.png'),
      subcategory: [{ id: 1, val: 'My Attendance',type:'Third' },],
    },
    {
      isExpanded: false,
      category_name: ' Leaves Management',
      image:require('../src/Image/partner.png'),
      subcategory: [{ id: 1, val: 'Apply for leave',type:'ApplyLeave' },{ id: 1, val: 'Applied Leaves',type:'LeaveSection' },{ id: 1, val: 'Leave Balance',type:'Leave_balance' }],
    },
    {
      isExpanded: false,
      category_name: ' Task Management',
      image:require('../src/Image/task_2.png'),
      subcategory: [{ id: 1, val: 'Assigned Tasks ',type:'Task' }],
    },
   


  ];
