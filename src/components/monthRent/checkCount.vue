<style scoped>
  .car{text-align: center;margin-top: 30px;font-size: 14px}
  .car img{width: 70px}
  .car h3{font-weight: normal;font-size: 16px;margin-bottom: 26px}
  .car_d{width: 80%;height: 40px;line-height: 40px;color:#5bc0de;border: 1px solid #eee;margin: 0 auto;
    border-radius: 25px;margin-bottom: 10px;font-size: 16px}
</style>
<template>
    <div class="">
    <div class="table-responsive">
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
		created(){
			this.$http({
				method:'post',
				data:{"user_id": localStorage.getItem('userid')},
				url:'http://prod20.yc-yunpass.com:8080/billing/getBillingListByUserID',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}					
				}).then(res=>{
					console.log(res);
					this.orderList = res.data.data;
				})
		},
		methods:{
			getOrderList(){                   //http get请求data.json 的数据
				var vm = this;
				var userid = localStorage.getItem('userid');
				
			}
		}
	}
</script>
