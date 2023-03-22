<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import Message from '@/api/Message'

    const cid=import.meta.env.VITE_CID
    const pid=ref(7)
    const aid=ref(17)
    const item=ref([])
    const messageData:any=ref([])

onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNav()
        getMessage()
    }
    const getNav= ()=> {
        WebNav.pid(pid.value).then((res:any)=>{
          item.value = res.data.data
            console.log(res.data.data,'item1');
            
        }).catch((res)=>{
            console.log(res)
        })
    }
   
    const getMessage=()=>{
        Message.indicate().then((res:any)=>{
            res.data.data.data.forEach((item:any) => {
                 if(item.reply){
                    messageData.value.push(item)
                 }
            });
           
          
        })
    }


</script>

<template>
    <el-row>
   <element-nav :pid="pid" :aid="aid" :items="item" :table="messageData"  />
</el-row>
</template>

<style scoped>
</style>