<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchText=ref('')
</script>

<template>
    <el-row>
       <el-col class="text-3xl mt-24 mb-12 md:mx-48 text-center md:text-left">会员查询</el-col>
       <el-row class="w-3/4 m-auto">
        <el-col :span="20">
            <el-input  size="large" v-model="searchText" placeholder="请输入会员姓名或会员编号进行查询" clearable />
        </el-col>
        <el-col :span="4">
            <el-button class="bg-red-700 text-white w-full py-5" type="danger">查询</el-button>
        </el-col>
       </el-row>
    </el-row>
    <el-empty  description="这里暂时没有内容"
            image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
        />
   

</template>

<style scoped>
</style>