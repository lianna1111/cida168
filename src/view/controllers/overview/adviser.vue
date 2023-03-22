<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import Ulist from '@/api/Ulist'

    const cid=import.meta.env.VITE_CID
    const aid=ref(10)
    const pid=ref(2)
    const item=ref([])

const cate_id=ref(4)//顾问类别id
const ulistData=ref()

onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getUlist()
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
    const getUlist =()=>{
        Ulist.indicate(cate_id.value).then((res:any)=>{
            ulistData.value=res.data.data
            
        }).catch((res)=>{
            console.log(res)
        })
    }




</script>

<template>
    <el-row>
     <element-nav :pid="pid" :aid="aid" :items="item"  :persons="ulistData"/>
    </el-row>
</template>

<style scoped>
</style>