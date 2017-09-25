<style>
   .lock{display: flex;flex-direction:column;font-size: 14px}
   .lock ul:first-child{border: none;padding-top: 0px;}
   .lock ul{text-align: left;border-top: 1px solid #eee;padding-top: 20px;}
   .lock ul li{list-style: none}
   .lock .switch-on{margin-top: 10px}
   
</style>
<template>
	<div >
	<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">智能锁车</p>
 		<div class="lock">
 	<!--@click="sendAdd(item)"-->
		    <ul v-for="(item,index) in carList" >
		    	<div style="display: flex;justify-content: space-around;" >
			    	<div>
				    	<li style="font-weight: bold;font-size: 16px;" v-model='carNd'>
				    		<img src="../../assets/img/icon/车辆.png" style="width: 25px;margin-right: 10px;" />
				    		车牌号:{{item.car_plate_number}}</li>
					      <li style="color: #9d9d9d" v-model="parkName">
					      	<img src="../../assets/img/icon/位置.png"  style="width: 25px;margin: 0 10px 0 0;"/>
					      	停车场:{{item.parklot_name}}</li>
					</div>
					<div>
					    <li>
					      	<div>
							  	 <i-switch class="switch-on" @on-change="lockCar(item)" v-model="item.is_locked"   size="large">
							  	    <span slot="open" style="font-weight:bold" >已锁</span>
							        <span slot="close"  style="font-weight:bold">未锁</span>
							  	 </i-switch>
							  	 
						  	</div>
						  
							    <!--<i-switch size="large"  @on-change="change">
							        <span slot="open" >已锁</span>
							        <span slot="close">未锁</span>
							    </i-switch>
						 -->

				      	</li>
				    </div>  
		      	</div>
		  	</ul>	  			  	
	  </div>
	  <h3 v-show="parkUser" style="background: #f0f0f0;margin-top: -8px;line-height: 50px;">所在停车场无车辆</h3>
  </div>

</template>
<script>
	var carNum,parklot_id,lock_status;
	var openid,phone,type;
  export default {

    data(){
        return {
          carList:[],car_number:'',carNd:'',parkName:'',parklot_id:'',parkUser:true
        }
      },
    created(){
    	
        var user_id = localStorage.getItem('userid');
//      var vm=this
        this.$http({
          method: 'post',
          data: {"user_id": user_id},
          async: false,
          url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/getPresentCars'
        }).then(res=>{
        	this.carList=res.data.data; 
        	this.parkUser=false;
        	if(this.carList.length!=0){
		          console.log( this.carList)                 
		         for(var i=0;i<this.carList.length;i++){	
					if(this.carList[i].is_locked=='true'){
						this.carList[i].is_locked=true
					}else{
						this.carList[i].is_locked=false
					}
		         	
	         	}
        	}else{
        		this.parkUser=true
        		alert('无在场车辆')
        		openid=localStorage.getItem('openid');
				type=localStorage.getItem('type');
				phone=localStorage.getItem('phone');	
				window.location.href="/firstPage?openid=" + openid + "&type="+type+"&phone="+phone;							        		       		
        	}
        	
        

        })
      },
      methods:{
      	
      	lockCar (item) {
      		console.log(item)
      		console.log(typeof item.is_locked);      		
          this.$http({
	          method:'post',
	          url:'http://prod20.yc-yunpass.com/yunpasswx/api/cars/lockCar',
	          data:{
	            "car_plate_number": item.car_plate_number,
	            "lock_status":item.is_locked,
	            "parklot_id": item.parklot_id
	          }
	          }).then(res =>{
	            console.log(res)	            
	            alert("操作成功！");         
          })
      	}
      }
	}
</script>
