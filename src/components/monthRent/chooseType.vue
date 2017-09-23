<style scoped>
  .container{margin-top: 20%;font-size: 14px;}
  .btn{width: 35%;height: 45px;
  background: #03A9F4;margin-top: 30px;margin-left: 10%;color: #fff}
</style>
<template>
  <div style="background: #f0f0f0;">
    <div class="row">
      <div class="col-xs-12">
        <p style="text-align: center;background: #03A9F4;height: 45px;color: #fff;line-height: 45px;
        	font-size: 18px;">请选择缴费类型</p>
      </div>
      <div class="col-xs-12">
      	<div>
      		<img style="width: 40px;margin-top: 30px" src="../../assets/img/icon/临时卡.png"  />
        	<button class="btn" id="rentMoment" @click="rentMoment">临停</button>
      	</div>
      	<div>
      		<img style="width: 40px;margin-top: 30px" src="../../assets/img/icon/月租卡.png"  />
      		<button class="btn" id="rentMonth" @click="rentMonth">续费</button>
      	</div>
        <div>
      		<img style="width: 40px;margin-top: 30px" src="../../assets/img/icon/月租卡.png"  />
      		<button class="btn" id="rentMonth" @click="addRent">添加月租入口</button>
      	</div>
      </div>
    </div>
  </div>
</template>
<script>
	var ds;
	var type;
  export default {
  	data(){
  		return{  			
  		} 		
  	},
    methods:{
      rentMoment(){
        this.$router.push('/selectCar')
      },
      rentMonth(){
        this.$router.push('/rePay')
      },
      addRent(){
      	this.$router.push('/chooseCar')
      }
    }
  }

</script>
