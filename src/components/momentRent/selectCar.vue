<style scoped>
  .car{text-align: center;margin-top: 30px}
  .car img{width: 70px}
  .car h3{font-weight: normal;font-size: 16px;margin-bottom: 26px}
  .car_d{width: 80%;height: 40px;line-height: 40px;color:#5bc0de;border: 1px solid #eee;margin: 0 auto;
    border-radius: 25px;margin-bottom: 10px}
  .car_d{
    font-size: 16px;
  }
</style>
<template>
  <div class="car">
    <h3>请选择车牌</h3>
    <div v-for="(item,index) in carList">
    	<div class="car_d" style="text-align: center" @click="chooseCar">{{item.plate_number}}</div>
  	</div>
  	<button class="btn btn-block btn-info" @click="addCarMoment">添加车牌</button>
  </div>
</template>
<script>
  	export default{
		data(){
			return {
				carList:[]      //存储请求返回的数据
			}
		},
		mounted(){
			this.getCarList()
		},
		methods:{
			addCarMoment(){
				this.$router.push('/addCarMoment')
			},
			chooseCar(){
        this.$router.push('/ddss')
     },
			getCarList(){                   //http get请求data.json 的数据
				var vm = this;
				this.$http({method:'post',
				data:{"user_id":localStorage.getItem('userid')},
				url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/getUserBindCars',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
					
				}).then(function(res){
					console.log(res.data.data);
					vm.carList = res.data.data;
				})
			}
		}
	}
</script>
