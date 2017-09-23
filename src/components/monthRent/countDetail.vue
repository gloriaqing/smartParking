<style scoped>
	.tP{width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;}
  .getWhite{border-bottom: 1px solid #9D9D9D;}
  .getWhite:last-child{border-bottom: none;}
  .getChild{display: flex;justify-content: space-between;
  background: #fff;width:100%;padding: 10px 15px;}
  .getChild div:last-child span{color: #03A9F4;font-size: 15px;}
  .endOut{background:#1095D9 ;padding: 0px 0 1px;color: #fff;font-size: 14px;}
  .endOut p{display: flex;justify-content: center;padding-top: 10px;}
  .lastDex{display: flex;justify-content: space-between;padding: 0px 15px;
  background: #fff;width:100%;}
  .lastDex span{line-height: 45px;}
  .lastDex div:last-child span:first-child{font-size: 16px;}
  .lastDex div:last-child span:last-child{color:red;font-size: 15px;}
  .getWhite:nth-child(1){margin-top: 60px;}
</style>
<template>
    <div class="">
    	<p class="tP">账单查询</p>
		<div class="getWhite" v-for="(orders,index) in orderList" @click="goPay(orders)">
			<div class="getChild">   <!--在此处写v-for循环-->
				<div style="display: flex;justify-content: space-between;width: 100%;">
					<div>
						<img src="../../assets/img/icon/车辆.png" style="width: 25px;vertical-align: bottom;" />
						<span>{{orders.parkLease.carPlateNumber}}</span>
					</div>
					<div style="line-height: 25px;" v-show="showPay">
						<span style="color: red;">去支付</span>
						<img width="30px" src="../../assets/img/icon/详情.png"  />
					</div>
				</div>
			
			</div>
			<div class="endOut">
				<div v-show="show">
					<p>
						<span style="display: inline-block;width:100px">
						{{orders.parkLease.leaseType}}：</span>
						<span  v-if="orders.parkOrder"  style="width:200px;text-align: left;">
							{{orders.parkOrder.orderCreateTime}}</span>
							<span v-else style="display: none;"></span>
					</p>
					
				</div>
			</div>
			<div class="endOut">
				<div v-show="hide">
					<p v-if="orders.billing"><span style="display: inline-block;width:100px">
						租期开始：</span><span style="width:200px;text-align: left;">
							{{orders.parkLease.regStartTime}}</span></p>
					<p v-else style="display: none;"></p>		
					<p v-if="orders.billing"><span style="display: inline-block;width:100px">
						租期结束：</span>
						<span style="width:200px;text-align: left;" v-model="resTime">
							<span v-if="test(orders.parkLease.regEndTime)">{{orders.parkLease.regEndTime}}</span>
							<span v-else>--</span>
						</span>
					</p>
				</div>
			</div>
			<div class="lastDex">
				<div>
					<img src="../../assets/img/icon/位置.png" style="width: 25px;" />
					<span>{{orders.parkLot.parklot_name}}</span>
				</div>
				<div>
					<div>
						<span v-model="payTrue">{{payTrue}}:</span> <!--未支付/支付-->
						<span v-if="orders.billing">{{orders.billing.shouldfee}}元</span>
						<strong class="money" v-else>0元</strong>
					</div>
					
				</div>
				
			</div>
		</div>
			
    	<h3 v-show='hide'>暂无账单</h3>
  </div>
</template>  
<script>
	Date.prototype.format = function(fmt) { //计算结束时间
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	} 
	var op;
  	var type,phone;				
	export default {
			data() {
				return {
					orderList: [],resTime:'',resf:'',leaseType:'',showPay:false,hide:false,
					items:[],hide:true,show:true,payTrue:'' //存储请求返回的数据
				}
			},
			beforeCreate() {	
				this.$http({
						method: 'get',
						url: 'http://api.basecn.cn/cloud/api/park/queryBillings?userId='+localStorage.getItem("userid")						
					}).then(res=> {
//						console.log(res.data.data);
						this.orderList = res.data.data;
						for(var i =0;i<this.orderList.length;i++){	
							if(this.orderList[i].parkLease.leaseType==1){ //判断租约类型
//									this.leaseType='驶入时间'
								this.orderList[i].parkLease.leaseType='驶入时间'
							}else{
								this.orderList[i].parkLease.leaseType='创建时间'
							}							
							if(this.orderList[i].billing.billStatus==0){ //判断支付还是未支付
								this.payTrue='未支付'
								this.showPay=true
							}else if(this.orderList[i].billing.billStatus==1){
								this.payTrue='已支付'
								
							}else if(this.orderList[i].billing.billStatus==2){
								this.payTrue='未支付'
								this.showPay=true
							}							
							var tt1 = parseInt(this.orderList[i].parkLease.regStartTime)
							var s1=new Date(tt1)
							var s22=s1.format("yyyy-MM-dd")
							this.orderList[i].parkLease.regStartTime=s22
							var tt = parseInt(this.orderList[i].parkLease.regEndTime)
//							var tt=parseInt(this.items[i].na)
							var s=new Date(tt)
							var s2=s.format("yyyy-MM-dd")			
							this.orderList[i].parkLease.regEndTime=s2											
						}
						if(this.orderList.length==0){
//							alert('暂无账单')
//							this.$Message.info({
//					                content: '暂无账单',
//					                duration: 10
//					            });
//							this.hide=true
							op=localStorage.getItem('openid');
							type=localStorage.getItem('type');
							phone=localStorage.getItem('phone');							
							window.location.href="/firstPage?openid=" + op + "&type="+type+"&phone="+phone						
						}
					});
				
			},
			methods: {	
				update () {
	                if(this.timer <= 0) 
	                {
	                    this.timer = 30;
	                }
	                else{
	                    this.timer--;
	                }
	            },
	             startTimer () {
                //如果是false就开始倒计时，如果是true就停止倒计时
	                if(this.stop == false) 
	                {
	                    this.Interval = setInterval(this.update,1000);    
	                }
	                else
	                {
	                    clearInterval(this.Interval);
	                }
	
	                this.stop = !this.stop;
	            },
				test(a){
					return a != 'NaN-aN-aN';
				},
				goPay(item){
					console.log(item)
					localStorage.setItem('car_number',item.parkLease.carPlateNumber)
					localStorage.setItem('parklot_name',item.parkLot.parklot_name)
					localStorage.setItem('startTime',item.parkLease.regStartTime)
					localStorage.setItem('endTime',item.parkLease.regEndTime)
					localStorage.setItem('billingfee',item.billing.billingFee)
					localStorage.setItem('billing_id',item.billing.billingId)
					localStorage.setItem('billStatus',item.billing.billStatus)					
					if(item.parkLease.longLeaseType==0){
						this.$router.push({path:'/accInfo'})
					}else if(item.parkLease.longLeaseType==1){
						this.$router.push({path:'/pay'})
					}
				}
			}
	}
</script>
