<style scoped>
  .container{
    border-radius: 5px;
  }
  a{
    text-decoration: none;
    font-size: x-large;
  }
  em{
    float: right;
  }
</style>
<template>
  <div class="">
    <div class="table-responsive" style="margin-top:20px">
      <table class="table table-hover" v-for="(item,index) in orderList">
        <tr>
          <td>
            <ul class="list-group">
              <li class="list-group-item list-group-item-info">{{item.bill_create_time}}<em></em></li>
              <li class="list-group-item">入场时间:{{item.bill_create_time}}</li>
              <li class="list-group-item">缴费{{item.billing_fee}}元</li>
            </ul>
          </td>
        </tr>

      </table>

    </div>

  </div>
</template>
<script>
	export default{
		data(){
			return {
				orderList:[]      //存储请求返回的数据
			}
		},
		mounted(){
			this.getOrderList()
		},
		methods:{
			getOrderList(){                   //http get请求data.json 的数据
				var vm = this;
				var user_id = localStorage.getItem('userid');
				this.$http({method:'post',
				data:{"user_id": user_id},
				url:'http://prod20.yc-yunpass.com:8080/billing/getBillingListByUserID',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
				}).then(function(res){
					console.log(res.data.data);
					vm.orderList = res.data.data;
				})
			}
		}
	}
</script>
