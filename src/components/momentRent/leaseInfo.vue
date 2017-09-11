<style scoped>
  .container{
    border: 1px solid black;
    border-radius: 5px;
  }
  a{
    text-decoration: none;
    font-size: x-large;
  }
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-8 col-xs-offset-3">
        <h2>请选择租约</h2>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
        	<tr>
        		<td>停车场</td>
        		<td>车牌号</td>
        		<td>车位号</td>
        		<td>开始时间</td>
        		<td>结束时间</td>
        	</tr>
        </thead>
        <tbody v-for="(item,index) in leaseList">
        	<tr>
        		<td>{{item.parklot_name}}</td>
        		<td>{{item.car_plate_number}}</td>
        		<td>{{item.parkport_number}}</td>
        		<td>{{item.act_start_time}}</td>
        		<td>{{item.act_end_time}}</td>
        	</tr>
        </tbody>
      </table>

    </div>

  </div>
</template>
<script>
	export default{
	data(){ 
			return {
				leaseList:[]      //存储请求返回的数据
			}
		},
		mounted(){
			this.getLeaseList()
		},
		methods:{
			getLeaseList(){                   //http get请求data.json 的数据
				var vm = this;
				this.$http({method:'post',
				data:{
					"user_id":localStorage.getItem('userid'),
					"lease_type":0,
					"show_history":1,
					"car_plate_number":"ALL"
				},
				url:'http://prod20.yc-yunpass.com:8080/park/getMyAllLeaseList',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
					
				}).then(function(res){
					console.log(res.data.data);
					vm.leaseList = res.data.data;
				})
			}
		}
	}

</script>