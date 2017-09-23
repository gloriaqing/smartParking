<style scoped>
	.bg {
		background-color: #DDDDDD;
		height: 100%;
		position: fixed;
		width: 100%;
	}

	#header {
		background-color: #31B0D5;
		color: white;
	}

	.order {
		margin-top: 20px;
		font-family: "仿宋";
	}

	.info1 {
		background-color: white;
		height: 50px;
		font-size: 18px;
	}

	.info2 {
		background-color: #31B0D5;
		color: white;
		height: 80px;
		font-size: 18px;
	}

	strong {
		font-size: 20px;
		color: black;
	}

	.money {
		color: red;
		line-height: 50px;
	}
</style>
<template>
	<div class="container-fluid bg">
		<div class="row" id="header">
			<div class="col-xs-4 col-xs-offset-4">
				<h3 align="center">账单查询</h3>
			</div>
			<div class="col-xs-4">
				<h3 align="right">完成</h3>
			</div>
		</div>
		<!--一条记录-->

		<div class="order" v-for="(orders,index) in orderList">
			<div class="row info1">
				<div class="col-xs-6">
					<img src="../../assets/img/car2.png" />
					<span style="line-height: 50px;">{{orders.parkLease.carPlateNumber}}</span>
					<!--车牌号-->
				</div>
				<div class="col-xs-6" style="text-align: right; font-size: 22px; line-height: 50px; color: #31B0D5;" />
				<span align="right" style="line-height: 50px;">详情</span>
				<img src="../../assets/img/more.png" />
			</div>

			<div class="row info2" >
				<div class="col-xs-10 col-xs-offset-1">
					<h4>驶入时间：{{orders.parkOrder.orderCreateTime}}</h4>
					<h4>驶出时间：{{orders.parkLease.orderFinishTime}}</h4>
				</div>
			</div>
			<div class="row info1" >
				<div class="col-xs-7">
					<img src="../../assets/img/位置.png" />
					<span style="line-height: 50px;">{{orders.parkLot.parklot_name}}</span>
				</div>
				<div class="col-sm-5" style="text-align: right; font-size: 22px; line-height: 50px; color: #31B0D5;" />
				<strong>已支付：
					<strong class="money" v-if="orders.billing">{{orders.billing.shouldfee}}元</strong>
					<strong class="money" v-else>--元</strong>
				</strong>
			</div>

		</div>

	</div>
</div>
	<!--第二条记录-->

	<!--第三条记录-->

	<!--第四条记录-->

	</div>
</template>
<script>
	export default {
		data() {
				return {
					orderList: [] //存储请求返回的数据
				}
			},
			mounted() {
				this.getOrderList()
			},
			methods: {
				getOrderList() { //http get请求data.json 的数据
					var vm = this;
					//var user_id = localStorage.getItem('user_id');
					this.$http({
						method: 'get',
						url: 'http://api.basecn.cn/cloud/api/park/queryBillings?userId=8a9ac7ed5e7f146c015e7fa6ef6e003c',
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json"
						}

					}).then(function(res) {

							vm.orderList = res.data.data;
						for(var i=0;i<=res.data.data.length;i++){
						}


						//console.log(vm.orderList.parkLease.leaseId);
						//console.log(res.data.data[0].billing.actfee);
					});
				}
			}
	}
</script>
