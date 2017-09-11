<style scoped>
  
</style>
<template>
    <div class="">
    	<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">账单查询</p>

    <div class="" style="margin-top: 20px;">
     
        <!--<ul>
          <li>{{item.bill_create_time}}<em></em></li>
          <li>入场时间:{{item.bill_create_time}}</li>
          <li>缴费{{item.billing_fee}}元</li>
        </ul>-->
        <ul>
	   			<li>
	   				<img src="../../assets/img/icon/车辆.png" style="width: 25px;" />
	   				<span>23</span></li>
	   		</ul>  
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
				}).then(res=> {
					this.orderList=res.data.data
					console.log(res)
				})
		}
		
	}
</script>
