<style scoped>
  .car{text-align: center;font-size: 14px;}
  /*.car img{width: 70px}*/
  .car h3{font-weight: normal;font-size: 16px;margin-bottom:0px;background: #1095D9;margin-top: 0px;
  height: 45px;color: #fff;line-height: 45px;}

 .car_d{width: 80%;height: 40px;line-height: 40px;color:#090909;outline: medium;
 border-radius: 25px;font-size: 16px}
.svgsd{position: relative;background: #fff;border-top:10px solid #f0f0f0 ;padding: 10px 0;}
.svgsd img{width: 31px;}
</style>
<template>
  <div class="car">
    <h3>请选择车牌</h3>
    <div class="svgsd"  v-for="(item,index) in carList">
    	<img src="../../assets/img/icon/车辆.png" />
    	<span class="car_d" style="text-align: center" @click="chooseCar()">{{item.plate_number}}</span>
  	</div> 	
  </div> 
</template>
<script>
  	export default{
		data(){
			return {
				carList: []      //存储请求返回的数据
			}
		},
		mounted() {
			this.getPresentCars()
		},
		methods: {
//			addCarMoment(){
//				this.$router.push('/addCarMoment')
//			},
			chooseCar:function($event){
        this.$router.push('/ponList'),
        localStorage.setItem("car_number",event.currentTarget.innerText);
        console.log(localStorage.getItem("car_number"));
        console.log(obj);
     },
			getPresentCars(){                   //http get请求data.json 的数据
				var vm = this;
				var user_id = localStorage.getItem("user_id");
				this.$http({method:'POST',
				data:{
					"user_id":localStorage.getItem("userid")
				},
				url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/getUserBindCars',
//				headers:{
//        "Authorization":"WEIXINSERVER:{}",
//        "Content-Type":"application/json;charset=UTF-8"
//      }
					
				}).then(function(res){
					console.log(res.data.data);
					vm.carList = res.data.data;
				})
			}
		}
	}
</script>
