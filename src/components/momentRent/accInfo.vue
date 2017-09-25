<style>
	.ttn .ivu-modal-close {
		display: none
	}

	.ttn .ivu-modal-footer {
		border: none
	}

	.btnPay {
		width: 80%;
		margin-top: 20px;
		height: 40px;
		background-color: #1095d9;
		border: none;
		font-size: 16px;
		color: #fff
	}
	.cont{font-size: 14px;width: 80%;margin: 0 auto;text-align: left;}
	.cont ul li{height: 40px;color: #03A9F4;font-size: 16px;font-weight: 500;}
	.cout ul li span{font-size: 16px;color: #000;}
</style>
<template>
	<div class="ttn">
		<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">缴费信息</p>
		<div style="width:80%;margin: 0 auto;border-bottom: 1px solid #bfbfbf;">
			<h5>应付金额</h5>
			<p style="font-size: 22px;font-weight: 600;">￥{{billInfo.should_fee}}元</p>
		</div>
		<div class="cont">

			<ul>
				<li style="margin-top: 20px;">
					<img src="../../assets/img/icon/车辆.png" style="width: 25px;" />
					缴费车辆<span style="margin-left: 10px;color: #000;font-size: 16px;">{{carnumber}}</span></li>
				<li>
					<img src="../../assets/img/icon/位置.png" style="width: 25px;" />
					停车位置<span style="margin-left: 10px;">
						{{billInfo.order_info.lease_info.parklot_name}}</span></li>
				<li>
					<img src="../../assets/img/icon/开始时间.png" style="width: 25px" />
					开始时间<span style="margin-left: 10px;">{{billInfo.order_info.order_create_time}}</span></li>
				<li>
					<img src="../../assets/img/icon/结束时间.png" style="width: 25px;" />
					结束时间<span style="margin-left: 10px;">{{timeStr}}</span></li>
				<li>
					<img src="../../assets/img/icon/钱 (2).png" style="width: 25px;" />
					总金额<span style="margin-left: 20px;"> {{billInfo.billing_fee}}元</span></li>
				<li>
					<img src="../../assets/img/icon/优惠.png" style="width: 25px;" />
					优惠金额<span style="margin-left: 6px;"> {{fee}}元</span></li>
			</ul>
		</div>
		<div style="background: #f0f0f0;">
			<button type="button" v-if="unbind" v-on:click="pay" class="btn btnPay" data-toggle="modal" data-target="#myModal"> 微信支付</button>
			<button type="button" v-else class="btn btnPay" data-toggle="modal" data-target="#myModal"> 已支付</button>
		</div>
	

	</div>
</template>
<script>
	var billing_id;
	var a;
	var openid,phone,type;
	export default {
		data() {
			return {
				billInfo: [],             //存储请求返回的数据
				//car_number:car_plate_number
				timeStr:'',
				carnumber:localStorage.getItem("car_number"),
				fee:'',
				unbind:''
			}
		},
		mounted() {

			this.getBillInfo(),
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
			getBillInfo(){   //http get请求data.json 的数据

				var vm = this;
				//console.log(biling_id);
				var billing_id = localStorage.getItem("billing_id");
				var myDate = new Date();
				console.log("本地billing_id------------------------->")
				console.log("获取账单后的"+ billing_id);
				this.$http({method:'post',
				data:{
					"billing_id": billing_id
				},
				url:'http://prod20.yc-yunpass.com:8080/billing/getBillInfoByID',
				headers:{
			        "Authorization":"WEIXINSERVER:{}",
			        "Content-Type":"application/json"}

				}).then(function(res){
					console.log("账单信息2----------------------->");
					console.log(res.data.data);
					vm.billInfo = res.data.data;
					if(res.data.data.bill_status==1){
						vm.unbind = false;
					};
					vm.fee = Number(res.data.data.billing_fee) - Number(res.data.data.should_fee);
					//localStorage.removeItem("billing_id");
					localStorage.setItem("money",res.data.data.should_fee);

			          var money = localStorage.getItem("money");
			          var m = parseFloat(money);
			          var m2 = Math.ceil(m * 100);
			          console.log("money = " + money + " m = " + m + " m2 = " + m2);
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
						"totalFee": Math.ceil(money*100),
						"body": "停车场缴费",
						"detail": "停车场缴费",
						"billingId": localStorage.getItem("billing_id")
					},
					url: 'http://api.basecn.cn/cloud/api/wechat/pay/unifiedorder',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}
				}).then(function(obj) {
					//alert(obj.data.status);
					console.log("status = " + obj.data.status);
					console.log("data = " + obj.data.data);
					console.log("type = " + obj.data.data.type);
					if(obj.data.status) {
						if(obj.data.data.type == 'nopay'){
							alert("支付成功，谢谢使用，请在15分钟内出场");						
//							window.location.href = '/firstPage';
							openid=localStorage.getItem('openid');
							type=localStorage.getItem('type');
							phone=localStorage.getItem('phone');	
							window.location.href="/firstPage?openid=" + openid + "&type="+type+"&phone="+phone
							
						};
						console.log(obj.data.appId);
//						alert("预付款订单生成成功");
						//alert("appId"+obj.data.data.appId);
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							"appId": obj.data.data.appId, // 公众号名称，由商户传入
							"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
							"nonceStr": obj.data.data.nonceStr, //  随机串
							"out_trade_no": obj.data.data.out_trade_no,
							"package": obj.data.data.package, // 商品包信息
							"signType": obj.data.data.signType, // 微信签名方式
							"paySign": obj.data.data.paySign // 微信签名
						}, function(res) {
							if(res.err_msg == "get_brand_wcpay_request:ok") {
								alert("支付成功，谢谢使用，请在15分钟内出场");
								window.location.href="/firstPage?openid=" + openid + "&type="+type+"&phone="+phone
							} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
								alert('你已取消支付');
							} else if(res.err_msg == "get_brand_wcpay_request:fail") {
								alert("支付失败");
							}
						});
					} else {
//						alert("生成预付款订单失败：" + obj.errorMsg);
					}
				}).catch(function(error) {
				 	console.log("error = " + error);
					alert("支付失败，请稍后再试！");
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
						alert("支付失败，请稍后再试！");
					};
				}).catch(function(error) {
					alert("支付失败，请稍后再试！");
				});
			}
		}
	}
</script>
