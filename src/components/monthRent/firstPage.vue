
<style>
	.head{background: #1095D9;width:100%;height: 150px;}
/*  .short{width: 200px;}*/
</style>
<template>
	<div v-show="hide">

		<div class="head">
			<p style="color: #fff;font-size:16px;padding-top: 20px;">首页</p>
			<img style="width: 55px;margin: 11px 0 10px;" src="../../assets/img/person.svg"  />
			<p style="color: #fff;font-size: 18px;" v-model="phone">{{phone}}</p>
		</div>
		<div>
			<img style="width:100%;margin-top: -1px;" src="../../assets/img/bg2.png" />
		</div>
		<!--<div style="top:64.2%;margin: 0 auto;width: 100%;position: absolute;">
			<div style="width:120px;height:120px;border-radius: 50%;border: 5px solid #1095D9;margin: -25px auto;">
				<img src="../../assets/img/icon/车辆.png" style="position: absolute;left: 43%;top:16%;" width="50px" />
			</div>
		</div>-->
		<div style="display: flex;justify-content: space-around;background: #f0f0f0;
			position: absolute;width:100%;top:43%">
			<div style="" @click="goType">
				<img src="../../assets/img/icon/停车缴费.png" width="50px" />

				<p style="font-size:18px;color: #1095D9;margin-top: 10px;">停车缴费</p>
			</div>
			<div @click="goLock">
				<img src="../../assets/img/icon/锁.png" width="60px" style="margin:-3px 0 7px 0;" />
				<p style="font-size:18px;color: #1095D9;margin-bottom: 3px;margin-top: -3px;">智能锁车</p>
			</div>
			<div @click="goInfo">
				<img src="../../assets/img/icon/车辆.png" width="60px" style="margin:-3px 0 7px 0;" />
				<p style="font-size:18px;color: #1095D9;margin-bottom: 3px;margin-top: -3px;">车辆信息</p>
			</div>
		</div>
		<div style="display: flex;justify-content: space-around;position: absolute;top:63%;width:100%;
			background: #f0f0f0;">
			<div @click="goCount">
				<img src="../../assets/img/icon/账单查询.png" width="50px" />
				<p style="font-size:18px;color: #1095D9;margin-top: 10px;">账单查询</p>
			</div>
			<div @click="goPon">
				<img src="../../assets/img/icon/优惠卡券.png" width="50px" />
				<p style="font-size:18px;color: #1095D9;margin-top: 10px;">优惠卡券</p>
			</div>
		</div>

	</div>
</template>

<script>
	var ds;
	var type;
	export default{
		data(){
			return{phone:'',hide:false}
		},
		methods:{

		    getQueryString(name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if(r != null) {
	              return unescape(r[2]);
	            }
	            return null;
		    },
			goType(){this.$router.push({path:'/chooseType'})},
			goLock(){this.$router.push({path:'/lockCar'}
			)},
			goCount(){this.$router.push({path:'/countDetail'})},
			goInfo(){this.$router.push({path:'/addCar'})},
			goPon(){this.$router.push({path:'/selectCar1'})}
		},
		created(){
    	// 获取url参数中的openid获取type
    	// 根据openid判断是否已经绑定手机
    	//   已绑定：
    	//         留在当前页面
    	//   未绑定：
    	// 				 跳转到绑定页面，并把openid何type在url中拼接

  		ds=this.getQueryString('openid')
  		console.log(ds)
    	localStorage.setItem('openid',ds)

	    type = this.getQueryString('type')
	    this.$http.get("http://api.basecn.cn/cloud/api/user/bind/findUserId?openId=" + ds+"&type="+type
	      ).then(res=> {
	      	console.log(res)
	      	if(res.data.data==null){

	      		window.location.href="http://yc2.basecn.cn/?openid="+ds+"&type="+type;
	      	}else{
	      		this.hide=true
	      		this.phone=res.data.data.phone
	      		localStorage.setItem('userid',res.data.data.userId)
	      		localStorage.setItem('phone',res.data.data.phone)
	      		localStorage.setItem('type',type)
	      	}
	      })

	    }
	}
</script>
