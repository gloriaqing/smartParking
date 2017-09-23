<style scoped>
  .container{

    border-radius: 5px;
  }
  h3{
  	text-align: center;
  }
  table{
  	text-align: left;
  	font-size: 18px;
  }
  td{
  	width: 49%;
  }
  td input{
  	text-align: left;
  }
  td h4{
  	text-align: center;
  }
  p{
  	text-align: right;
  }
</style>
<template>
  <div class="">
    <div class="row">
        <h3>请选择商家免停车费</h3>
    </div>
    <form method="get" action="carInfo">
				<div class="form-group">
					<label class="parkText">选择停车场</label>
					<div class="col-sm-10">
						<input type="text" @blur='isiblesPark' v-model="parktext" @keyup="park" class="form-control" placeholder="请输入停车场名字" />
						<div style="width: 100%;">
							<div style="position: relative;width: 100%;">
								<ul v-show="sd" style="position: fixed;background: #fff;z-index: 200;
									width: 80%;height: 200px;overflow-y: auto;border:1px solid #e2e2e2">
									<li v-for="item in parkList" @click="ss(item)" style="margin: 10px;">{{item.name }}

									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
      <!--<div class="table-responsive">
        <table class="table table-hover">

          <tr>
            <td><input type="reset" class="btn btn-block btn-info" value="否" /></td>
            <td><input type="submit" class="btn btn-block btn-info" value="是" /></td>
          </tr>
        </table>

      </div>-->
    </form>
  </div>

</template>
<script>

	export default {
		data() {
			return {
				parkList: [],sd:false,
				parktext: '' //存储请求返回的数据
			}
		},

		mounted() {

		},
		methods: {
			park() {
				if(this.parktext != '') {
					this.$http.post('http://prod20.yc-yunpass.com:8080/park/searchParks', {
						"search_text": this.parktext,
						city: ''
					}).then(res => {
						this.sd=true;  
						console.log(res);
						this.parkList = res.data.data;

					})
				}
			},
			ss(item){
				this.parktext=item.name;
				this.sd=false;
				var parklotId = item.id;
				console.log(parklotId)
				localStorage.setItem("parklot_id",parklotId);
				this.$router.push('/lockCar')
			},
			isiblesPark(){
				var _this = this
				setTimeout(function() {
					_this.sd = false
				}, 20)
			},

		}
	}
</script>
