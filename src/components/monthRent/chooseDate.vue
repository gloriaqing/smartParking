<style>
	@import '../../assets/css/chooseDate.css';
	
</style>
<template>
	<div class="ssHead">
		<div class="form-horizontal contract">
			<div class="form-group">
				<label class="parkText">租约开始时间</label>
				<div class="col-sm-10 deHeight">
					<Date-picker type="date" :options="optionsDate" @on-change="getInVa" v-model="firstValue" style="width:100%;display: block;font-size: 15px" placeholder="选择日期"></Date-picker>
				  <span v-show='show1' class="notice">请选择日期</span>
				</div>
	
			</div>
			<div class="form-group">
				<label class="parkText">租约时间 (月份)</label>
				<div class="col-sm-10 monthDate deHeight">
					<img src="../../assets/img/images/plus (1).svg" class="addImg" @click='add' />
					<input type="text" style="background: #fff;padding: 6 27px;" class="form-control chooseDate" @blur="isibles" v-model="getNum" @click="pickMonth" placeholder="请选择租期时间" />
			   		<img src="../../assets/img/images/minus (2).svg" class="delImg" @click='decrese' />
			   <span v-show='show2' class="notice">请选择租期</span>
				</div>
			</div>
			<!--<div class="pickMonthNum">
				<div v-for="list in lists"  v-show="show" @click="showMonth(list)">{{list.name}}</div>
			</div>-->
			<div class="form-group">
				<label class="parkText">选择停车场</label>
				<div class="col-sm-10 deHeight">
					<Input type="text" disabled="disabled" class="chanBack" v-model="parktext" placeholder="停车场" ></Input>				
					<span v-show='show3' class="notice">请输入停车场</span>
				</div>
	
			</div>
			<div class="form-group" v-show="ifCarseat">
				<label class="parkText">选择车位</label>
				<div class="col-sm-10 deHeight">
					<Input type="text" class="chanBack" disabled="disabled" v-model="carPlace" @blur="isiblesPark"  placeholder="车位" ></Input>
	<!--				<span v-show='show4' style="color:red;display:block">请选择车位</span>
	-->			</div>
			</div>
			
		</div>
		<div style="background: #f0f0f0;width: 100%;">
			<button type="button" @click="goPay" class="btn btn-primary btnSure" data-toggle="button"> 确认</button>
	
			</div>
	</div>	
</template>
<script>

	Date.prototype.format = function(fmt) { //计算结束时间
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

	function DateAdd(interval, number, date) { //计算时间结束日期
		switch(interval) {
			case "y ":
				{
					date.setFullYear(date.getFullYear() + number);
					return date;
					break;
				}
			case "q ":
				{
					date.setMonth(date.getMonth() + number * 3);
					return date;
					break;
				}
			case "m ":
				{
					date.setMonth(date.getMonth() + number);
					return date;
					break;
				}
			case "w ":
				{
					date.setDate(date.getDate() + number * 7);
					return date;
					break;
				}
			case "d":
				{
					date.setDate(date.getDate() + number);
					return date;
					break;
				}
			case "h":
				{
					date.setHours(date.getHours() + number);
					return date;
					break;
				}
			case "m":
				{
					date.setMinutes(date.getMinutes() + number);
					return date;
					break;
				}
			case "s ":
				{
					date.setSeconds(date.getSeconds() + number);
					return date;
					break;
				}
			default:
				{
					date.setDate(d.getDate() + number);
					return date;
					break;
				}
		}
	}
	var da= localStorage.getItem('durationDate')
	var sd=localStorage.getItem('today')
	var cardNumber;
	var phone;
	var getMonth='0';
	var userid;
	export default {
		data() {
			return {
				show: false,show1:false,show2:false,show3:false,show4:false,
				showPark:false,
				firstValue: '',
				model13: '',
				hide: true,
				parktext: '',
				parkList: [],
				carPlaces: [],
				carPlace: "",
				ser_text: "",
				parkList: [],
				billingid:'',ifCarseat:false,
				lists: [{
						name: 1
					}, {
						name: 2
					}, {
						name: 3
					}, {
						name: 4
					}, {
						name: 5
					}, {
						name: 6
					}, {
						name: 7
					}, {
						name: 8
					},
					{
						name: 9
					}, {
						name: 10
					}, {
						name: 11
					}, {
						name: 12
					}
				],
				getNum: '',
				getNumMonth: '',
				carSeat: '',
				parkportid: '',
				sd: true,
				parkid: '',phone:'',
				optionsDate:{
					disabledDate (date) {
					     const disabledDay = date.getDate();
              			return date&&date.valueOf() < sd
              		}
				}
			}
		},
		props: ['carN', 'car_size', 'getPhone'],
		created() {
		      cardNumber=localStorage.getItem('car_number')
		      this.parkid=localStorage.getItem('park_id')
		      this.parktext=localStorage.getItem('parklot_name')
		      this.carPlace=localStorage.getItem('parkport_number')
		      //获取最后一天并加一天
		      var rightTime= localStorage.getItem('endTime')
		      var rightDate = new Date(rightTime);//获取当前时间
		      rightDate.setDate(rightDate.getDate()+1);//设置天数 +1 天
		      this.firstValue = rightDate.format("yyyy-MM-dd");
		      phone=localStorage.getItem('phone')
//		      JSON.stringify()
		      /*this.$http.post("http://api.basecn.cn/cloud/api/park/findLeaseId",{
		      	"number":cardNumber,
		      	"type":"2"
		      },{emulateJSON:false}).then(res=>{
		      	console.log(res)
		      })
		      */
		      
           this.$http({
                    method:'POST',
                    url:'http://api.basecn.cn/cloud/api/park/findLeaseId', 
                    data:{'number':cardNumber,'type':2}
                   }).then(res=>{
                   		
                   		this.parkportid=res.data.data.parkportId
                   		console.log(res.data.data.parkportId)
                   })		      
		},

		methods: {
			
			add(){
				console.log(typeof this.getNum)
//				this.getNum.toString('')	
				this.getNum=getMonth;	
				 this.getNum = parseInt(this.getNum) + 1;					
				 getMonth=this.getNum					
				this.getNum= this.getNum+'个月'
			},

			decrese(){								
				if(getMonth > 0){
					getMonth=parseInt(getMonth) - 1
					if(getMonth!=0){
						this.getNum = getMonth+'个月';	
					}	                
	            }
				console.log(typeof getMonth)
			},
			getInVa(data) {//获取日期
				console.log(data)
				this.firstValue = data;
			},
			pickMonth() { //显示月份列表
				this.show = true
			},
//			showMonth(value) {//从月份列表中获取月份
//
//				this.getNum = value.name + '个月'
//				this.getNumMonth = value.name
//				console.log(this.getNumMonth)
////				this.show = false		
//				if(this.getNum!=''){
//					this.show2=false
//				}
//			},

			goPay() {

//				getMonth.toString()
				console.log(typeof getMonth)
				var now = new Date(this.firstValue);
				var newDate = DateAdd("m ", getMonth, now);//计算得到结束时间)
				var time = newDate.format("yyyy-MM-dd")
				
				console.log(time)
		        if(this.firstValue==''){//检测是否选中应填项开始
		          this.show1=true		         		          
		        }if(this.getNum==""){
		        	 this.show2=true		         
		        }if(this.parktext==""){
		        	 this.show3=true
		        }if(this.carPlace==""){//检测是否选中应填项结束
		        	this.show4=true
		        }
		        console.log(getMonth)
		        //如果每个Input框都有值
				if(this.firstValue!=''&&this.getNum!=''&&this.parktext!=''){					
			         var carT=localStorage.getItem('carType')
			         console.log(carT)
			         if(carT==0){
			            carT='SMALL'
			         }else if(carT>0&&carT<5){
			            carT='MIDDLE'
			         }else if(carT==5){
			            carT='BIG'
			        }
			        userid=localStorage.getItem('userid') 
					this.$http({
					url: 'http://api.basecn.cn/cloud/api/park/setParkLease',
					method: 'POST',
					data: {
							"user_id":userid,
						    "praklot_id":this.parkid,
						    "prakport_id":this.parkportid,
						    "plate_number":cardNumber,
						    "lease_type":2,
						    "long_lease_type":1,  
						    "reg_year_count":getMonth,  
						    "reg_start_time":this.firstValue
					}}).then(res=>{
						localStorage.setItem('startTime',this.firstValue)
						localStorage.setItem('endTime',time)
						localStorage.setItem('park_id',this.parkId)
						localStorage.setItem('parkport_id',this.parkportid)
						
						localStorage.setItem('billingfee',res.data.data.billinginifee)
						localStorage.setItem('rentTime',this.getNum)
						if(res.data.data.billingFee!=null||res.data.data.billingFee!=''){
							localStorage.setItem('billing_id',res.data.data.billingId)							
							this.$router.push({
								name: 'pay'
//								params: {
//									deviceId: this.firstValue,
//									getRange: this.getNum,
//									park_id: this.parkId,
//									parkport_id: this.parkportid,
//									billingId:res.data.data.billingId,
//									endDate: time,
//									billingfee:res.data.data.billinginifee
//								}
							})	
						}else{
							alert('添加失败，请稍后再试')
						}
											
					})
				}
			},
			isibles() {
				var _this = this
				setTimeout(function() {
					_this.show = false
				}, 20)
			},
			isiblesPark(){
				var _this = this
				setTimeout(function() {
					_this.showPark = false
				}, 20)
			},
			getInput(val) {
				this.inputDate = val
			}


		}
	}
</script>


