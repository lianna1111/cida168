<script setup lang="ts">
import { ref,onMounted } from 'vue'
import News from '@/api/News'
import { useRoute } from 'vue-router'
const route = useRoute()
const newsData=ref({id:'',title:'',content:''})


console.log(route);

onMounted(async () => {
    await init()
})
const init = async () => {
    getNews()
}


const getNews =()=>{
    News.get(Number(route.query.id)).then((res:any)=>{
        newsData.value = res.data.data
        console.log(res.data.data);
        
    }).catch((res)=>{
        console.log(res)
    })
}




</script>

<template>
    <div >
        <!-- breadcrumb -->
        <el-breadcrumb class="m-5" separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
                </el-breadcrumb>
            <!-- main -->
            <div class="text-center test-3xl font-bold">{{ newsData.title }}</div>
            <p class="" v-html="newsData.content"></p>
            <div class="my-10"></div>
  </div>
</template>

<style scoped>
</style>