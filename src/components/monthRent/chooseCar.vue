<style scoped>
  .car{text-align: center;margin-top: 30px;font-size: 14px}
  .car img{width: 70px}
  .car h3{font-weight: normal;font-size: 16px;margin-bottom: 26px}
  .car_d{width: 80%;height: 40px;line-height: 40px;color:#5bc0de;border: 1px solid #eee;margin: 0 auto;
    border-radius: 25px;margin-bottom: 10px;font-size: 16px}
</style>
<template>
  <div class="car">
    <h3>请选择车牌</h3>
    <div class="car_d" style="text-align: center" @click="chooseCar(car)" v-for="car in carName">{{car.plate_number}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        carName:[]
      }
    },
    methods:{
      chooseCar(data){
      	console.log(data)
      	this.$emit('carName',data.plate_number,data.size_type);
      	localStorage.setItem('carNumber',data.plate_number);
      	localStorage.setItem('carType',data.size_type)
        this.$router.push('/rentDetail')
      }
    },

    created() {
      this.$http({
        method:'POST',
        "url":'http://prod20.yc-yunpass.com:8080/park/getMyCarList',
       "data":{user_id:localStorage.getItem('userid')},
//localStorage.getItem('userid')
        headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
      }).then(res=>{
        this.carName=res.data.data
      })
    }
  }
</script>
