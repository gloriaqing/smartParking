<style scoped>
  .container{margin-top: 20px;font-size: 14px;background: #f0f0f0;}
  .btn{width: 80%;margin-top: 20px;margin-left: 10%;color: #fff}
  .btn-info{border: none}
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-info btn-lg btn-block" @click="myCar">我的车辆</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-info btn-lg btn-block" @click="rePaying">缴费</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-info btn-lg btn-block" @click="lock">锁车</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-info btn-lg btn-block" @click="countCheck">账单查询</button>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    methods:{
      lock () {
       this.$router.push('/lock')
      },
      myCar(){
        this.$router.push('/addCar')
      },
      rePaying(){
        this.$router.push('/chooseCar')
      },
      countCheck(){
        this.$router.push('/countDetail')
      }
    }
  }

</script>
