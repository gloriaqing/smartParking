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
			<p style="font-size: 22px;font-weight: 600;">￥{{fee}}元</p>
		</div>
		<div class="cont">
			
				<ul>
					<li v-model="carNumber" style="margin-top: 20px;">
						<img src="../../assets/img/icon/车辆.png" style="width: 25px;" />
						缴费车辆<span style="margin-left: 10px;color: #000;font-size: 16px;">{{carNumber}}</span></li>
					<li v-model="parklotName">
						<img src="../../assets/img/icon/位置.png" style="width: 25px;" />
						停车位置<span style="margin-left: 10px;">{{parklotName}}</span></li>
					<li v-model="formatD">
						<img src="../../assets/img/icon/开始时间.png" style="width: 25px" />
						开始时间<span style="margin-left: 10px;">{{formatD}}</span></li>
					<li v-model='endDate'>
						<img src="../../assets/img/icon/结束时间.png" style="width: 25px;" />
						结束时间<span style="margin-left: 10px;">{{endDate}}</span></li>
					<li v-model="fee">
						<img src="../../assets/img/icon/钱 (2).png" style="width: 25px;" />
						总金额<span style="margin-left: 20px;"> {{fee}}元</span></li>
				</ul>
				
		</div>
		<div style="background: #f0f0f0;">
			<button type="button" @click="pay" 
				class="btn btnPay" data-toggle="modal" 
				data-target="#myModal" v-model="wechatpay"> {{wechatPay}}</button>
			
		</div>
		<Modal v-model="modal1" title="" @on-ok="ok" @on-cancel="cancel">
			<p style="text-align: center;margin-top: 25px"><img src="../../assets/img/sucuss.svg" style="width: 30px"> 支付成功</p>
		</Modal>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				modal1: false,
				formatD: '',
				carNumber: '',
				formatD: '',
				total: '',
				end: '',
				range: '',
				parkList: [],
				parktext: '',
				carPlaces: [],
				carPlace: '',
				sd: true,
				parkId: '',
				endDate: '',
				userid:'',
				openid:'',
       			fee:'',parklotName:'',
       			wechatPay:'微信支付'
			}
		},
		props: ['carN'],
		created() {
//			this.wechatPay='43'
			this.userid=localStorage.getItem('userid')
		
			this.carNumber = localStorage.getItem('car_number'),
			this.formatD = localStorage.getItem('startTime'),
			this.range = localStorage.getItem('rentTime'),			
			this.endDate = localStorage.getItem('endTime'),
			this.userid=localStorage.getItem('userid'),
			this.openid=localStorage.getItem('openid'),
			this.parklotName=localStorage.getItem('parklot_name'),
			this.fee=localStorage.getItem('billingfee')
			
		},
		mounted() {
			this.jsapiConfig()
		},
		methods: {
			ok() {
				this.$router.push('/firstPage')
			},
			cancel() {},
			
			pay() {
				var user_id = localStorage.getItem('userid');
				if(this.fee!=''||this.fee!=null){
					this.$http({
					method: 'post',
					data: { //还有两个参数，后台说可以不要
						"openId": this.openid,
						"totalFee": this.fee*100,												
						"billingId":localStorage.getItem('bli'),
						"type":"pay"
					},
					url: 'http://api.basecn.cn/cloud/api/wechat/pay/unifiedorder',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}
					}).then(function(obj) {
						if(obj.data.status) {
							if(obj.data.data.type == 'pay'){
	//							alert("预付款订单生成成功");
								WeixinJSBridge.invoke('getBrandWCPayRequest', {
									"appId": obj.data.data.appId, // 公众号名称，由商户传入
									"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
									"nonceStr": obj.data.data.nonceStr, // 随机串
									"package": obj.data.data.package, // 商品包信息
									"signType": obj.data.data.signType, // 微信签名方式
									"paySign": obj.data.data.paySign // 微信签名
								}, function(res) {
									if(res.err_msg == "get_brand_wcpay_request:ok") {
										alert("支付成功,谢谢使用");
										window.location.href = '/firstPage';
									} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
										alert('你已取消支付');
									} else if(res.err_msg == "get_brand_wcpay_request:fail") {
										alert("支付失败");
									}
								});
							}
							else{
								alert("支付成功,谢谢使用");
								window.location.href = '/firstPage';
							}
						} else {
							alert("抱歉，支付失败，请稍后再试！");
						}
					}).catch(error=> {
						alert("抱歉，支付失败，请稍后再试！");
					});
				}						
				
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
						alert("抱歉，支付失败，请稍后再试！");
					};
				}).catch(error=> {
					alert("抱歉，支付失败，请稍后再试！");
				});
			},

		}
	}
</script>
