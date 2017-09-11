<style scoped>
  .conpon{
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
        <div class="radio" @click="accInfo">
          <input hidden="hidden" type="radio" id="optionsRadios1" name="optionsRadios" value="option1" />
          <button type="submit" class="conpon">
            <h1>￥20</h1><p>满40可用</p>
            <em>有效期2017-7-10至2017-10-01</em>
          </button>
        </div>
        <div class="radio">
          <input hidden="hidden" type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
          <button type="submit" class="conpon">
            <h1>￥20</h1><p>满40可用</p>
            <em>有效期2017-7-10至2017-10-01</em>
          </button>
        </div>
        <div class="radio">
          <input hidden="hidden" type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
          <button type="submit" class="conpon">
            <h1>￥20</h1><p>满40可用</p>
            <em>有效期2017-7-10至2017-10-01</em>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
	
data(){
			return {
				getMyCouponList:[]      //存储请求返回的数据
			}
		},
		mounted(){
			this.getMyCouponList()
		},
		methods:{
			accInfo(){
	      this.$router.push('/accInfo')
	    },
			getMyCouponList(){                   //http get请求data.json 的数据
				var vm = this;
				this.$http({method:'post',
				data:{
					"user_id":user_id
				},
				url:'http://prod20.yc-yunpass.com:8080/billing/getMyCouponList',
				headers:{
          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
					
				}).then(res =>{console.log(res.data)})
			}
		}
	}
	

</script>
