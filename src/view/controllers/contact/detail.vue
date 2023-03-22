<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import Message from '@/api/Message'
import {useRoute} from 'vue-router'
    const route =useRoute()
    const cid=import.meta.env.VITE_CID
    const pid=ref(7)
    const aid=ref(16)
    const item=ref([])
  const messageData=ref([{title:'',content:'',reply:''}])

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
    Message.get(Number(route.query.id)).then((res:any)=>{
      // console.log(res);
      messageData.value=res.data.data
      
    })
  }


</script>

<template>
    <el-row>
            <element-nav :pid="pid" :aid="aid" :items="item" :right="0"/>
        <el-col :md="16">
          <div class="text-red-700 md:mt-10 cursor-pointer" @click="$router.go(-1)"><font-awesome-icon class="mr-1" icon="fa-chevron-left" />返回</div>
      <!-- title -->
      <div class="w-52  md:mt-16 h-0.5 m-auto bg-red-600 text-center">
         <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">详情</div>
    </div>
    <!-- main -->
    <div class="m-auto mt-6" v-for="item in messageData">
      <span class="m-8">详细信息 </span>
      <el-row class="mt-4 mx-8 border border-b-transparent">
        <el-col class="text-red-700 border-r text-center m-auto" :span="4">标题</el-col>
        <el-col :span="20" class="p-2">{{ item.title }}</el-col>
      </el-row>
      <el-row class="mx-8 border  border-b-transparent">
        <el-col class="text-red-700 border-r text-center m-auto" :span="4">问题</el-col>
        <el-col :span="20" class="px-2 py-5">{{ item.content }}</el-col>
      </el-row>
      <el-row class="mx-8 border" v-if="item.reply">
        <el-col class="text-red-700 border-r text-center m-auto" :span="4">回复</el-col>
        <el-col :span="20" class="px-2 py-5">{{ item.reply }}</el-col>
      </el-row>
    </div>
        </el-col>

    </el-row>
  </template>
<style scoped>
  
 </style>
  
