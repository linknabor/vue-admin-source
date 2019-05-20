<template>
  <Submenu :name="parent.menuName">
    <template slot="title">
      <Icon type="ios-alarm" />
      {{parent.menuName}}
    </template>
    <template v-for="item in parent.ssoMenuList">
        <re-submenu
          v-if="item.ssoMenuList&&item.ssoMenuList.length!==0"
          :key="`menu_${item.menuName}`"
          :name="item.menuName"
          :parent="item"
        >
        </re-submenu>
        <menu-item v-else :key="`menu_${item.menuName}`" :name="item.menuName">
          <Icon type="logo-apple" />
          {{ item.menuName }}
        </menu-item>
      </template>
  </Submenu>
</template>

<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  created(){
    // console.log(parent)
  }
}
</script>

<style>

</style>
