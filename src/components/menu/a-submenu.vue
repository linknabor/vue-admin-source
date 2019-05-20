<template>
  <ul class="a-submenu">
    <div class="a-submenu-title" @click="handleClick">
      <slot name="title"></slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)` }">^</span>
    </div>
    <div v-show="showChild" class="a-submenu-child-box" @click="qw">
      <!-- <span>123</span> -->
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  nmae: 'ASubmenu',
  data () {
    return {
      showChild: false
    }
  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: Number
  },
  methods: {
    handleClick () {
      this.showChild = !this.showChild
    },
    qw(){
      // alert(11)
    }
  }
}
</script>

<style lang="less">
.a-menu > .a-submenu > .a-submenu-title > div{
  font-size: 16px;
  color: red
};

.a-submenu-title:hover{
  color:red;
}

.a-submenu{
  /*background: rgb(33, 35, 39);*/
  background: 654321;
  &-title{
    color: #fff;
    position: relative;
    padding-left:30px;
    padding-top: 5px;
    font-size: 14px;
    letter-spacing: 1px;
    .shrink-icon{
      position: absolute;
      top: 0px;
      right: 20px;
    }
  }
  &-child-box{
    overflow: hidden;
    padding-left: 20px;
    /*padding-top: 10px;*/
    font-size: 14px;
    &-title{
      padding-top: 10px;
      font-size: 14px;
    }
  }
  li{
    background: rgb(33, 35, 39);
    /*background: 654321;*/
  }
}
</style>
