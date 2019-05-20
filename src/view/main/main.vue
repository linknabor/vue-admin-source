<template>
  <Layout style="height: 100%" class="main">
    <!-- <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>    
    </Sider> -->
    <Sider :width="250" collapsible hide-trigger reverse-arrow v-model="collapsed">
      <div style="width: 80%;margin: auto;background:#959a9b;height:64px;">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" alt="" style="width: 100%;height:1005; margin: auto;">
      </div>
      <side-menu :collapsed="collapsed" :list="list"></side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <!-- <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange"> -->
        <header-bar :collapsed="collapsed">
          <user :user-avator="userAvator"/>
          <hr>
          <span>{{userName}}</span>
          <!-- <language @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/> -->
          <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/> -->
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <!-- <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div> -->
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>   
  </Layout>
</template>
<script>
import SideMenu from '_c/side-menu'
import getUserList from '@/api/data'
import Cookies from 'js-cookie';
import axios from 'axios'
// import { mapActions } from 'vuex'
// import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, getNextName } from '@/libs/util'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.png'
import menuComponents from '_c/menu'
// import ReSubmenu from './re-submenu.vue'
// const { AMenu, AMenuItem, ASubmenu } = menuComponents
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    User,
    // AMenu,
    // AMenuItem,
    // ASubmenu,
    // ReSubmenu
  },
  data () {
    return {
      // collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      ...mapActions([
          'getUserInfo'
      ]),
      list:[],
      collapsed: false,
      
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    userName () {
      // console.log(this.$store.state.user.userName);
      return this.$store.state.user.userName
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    // df(tt){
    //   this.$router.push({
    //     name:'update_paste_page'
    //   })
    // },
    getUser(){
      this.getUserInfo().then(res=>{
        const roleId = res.roleId;
        this.getList(roleId);
      })
    },
    getList(roleId){
      const qaq = roleId;
      let url = '/msa/sso/menu/getAllMenuByRole'
      this.$axios({
        url:url,
        method:'get',
        params:{
          roleId:5
        }
      })
      .then(res=>{
        this.list = res.data;
      })
      .catch(err=>{
        console.log(err)
      })
        
    },
    turnToPage (name) {
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name: name
      })
    },
    // handleCollapsedChange (state) {
    //   this.collapsed = state
    // },
    handleCloseTag (res, type, name) {
      const nextName = getNextName(this.tagNavList, name)
      this.setTagNavList(res)
      let openName = ''
      if (type === 'all') {
        this.turnToPage('home')
        openName = 'home'
      } else if (this.$route.name === name) {
        this.$router.push({ name: nextName })
        openName = nextName
      }
      this.$refs.sideMenu.updateOpenName(openName)
    },
    handleClick (item) {
      this.turnToPage(item.name)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    this.getUser()
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    // this.addTag(this.$store.state.app.homeRoute)
    this.setBreadCrumb(this.$route.matched)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
  }
}
</script>
