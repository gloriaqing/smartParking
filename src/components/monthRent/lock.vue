<style>
  .lock{display: flex;justify-content: space-around;font-size: 14px}
  .lock ul{margin-top: 20px;text-align: left}
  .lock ul li{list-style: none}
  .lock .switch-on{margin-top: 40px}
</style>
<template>
	<div>
		<div class="lock" v-show="use">
    <ul>
      <li style="font-weight: bold" v-model="carNumber">车牌号：{{carNumber}}</li>
      <li style="color: #9d9d9d">租期结束时间:2019-09-09</li>
      <li style="color: #9d9d9d">停车场:万科停车场</li>
    </ul>
    <div>
      <i-switch class="switch-on" size="large" v-model="switch1" @on-change="lock"></i-switch>
    </div>
   
  </div>
  <h3 v-show='useless'>无可用车辆</h3>	
	</div>
  
</template>
<script>
  export default {
    data () {
      return {
        switch1: false,use:false,useless:false,carList:'',carNumber:'辽U23347'
      }
    },
    methods:{
      lock(status){
      	console.log(this.switch1);
      	var test = "";
      	if(this.switch1) { //开关思想转化参数数据格式
      		test = "true";
      	} else {
      		test = "false"
      	}     	
				this.$http.post("http://prod20.yc-yunpass.com/yunpasswx/api/cars/lockCar",{
					"car_plate_number":"辽U23347",
					"lock_status":test,
					"parklot_id":"8a99093259a787570159aa2487c30009"
				}).then(res=>{
					console.log(res)
					alert('锁车成功')
				})
      }
    },
	  created(){
	  this.$http({
        method:'POST',
        "url":'http://prod20.yc-yunpass.com:8080/park/getMyCarList',
        "data":{user_id:localStorage.getItem('userid')},
        headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
      }).then(function(res) {
      	console.log(res.data.data)
        if(res.data.data){
        	this.use=true
        }else{
        	alert('暂无在场车辆')
        }
      })
	  	
	  }
  }
</script>
