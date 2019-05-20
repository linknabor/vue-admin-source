<style lang="less">
  @import './login.less';
</style>
<template>
    <div id="app" class="login">
  	    <div class="login-con">
            <Card :bordered="false">  
  		          <Tabs value="name1">
  			            <TabPane label="密码登录" name="name1">
  	                    <mima @on-success-mima="handleSubmit" ref="mima"></mima>
                    </TabPane>
     		            <TabPane label="手机登录" name="name2" style="float: right;">
  	                    <phone :rules="rules1"></phone>
                    </TabPane>
                </Tabs>     
            </Card>
        </div>
    </div>
</template>

<script>
	  import Cookies from 'js-cookie';
	  import phone from '_c/phone'
    import mima from '_c/mima'
    import { mapActions } from 'vuex'
    export default {
        data () {
          return {
            rules1:{
                type:Array
              },
            }
        },
        created(){
          // console.log(document.cookie.SESSION)
        },
 	      components:{
            mima,
            phone
 	      },
        methods: {
            ...mapActions([
              'handleLogin',
              'getUserInfo'
              // 'getloginCode'
            ]),
            handleSubmit({userName,password,code}){
              this.handleLogin({userName,password,code}).then(res=>{
                // const sessionId = res.result.sessionId;
                // const token = res.result.token;
                // console.log(sessionId)
                // this.getUserInfo().then(res=>{
                  // console.lof(res.result);
                  console.log(res);
                  if(res.success==false){
                    alert(res.message);
                    this.$refs.mima.refreshCode();
                    return
                  }
                  this.$router.push({
                   path: '/vote_list',
                   query:{
                     sessionId:res.result.sessionId,
                     token:res.result.token
                   }
                  })
                // })
              }).catch(err=>{
                
              })
            }
        },   
    }
</script>

<style>

</style>