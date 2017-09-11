<style scoped>
	.container-fluid {
		padding: 0px;
		margin-top: 10%;
	}

	.tabcar {
		margin-top: 20px;
	}

	a {
		text-decoration: none;
		color: white;
	}
	td{
		margin-top: 5px;
	}
	.td1{
		width: 25%;
	}
</style>
<template>
	<div class="container-fluid">

		<div class="table-responsive">
			<table class="table table-border table-hover tabcar">
				<tr>
					<td class="td1">标题</td>
					<td>{{billInfo.billing_title}}</td>
				</tr>
				<tr class="info">
					<td class="td1">所在停车场</td>
					<td>{{billInfo.order_info.lease_info.parklot_name}}</td>
				</tr>
				<tr>
					<td class="td1">入场时间</td>
					<td>{{billInfo.order_info.order_create_time}}</td>
				</tr>
				<tr class="info">
					<td class="td1">出场时间</td>
					<td>{{timeStr}}</td>
				</tr>
				<tr>
					<td class="td1">总金额</td>
					<td>{{billInfo.billing_fee}}</td>
				</tr>
				<tr class="info">
					<td class="td1">优惠金额</td>
					<!--<td v-model="car">{{car}}</td>-->
					<td>{{billInfo.billing_desc.substring(billInfo.billing_desc.indexOf("：")+1)}}</td>
					<!--<td>{{billInfo.billing_desc.split("：")[1].split("。")[0]}}</td>	-->
				</tr>
				<tr>
					<td class="td1">应付金额</td>
					<td>{{billInfo.should_fee}}</td>
				</tr>
			</table>

		</div>
		<div class="row">
			<div class="col-xs-4 col-xs-offset-2">
				<button type="button" class="btn btn-danger">
							<span class="glyphicon glyphicon-remove">
								<a href="javascript:">信息错误</a>
							</span>
        </button>
			</div>
			<div class="col-xs-4 col-xs-offset-0">
				<form method="get" onsubmit="return false;">
					<button type="submit" class="btn btn-info">
            <span class="glyphicon glyphicon-ok" @click="pay">&nbsp;微信支付</span>
          </button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
	var billing_id;
	var a;
	window.localStorage.setItem("userid","8a9ac7ed5e2dcc1d015e2dd216d3000e");
//	var locdate = new Date();
//	var time = locdate.toLocaleTimeString;
	export default {
		data() {
			return {
				billInfo: [],             //存储请求返回的数据
				//car_number:car_plate_number
				timeStr:''
			}
		},
		mounted() {
//			this.getPresentCars(),
			this.getMyAllLease(),
//			this.finishPark(),
//			this.getBillInfo(),
			this.jsapiConfig(),
			this.getTime()
		},
		methods: {

			getTime(){
				var vt = this;
				var myTime = new Date();
				var month = myTime.getMonth()+1;
				this.timeStr = myTime.getFullYear()+"-"+month+"-"+myTime.getDate()+" "+myTime.getHours()+":"+myTime.getMinutes()+":"+myTime.getSeconds();
			},
//			pay: function() {
//				var openid = localStorage.getItem("openid");
//				var money = localStorage.getItem("money");
//				console.log("金额----------------------------------->");
//				console.log(localStorage.getItem("money"));
//				this.$http({
//					method: 'post',
//					data: {
//						"openId": openid,
//						"total_fee": money*100,
//						"body": "停车场缴费",
//						"detail": "停车场缴费",
//						"attach": "无附加数据"
//					},
//					url: 'http://api.basecn.cn/cloud/api/wechat/pay/unifiedorder',
//					headers: {
//						"Authorization": "WEIXINSERVER:{}",
//						"Content-Type": "application/json;charset=UTF-8"
//					}
//				}).then(function(obj) {
//					//alert("111");
//					if(obj.status) {
//						//alert(obj.data);
//						console.log(obj.data.appId);
//						alert("预付款订单生成成功");
//						//alert("appId"+obj.data.data.appId);
//						WeixinJSBridge.invoke('getBrandWCPayRequest', {
//							"appId": obj.data.data.appId, // 公众号名称，由商户传入
//							"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
//							"nonceStr": obj.data.data.nonceStr, // 随机串
//							"package": obj.data.data.package, // 商品包信息
//							"signType": obj.data.data.signType, // 微信签名方式
//							"paySign": obj.data.data.paySign // 微信签名
//						}, function(res) {
//							if(res.err_msg == "get_brand_wcpay_request:ok") {
//								alert("支付成功");
//								this.$router.push('/paySuccess');
//							} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
//								alert('你已取消支付');
//							} else if(res.err_msg == "get_brand_wcpay_request:fail") {
//								alert("支付失败");
//							}
//						});
//					} else {
//						alert("生成预付款订单失败：" + obj.errorMsg);
//						//console.log("11111");
//					}
//				}).catch(function(error) {
//					alert("生成预付款订单异常！");
//				});
//
//				//this.$router.push('/paySuccess')
//			},
//			getPresentCars(){
//				var user_id = localStorage.getItem('user_id');
//				this.$http({
//					method: 'post',
//					data: {"user_id": user_id},
//					url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/getPresentCars',
//					headers: {
//						"Authorization": "WEIXINSERVER:{}",
//						"Content-Type": "application/json"
//					}
//				}).then(function(res){
//					var car_number = res.data.data.car_plate_number;
//				})
//			},

			getMyAllLease() { //通过user_id获取lease_id的接口
				//localStorage.setItem("userid","8a9ac7ed5d3ee8d8015d3f00b59e00cc");
				//var car_num = localStorage.getItem('car_num');
				this.$http({
					method: 'get',
//					data: {
//						"user_id": localStorage.getItem("userid")
//					},
					url: 'http://api.basecn.cn/cloud/api/park/findLeaseId?userId=' + localStorage.getItem("userid")+'&type=1'
//					headers: {
//						"Authorization": "WEIXINSERVER:{}",
//						"Content-Type": "application/json"
//					}

				}).then(function(res) {
					console.log("数据"+res.data.data.leaseId);
//					console.log("数据1"+res.data.leaseId);
//					var lease_id = res.data.lease_id;
					localStorage.setItem("lease_id",res.data.data.leaseId);
					console.log("lease_id--------------------->");
					console.log(localStorage.getItem("lease_id"));
					//var car_plate_number=res.data.data.car_plate_number;
				}).then(()=>{			//通过user_id和lease_id获取billing_id的接口
//			},
//			finishPark() { //http get请求data.json 的数据
				//var userid = localStorage.getItem('user_id');
				//var car_num = localStorage.getItem('car_num');
				var vm = this;
				this.$http({
					method: 'post',
					data: {
						"user_id": localStorage.getItem("userid"),
						"lease_id": localStorage.getItem("lease_id")
					},
					url: 'http://prod20.yc-yunpass.com:8080/park/reqFinishParkByUser',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json"
					}

				}).then(function(res) {
					console.log("停车信息1-------------------->");
					console.log(res.data.data);
					var billingId = res.data.data.billing_id;
					//console.log("1-1-1-1-11-- billingId = " + billingId);

					//billing_id = res.data.data.billing_id;
					localStorage.setItem("billing_id",billingId);
					var myDate = new Date();
					console.log("刚刚存的"+localStorage.getItem("billing_id")+"////"+myDate.getMinutes()+"/"+myDate.getSeconds()+"/"+myDate.getMilliseconds());
				}).then(()=>{				//通过billing_id获取账单的接口
//			},
//			getBillInfo(){   //http get请求data.json 的数据
//				var vm = this;
				//console.log(biling_id);
				//var billing_id = localStorage.getItem("billing_id");
				var myDate = new Date();
				console.log("本地billing_id------------------------->")
				console.log("获取账单后的"+localStorage.getItem("billing_id")+"////"+myDate.getMinutes()+"/"+myDate.getSeconds()+"/"+myDate.getMilliseconds());
				this.$http({method:'post',
				data:{
					"billing_id": localStorage.getItem("billing_id")
				},
				url:'http://prod20.yc-yunpass.com:8080/billing/getBillInfoByID',
				headers:{
			        "Authorization":"WEIXINSERVER:{}",
			        "Content-Type":"application/json"}

				}).then(function(res){
					console.log("账单信息2----------------------->");
					console.log(res.data.data);
					vm.billInfo = res.data.data;
					//localStorage.removeItem("billing_id");
					localStorage.setItem("money",res.data.data.should_fee);
			})
				})
			})
				},



				//微信支付接口
			pay: function() {
				var openid = localStorage.getItem("openid");
				var money = localStorage.getItem("money");
				console.log("金额----------------------------------->");
				console.log(localStorage.getItem("money"));
				this.$http({
					method: 'post',
					data: {
						"openId": openid,
						"totalFee": money*100,
						"body": "停车场缴费",
						"detail": "停车场缴费",
						"attach": "无附加数据",
						"billingId": localStorage.getItem("billing_id")
					},
					url: 'http://api.basecn.cn/cloud/api/wechat/pay/unifiedorder',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}
				}).then(function(obj) {
					//alert("111");
					if(obj.status) {
						//alert(obj.data);
						console.log(obj.data.appId);
						alert("预付款订单生成成功");
						//alert("appId"+obj.data.data.appId);
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							"appId": obj.data.data.appId, // 公众号名称，由商户传入
							"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
							"nonceStr": obj.data.data.nonceStr, // 随机串
							"package": obj.data.data.package, // 商品包信息
							"signType": obj.data.data.signType, // 微信签名方式
							"paySign": obj.data.data.paySign // 微信签名
						}, function(res) {
							if(res.err_msg == "get_brand_wcpay_request:ok") {
								alert("支付成功");
								this.$router.push('/paySuccess');
							} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
								alert('你已取消支付');
							} else if(res.err_msg == "get_brand_wcpay_request:fail") {
								alert("支付失败");
							}
						});
					} else {
						alert("生成预付款订单失败：" + obj.errorMsg);
						//console.log("11111");
					}
				}).catch(function(error) {
					alert("生成预付款订单异常！");
				});

				//this.$router.push('/paySuccess')
			},
			jsapiConfig() {
				var str = window.location.href.split('#')[0];
				var httpUrl = 'http://api.basecn.cn/cloud/api/wechat/pay/jsapi?oauthUrl=' + str;
				this.$http({
					method: 'get',
					url: httpUrl,
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json"
					}
				}).then(function(res) {
					//console.log(res.data);
					var signature = res.data.data.signature;
					//console.log("signature"+res.data.data.signature);
					var appid = res.data.data.appId;
					//console.log("appid"+appid);
					var jsapi_ticket = res.data.data.jsapi_ticket;
					//console.log("jsapi_ticket"+jsapi_ticket);
					var noncestr = res.data.data.noncestr;
					//console.log("noncestr"+noncestr);
					var url = res.data.data.url;
					var timestamp = res.data.data.timestamp;
					//console.log("timestamp"+timestamp);
					if(res.status) {
						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: appid, // 必填，公众号的唯一标识
							timestamp: timestamp, // 必填，生成签名的时间戳
							nonceStr: noncestr, // 必填，生成签名的随机串
							signature: signature, // 必填，签名，见附录1
							jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})
					} else {
						alert("获取JSAPI配置参数出错！");
					};
				}).catch(function(error) {
					alert("获取JSAPI配置参数异常！");
				});
			}
		}
	}
</script>
