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
                <span>发布标题：</span>
            </Col>
            <Col span="8">
                <Input type="text" v-model="title"/>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>缩略图：</span>
            </Col>
            <Col span="12">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
            </Col>
        </Row>
        <h3>发布内容：</h3>
        <editor ref="editor" :value="content" @on-change="handleChange"/>
        <!-- <button @click="changeContent">修改编辑器内容</button> -->
        <Row class="row_style" style="margin-top:20px;z-index:10001">
            <Col span="3">
                <span>投票内容：</span>
            </Col>
            <Col span="4">
                <Select v-model="model1">
                    <Option v-for="item in voteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>
        <Row class="row_style">
            <Col span="3">
                <span>发布区域：</span>
            </Col>
            <Col span="12">
                <RadioGroup v-for="item in radioList" :key="item.value" v-model="radio" @on-change="changeChoose(item)">
                    <Radio  :label="item.label" style="width:100px">
                        <Icon type="social-apple"></Icon>
                        <span>{{item.label}}</span>
                    </Radio>
                </RadioGroup>
            </Col>
        </Row>
        <Row class="row_style" style="z-index:10001" v-show="radio=='按区域显示'">
            <Col span="4" offset="3">
                <Select v-model="cityModel" @on-change="chooseCity">
                    <Option v-for="item in cityList" :value="item.cityName" :key="item.cityName">{{ item.cityName }}</Option>
                </Select>
            </Col>
        </Row>
    </div>
</template>

<script>
import Editor from '_c/editor'
export default {
    name: 'editor_page',
    components: {
        Editor
    },
    data () {
        return {
            title: '',
            content: '12312323',
            voteList: [
                {
                    value: '投票一',
                    label: '投票一'
                },
                {
                    value: '投票二',
                    label: '投票二'
                },
                {
                    value: '投票三',
                    label: '投票三'
                }
            ],
            model1: '',
            radio: '所有人可见',
            radioList:[
                {
                    label: '所有人可见',
                    value: 'a',
                },
                {
                    label: '按区域显示',
                    value: 'b'
                }
            ],
            cityModel: '',
            cityList:[
                {
                    cityName: '上海',
                    cityId: 1
                },
                {
                    cityName: '北京',
                    cityId: 2
                },
                {
                    cityName: '加里敦',
                    cityId: 3
                }
            ]
        };
    },

    computed: {},

    mounted(){},

    methods: {
        handleChange (html, text) {
            console.log(html, text)
        },
        changeContent () {
            this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
        },
        changeChoose(item){
            console.log(item)
        },
        chooseCity(){
            console.log(this.cityModel)
        }
    }
}

</script>