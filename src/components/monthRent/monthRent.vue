<style scoped>
  .container{margin-top: 20px;font-size: 14px;background: #f0f0f0;}
  .btn{width: 80%;margin-top: 20px;margin-left: 10%;color: #fff}
  .btn-info{border: none}
</style>
<template>
  <div class="container">
   
		<i-switch class="switch-on" @on-change="lockCar" v-model="st"   size="large">
							  	    <span slot="open" style="font-weight:bold" >已锁</span>
							        <span slot="close"  style="font-weight:bold">未锁</span>
		 </i-switch>
  </div>
</template>
<script>
  export default {
  	data(){
  		return{
  			st:false
  		}
  	},
    methods:{
   		lockCar(){
   			
   		}
    }
  }

</script>
