<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import News from '@/api/News'
import WebNav from '@/api/WebNav'

    const cid=import.meta.env.VITE_CID
    const newsid=ref(10)//协会章程id
    const aid=ref(8)
    const pid=ref(2)
    const item=ref([])

const rules=ref({id:0,title:'',content:''})//协会章程

onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNews()
        getNav()
    }
    const getNav= ()=> {
        WebNav.pid(pid.value).then((res:any)=>{
          item.value = res.data.data
            console.log(res.data.data,'item1');
            
        }).catch((res)=>{
            console.log(res)
        })
    }
   
    //rules
    const getNews =()=>{
        News.indicate(newsid.value).then((res:any)=>{
            getRules(res.data.data[0].id)
        }).catch((res)=>{
            console.log(res)
        })
    }

const getRules =(id:any)=>{
     News.get(id).then((res:any)=>{
            rules.value = res.data.data
            // console.log(res.data.data);
        }).catch((res)=>{
            console.log(res)
        }) 
}


</script>

<template>
    <el-row>
    <element-nav :pid="pid" :aid="aid" :items="item" :right="0"/>
      <el-col :md="16">
          <div class="text-center test-3xl font-bold py-10">{{ rules.title }}</div> 
            <p class="" v-html="rules.content"></p>
        </el-col>
          
</el-row>
</template>

<style scoped>
</style>