<style>
   .lock{display: flex;justify-content: space-around;font-size: 14px}
   .lock ul{text-align: left}
   .lock ul li{list-style: none}
   .lock .switch-on{margin-top: 10px}
   
</style>
<template>
	<div>
	<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">智能锁车</p>
 		<div class="lock">
 	
		    <ul v-for="(item,index) in carList">
		    	<li style="font-weight: bold;font-size: 16px;" v-model='carNd'>
		    		<img src="../../assets/img/icon/车辆.png" style="width: 25px;margin-right: 10px;" />
		    		车牌号:{{item.car_plate_number}}</li>
		      <li style="color: #9d9d9d">
		      	<img src="../../assets/img/icon/位置.png"  style="width: 25px;margin: 0 10px 0 0;"/>
		      	停车场:{{item.parklot_name}}</li>
		  	</ul>
	  	
		  	<div v-show='use'>
		  	 <i-switch class="switch-on" v-model="switch1" @on-change="lockCar"  size="large">
		  	    <span slot="open" style="font-weight:bold">已锁</span>
		        <span slot="close" style="font-weight:bold">未锁</span>
		  	 </i-switch>
		  	</div>
	  </div>
  </div>

</template>
<script>
	var carNum;
  export default {

    data(){
        return {
          carList:[],switch1: false,car_number:'',carNd:'',use:false
        }
      },
    created(){
        var user_id = localStorage.getItem('userid');
        var vm=this
        this.$http({
          method: 'post',
          data: {"user_id": user_id},
          url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/getPresentCars'
        }).then(function(res){
        	if(vm.carList.length==0){
        		this.use=false
        	}
          vm.carList=res.data.data;
          console.log(vm.carList)
          vm.use=true
//        for(var i =0;i<res.data.data.length;i++){
//        	consoel.log(res.data.data.car_plate_number)
//           this.carNd=res.data.data.car_plate_number
//           console.log(this.carNd)
//        }

        })
      },
      methods:{
        lockCar(){                   //http get请求data.json 的数据
          var vm = this;
          var parklot_id = localStorage.getItem("parklot_id");
          var test = "";
          if(this.switch1) { //开关思想转化参数数据格式
            test = "true";
          } else {
            test = "false"
          }
          this.$http({
          method:'post',
          url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/lockCar',
          data:{
            "car_plate_number": this.carNd,
            "lock_status":test,
            "parklot_id": parklot_id
          }

          }).then(res =>{
//          console.log(res)
            //alert("锁车成功！");
          //	this.$router.push('/carInfo');
            //console.log(res.data)
          })
        }
      }
	}
</script>
