<template>
	<div class="form-con">
        <Form ref="formTag" :model="formTag" :rules="rules1">
        	<FormItem  prop="phonenumber">
            	<Input  v-model="formTag.phonenumber" placeholder="请输入手机号">
	            	<span slot="prepend">
	                    <Icon :size="16" type="ios-call"></Icon>
	                </span>
            	</Input>
        	</FormItem>        
	        <FormItem prop="phoneIdent">
	        	<div style="display: inline-block;vertical-align:top">
	        		<Button @click="getCode" :disabled="disabled" class="btn" type="warning">{{btnContent}}</Button>
	        	</div>
	            <Input  v-model="formTag.phoneIdent"  placeholder="请输入手机验证码" style="width: 50%;margin-left: 10px;">	            	
	            </Input>
	        </FormItem>
       
       
	        <FormItem>	     
	            <Button type="primary" @click="phoneSubmit('formTag')" style="width:100%">登录</Button>	           
	        </FormItem>
    	</Form>   
    </div>
</template>
<script>	
	export default{
		name:'phone',
		data(){			
			const phone =(rule,value,callback) =>{
				if(value === ""){
					callback(new Error('请输入手机号'));
					
				}else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
					callback(new Error('请输入正确格式手机号'));
				}
				callback();
			};			
			const ident =(rule,value,callback) =>{
				if(value ===""){
					callback(new Error('请输入验证码'));
				}else if(value!=this.formTag.phoneIdent && value.length!=4){
					callback(new Error('验证码不正确'));
				}
				callback();
			}			
			return{
				formTag:{
					phonenumber:'',
					phoneIdent:''					
				},
				rules1:{
					phonenumber:[{trigger:'blur',validator:phone,required:true}],
					phoneIdent:[{trigger:'blur', validator:ident,required:true}]
				},
				btnContent:'获取验证码',
				disabled:false,
				time:60
			}
		},
		methods:{
			phoneSubmit(name){
				// this.$refs[name].validate((valid) =>{
				// 	if(valid){
				// this.$axios({
				// 	url:'static/data/token.json?phonenumber='+this.formTag.phonenumber,
				// 	method:'get',
				// }).then((res)=>{
				// 	if(res.status===200){
				// 		this.$store.commit('SET_TOKEN',res.data.token);
	   //                 	this.$store.commit('GET_PHONE',res.data.phonenumber);
	   //                 	this.$router.push({name:'main'});
				// 	} 
				// })
				// .catch(function(error){
				// 	console.log(error);
				// })
				// 	}
				// 	else{
				// 		console.log('submit error');
				// 		return false
				// 	}
				// })
			},
			getCode(){
				// if(this.formTag.phonenumber===''){
				// 	this.$Message.warning('手机号未输入');
				// }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.formTag.phonenumber)){
				// 	this.$Message.warning('手机号格式不正确');
				// }
				// else{
				// 	this.timer();
				// 	this.disabled=true;
				// 	var url='static/data/getCode.json=phonenumber='+this.formTag.phonenumber;
				// 	this.$axios.get(url).then(res=>{
				// 		const result=res.data;
				// 		console.log(result);
				// 		if(result){
				// 			if(result.code===0){
				// 				this.$Message.success('获取验证码成功');
				// 			}else{
				// 				this.$Message.error('获取验证码失败');
				// 			}
				// 		}
				// 	})
				// }			
			},
	     	timer(){
	      		// if(this.time>0){
		      	// 	this.btnContent=this.time+'s后重新获取';
		      	// 	this.time--;
		      	// 	setTimeout(this.timer,1000);
	      		// }else{
		      	// 	this.time=0;
		      	// 	this.btnContent="获取验证码";
		      	// 	this.disabled=false;
	      		// }
	    	},
		}
	}
</script>