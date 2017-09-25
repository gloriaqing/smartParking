<style scoped="scoped">
	.btnSure{width: 80%;margin: 20px;height: 40px;background-color: #1095D9;border: none;font-size: 16px;color: #fff}
	.clickTable {margin: 20px;padding-top: 10px;}
	.clickTable ul{border-top:1px solid #eee ;}
	.clickTable ul li{text-align: left;display: flex;margin: 10px 0;}

	.clickTable ul li span{display: block;padding:0 20px;width: 100px;}
	.btn:focus, .btn:blur{color:#000 !important ;}
</style>
<template>
<div>
	<div v-show="getInfo">
		<h4 style="font-weight: normal;font-size: 16px;margin-bottom:0px;background: #1095D9;margin-top: 0px;
  height: 45px;color: #fff;line-height: 45px;">租约详情</h4>
	    <div class="clickTable" >			
	        
       		<ul v-for="item in items">
       			<li><span>车牌号</span>{{item.car_plate_number}}</li>
       			<li><span>停车场</span>{{item.parklot_name}}</li>
       			<li><span>开始时间</span>{{item.reg_start_time}}</li>	               			
       			<!--<li v-model="endTime"><span>结束时间</span>{{item.endTime}}</li>-->
       			<li><span>结束时间</span>{{item.endTime}}</li>
       			<li v-model="duration"><span>租期</span>{{item.reg_duration}}</li>
       		</ul>	               			             
	    </div>	
	    <div style="width: 100%;background: #f0f0f0;">
			<button type="button" @click="goDate" class="btn btn-primary btnSure" data-toggle="button"> 续费</button>
	    	
	    </div>
	</div>
	<h3 style="background: #f0f0f0;" v-show="nothingRent">还无租约，请添加月租租约</h3>
</div>
</template>
<script>
	var carName;
	export default{
		data(){
			return{
				items:[],startTime:'',endTime:'',duration:'',getInfo:true, //控制无租约情况下页面的显示,
				nothingRent:false
			}
		},
		beforeCreate(){
			carName=localStorage.getItem('car_number')
			this.$http({
			url:'http://prod20.yc-yunpass.com:8080/park/getMyAllLeaseList',
			method:"post",
			data:{				
				"user_id":localStorage.getItem('userid'),
				"lease_type":"1",
				"show_history":"1",
				"car_plate_number":carName
			},
			headers:{
				"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
			}).then(res=> {
			
			  this.items= res.data.data;
//			  var newData;
//			  for(var i = 0;i < 3;i++){
//			  	if(i < obj.length){
//			  		newData[i] = obj[i];
//			  	}
//			  }
//			  console.log("--------------> " + JSON.stringify(newData));
//			  this.items=newData;			  
			  if(this.items.length == 0){ // 没有租约，让其重新去物管添加租约
			  	this.getInfo=false;
			  	this.nothingRent=true
			  	console.log("11111111");
			  }else{			  		
					for (var i=0;i<this.items.length;i++){
						 this.items[i].reg_start_time= this.items[i].reg_start_time.substring(0,10)

						localStorage.setItem('park_id', this.items[i].parklot_id)
						localStorage.setItem('parklot_name', this.items[i].parklot_name)
						localStorage.setItem('parkport_number', this.items[i].parkport_number)
						localStorage.setItem('rentTime', this.items[i].reg_duration)
						this.sa= this.items[i].reg_start_time//计算结束时间开始
					 	 var today=new Date(this.sa);
				          var s =today.setDate(today.getDate() +  this.items[i].reg_duration);				          
				          localStorage.setItem('today',s)
				          var newTime = new Date(s)				         
				          this.endTime = newTime.format("yyyy-MM-dd")//结束时间
				          this.items[i].endTime=this.endTime
				          console.log(s)
				          
				          localStorage.setItem('endTime',this.endTime)
					}
				}
			})
		},
		methods:{
			goDate(){
				this.$router.push('/chooseDate')
			}
		}
	}
</script>
