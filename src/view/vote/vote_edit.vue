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
                <Input type="text" v-model="name" :placeholder="name"/>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票截止日期：</span>
            </Col>
            <Col span="4">
                <DatePicker :value="date" format="yyyy年MM月dd日" type="date" placeholder="Select date" ></DatePicker>
            </Col>
            <Col span="1" style="text-align:center">
                --
            </Col>
            <Col span="4">
                <TimePicker :value="time" format="HH点mm分ss秒" placeholder="Select time"></TimePicker>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>投票标题：</span>
            </Col>
            <Col span="8">
                <Input type="text" v-model="title" placeholder="请选择你拒绝缴物业费的原因"/>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>选择方式</span>
            </Col> 
            <Col span="8">
                <RadioGroup v-model="radio">
                    <Radio label="单选">单选</Radio>
                    <Radio label="多选">多选</Radio>
                </RadioGroup>
            </Col>
        </Row>
        <h2>投票选项：</h2>
        <div class="chooseName">
            <div  v-for="(item,index) in items">
                <Row class="row_style">
                    <Col span="2">
                        <span>选项{{index}}：</span>
                    </Col>
                    <Col span="8">
                        <Input type="text" v-model="item.value" />
                    </Col>
                    <Col span="4" offset="2">
                        <i-switch size="large" :true-value="add">
                            <span  slot="open">显示</span>
                            <span  slot="close">隐藏</span>
                        </i-switch>
                    </Col>
                    <Col span="4" offset="2" v-show="index>=2">
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
    </div>
</template>

<script>
export default {
  data () {
    return {
        id: this.$route.query.id,
        name: '欠费调研1',
        date: '2016-01-01',
        time: '09:41:00',
        title: '',
        radio: '',
        add: 1,
        items: [
            {
                value: '',
                index: 1,
                status: 1
            }
        ]
    };
  },

  components: {},

  computed: {},
  created() {
      console.log(this.id);
  },
  mounted(){},

  methods: {
        handleAdd () {
            this.index++;
            this.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        change (status) {
            this.$Message.info('开关状态：' + status);
        },
      handleRemove (index) {
        console.log(index);
        this.items.splice(index,1)
        // this.items[index].status = 0;
      }
  }
}

</script>