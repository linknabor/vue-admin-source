<template>
	<div class="form-con">
        <Form ref="mima" :model="formmima" :rules="rules">
            <FormItem  prop="userName">
                <Input  v-model="formmima.userName" placeholder="请输入用户名">
                    <span slot="prepend">
                        <Icon :size="18" type="ios-person"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem  prop="password">
                <Input type="password" v-model="formmima.password" placeholder="请输入密码">
                	<span slot="prepend">
                        <Icon :size="16" type="md-lock"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem prop="identifyNumber">
                <Input  v-model="formmima.identifyNumber" size="large" placeholder="请输入验证码" style="width: 55%;"></Input>
                <div class="code" @click="refreshCode" style="display: inline-block;">
                	<img id="code" :src="url" ref="imag" />
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit" style="width:100%" long>登录</Button>
            </FormItem>
        </Form>    
    </div>
</template>

<script>	
	export default{
		name:'mima',
		props:{
			userNameRules: {
			    type: Array,
			    default: () => {
			        return [
			          	{ required: true, message: '账号不能为空', trigger: 'blur' }
			        ]
			    }
			},
		    passwordRules: {
		      	type: Array,
		      	default: () => {
			        return [
			          	{ required: true, message: '密码不能为空', trigger: 'blur' }
			        ]
		      	}
		    },
		    identifyNumberRules: {
		      	type: Array,
		      	default: () => {
			        return [
			          	{ required: true, message: '验证码不能为空', trigger: 'blur' }
			        ]
		      	}
		    },
		},
		data(){						
			return{
				url:"/msa/sso/getCode",
				formmima: {
                    userName: 'xiao',
                    password: '',
                    identifyNumber:''                  
                }
			}
		},
		computed:{
			rules () {
				return {
					userName:this.userNameRules,
					password:this.passwordRules,
					identifyNumber:this.identifyNumberRules
				}
			}
		},
		methods:{
			handleSubmit () {
				console.log(1)
				this.$refs.mima.validate((valid)=>{
					console.log(2)
					if(valid){
						console.log(3)
						this.$emit('on-success-mima',{
							userName:this.formmima.userName,
							password:this.formmima.password,
							code:this.formmima.identifyNumber
						})
					}
				})
			},
			refreshCode() {
                let imgurl = '/msa/sso/getCode';
                let timestamp = (new Date().valueOf());
                this.url = imgurl+"?time="+timestamp;               
			}, 
			babaCode(){
				let imgurl = '/msa/sso/getCode';
                let timestamp = (new Date().valueOf());
                this.url = imgurl+"?time="+timestamp;   
			},
			co(){
				console.log(2222)
			} 
		}
	}
</script>