<style scoped>
    html{height:100%;width: 100%;}
    .box{height:100%;width: 96%;margin: auto;padding-top:10px;padding-left:20px;}
    .row_style{margin-bottom: 10px;height: 32px;line-height: 32px;}
    .chooseName{border:1px solid #ccc;padding: 20px 30px;margin-top: 10px;}
</style>
<template>
    <div class="box">
        <Row class="row_style">
            <Col span="3">
                <span>投票名称：</span>
            </Col>
            <Col span="8">
                <Input type="text" v-model="voteName" placeholder="欠费调研1"/>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票截止日期：</span>
            </Col>
            <Col span="4">
                <DatePicker :value="voteCloseDate"  @on-change="dateClick" type="date" placeholder="选择日期" ></DatePicker>
            </Col>
            <Col span="1" style="text-align:center">
                --
            </Col>
            <Col span="4">
                <TimePicker :value="voteCloseTime" @on-change="timeClick" placeholder="选择时间"></TimePicker>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票标题：</span>
            </Col>
            <Col span="8">
                <Input type="text" v-model="voteTitle" placeholder="请选择你拒绝缴物业费的原因"/>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>选择方式</span>
            </Col> 
            <Col span="8">
                <RadioGroup v-model="voteMode">
                    <Radio label="单选">单选</Radio>
                    <Radio label="多选">多选</Radio>
                    <Radio label="n选" style="width:80px">
                        最多选择 <input type="number" @input="chooseNum" v-model="radioNum" style="width:40px;height:20px"> 项
                    </Radio>
                </RadioGroup>
            </Col>
        </Row>
        <h2>投票选项：</h2>
        <div class="chooseName">
            <div v-for="(item,index) in items">
                <Row class="row_style">
                    <Col span="2">
                        <span>选项{{index}}：</span>
                    </Col>
                    <Col span="12">
                        <Input type="text" v-model="item.value" />
                    </Col>
                    <Col span="4" offset="1" v-show="index>=2">
                        <Button @click="handleRemove(index)">Delete</Button>
                    </Col>
                </Row>    
            </div>
            <div>
                <Row  class="row_style">
                    <Col span="4">
                        <Button type="dashed" long @click="handleAdd" icon="md-add">新增</Button>
                    </Col>
                </Row>
            </div>        
        </div> 
        <Row class="row_style" style="margin-top:20px;">
            <Col span="2" offset="2">
                <Button type="success" long @click="keep">保存</Button>
            </Col>
            <Col span="2" offset="2">
                <Button long>返回</Button>
            </Col>
        </Row>  
    </div>
</template>

<script>
export default {
    data () {
        return {
            voteName: '',
            voteCloseDate: '',
            voteCloseTime: '',
            voteTitle: '',
            voteMode: '',
            radioNum:'',
            items: [
                {
                    value: '',
                    index: 1,
                    status: 1,
                    name: '一'
                },
                {
                    value: '',
                    index: 2,
                    status: 1,
                    name: '二'
                }
            ]
        };
    },
    components: {},

    computed: {},

    mounted(){},

    methods: {
        chooseNum(){
            console.log(this.radioNum);
            
        },
        dateClick(date){
            this.voteCloseDate = date;
        },
        timeClick(date){
            this.voteCloseTime = date;
        },
        handleAdd () {
            this.index++;
            this.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        handleRemove (index) {
            console.log(index);
            this.items.splice(index,1)
            // this.items[index].status = 0;
        },
        keep(){
            this.items.forEach(item => {
                item.optionName = item.value
            });
            if(this.voteMode=="n选"&&this.radioNum==''){
                alert("请选择具体几项");
                return
            }
            console.log(this.voteMode)
            if(this.voteMode=="单选"){
                this.voteMode = "A"
            }else if(this.voteMode=="多选"){
                this.voteMode = "B"
            }else if(this.voteMode=="n选"){
                this.voteMode = this.radioNum;
            }else{
                alert("请选择选项");
                return
            }
            this.$axios({
                url: '/msa/ops/voteMng/addOrUpdateVote',
                method: 'post',
                data:{
                    voteMng:{
                        voteName: this.voteName,
                        voteCloseDate: this.voteCloseDate,
                        voteCloseTime: this.voteCloseTime,
                        voteTitle: this.voteTitle,
                        voteMode: this.voteMode
                    },
                    list:this.items
                    
                }
            }).then(res=>{
                console.log(res.data)
            })
        }
    }
}

</script>