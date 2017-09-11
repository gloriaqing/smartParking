<style scoped="scoped">
	.btnSure{width: 80%;margin-top: 20px;height: 40px;background-color: #337ab7;border: none;font-size: 16px;color: #fff}
	.clickTable {border-radius: 10px;margin-top: 20px;}
	.clickTable ul li{text-align: left;display: flex;margin: 10px 0;}

	.clickTable ul li span{display: block;padding:0 20px;width: 100px;}
</style>
<template>
<div>
	<div class="">
		<!--<h4 style="text-align: left;margin-top: 20px;">绉熺害璇︽儏</h4>-->
	    <div class="table-responsive clickTable">
			
	        <table class="table table-hover">
	            <tr>
	                <td>
	               		<ul v-for="item in items">
	               			<li><span>车牌号</span>{{item.car_plate_number}}</li>
	               			<li><span>停车场</span>{{item.parklot_name}}</li>
	               			<li><span>开始时间</span>{{item.reg_start_time}}</li>
	               			<li v-model="duration"><span>租期</span>{{item.reg_duration}}</li>
	               			<li v-model="endTime"><span>结束时间</span>{{endTime}}</li>
	               		</ul>
	               		
	                </td>
	            </tr>
	        </table>
	    </div>
	</div>
	<button type="button" @click="goDate" class="btn btn-primary btnSure" data-toggle="button"> 续费</button>
</div>
</template>
<script>
	var carName;
	export default{
		data(){
			return{
				items:[],startTime:'',endTime:'',duration:''
			}
		},
		beforeCreate(){
			carName=localStorage.getItem('carNumber')
			this.$http({
			url:'http://prod20.yc-yunpass.com:8080/park/getMyAllLeaseList',
			method:"post",
			data:{
				//"user_id":"8a9ac7ed5d4f0ed8015d587ec8d100ac",
				"user_id":localStorage.getItem('userid'),
				"lease_type":"1",
				"show_history":"1",
				"car_plate_number":carName
			},
			headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
			}).then(res=> {
			  console.log(res)
			  this.items=res.data.data
				for (var i=0;i<res.data.data.length;i++){
					res.data.data[i].reg_start_time=res.data.data[i].reg_start_time.substring(0,10)
					localStorage.setItem('parkid',res.data.data[i].parklot_id)
					localStorage.setItem('parklot_name',res.data.data[i].parklot_name)
					localStorage.setItem('parkport_number',res.data.data[i].parkport_number)
					localStorage.setItem('durationDate',res.data.data[i].reg_duration)
					this.sa=res.data.data[i].reg_start_time//计算结束时间开始
				 	 var today=new Date(this.sa);
			          var s =today.setDate(today.getDate() + res.data.data[i].reg_duration);
			          localStorage.setItem('today',s)
			          var newTime = new Date(s)
			          this.endTime = newTime.format("yyyy-MM-dd")//结束时间
			          localStorage.setItem('endTime',this.endTime)
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
