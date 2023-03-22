<script setup lang="ts">
   import { ref } from 'vue'
   import { userlist } from '@/util/interface'
  
    
    const props = withDefaults(defineProps<{
        items:userlist[]
    }>(),{
     })
     
</script>

<template>
    <div class="md:mt-24"></div>
    <!-- main -->
    <template v-if="items">
         <template v-for="item in items">
            <!-- lis -->
            <el-row class=" py-2 my-5 border-2">
                <el-col :span="6">
                    <img :src="item.pic" alt="协会人员" class="md:w-44 md:h-56 w-20 h-24">
                </el-col>
                <el-col :span="18" class="relactive">
                    <div class="m-3 text-2xl text-blue-600 font-bold">{{ item.title }}</div>
                    <div class="m-3 text-sm">{{ item.description }}</div>
                </el-col>
               
            </el-row>
            
        </template>
        <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="1000" />
    </template>
            <el-empty  description="这里暂时没有内容" v-else
            image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
        />
   
  
</template>

<style scoped>
</style>