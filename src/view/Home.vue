<script setup lang="ts">
  import {ref,onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  import Config from '@/api/Config'
  const router =useRouter()
    const config =ref({title:'',address:'',logo:'',telphone:'',fax:'',icp:''})
      const menuData=ref( [
        { id:1,pid:0, level:1,number:0,title: "首页", router: "main" },
        { id:2,pid:0, level:1,number:0,title: "要闻公告", router: "importnews" },
        { id:3,pid:0, level:1,number:0,title: "组织介绍", router: "about" },
        { id:4,pid:0, level:1,number:0,title: "赛事活动", router: "game" },
        { id:5,pid:0, level:1,number:0,title: "舞蹈分类", router: "dance" },
        { id:6,pid:0, level:1,number:0,title: "培训信息", router: "edu" },
        { id:7,pid:0, level:1,number:0,title: "证书查询", router: "search" },
        { id:8,pid:0, level:1,number:0,title: "联系我们", router: "importcontact" },
      ])
      onMounted(() => {
        init()
      })
      const init=()=>{
        getConfig()
      }
      const handleSelect=()=>{
      }
      const getConfig =()=>{
        Config.get().then((res)=>{
          console.log(res.data.data,'config');
          config.value=res.data.data as any
          
        })
      }
</script>
<template>
    <!-- logo -->
    <div class="m-4 flex justify-between">
      <el-image
            src="https://www.cida168.com/assets/logo.88e0f77b.png" alt="logo"
            class='md:w-80 md:h-32 w-40 h-20' @click="router.push('/')"
          />
      <div class="md:m-4 my-4 cursor-pointer" @click="router.push('/buy')">购买网站模板</div>    
    </div>
        
          <!-- menu -->
          <element-menu   :items="menuData"  @handleSelect="handleSelect"></element-menu>
          <router-view class="md:w-5/6 w-full px-2 md:mx-auto" />
  <div class="w-full h-3 bg-red-600"></div>
  <div class="bg-gray-100 text-center py-8 text-xs">
    <p>主办单位：{{ config.title }}</p>
    <p>地址：{{ config.address }}</p>
    <p>电话：{{ config.telphone }} 传真：{{ config.fax }}</p>
    <p>备案/许可证编号：<el-link class="text-black text-xs" href="https://beian.miit.gov.cn/">{{config.icp}}</el-link></p>
    <!-- <p>网址：{{ config.Domain }}</p> -->
    <p>友情链接：<el-link class="text-xs" href="https://www.rongtongkj.com">嵘通互联</el-link> </p>
        <!-- <img src='../assets/images/code1.png' width='300'/> -->
       <!-- <el-image :src='config.logo' class='w-60'/> -->
      </div> 
</template>
<style lang="scss" scoped>
  p{margin-top: 1rem;}
</style>
<style>
</style>


