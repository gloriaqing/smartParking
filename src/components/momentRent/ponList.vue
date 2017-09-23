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
  <div class="container">
    <div class="row">
      <!--<div class="col-xs-8 col-xs-offset-2">-->
        <h4 style="background: #1095D9;margin-top: 0px;height: 45px;color: #fff;line-height: 45px;">优惠券</h4>
      <!--</div>-->
    </div>
    <form method="get" onsubmit="return false">
      <div class="row">
        <div class="radio" v-for="(item,index) in userConponList">
          <input hidden="hidden" type="radio" name="optionsRadios" value="option1" />
          <button type="submit" class="conpon">
            <h1>{{item.property}}</h1><p><span>{{item.type}}</span></p>
            &nbsp;&nbsp;<span></span>
            <em>可用数量：{{item.restCount}}</em>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default{
		  data () {
    return {
      userConponList: []
    }
  },
  mounted() {
  	this.getUserConponList()
  },
  methods: {
  	getUserConponList(){
  		var vm = this;
  		this.$http({method:'post',
				url:'http://api.basecn.cn/cloud/api/coupon/getCouponUserList',
				data:{
					"openId":localStorage.getItem('openid'),
    				"carNumber":localStorage.getItem('car_number')
				},
				headers:{
						"Content-Type": "application/json; charset=UTF-8"
				}
					
				}).then(function(res){
					console.log(res.data.data);
					vm.userConponList = res.data.data;
				 	
				})
  	},
  	
  }
	}
</script>