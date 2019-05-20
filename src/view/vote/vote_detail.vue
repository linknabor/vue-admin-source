<style scoped>
    html{height:100%;width: 100%;}
    .box{height:100%;width: 96%;margin: auto;padding-top:20px;padding-left:30px;font-weight: 600;}
    /* .row_style{margin-bottom: 20px;} */
    .row_style{margin-bottom: 20px;height: 32px;line-height: 32px;}
    .content{border:1px solid #ccc;padding: 20px 30px;}
</style>
<template>
    <div class="box">
        <Row class="row_style">
            <Col span="3">
                <span>投票名称:</span>
            </Col>
            <Col span="9">
                <span>{{data.voteName}}</span>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票截止日期:</span>
            </Col>
            <Col span="9">
                <span>{{data.closeDateTime}}</span>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票标题:</span>
            </Col>
            <Col span="9">
                <span>{{data.voteTitle}}</span>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>选择方式:</span>
            </Col>
            <Col span="9">
                <span>{{data.voteMode}}</span>
            </Col>
        </Row>
        <h2>投票详情</h2>
        <div style="margin-top:20px;margin-left:30px;">

            <!-- <Checkbox v-model="all" style="width:60px" @on-change="allRadio">全部</Checkbox> -->
            <!-- <Radio v-model="all" style="width:60px" @click="allRadio">全部</Radio> -->
            <RadioGroup v-for="item in radioList" :key="item.value" v-model="radio" @on-change="changeChoose(item)">
                <Radio :label="item.label" style="width:100px" type="checked">
                    <Icon type="social-apple"></Icon>
                    <span>{{item.label}}</span>
                </Radio>
            </RadioGroup>
        </div>
        <dir class="content">
            <div v-for="(item,index) in voteCountAndOptionVo.voteOptionVoList">
                <Row class="row_style">
                    <Col span="3">
                        <span>{{item.voteOptionName}}：</span>
                    </Col>
                    <Col span="10" offset="1">
                        <Progress :percent="item.per" status="active"/>
                    </Col>
                    <Col span="2" offset="1">
                        <span>{{item.voteCount}}票</span>
                    </Col>
                </Row>    
            </div>
        </dir>
    </div>
</template>

<script>
export default {
    data () {
        return {
            all:false,
            id:this.$route.query.id,
            data:{
                voteName: '欠费调研1',
                closeDateTime: '',
                voteTitle: '投票标题:',
                voteMode: ''
            },
            radio: '全部',
            radioList:[
                
            ],
            voteCountAndOptionVo:{
                totalVote: 100,
                voteOptionVoList:[
                    {
                        voteOptionName: '',
                        voteCount: '',
                        voteOptionId: ''
                    }
                ]
            }
        };
    },
    watch:{

    },  
    components: {},

    computed: {

    },
    created(){
        this.detailData()  
        this.voteList();
    },
    mounted(){

    },

    methods: {
        detailData(){
            this.$axios({
                url: '/msa/ops/voteMng/getVoteMngDetail',
                method: 'get',
                params:{
                    voteId: this.id
                }
            }).then(res=>{
                console.log(res.data);
                
                this.data = res.data.voteMng;
                let closeDate = res.data.voteMng.voteCloseDate;
                let closeTime = res.data.voteMng.voteCloseTime;
                let closeDateTime = this.qw(closeDate) + '   ' + this.we(closeTime);
                this.data.closeDateTime = closeDateTime;
                if(this.data.voteMode == "A"){
                    this.data.voteMode = "单选";
                }else if(this.data.voteMode == "B"){
                    this.data.voteMode = "多选";
                }else{
                    this.data.voteMode = this.data.voteMode + '选';
                }

                this.radioList = res.data.voteReleaseList;
                this.radioList.forEach(function(item){
                    item.label = item.releaseTitle;
                });
                this.radioList.unshift({
                    label:"全部",
                    releaseId:''
                })
                this.voteCountAndOptionVo = res.data.voteCountAndOptionVo;
                
                this.voteList();
            }).catch(err=>{
                console.log(err)
            })
        },
        qw(setDate){
            let valDate=setDate.substring(0, 4) + "-" + setDate.substring(4, 6) + "-" + setDate.substring(6, 8);
            // console.log(valDate);
            return valDate;
        },
        we(setTime){
            let valDate=setTime.substring(0, 2) + "时" + setTime.substring(2, 4) + "分" +setTime.substring(4,6) + "秒" ;
            // console.log(valDate)
            return valDate;
        },
        allRadio(){
            this.all = !this.all;
            console.log(11111)
        },
        changeChoose(item){
            this.$axios({
                url:'/msa/ops/voteMng/getVoteCountAndOption',
                method: 'get',
                params:{
                    voteId: this.id,
                    releaseId: item.releaseId
                }
            }).then(res=>{
                console.log(res.data);
                this.voteCountAndOptionVo = res.data;
                this.voteList();
            })
            console.log(item)
        },
        voteList(){
            let qa = this.voteCountAndOptionVo.totalVote;
            this.voteCountAndOptionVo.voteOptionVoList.forEach(function(item,index){
                if(qa<=0){
                    item.per = 0;
                } else{
                    item.per = (Math.round(item.voteCount/qa*100));
                }
            });
            console.log(this.voteCountAndOptionVo);
        }
    }
}

</script>