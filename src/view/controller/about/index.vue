 
<script setup lang="ts">
import router from '@/router'
import { ref,reactive,onMounted } from 'vue'
import News from '@/api/News'
import Carousel from '@/api/Carousel'
import Config from '@/api/Config'
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
const newsid = ref(1)
const logo =ref()
const adress=ref()
const navdata=ref([
{id:0,title:'组织介绍'},
  {id:1,title:'中国国际流行舞蹈协会简介',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:2,title:'HIDA协会章程',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:3,title:'HIDA协会简介',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:4,title:'CIDA章程',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:5,title:'CIDA简介',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  
])



</script>

<template>

<div class="m-auto md:px-28">
  <!--  -->
 <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban.9b463db0.png"/>
 <div class="md:h-60 h-20"></div>
   <!-- news -->
    <element-list title="组织介绍" aid="1" :items="navdata"/>
<div class="h-20"></div>
    
 
  </div>
</template>



<style lang="scss">

</style>


