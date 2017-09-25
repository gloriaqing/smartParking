<style>
	@import '../../assets/css/chooseDate.css';
</style>
<template>
	<div class="form-horizontal contract">
		<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">添加租约信息</p>
		<div style="padding: 30px;">
			<div class="form-group">
				<label class="parkText">租约开始时间</label>
				<div class="col-sm-10 deHeight">
					<!--<DatePicker type="date"  @on-change="getInVa" v-model="firstValue" style="width:100%;display: block;font-size: 15px" placeholder="选择日期"></DatePicker>-->
        			<DatePicker type="date" confirm placeholder="选择日期" @on-change="getInVa" v-model="firstValue" style="width:100%;display: block;font-size: 15px"></DatePicker>
       

				  <span v-show='show1' style="color:red;display:block;margin-top:4px">请选择日期</span>
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
			<!--<div class="pickMonthNum" v-show="show">
				<div v-for="list in lists" @click="showNumber(list)">{{list.name}}</div>
			</div>-->
			<div class="form-group">
				<label class="parkText">选择停车场</label>
				<div class="col-sm-10 deHeight">
					<input type="text" v-model="parktext" @blur="isiblesPark" @keyup="park" class="form-control" placeholder="请选择停车场" />
						<div style="width: 100%;">
								<div style="position: relative;width: 100%;">
									<ul v-show="showPark" style="position: fixed;background: #fff;z-index: 200;
										width: 80%;height: 200px;overflow-y: auto;border:1px solid #e2e2e2">
										<li v-for="item in parkList" @click="ss(item)" style="margin: 10px;">{{item.name }}
	
										</li>
									</ul>
								</div>
						</div>
					<span v-show='show3' style="color:red;display:block;margin-top:4px">请选择停车场</span>
				</div>
	
			</div>
			<!--<div class="form-group">
				<label class="parkText">选择车位</label>
				<div class="col-sm-10 deHeight">
					<input type="text" v-model="carPlace" @blur="isiblesPark" class="form-control" placeholder="请选择车位" />
					<span v-show='show4' style="color:red;display:block">请选择车位</span>
				</div>
			</div>-->
			<button type="button" @click="goPay" style="width: 100%;height: 45px;margin-top: 20px;" class="btn btn-primary btnSure" data-toggle="button"> 确认</button>
		</div>
	</div>

</template>
<script>
	Date.prototype.format = function(fmt) {
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
	var getMonth=0;
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
				parkid: '',
				
			}
		},
		props: ['carN', 'car_size', 'getPhone'],
		created() {
//			console.log(this.carN)
	      cardNumber=localStorage.getItem('car_number')
	      console.log(localStorage.getItem('parkid'))
//	      this.parktext=localStorage.getItem('parklot_name')
	      this.carPlace=localStorage.getItem('parkport_number')
	      //获取最后一天并加一天
//	      var rightTime= localStorage.getItem('endTime')
//	      var rightDate = new Date(rightTime);//获取当前时间
//	      rightDate.setDate(rightDate.getDate()+1);//设置天数 -1 天
//	      this.firstValue = rightDate.format("yyyy-MM-dd");
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
			chooseSeat(val) { //选择车位
				this.carSeat = val
				for(var i = 0; i < this.carPlaces.length; i++) {
					if(val == this.carPlaces[i].parkportNumber) {
						this.parkportid = this.carPlaces[i].parkportId
					}
				}
			},
			pickMonth() {
				this.show = true
			},
			showNumber(value) {//获取月份
				this.getNum = value.name + '个月'
				this.getNumMonth = value.name
				this.show = false
			},
			park() { //选择停车场
				console.log(this.parktext)
				this.showPark = true
				if(this.parktext != '') {
					this.$http.post('http://prod20.yc-yunpass.com:8080/park/searchParks', {
						"search_text": this.parktext,
						city: ''
					}).then(res=>{						
						this.parkList = res.data.data;
						console.log(this.parkList)
					})
				}
			},
			ss(item){
				this.parktext=item.name;
				this.showPark=false;
				this.parkid = item.id;
				
			},
			goPay() {
				var now = new Date(this.firstValue);
				
				var newDate = DateAdd("m ", getMonth, now);
				console.log(newDate)
				var time = newDate.format("yyyy-MM-dd")
				console.log(time)
				console.log(this.parkid)
				console.log(this.carN)
				console.log(typeof this.firstValue)
				console.log(typeof time)
				console.log(typeof this.carSeat)
		        if(this.firstValue==''){
		          this.show1=true
		        }if(this.getNum==""){
		          this.show2=true
		        }if(this.parktext==""){
		          this.show3=true
		        }
//				if(this.carPlace==""){
//		          this.show4=true
//		        }
				
		         var carT=localStorage.getItem('carType')
		         console.log(carT)
		         if(carT==0){
		            carT='SMALL'
		         }else if(carT>0&&carT<5){
		            carT='MIDDLE'
		         }else if(carT==5){
		            carT='BIG'
		        }
				if(this.firstValue!=''&&this.getNum!=''&&this.parktext!=''){		
					this.$http({
					url: 'http://prod20.yc-yunpass.com:8080/park_admin/addOwnerLongLease',
					method: 'POST',
					data: {
						"park_id": this.parkid,
						"user_phone": localStorage.getItem('phone'),
						"user_name": "mlw",
						"plate_number": cardNumber,
						"car_size_type": carT,
						"long_lease_type": "MONTHLY",
						"lease_start_date": this.firstValue,
						"lease_end_date": time,
						"park_port_number": ''
					}}).then(res=>{
						console.log(res)
						if(res.data.code==1){
							alert('车辆添加租约成功')
							this.$router.push({
								path: '/rePay'
	//							params: {
	//								deviceId: this.firstValue,
	//								getRange: this.getNum,
	//								park_id: this.parkId,
	//								parkport_id: this.parkportid,
	//								endDate: time
	//							}
							})
						}else if(res.data.code==2010){
							alert('创建失败,该车辆已在该停车场建立了租约')
						}else{
							alert('创建失败')
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