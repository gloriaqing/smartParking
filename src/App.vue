<template>
  <div id="app">
    <router-view :carN=carN  :car_size=car_size :getPhone=getPhone @carName="chooseCar" @getPhone='getMobileCode'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      carN:'',
      car_size:'',
      getPhone:''
    }
  },
  methods:{
    chooseCar(id,size){
    	console.log(size)
      this.carN=id;
      this.car_size=size
      
    },
    getMobileCode(phone){
    	this.getPhone=phone
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
}
</style>
