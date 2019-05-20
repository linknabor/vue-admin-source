
<template>
	<div style="width:100%;">
		<Row>
	        <Col span="24">
	        	<h1 style="text-align: center;">用户注册审核</h1>
	        	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
	        		<FormItem label="企业所属行业:" prop="industry" class="mb15">
			            <Select v-model="formValidate.industry" prop="industry" class="w200">
			            	<Option v-for="item in industryList" :value="item.value" :key="item.value">{{item.value}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="企业归属地区:" prop="area" class="mb15">
			        	<Cascader :data="areaList" change-on-select class="w200"></Cascader>
			        </FormItem>
			        <FormItem label="归属环境:" prop="environment" class="mb15">
			            <Select v-model="formValidate.environment"  class="w200">
			            	<Option v-for="item in environmentList" :value="item.value" :key="item.value">{{item.value}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="用户名称:" prop="userName" class="mb15 w35 fl">
			            <Input v-model="formValidate.userName" placeholder="上海奈博信息科技有限公司" class="w200"></Input>
			        </FormItem>
			        <FormItem label="登录名:" prop="loginName" class="mb15 w65 fl">
			            <Input v-model="formValidate.loginName" placeholder="傻 逼" class="w200"></Input>
			        </FormItem>
			        <FormItem label="联系人:" prop="contacts" class="mb15 w35 fl">
			            <Input v-model="formValidate.contacts" placeholder="唐勇" class="w200"></Input>
			        </FormItem>
			        <FormItem label="联系电话:" prop="tel" class="mb15 w65 fl">
			            <Input v-model="formValidate.tel" placeholder="18812344321" class="w200"></Input>
			        </FormItem>
			        <FormItem label="E-mail:" prop="mail"  class="mb15 w35 fl">
			            <Input v-model="formValidate.mail" placeholder="123@163.com" class="w200"></Input>
			        </FormItem>
			        <FormItem label="联系地址:" prop="addr" class="mb15 w65 fl">
			            <Input v-model="formValidate.addr" placeholder="三林路128号" class="w200"></Input>
			        </FormItem>
			        <FormItem label="邮政编码:" prop="postcode" class="mb15 w35 fl">
			            <Input v-model="formValidate.postcode" placeholder="201206" class="w200"></Input>
			        </FormItem>
			        <FormItem label="项目数:" prop="projectNumber" class="mb15 w65 fl">
			            <Input v-model="formValidate.projectNumber" placeholder="999" class="w200"></Input>
			        </FormItem>
			        <FormItem label="用户数:" prop="userNumber" class="mb15 w35 fl">
			            <Input v-model="formValidate.userNumber" placeholder="999" class="w200"></Input>
			        </FormItem>
			        <FormItem label="开始使用日期" class="mb15 w35 fl">
			            <Row>
			                <Col span="11">
			                    <FormItem prop="date">
			                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date" class="w200"></DatePicker>
			                    </FormItem>
			                </Col>
			            </Row>
			        </FormItem>
			        <FormItem label="初始发票数:" prop="invoiceNumber" class="mb15 w35 fl">
			            <Input v-model="formValidate.invoiceNumber" placeholder="999" class="w200"></Input>
			        </FormItem>
			        <FormItem style="width: 100%;" class="clear">
			            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
			            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
			        </FormItem>
			    </Form>
	        </Col>
	    </Row>
	</div>
</template>
<script>
    export default {
        name:'zhuce',
        data(){
        	return{
        		formValidate: {	  
        			industry: '',  //行业
        			area:'',   //地区
        			environment: '', //环境
        			userName: '', //用户名
        			loginName: '', //登录名
        			contacts: '', //联系人
        			tel: '', //联系电话
                    mail: '', //邮箱
                    addr: '', //联系地址
                    postcode: '',  //邮政编码
                    projectNumber: '', //项目数
                    userNumber: '', //用户数
                    date: '', //使用日期
                    invoiceNumber: '', //初始发票数                   
                },
                areaList: [
                	{
                    	value: 'beijing',
                    	label: '北京',
                    	children: [
	                        {
	                            value: 'gugong',
	                            label: '故宫'
	                        },
	                        {
	                            value: 'tiantan',
	                            label: '天坛'
	                        },
	                        {
	                            value: 'wangfujing',
	                            label: '王府井'
	                        }
                    	]
	                }, 
	                {
	                    value: 'jiangsu',
	                    label: '江苏',
	                    children: [
	                        {
	                            value: 'nanjing',
	                            label: '南京',
	                            children: [
	                                {
	                                    value: 'fuzimiao',
	                                    label: '夫子庙',
	                                }
	                            ]
	                        },
	                        {
	                            value: 'suzhou',
	                            label: '苏州',
	                            children: [
	                                {
	                                    value: 'zhuozhengyuan',
	                                    label: '拙政园',
	                                },
	                                {
	                                    value: 'shizilin',
	                                    label: '狮子林',
	                                }
	                            ]
	                        }
	                    ],
	                }
	            ],
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                },
                industryList: [
                    { value: '建筑' },
                    { value: '互联网' },
                    { value: '金融' }
                ],
                environmentList:[
                	{ value: '线上' },
                	{ value: '线下' }
                ]
        	}
		},
		created(){
			this.getid();
		},
        methods: {
			getid(){
				this.id = this.getUrlParam('id');
				console.log(this.id);
			},
			getUrlParam (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg);  //匹配目标参数
				if (r != null) return unescape(r[2]); return null; //返回参数值
			},
            handleSubmit (name) {
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.$Message.success('Success!');
                //     } else {
                //         this.$Message.error('Fail!');
                //     }
				// })
				this.$router.push({
					name:'shenhe'
				})
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style>
	.clear{clear:both}
	.mb15{margin-bottom: 15px;}
	.fl{float: left;}
	.w35{width: 35%;}
	.w65{width: 65%;}
	.w200{width: 200px;}
</style>