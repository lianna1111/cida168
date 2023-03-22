<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import Message from '@/api/Message'

    const cid=import.meta.env.VITE_CID
    const pid=ref(7)
    const aid=ref(19)
    const item=ref([])
    const messageCount=ref()
    const messageProcessed=ref()

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
             messageCount.value=res.data.data.count
             messageProcessed.value=res.data.data.processed
             
        })
    }


</script>

<template>
    <el-row>
            <element-nav :pid="pid" :aid="aid" :items="item" :right="0"/>

        <el-col :md="16">
            <i class="fal fa-universal-access" />
                <!-- title -->
                <div class="w-52 md:mt-24 h-0.5 m-auto bg-red-600 text-center">
                    <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">数据统计</div>
                </div>
                <!-- list -->
                <div class="bg-red-200 mt-12 px-8 py-3 text-red-700">留言办理情况 </div>
                <ul class="m-16">
                    <li class="m-10"><span class="m-10">收件数 </span>{{ messageCount?messageCount: '0'}}件</li>
                    <li class="m-10"><span class="m-10">已办结 </span>{{ messageProcessed?messageProcessed:'0' }}件</li>
                </ul>
        </el-col>
    </el-row>

</template>

<style scoped>
</style>