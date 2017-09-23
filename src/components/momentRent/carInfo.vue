<style scoped>
  .container{margin-top: 20%}
  .btn{width: 80%;margin-top: 20px;margin-left: 10%;color: #fff}
  .btn-info{border: none}
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-info btn-lg btn-block" @click="park">停车缴费</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <!--<button class="btn btn-info btn-lg btn-block" @click="myCar">我的车辆</button>-->
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <!--<button class="btn btn-info btn-lg btn-block" @click="lock">锁车</button>-->
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <!--<button class="btn btn-info btn-lg btn-block" @click="countCheck">账单查询</button>-->
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <!--<button class="btn btn-info btn-lg btn-block" @click="myCards">我的卡券</button>-->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      lock () {
        this.$router.push('/parkInfo')
      },
      myCar(){
        this.$router.push('/addCarMoment')
      },
      park(){
        this.$router.push('/accInfo')
      },
      myCards(){
        this.$router.push('/ponList')
      },
      countCheck(){
        this.$router.push('/orderList')
      }
    }
  }
</script>
