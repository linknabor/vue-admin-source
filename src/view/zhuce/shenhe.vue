<template>
   <div class="shenhe">
        <div>
            <h1>用户注册复核</h1>
            <br>
            <Row class="row">
                <Col span="4">企业行业:</Col>
                <Col span="6">互联网金融</Col>
            </Row>            
            <Row class="row">
                <Col span="4">企业归属城市:</Col>
                <Col span="6">上海</Col>
                <Col span="4">归属环境:</Col>
                <Col span="6">线上</Col>
            </Row>
            <Row class="row">
                <Col span="4">用户名称：</Col>
                <Col span="6">呵呵</Col>
                <Col span="4">关联营销的客户：</Col>
                <Col span="6">
                    <span @click="choose()" style="color:blue;text-decoration:underline">选择</span>
                    <Modal
                        v-model="userSearch"
                        width="800"
                        height="600"
                        >
                        <Row style="padding-left:20px;">
                            <Col span="24">
                                <h2 style="text-align:center">客户信息列表</h2>
                                <div class="search">                                                            
                                    <span>客户名称:</span>
                                    <Input type="text" v-model="userName" style="width: 200px;"></Input>
                                    &nbsp;&nbsp;
                                    <span>客户地址:</span>
                                    <Input type="text" v-model="userAddr" style="width: 200px;"></Input>
                                    &nbsp;
                                    <Button icon="ios-search" type="primary" size="large" @click="search"></Button>
                                    &nbsp;
                                    <Button size="large" @click="handleCancel">取消</Button></br>                           
                                </div>
                            </Col>
                        </Row>
                        <br>
                        <Row>
                            <Col span="24">
                                <Table  highlight-row ref="currentRowTable" :columns="columns3" :data="data1" @on-row-click="clickme(index)"></Table>
                                <!-- <Button @click="handleClearCurrentRow">Clear</Button> -->
                            </Col>
                        </Row>
                        <br>
                        <Row>
                            <Col  span="24">
                                <Page :total="data1.length" size="small" :page-size="10" :current.sync="indexPage" show-elevator show-sizer @on-change="changePage"/>
                            </Col>
                        </Row>
                    </Modal>
                </Col>
            </Row>
            <Row class="row">
                <Col span="4">登录名</Col>
                <Col span="6">ty123456</Col>
                <Col span="4">联系人</Col>
                <Col span="6">qa</Col>
            </Row>
            <Row class="row">
                <Col span="4">联系电话</Col>
                <Col span="6">18812344321</Col>
                <Col span="4">E-mail</Col>
                <Col span="6">235@123.com</Col>
            </Row>
            <Row class="row">
                <Col span="4">联系地址</Col>
                <Col span="6">上海三林路</Col>
                <Col span="4">邮政编码</Col>
                <Col span="6">201206</Col>
            </Row>
            <Row class="row">
                <Col span="4">产品版本</Col>
                <Col span="6">标准版</Col>
                <Col span="4">项目数</Col>
                <Col span="6">666</Col>
            </Row>
            <Row class="row">
                <Col span="4">用户数</Col>
                <Col span="6">999</Col>
                <Col span="4">审核操作员</Col>
                <Col span="6">系统管理员</Col>
            </Row>
            <Row class="row">
                <Col span="4">用户注册日期</Col>
                <Col span="6">2018-08-24</Col>
                <Col span="4">开始使用日期</Col>
                <Col span="6">2018-08-09</Col>
            </Row>
            <Row class="row">
                <Col span="4">初始发票数</Col>
                <Col span="6">123</Col>
            </Row>
            <Row>
                <Col span="2" offset="12">
                    <Button type="primary">保存</Button>
                </Col>
                <Col span="2">
                    <Button style="font-weight:600;border:1px solid black;">关闭</Button>
                </Col>
            </Row>
        </div>
   </div> 
</template>

<script>
    export default {
        name:'shenhe',
        created(){
        },
        data(){
            return{
                userSearch:false,
                userName:'',
                userAddr:'',
                searchable:true,
                indexPage:1,
                searchKey: '',
                searchPlace:'top',
                searchValue:'',
                columns3: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        title:'序号'
                    },
                    {
                        title: '客户名称',
                        key: 'name'
                    },
                    {
                        title: '客户地址',
                        key: 'addr'
                    },
                    {
                        title: '资质等级',
                        key: 'zizhi'
                    },
                    {
                        title:'项目总数',
                        key:'num1'
                    },
                    {
                        title:'总户数',
                        key:'num2'
                    },
                    {
                        title:'data',
                        key:'date'
                    }
                ],
                data1: [
                    {
                        name: '光明',
                        addr: '上海市',
                        zizhi: '一级',
                        num1: 11,
                        num2: 6,
                        date: '2016-10-03'
                    },
                    {
                        name: '合协',
                        addr: "浦东新区",
                        zizhi: '二级',
                        num1: 22,
                        num2: 66,
                        date: '2016-10-01'
                    },
                    {
                        name: '东湖',
                        age: 30,
                        addr: '三林路',
                        zizhi: '三级',
                        num1: 33,
                        num2: 666,
                        date: '2016-10-02'
                    },
                    {
                        name: '过佳家',
                        age: 26,
                        addr: '128号',
                        zizhi: '四级',
                        num1: 44,
                        num2: 6666,
                        date: '2016-10-04'
                    },
                    {
                        name: '光明',
                        addr: '上海市',
                        zizhi: '一级',
                        num1: 11,
                        num2: 6,
                        date: '2016-10-03'
                    },
                    {
                        name: '合协',
                        addr: "浦东新区",
                        zizhi: '二级',
                        num1: 22,
                        num2: 66,
                        date: '2016-10-01'
                    },
                    {
                        name: '东湖',
                        age: 30,
                        addr: '三林路',
                        zizhi: '三级',
                        num1: 33,
                        num2: 666,
                        date: '2016-10-02'
                    },
                    {
                        name: '过佳家',
                        age: 26,
                        addr: '128号',
                        zizhi: '四级',
                        num1: 44,
                        num2: 6666,
                        date: '2016-10-04'
                    },
                    {
                        name: '光明',
                        addr: '上海市',
                        zizhi: '一级',
                        num1: 11,
                        num2: 6,
                        date: '2016-10-03'
                    },
                    {
                        name: '合协',
                        addr: "浦东新区",
                        zizhi: '二级',
                        num1: 22,
                        num2: 66,
                        date: '2016-10-01'
                    }
                ],
                data2: [
                    {
                        name: '过佳家',
                        age: 26,
                        addr: '128号',
                        zizhi: '四级',
                        num1: 44,
                        num2: 6666,
                        date: '2016-10-04'
                    }
                ],
                data3: [
                    {
                        name: '光明',
                        addr: '上海市',
                        zizhi: '一级',
                        num1: 11,
                        num2: 6,
                        date: '2016-10-03'
                    }
                ],
            }
        },
        methods:{
            choose(){
                this.userSearch = true;
            },
            handleCancel(){
                this.userName = '';
                this.userAddr = '';
            },
            clickme(index){
                console.log(index)
            },
            changePage(){
                console.log(this.indexPage);
                this.data1 = this.data3;
            },
            search(){
                console.log(this.userName);
                console.log(this.userAddr);
                if (this.userName == '' && this.userAddr == '') this.$Message.info('请输入关键词查找');
                else this.data1 = this.data2;
            },
            handleClearCurrentRow () {
                this.$refs.currentRowTable.clearCurrentRow();
            },
            handleDelete (params) {
                console.log(params)
            },           
            handleClear (e) {
                if (e.target.value === '') this.insideTableData = this.value
            },
            handleSearch () {
                this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
            },
        }
    }
</script>

<style>
    .shenhe{
        padding-left: 30px;
    }
    .row{height:40px;line-height:40px;font-size: 16px;font-weight: bold}
    /* .search{width:600px;background: cyan} */
</style>
