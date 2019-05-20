<template>
  <li class="a-menu-item" @click="qa">
    <slot></slot>
  </li>
</template>

<script>
export default {
  nmae: 'AMenuItem',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: Number
  },
  methods: {
	qa(){
		// this.$router.push({
		// 	name:'login'
		// })
	}    
  }
}
	
</script>

<style lang="less">
.a-menu-item{
  background: rgb(90, 92, 104);
  color: #fff;
  font-size: 12px;
  padding-left: 25px;
  padding-top: 10px;
}

.a-menu-item:hover{
  color:red;
}
</style>
