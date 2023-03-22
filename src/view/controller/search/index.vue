 
<script setup lang="ts">
import router from '@/router'
import { ref,reactive,onMounted } from 'vue'
import { User, Postcard,Tickets } from '@element-plus/icons-vue'
import News from '@/api/News'
const newsData=ref([{id:'',pic:'',title:'',create_time:'',desc:''}])
const navIndex=ref(1)
const nav = ref([{ id:1,title: "学生查询"},{  id:2,title: "教师查询"},{  id:3,title: "评审查询" }, {  id:4,title: "教/考官查询"},{  id:5,title: "注册单位查询"}]) 

const form=reactive({username:'',idcard:'',cert:''})
onMounted(async () => {
  await init()
})

// 初始化数据
const init = async () => {}

const search=()=>{
  console.log('search');
}
const empty=()=>{
  form.username=''
  form.idcard=''
  form.cert=''
}

</script>

<template>

<div class="m-auto md:px-28">
  <!--  -->
 <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban.9b463db0.png"/>
 <div class="md:h-60 h-20"></div>
 <template class="m-auto " v-for="(item, index) in nav" :key="index">
            <span :class="[navIndex == item.id ? 'bg-red-600 text-white rounded-sm' : '']" class="md:hidden cursor-pointer inline-block w-20 h-14 m-1 p-1"  @click="navIndex=item.id">
              {{ item.title }}
            </span>
  </template>
  <!-- box-list begin -->
  <el-row class='w-4/5 m-auto my-10 mb-32 rounded-lg bg-gray-300 ' >
    <el-col :md="18" class="">
      <div class="m-10 md:text-3xl text-lg font-semibold">中国国际流行舞蹈</div>
      <form class="text-center ">
        <el-input class="md:m-4 my-2 md:w-96 w-48" size="large" prop="cert" placeholder="请输入证书序号" v-model="form.cert" :prefix-icon="Tickets"/>
        <el-input class="md:m-4 my-2 md:w-96 w-48" prop="username" placeholder="请输入姓名" v-model="form.username" :prefix-icon="User"/>
        <el-input class="md:m-4 my-2 md:w-96 w-48" prop="idcard" placeholder="请输入身份证号" v-model="form.idcard" :prefix-icon="Postcard"/>
       <div class="my-3">
        <el-button type="danger" class="bg-red-600 text-white px-8 py-6 text-lg" @click="search">查询</el-button>
        <el-button type="danger" class=" px-8 py-6 text-lg text-red-700" @click="empty">重填</el-button>
        </div>
      </form>
     <div class="text-center font-bold mb-5 text-sm">
      <span class="hidden md:block">查询步骤：1、点选右侧查询分类</span><span class="md:hidden block">查询步骤：1、点选上侧查询分类</span>2、输入姓名+证书序号+身份证号查询
      </div>
  </el-col>
      
        <el-col :md="6" class="hidden md:block text-center border-l-gray-200  border-l-2">
          <template class="nav-item" v-for="(item, index) in nav" :key="index">
            <div :class="[navIndex == item.id ? 'bg-red-600 text-white' : '',navIndex==1?'rounded-tr-lg':'',navIndex==5?'rounded-br-lg':'']" class="h-1/5 flex items-center justify-center cursor-pointer"  @click="navIndex=item.id">
              {{ item.title }}
            </div>
          </template>
        </el-col>
      </el-row>
  </div>
</template>



<style lang="scss">

</style>


