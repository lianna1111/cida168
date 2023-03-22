<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import router from '@/router'
  import {NewsList} from '@/util/interface'
    const props = withDefaults(defineProps<{
        title:string
        items:NewsList[]
    }>(),{
     })
     const toNewsDetail=(id:any)=> {
      router.push({ path: "/news/detail", query: { id } });//
    }
</script>

<template>
    <!-- title -->
       <div class="text-center md:my-20 my-10 ">
            <div class=" md:text-3xl text-xl   text-gray-800 my-3">{{ title }}</div>
            <span class="text-gray-700 text-sm"> 以下是更多{{title}}</span>
        </div>
        <el-row class="flex justify-around flex-wrap my-10 mb-20">
            <template v-for="item in items" >
            <div>
                <el-image :src="item.pic" class="md:w-72 md:h-44 w-40 h-30 cursor-pointer" @click="toNewsDetail(item.id)"/> 
                <div class="my-1 text-center text-sm">{{item.title}}</div>
            </div>
            </template>
        </el-row>
</template>

<style scoped>
</style>