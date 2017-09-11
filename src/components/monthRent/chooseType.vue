<style scoped>
  .container{margin-top: 20%;font-size: 14px;}
  .btn{width: 35%;height: 45px;
  background: #03A9F4;margin-top: 30px;margin-left: 10%;color: #fff}
</style>
<template>
  <div style="background: #f0f0f0;">
    <div class="row">
      <div class="col-xs-12">
        <p style="text-align: center;background: #03A9F4;height: 45px;color: #fff;line-height: 45px;
        	font-size: 18px;">请选择缴费类型</p>
      </div>
      <div class="col-xs-12">
      	<div>
      		<img style="width: 40px;margin-top: 30px" src="../../assets/img/icon/临时卡.png"  />
        	<button class="btn" id="rentMoment" @click="rentMoment">临停</button>
      	</div>
      	<div>
      		<img style="width: 40px;margin-top: 30px" src="../../assets/img/icon/月租卡.png"  />
      		<button class="btn" id="rentMonth" @click="rentMonth">续费</button>
      	</div>
        
      </div>
    </div>
  </div>
</template>
<script>
	var ds;
	var type;
  export default {
    methods:{
      rentMoment(){
        this.$router.push('/carInfo')
      },
      rentMonth(){
        this.$router.push('/monthRent')
      },
      getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) {
              return unescape(r[2]);
            }
            return null;
       }
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

//  	var getOp= localStorage.getItem('openid')  // 获取绑定此页面的openid
//    var oi=localStorage.getItem('openId')    //  获取绑定手机页面的openid*/
//    console.log(ds)
      type = this.getQueryString('type')
      this.$http.get("http://api.basecn.cn/cloud/api/bind/findUserId?openId=" + ds
      ).then(res=> {
      	console.log(res)
      	if(res.data.data==null){
      		window.location.href="http://yc2.basecn.cn?openid="+ds+"&type="+type;
      	}else{
      		localStorage.setItem('userid',res.data.data.userId)
      	}
      })

    }
  }

</script>
