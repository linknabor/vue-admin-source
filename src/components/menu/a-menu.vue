<template>
  <div class="a-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  nmae: 'AMenu'
}
</script>

<style lang="less">
.a-menu{
  padding-top: 10px;
  & *{
    list-style: none;
    cursor:pointer;
    color: rgb(255, 255, 255,0.7);
    color: #358FC8;
  }
  ul{
    padding: 0;
    margin: 0;
  }
}
</style>
