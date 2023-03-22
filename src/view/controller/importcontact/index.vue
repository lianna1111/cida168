 
<script setup lang="ts">
import router from '@/router'
import { ref,reactive,onMounted } from 'vue'
import Config from '@/api/Config'
const newsid = ref(1)
const config =ref({title:'',address:'',logo:'',telphone:'',fax:'',icp:''})
onMounted(async () => {
  await init()
})

// 初始化数据
const init = async () => {
    getConfigData()
}

//config
const getConfigData = async () => {
    Config.get().then((res:any)=>{
          config.value=res.data.data as any

     })
}



</script>

<template>

<div class="m-auto md:px-28">
  <!--  -->
 <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban.9b463db0.png"/>
 <div class="h-60"></div>
    <el-row>
      <el-col :md="8"> <div class="d-none m-5  text-xl  "> 联系我们 </div></el-col>
      <el-col :md="16">
        <div class="mb-60">
           <p>全国统一热线：</p>
            <p>湖南咨询热线：{{ config.telphone }}</p>
           <p>邮箱：</p>
            <p>联系地址：{{ config.address }}</p>
        </div>
      </el-col>
    </el-row>
  
 
  </div>
</template>



<style lang="scss">

</style>


