<style scoped>
  .conpon{
    width: 80%;
    height: 120px;
    background-color: #E1EDF7;
    border: 1px dashed grey;
    border-radius: 5px;
    margin-left: 0px;
  }
  h1{
  	color: #31B0D5;
  }
  p span{
    margin-top: 10%;
    font-size: 16px;
    color: #31B0D5;
  }
  em{
  	color: #31B0D5;
  }
</style>
<template>
  <div class="">
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <p style="margin-top:20px;font-size:16px">我的优惠券</p>
      </div>
    </div>
    <form method="get">
      <div class="row">
        <div class="radio" v-for="(item,index) in myCouponList">
          <input hidden="hidden" type="radio" name="optionsRadios" value="option1" />
          <button type="submit" class="conpon">
            <h1>{{item.amount}}</h1><p><span>{{item.coupon_name}}</span></p>
            &nbsp;&nbsp;<span>|</span>
            <em>有效期{{item.start_date}}至{{item.end_date}}</em>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default{
		data(){
			return {
					myCouponList:[]      //存储请求返回的数据
			}
		},
		mounted(){
			this.getMyCouponList()
		},
		methods:{
			getMyCouponList(){                   //http get请求data.json 的数据
				var vm = this;
				var user_id = localStorage.getItem('userid');
				this.$http({method:'post',
				data:{
					"user_id": user_id
				},
				url:'http://prod20.yc-yunpass.com:8080/billing/getMyCouponList',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}

				}).then(function(res){
					console.log(res.data.data);
					vm.myCouponList=res.data.data;
			});
			}
		}
	}
</script>
