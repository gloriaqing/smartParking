<style scoped>
	.conpon {
		width: 80%;
		height: 120px;
		background-color: #EC971F;
		border: 1px dashed grey;
		border-radius: 5px;
		margin-left: 0px;
	}
</style>
<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<p style="text-align: center;font-size: 16px; margin-top: 10%">请选择优惠券</p>
			</div>
		</div>
		<form method="get">
			<div class="row">
				<div class="radio" v-for="(item,index) in UserConponList" @click='accInfo(item.id)'>
					<input hidden="hidden" type="radio" id="optionsRadios1" name="optionsRadios" value="option1" />
					<button type="button" class="conpon">
            <h1>{{item.property}}</h1><p>{{item.type}}</p>
            <em>数量：{{item.quantity}}</em>
          </button>
				</div>
				<div class="row">
					<div class="col-xs-6 col-xs-offset-3">
						<div class="btn btn-info btn-block" @click="accInfo1()">
							<h4 style="text-align: center;">土豪不用优惠</h4>
						</div>

					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					UserConponList: []
				}
			},
			mounted() {
				this.getUserConponList(),
				this.getMyAllLease()
			},
			methods: {
				accInfo1: function(){
				  this.$http({
          						method: 'post',
          						url: 'http://api.basecn.cn/cloud/api/coupon/bindCouponForCar',
          						data:{
          							"lease_id":localStorage.getItem("lease_id"),
          							"user_id":localStorage.getItem("userid"),
          							"carNumber":"-1",
          							"couponId":"-1",
          						},
          						headers: {
          							"Authorization": "WEIXINSERVER:{}",
          							"Content-Type": "application/json;charset=UTF-8"
          						}

          					}).then(function(res) {
                      console.log("------------> 不使用 billing_id = " + res.data.data.data.billing_id);
                      localStorage.setItem("billing_id",res.data.data.data.billing_id);
						          window.location.href = '/accInfo';
          					});
				},
				accInfo: function(id) {
					this.$http({
						method: 'post',
						url: 'http://api.basecn.cn/cloud/api/coupon/bindCouponForCar',
						data:{
							"couponId":id,
							"carNumber":localStorage.getItem("car_number"),
							"lease_id":"",
          					"user_id":"",
						},
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json;charset=UTF-8"
						}

					}).then(function(res) {
						console.log("------------> 使用 billing_id = " + res.data.data.data.billing_id);
						localStorage.setItem("billing_id",res.data.data.data.billing_id);
						window.location.href = '/accInfo';
					})
					//console.log(event.currentTarget.innerText);
				},
				getMyAllLease(){
				  var car_number = localStorage.getItem("car_number");
          				//var car_num = localStorage.getItem('car_num');
          				this.$http({
          					method: 'post',
          					data: {
          						"number": car_number,
          						"type":1
          					},
          					url: 'http://api.basecn.cn/cloud/api/park/findLeaseId',
          					headers: {
          						"Authorization": "WEIXINSERVER:{}",
          						"Content-Type": "application/json"
          					}

          				}).then(function(res) {
          					console.log("数据"+res.data.data.leaseId);
          					console.log(localStorage.getItem("userid"));
          //					console.log("数据1"+res.data.leaseId);
          //					var lease_id = res.data.lease_id;
          					localStorage.setItem("lease_id",res.data.data.leaseId);
          					console.log("lease_id--------------------->");
          					console.log(localStorage.getItem("lease_id"));
          					//var car_plate_number=res.data.data.car_plate_number;
          				})
				},
				getUserConponList() {
					var vm = this;
					this.$http({
						method: 'post',
						url: 'http://api.basecn.cn/cloud/api/coupon/getCouponUserList',
						data:{
						  "openId":localStorage.getItem("openid"),
						  "carNumber":localStorage.getItem("car_number")
						},
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json;charset=UTF-8"
						}

					}).then(function(res) {
						console.log(res.data.data.length);
						vm.UserConponList = res.data.data;
						if(res.data.data.length==0){
							alert("暂无优惠券可用");
						}
					})
				}
			}
	}
</script>



