 
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
{id:0,title:'赛事活动'},
  {id:1,title:'赛事通知',list:[{id:1,title:'标题3',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容3内容3内容3'},{id:2,title:'标题4',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容4内容4内容4'}]},
  {id:2,title:'报名链接',list:[{id:1,title:'标题3',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容3内容3内容3'},{id:2,title:'标题4',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容4内容4内容4'}]},
  {id:3,title:'精彩瞬间',list:[{id:1,title:'标题3',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容3内容3内容3'},{id:2,title:'标题4',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容4内容4内容4'}]},
  {id:4,title:'比赛视频',list:[{id:1,title:'标题3',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容3内容3内容3'},{id:2,title:'标题4',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容4内容4内容4'}]},
  {id:5,title:'文件下载',list:[{id:1,title:'标题3',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容3内容3内容3'},{id:2,title:'标题4',pic:'https://admin.yiwenyw.com/upload/news/20230317150651_506.png',desc:'内容4内容4内容4'}]},
  
])



</script>

<template>

<div class="m-auto md:px-28">
  <!--  -->
 <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban.9b463db0.png"/>
 <div class="md:h-60 h-20"></div>
   <!-- news -->
    <element-list title="赛事活动" aid="1" :items="navdata" isPic="1"/>
<div class="h-20"></div>
    
 
  </div>
</template>



<style lang="scss">

</style>


