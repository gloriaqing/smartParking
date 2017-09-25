<style scoped>
	.btn:focus, .btn:blur{color:#000 !important ;}
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
    <h3>请选择续费车辆</h3>
    <div class="svgsd" v-for="(list,index) in listsPp" @click="chooseCar(list)">
        	<img src="../../assets/img/icon/车辆.png" />
          <span class="car_d"  v-model="carNamea" >{{list.plate_number}}</span>
        	<!--<img src="../../assets/img/icon/修改.png" @click="editCar(list)" />-->
          <!--<img src="../../assets/img/icon/删 除.png" @click="delCar(index,list)" />-->
    </div>
    <!--<div class="car_d" style="text-align: center" @click="chooseCar(car)" v-for="car in carName">{{car.plate_number}}</div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return{
        listsPp:[],carNamea:''
      }
    },
    methods:{
      chooseCar(data){  //
      	console.log(data)
//    	this.$emit('carName',data.plate_number,data.size_type);
      	localStorage.setItem('car_number',data.plate_number);
      	localStorage.setItem('carType',data.size_type)
        this.$router.push('/rentDetail')
      }
    },
    beforeCreate() {
      this.$http({
        method:'POST',
        "url":'http://prod20.yc-yunpass.com:8080/park/getMyCarList',
       "data":{user_id:localStorage.getItem('userid')},
//localStorage.getItem('userid')
        headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
      }).then(res=>{
        this.listsPp=res.data.data
      })
    }
  }
</script>
