<style scoped>
    html{height:100%;width: 100%;}
    .box{height:100%;width: 96%;margin: auto;}
</style>
<template>
    <div class="box">
        <Button to="/vote_word" size="large">新建</Button>
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:10px;">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
            prop="name"
            label="标题"
            width="250">
            </el-table-column>
            <el-table-column
            prop="start_time"
            label="创建时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="end_time"
            label="失效时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="state"
            label="状态"
            width="100">
                <template slot-scope="scope">
                    <i-switch size="large">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </i-switch>
                </template>
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                    <el-button @click="clickEdit(scope.row)" type="warning" size="small">编辑</el-button> 
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: '欠费调研1',
                    num: 20,
                    state: "1",
                    id: 1
                }, 
                {
                    date: '2016-05-02',
                    name: '欠费调研2',
                    num: 200,
                    state: '0',
                    id: 2
                }, 
                {
                    date: '2016-05-04',
                    name: '欠费调研3',
                    num: 2000,
                    state: '1',
                    id: 3
                }
            ]
        };
    },

    components: {},

    computed: {},

    mounted(){},

    methods: {
        handleClick(row) {
            this.$router.push({
                path: '/vote_detail',
                query: {
                    id: row.id
                }
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