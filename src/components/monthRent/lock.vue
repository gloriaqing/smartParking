<style>
  .lock{display: flex;font-size: 14px;flex-direction: column;}
  .lock ul{margin-top: 20px;text-align: left}
  .lock ul li{list-style: none}
  /*.lock .switch-on{margin-top: 40px}*/
</style>
<template>
	<div>
		<div class="lock">
		    <ul v-for="item in items">
		      <li style="font-weight: bold" v-model="carNumber">车牌号：{{item.car_plate_number}}</li>
		      <!--<li style="color: #9d9d9d">租期结束时间:2019-09-09</li>-->
		      <li style="color: #9d9d9d" v-model="parkName">停车场:{{item.parklot_name}}</li>
		    </ul>
		    <div style="line-height: 90px;">
		      <i-switch class="switch-on" size="large" v-model="switch1" @on-change="lock">
		      	<span slot="open">已锁</span>
		        <span slot="close">未锁</span>
		      </i-switch>
		      <!--<Switch  class="switch-on" size="large" v-model="switch1" @on-change="lock">
		        <span slot="open">开</span>
		        <span slot="close">关</span>
		    </Switch>-->
    		</div>
   
		  </div>
		  <h3 v-show='useless'>无可用车辆</h3>	
</div>
</template>
<script>

  export default {
    data () {
      return {
        switch1: false,useless:false,carList:'',carNumber:'',resf:'',items:[],parkName:''
      }
    },
    created(){
    	
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
					"car_plate_number":this.carNumber,
					"lock_status":test,
					"parklot_id":""
				}).then(res=>{
					console.log(res)
					alert('操作成功')
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
//      	this.use=true
        }else{
        	alert('暂无在场车辆')
        }
      })
	  	
	  }
  }
</script>
