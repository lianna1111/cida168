 
<script setup lang="ts">
import router from '@/router'
import { ref,reactive,onMounted } from 'vue'
import News from '@/api/News'
const newsid = ref(1)
const newsData=ref([{id:'',pic:'',title:'',create_time:'',desc:''}])
const navdata=ref([
{id:0,title:'培训信息'},
  {id:1,title:'拉丁视频教材',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:2,title:'中国舞视频教材',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:3,title:'街舞视频教材',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:4,title:'比赛音乐',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:5,title:'培训信息',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
 
])

onMounted(async () => {
  await init()
})

// 初始化数据
const init = async () => {
    getNews()
}

//news
const getNews =()=>{
News.indicate(newsid.value).then((res:any)=>{
    newsData.value = res.data.data
    // console.log(res.data.data);
}).catch((res)=>{
    console.log(res)
})
}



</script>

<template>

<div class="m-auto md:px-28">
  <!--  -->
 <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban.9b463db0.png"/>
 <div class="md:h-40 h-20"></div>
    <!-- news -->
    <element-news title="热门推荐" :items="newsData"/>
    <div class="md:h-40"></div>

   <!-- news -->
   <element-list title="培训信息" aid="1" :items="navdata"/>
<div class="h-20"></div>
    
 
 
  </div>
</template>



<style lang="scss">

</style>


