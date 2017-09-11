<style scoped="scoped">
@import "../../assets/css/addCar.css";
  .active{color: red;}
  .parkText{margin:10px auto;text-align: left;font-size: 15px;display: block;width: 90%}
  .ivu-icon-arrow-down-b:before {display: none;}
  .addNew{width:70%;height: 40px;background:#1095D9;color: #fff;border: none;}
  .newSty{width:78%;margin: 20px auto;border: 1px solid #BDBDBD;height: 40px;border-radius: 5px;display: flex;}
  .newSty a{border-right: 1px solid #BDBDBD;width:40px;display: block;height: 21px;
  margin-top: 8px;}
  .newSty a:last-child{border: none;}
</style>
<template>
  <div style="font-size: 16px;background: #f0f0f0;">
			<h4 style="background: #1095D9;margin-top: 0px;height: 45px;color: #fff;line-height: 45px;">添加车辆</h4>
      <div class="car">

        <div class="svgsd" v-for="(list,index) in listsPp">
        	<img src="../../assets/img/icon/车辆.png" />
          <span class="car_d" @click="goSelect" style="text-align: center" v-model="carNamea">{{list.plate_number}}</span>
        	<img src="../../assets/img/icon/修改.png" />
          <img src="../../assets/img/icon/删 除.png" @click="delCar(index,list)" />
        </div>
        <!--创建新车牌号开始-->
        <div class="svg">
          <!--<img src="../../assets/img/add.svg" />-->
          <!--<div class="car_d" @click="addCar" style="text-align: center" >请输入车牌号</div>-->
          <div>
          </div>
        </div>
      </div>
      <div class="newSty">
      	<a  v-bind:class="{active:isActivea}" @click="first">{{province}}</a>
              <a  v-bind:class="{active:isActiveb}" @click="second">{{letter}}</a>
              <a v-bind:class="{active:isActivec}" @click="third">{{mixy}}</a>
              <a  v-bind:class="{active:isActived}" @click="four">{{mixe}}</a>
              <a v-bind:class="{active:isActivee}" @click="five">{{mixs}}</a>
              <a v-bind:class="{active:isActivef}" @click="six">{{mixf}}</a>
              <a  v-bind:class="{active:isActiveg}" @click="seven">{{mixw}}</a>
      
      </div>
      <button v-show="addC" class="btn addNew"  @click="addCar">添加车辆</button>
    <!--//键盘-->
    <div class="keyboard" style="display: none" v-show="total">
      <div class="keyboard-box">
        <div class="keyboard-header">
          <div style="display: flex;justify-content: space-around;">
            <div class="car-num">
              <!--<a href="javascript:;"  v-bind:class="{active:isActivea}" @click="first">{{province}}</a>
              <a href="javascript:;" v-bind:class="{active:isActiveb}" @click="second">{{letter}}</a>
              <a href="javascript:;" v-bind:class="{active:isActivec}" @click="third">{{mixy}}</a>
              <a href="javascript:;" v-bind:class="{active:isActived}" @click="four">{{mixe}}</a>
              <a href="javascript:;" v-bind:class="{active:isActivee}" @click="five">{{mixs}}</a>
              <a href="javascript:;" v-bind:class="{active:isActivef}" @click="six">{{mixf}}</a>
              <a href="javascript:;" v-bind:class="{active:isActiveg}" @click="seven">{{mixw}}</a>-->
            </div>
            <div class="btns-group">
              <span @click="cancelKeyboard" style="line-height: 40px">取消</span>
              <span @click="confirm" style="line-height: 40px">确定</span>
            </div>
          </div>
          <div style="display: none">后面5位不能全字母</div>
        </div>

        <div class="keyboard-body">
          <!-- 省、直辖市 -->
          <div class="firstWord">
            <div class="keyboard-content province" style="display: none" v-show="pro">
              <a href="javascript:;" @click="cliProvince(item)" v-for="item in aTagTextA">{{item.name}}</a>
            </div>
          </div>
          <!-- 字母 -->
          <div class="secondWord">
            <div class="keyboard-content letter letters" style="display: none" v-show="lett">
              <a href="javascript:;" @click="cliLetter(value)" v-for="value in aTagTextB">{{value}}</a>
            </div>
          </div>
          <!-- 字母、数字 -->
          <div class="thirdWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnuma">
              <a href="javascript:;" @click="cliMixeda(value)" v-for="value in aTagTextC">{{value}}</a>
            </div>
          </div>
          <div class="fourWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumb">
              <a href="javascript:;" @click="cliMixedb(value)" v-for="value in aTagTextD">{{value}}</a>
            </div>
          </div>
          <div class="fiveWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumc">
              <a href="javascript:;" @click="cliMixedc(value)" v-for="value in aTagTextE">{{value}}</a>
            </div>
          </div>
          <div class="sixWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumd">
              <a href="javascript:;" @click="cliMixedd(value)" v-for="value in aTagTextF">{{value}}</a>
            </div>
          </div>
          <div class="sevenWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnume">
              <a href="javascript:;" @click="cliMixede(value)" v-for="value in aTagTextG">{{value}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modalAdd">
      <Modal v-model="modal1" width="360" :closable="false" @on-ok="ok">

        <div class="form-group">
          <label class="parkText">选择车位型号</label>
          <div class="col-sm-10">
            <Select v-model="model13" filterable placeholder="请选择车位型号" @on-change="carType">
              <Option v-for="item in carTypes" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>

      </Modal>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        model12: '',modal1:true,park:'',carTypes:[{value:0,label:'小'},{value:1,label:'中'},
          {value:2,label:'大'}],model12:'',model13:'',addC:true,
        total:false, pro:false, lett:false, lettnuma:false, lettnumb:false, lettnumc:false, lettnumd:false,
        lettnume:false, modal1:false, show:false, listsPp:[], province:'', letter:'',mixy:'',
        mixe:'', mixs:'', mixf:'', mixw:'', isActivea:false,isActiveb:false,isActivec:false,isActived:false,
        isActivee:false,isActivef:false,isActiveg:false,priv:false,pub:false,carKind:1,carId:'',carNamea:'',
        aTagTextA:[
          {name:'京'}, {name:'津'}, {name:'冀'}, {name:'蒙'}, {name:'辽'}, {name:'吉'}, {name:'黑'}, {name:'沪'},
          {name:'苏'}, {name:'浙'}, {name:'皖'}, {name:'闽'}, {name:'赣'}, {name:'豫'}, {name:'鄂'}, {name:'湘'},
          {name:'粤'}, {name:'桂'}, {name:'渝'}, {name:'川'}, {name:'贵'}, {name:'云'}, {name:'藏'}, {name:'陕'},
          {name:'甘'}, {name:'宁'}, {name:'晋'}, {name:'青'}, {name:'琼'}, {name:'新'}, {name:'港'}, {name:'澳'}, {name:'台'},
        ],
        aTagTextB: {
        a:'Q', b:'W', c:'E', d:'R', e:'T', f:'Y', g:'U', h:'P', i:'A',
        j:'S', k:'D', l:'F', m:'G', n:'H', o:'J', p:'K', q:'L', r:'Z',
        s:'X', t:'C', u:'V', v:'B', w:'N', x:'M'},
        aTagTextC: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
        a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
    : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
    : '学'},
        aTagTextD: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextE: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextF: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextG: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},userid:''
      }
    },
    created(){
    	this.userid=localStorage.getItem('userid')
        this.$http({ //获取已建的车辆
          method:'POST',
          "url":'http://prod20.yc-yunpass.com:8080/park/getMyCarList',
          "data":{user_id:this.userid},
          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
        }).then(res=>{ 
        	console.log(res.data.data)
          this.listsPp=res.data.data;
        })

    },

    methods:{
      carType(val) {
        this.carKind = val
        console.log(val)
      },
      cancel(){
        this.total=false
      },

      confirm () { //创建车辆
      	
      	this.userid=localStorage.getItem('userid')
        var carNumber = this.province+this.letter+this.mixy+this.mixe+this.mixs+this.mixf+this.mixw;
//        var cd = localStorage.getItem('userid')
				var reg = /^[A-Z]+$/;
				var str = this.mixy + this.mixe + this.mixs + this.mixf + this.mixw;
				
				if (carNumber.length === 7 && !reg.test(str)) {
					this.$http({
			          method:'POST',
			          data:{
			          "user_id":this.userid,
			          "plate_number":carNumber,
			          "car_size_type":this.carKind
			          },
			          url:'http://prod20.yc-yunpass.com:8080/park/addMyCar',
			          headers:{
			          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
			        }).then(res=>{
			          if(res.data.code==1){
			            this.carId=res.data.data.car_id;//车牌号id
			            var allWords = {
			              plate_number: this.province + this.letter + this.mixy + this.mixe + this.mixs + this.mixf + this.mixw,
			              state: 2
			            };	            
			            this.listsPp.unshift(allWords)
			            alert('添加车辆成功')
			            this.addC=true
			          this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw='';
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;  
				      	this.total = false;
				      	this.lettnume = false
			            for (var i = 0; i < this.listsPp.length; i++) {
			              if (this.listsPp[i].state == 2) {
			                this.show = true
			              }
			            }
			          }
			        })
		      	}if(reg.test(str)){
				    this.$Message.warning('车牌后五位不能全部为字母')
						}
      },
      delCar(index,list){//删除车位
      	this.userid=localStorage.getItem('userid')
        this.$Modal.confirm({
          title: '',
          content: '<p style="font-size: 16px;">确定删除该车牌?</p>',
          onOk: () => {
          	for(var i =0;i<this.listsPp.length;i++){
          		this.$http({
          		method:'POST',
          		url:'http://prod20.yc-yunpass.com:8080/park/removeMyCar',
          		data:{car_id:list.car_id,user_id:this.userid},//获取当前点击的car_id
          		headers:{
          		"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
          	}).then(res=>{
          		console.log(res)
          		var allWords = {plate_number:this.province+this.letter+'.'+this.mixy+this.mixe+this.mixs+this.mixf+this.mixw ,state:2}
            	this.listsPp.splice(index,1)
            	alert('删除车辆成功')
          	})
          	}
          }
        })
      },
      goSelect(){

      },
      addCar(){
        this.modal1=true;
      },
      ok(){ // 弹出键盘
        this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw=''; //消除字符
        this.total=true;this.pro=true;this.lett=false      //字母键盘
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
      },
      cancelKeyboard () {
      	this.total=false;
        this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw='';
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
      },
      first(){
      	if(this.model13!=''){
      		this.total=true;this.pro=true;this.lett=false;this.addC=false;
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=true;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;	
      	}
        
        
      },
      second(){
        this.total=true;this.lett=true;this.pro=false;
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=true;
        this.isActived=false;this.isActivec=false;
      },
      third(){
        this.total=true
        this.lettnuma=true  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.pro=false
        this.lett=false
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=true;
      },
      four(){
        this.total=true
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=true  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.pro=false
        this.lett=false
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=true;this.isActivec=false;
      },
      five(){
        this.total=true
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=true  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.pro=false
        this.lett=false
        this.isActivee=true;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
      },
      six(){
        this.total=true
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=true  //字母混合键盘
        this.lettnume=false  //字母混合键盘
        this.pro=false
        this.lett=false
        this.isActivee=false;this.isActivef=true;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
      },
      seven(){
        this.total=true
        this.lettnuma=false  //字母混合键盘
        this.lettnumb=false  //字母混合键盘
        this.lettnumc=false  //字母混合键盘
        this.lettnumd=false  //字母混合键盘
        this.lettnume=true  //字母混合键盘
        this.pro=false
        this.lett=false
        this.isActivee=false;this.isActivef=false;this.isActiveg=true;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
      },
      cliProvince(item){
        this.province = item.name;//获取第1个框的值
        this.pro=false;this.lett=true;this.isActiveb=false;this.isActivea=true;
      },
      cliLetter(item){
        this.letter = item;//获取第2个框的值
        this.pro=false;this.lett=false;this.lettnuma=true;this.isActivea=false;this.isActiveb=false;
        this.isActivec=true;
      },
      cliMixeda(item){
        this.mixy=item;//获取第3个框的值
        console.log(this.mixy)
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=true;
        this.isActivea=false;
        this.isActiveb=false;this.isActivec=false;this.isActived=true;
      },
      cliMixedb(item){
        this.mixe=item;//获取第4个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=true;
       this.isActivea=false;this.isActivec=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=true;
      },
      cliMixedc(item){
        this.mixs=item;//获取第5个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=false;
        this.lettnumd=true;this.lettnume=false;this.isActivea=false;this.isActivec=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=false;this.isActivef=true
      },
      cliMixedd(item){
        this.mixf=item;//获取第6个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=false;
        this.lettnumd=false;this.lettnume=true;this.isActivea=false;this.isActivec=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=false;this.isActivef=false;this.isActiveg=true
      },
      cliMixede(item){
        this.mixw=item; //获取第7个框的值
      }
    }
  }
</script>
