<style scoped>
html{height:100%;width: 100%;}
.box{height:100%;width: 96%;margin: auto;}
</style>

<template>
    <div class="box">
        <Button to="/vote_add" size="large">新建</Button>
        <el-table :data="tableData" border style="width: 100%;margin-top:10px;" v-show="table">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="voteName" label="投票名称" width="200" align="center"></el-table-column>
            <el-table-column prop="votePeople" label="参与人数" width="100" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" width="100" align="center"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="detailClick(scope.row)" type="primary" size="small">详情</el-button>
                    <el-button  @click="deleteClick(scope.row)" type="danger" size="small">删除</el-button>
                    <el-button @click="clickEdit(scope.row)" type="warning" size="small" v-show="scope.row.state=='进行中' ">编辑</el-button> 
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            table:false,
            tableData: [
                {
                    voteName: '22',
                    votePeople:'sdfd',
                    sb:'sb饿了么还不能是个空数组',
                    voteId:''
                }
            ]
        };
    },

    components: {},

    computed: {},
    created(){
        this.listData();
    },
    mounted(){
        
    },

    methods: {
        listData(){
            // var _this = this;
            let qa = new Date();
            console.log(qa);
            this.$axios({
                url: '/msa/ops/voteMng/getVoteMngList',
                method: 'get'
            }).then(res=>{
                // this.table = true;
                // _this.tableData = res.data.list;
                console.log(res.data.list)
                this.tableData = this.qq(res.data.list);
                this.table = true;
                console.log(this.tableData);
                
            }).catch(err=>{
                console.log(err)
            })
        },
        qq(aa){
            aa.forEach(element => {
                console.log(element.voteId);
                let colseData = element.voteCloseDate;
                let closeTime = element.voteCloseTime;
                let df = this.qw(colseData) + ' ' + this.we(closeTime);
                df = df.replace(/-/g, '/');
                let fd = new Date(df);
                fd = fd.getTime();
                let indexTime = new Date().getTime();
                if(fd>indexTime){
                    element.state = '进行中';
                }else{
                    element.state = '已截止';
                }
            });
            return aa;
            // this.tableData = aa;
        },
        qw(setDate){
            let valDate=setDate.substring(0, 4) + "-" + setDate.substring(4, 6) + "-" + setDate.substring(6, 8);
            console.log(valDate);
            return valDate;
        },
        we(setTime){
            let valDate=setTime.substring(0, 2) + ":" + setTime.substring(2, 4) + ":" +setTime.substring(4,6) ;
            console.log(valDate)
            return valDate;
        },
        detailClick(row) {
            this.$router.push({
                path: '/vote_detail',
                query: {
                    id: row.voteId
                }
            })
        },
        deleteClick(row){
            this.$axios({
                url: '/msa/ops/voteMng/deleteVoteMng',
                method: 'get',
                params:{
                    voteId: row.voteId
                }
            }).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },
        clickEdit(row){
            this.$router.push({
                // name: 'vote_edit',
                // params:{
                //     id: row.id
                // }
                path: '/vote_edit',
                query: {
                    id: row.id
                }
            })
        }
    }
}

</script>