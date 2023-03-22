<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import News from '@/api/News'

    const cid=import.meta.env.VITE_CID
    const pid=ref(5)
    const news_id=ref(8)
    const item=ref([])
    const newsData=ref([])

onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNav()
        getNews()
    }
    const getNav= ()=> {
        WebNav.pid(pid.value).then((res:any)=>{
          item.value = res.data.data
        }).catch((res)=>{
            console.log(res)
        })
    }
    const getNews =()=>{
    News.indicate(news_id.value).then((res:any)=>{
        newsData.value = res.data.data
        console.log(res.data.data);
        
    }).catch((res)=>{
        console.log(res)
    })
}




</script>

<template>
     <el-row>
        <element-nav :pid="pid" :items="item" :news="newsData"/>
    </el-row>
    
</template>

<style scoped>
</style>