<template> 
  <div>
    <div class="search">
      <h1 style="text-align:center"><Icon type="logo-apple" />角色管理</h1>
      <Row style="padding-top:10px;">
        <Col span="24" style="padding-left:20px;">
          <span>角色编码:</span>
          <Input type="text" v-model="bianma" style="width: 120px;"/>
          &nbsp;         
          <span>角色名称:</span>
          <Input type="text" v-model="mingcheng" style="width: 120px;"/>
          &nbsp;
          <Button icon="ios-search" type="primary" size="large" @click="handleSearch"></Button>
          &nbsp;
          <Button @click="handleCancel" type="primary" size="large">重置</Button>
        </Col>
      </Row>
      <Row style="padding:5px 20px">
        <Col span="24">
          <Button size="large" @click="addRow">新增</Button>
          <Modal v-model="showRole" title="新增角色信息"  @on-ok="addRole">
            <!-- <Row>
              <Col span="4" offset="2">
                <span class="addleft" style="height:32px;line-height:32px;">角色编码:</span>
              </Col>
              <Col span="10">
                <Input class="line-block" v-model="addId"></Input>
              </Col>
            </Row>
            <br> -->
            <Row>
              <Col span="4" offset="2">
                <span class="addleft" style="height:32px;line-height:32px;">角色名称:</span>
              </Col>
              <Col span="10">
                <Input class="line-block" v-model="addName"></Input>
              </Col>
            </Row>
            <br>
            <!-- <Row>
              <Col span="4" offset="2">
                <span class="addleft">创建日期:</span>
              </Col>
              <Col span="10">
                <DatePicker v-model="addDate" type="date" placeholder="选择日期" style="width: 200px" @on-change="addChangeDate"></DatePicker>      
              </Col>
            </Row> -->
          </Modal>
        </Col>
      </Row>
    </div>
    
    <Row>
      <Col span="24">
        <Card>
          <div class="editable-con-1">
            <Table :columns="columnsList" :data="data1">             
            </Table>
            <Modal
              v-model="editRole"
              title="编辑角色"
              @on-ok="editRoleOk"
              >
              <Row>
                <Col span="4" offset="2">
                  <span class="addleft" style="height:32px;line-height:32px;">角色编码:</span>
                </Col>
                <Col span="10">
                  <span class="addleft">{{editId}}</span>
                </Col>
              </Row>
              <br>
              <Row>
                <Col span="4" offset="2">
                  <span class="addleft" style="height:32px;line-height:32px;">角色名称:</span>
                </Col>
                <Col span="10">
                  <Input class="line-block" :placeholder="editName" v-model="editNameNew"></Input>
                </Col>
              </Row>
              <br>
              <Row>
                <Col span="4" offset="2">
                  <span class="addleft">创建日期:</span>
                </Col>
                <Col span="10">
                  <DatePicker v-model="addDate" type="date" placeholder="选择日期" style="width: 200px" @on-change="addChangeDate"></DatePicker>      
                </Col>
              </Row>
            </Modal>
            <Modal
              v-model="allocationRole"
              title="分配菜单"
              >
              <Row>
                <Col span="4" offset="2">
                  <span class="addleft">角色编码:</span>
                </Col>
                <Col span="4">
                  <span class="addleft"><strong>{{allocationId}}</strong></span>
                </Col>
                <Col span="4">
                  <span class="addleft">角色名称:</span>
                </Col>
                <Col span="4">
                  <span class="addleft"><strong>{{allocationName}}</strong></span>
                </Col>
              </Row>
              <hr>
              <Tree :data="treeData" show-checkbox multiple></Tree>
            </Modal>
          </div>
        </Card>
      </Col>
    </Row>
  </div>  
</template>

<script>
  // import * as tabdata from './data';
  
  export default{
    name:'home',
    data(){
      return{
        columnsList:[
          {
              type: 'index',
              title:'排序',
              width: 60,
              align: 'center'
          },
          {
            title:'角色编码',
            key:'roleId',
            width:100,
            align:'center'
            
          },
          {
            title:'角色名称',
            align:'center',
            key:'roleName',
            editable:true,          
          },
          {
            title:'创建人员',
            align:'center',
            key:'name',
            editable:true,
            
          },
          {
            title:"创建日期",
            align:'center',
            key:'date',
            editable:true,
            
          },
          {
            title:'操作',
            align:'center',
            width:300,
            key:'handle',
            handle:['编辑','分配菜单'],
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                  props:{
                    type:'info',
                    size:'default'
                  },
                  style:{
                    marginRight:'10px'
                  },
                  on:{
                    click:()=>{
                      this.editOpen(params.row);
                    }
                  }
                },'编辑'),
                
                h('Button',{              
                  props:{
                    type:'success',
                    size:'default'
                  },
                  on:{
                    click:()=>{
                      this.allocation(params.row)
                    }
                  }
                },'分配菜单'),            
              ])
            }
          }       
        ],
        treeData: [
            {
                title: 'parent 1',
                expand: true,
                selected: true,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                disabled: true
                            },
                            {
                                title: 'leaf 1-1-2'
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                checked: true
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'parent 1',
                expand: true,
                selected: true,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                disabled: true
                            },
                            {
                                title: 'leaf 1-1-2'
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                checked: true
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                    }
                ]
            }
        ],
        data1:[],     //角色数据
        bianma:'',    //search 编码
        mingcheng:'', //search 名称
        showRole:false, //显示添加角色弹窗
        addId:'',     //新增角色Id
        addName:'',   //新增角色名称
        addDate:'',   //新增角色时间
        editRole:false, //显示编辑角色
        allocationRole:false, //显示分配菜单
        editId:'',  //编辑角色的ID
        editName:'', //编辑角色的名称
        editNameNew:'',
        editindex:'',
        allocationRole:false,//显示分配角色
        allocationIndex:'',
        allocationId:'',
        allocationName:'',
        date1:'',
        
      }
    },
    created(){
      this.init();
      // this.handlePage(); 
    },
    methods:{
      
      //获取所有角色信息
      init(){
        this.$axios({
          url:'/msa/sso/role/getAllRole',
          method:'get',         
        }).then((res) =>{
          const data = res.data;
          this.data1=data;
        }).catch(err=>{
          console.log(err);
        });                   
      },
      handleCancel(){
          this.bianma = '';
          this.mingcheng = '';
      },
      //搜索用户角色
      handleSearch(){
          console.log(this.bianma);
          console.log(this.mingcheng);
          console.log(typeof(this.mingcheng));
          let url = '/msa/sso/role/searchRole';
          this.$axios({
              url:url,
              method:'get',
              // headers:{
              // 	'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
              // },
              params :{
                roleId : this.bianma!=''?parseInt(this.bianma):'',
                roleName : this.mingcheng
              }
          })
          .then(res=>{
              console.log(res.data)
              this.data1 = res.data;
          })
          .catch(err=>{

          })           
      },
      //新增角色画面显示
      addRow(){
        this.showRole=true;
      },
      addChangeDate(date){
        this.addDate = date;
        console.log(this.addDate);
      },
      // 新增角色接口
      addRole(){
        console.log(this.addId);
        console.log(this.addName);
        console.log(this.addDate);
        let url = '/msa/sso/role/saveRole';
        this.$axios({
          url:url,
          method:'post',
          data:{
            roleId:this.addId,
            roleName: this.addName            
          }
        }).then(res=>{
          console.log(res.data);
        }).catch(err=>{
          console.log(err)
        })
      },
      //编辑当前角色信息
      editOpen(indexRole){
        console.log(indexRole);
        this.editRole = true;
        this.editindex = indexRole;
        this.editId = indexRole.roleId;
        this.editName = indexRole.roleName;        
      },
      //编辑角色确定
      editRoleOk(){
        this.editId = this.editindex.roleId;
        this.editName = this.editindex.roleName;
        this.$axios({
          url:'/msa/sso/role/saveRole',
          method:'post',
          data:{
            roleId:this.editId,
            roleName:this.editNameNew
          }
        }).then(res=>{
          console.log(res.data)
          if(res.data.success == true){
            this.$Message.config({
              top :200,
              duration:2,
              content:res.data.message
            });
            this.init();
          } else {
            this.$Message.success(res.data.message);
          } 
        }).catch(err=>{
          console.log(err);
        })
      },
      changeData(qq){
        qq.forEach((item)=>{
            item.children=item.ssoMenuList
            item.title=item.menuName
            item.expand=true
            delete item.ssoMenuList
            if(item.children!=null){
              this.changeData(item.children)
            }            
        })
      },
      //分配角色菜单
      allocation(index){
        console.log(index);
        this.allocationRole = true;
        this.allocationIndex = index;
        this.allocationId = index.roleId;
        this.allocationName = index.roleName;
        this.$axios({
          url:'/msa/sso/menu/getAllRoleMenuByRoleId',
          method:'get',
          params:{
            roleId:1
          }
        }).then(res=>{
          console.log(res.data)
          // this.treeData = res.data;
          let qa = res.data;
          this.changeData(qa);
          this.treeData = qa;
          console.log(qa);
        }).catch(err=>{
          console.log(err)
        })
        // console.log(this.data1[index])
        // this.data1.splice(index,1);
        // this.$axios({
        //   url:'/msa/sso/role/deleteRole',
        //   method:'post',
        //   params:{
        //     roleId:4
        //   }
        // })
        // .then((res) =>{
        //   console.log(res.data);
        // })
        // .catch(err=>{
        //   console.log(err)
        // })        
      },
      
      
    },
    
 
  }
</script>

<style>
.ivu-btn-icon-only.ivu-btn-large{
  padding: 4px 30px;
  font-size:14px;
  border-radius:4px;
}
.ivu-btn-large {
    padding: 4px 23px;
    font-size: 14px;
    border-radius: 4px;
    }
.ivu-table th {
   background-color:#4d90fe;
   color: white;
   border-right:1px solid white;
}
.ivu-col-span-18 {
    display: block;
    width: 75%;
    padding: 10px 0;
}
.ivu-col-span-6 {
    padding: 10px 0;
  }  
.addleft{height: 32px;line-height: 32px;text-align: center}  
</style>