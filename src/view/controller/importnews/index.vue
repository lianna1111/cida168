 
<script setup lang="ts">
import router from '@/router'
import { ref,reactive,onMounted } from 'vue'
import News from '@/api/News'
const newsid = ref(1)
const newsData=ref([{id:'',pic:'',title:'',create_time:'',desc:''}])
const navdata=ref([
{id:0,title:'要闻公告'},
  {id:1,title:'行业新闻',router:'importnews',list:[{id:1,title:'标题1',desc:'内容1内容1内容1'},{id:2,title:'标题2',desc:'内容2内容2内容2'}]},
  {id:2,title:'赛事新闻',router:'importnews/game',list:[{id:1,title:'标题3',desc:'内容3内容3内容3'},{id:2,title:'标题4',desc:'内容4内容4内容4'}]},
  {id:3,title:'重要通知',},
 
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
 <div class="h-40"></div>
    <!-- news -->
    <element-news title="最新新闻" :items="newsData"/>

   <!-- news -->
    <element-list title="新闻类别" aid="1" :items="navdata"/>
<div class="h-20"></div>
    
 
  </div>
</template>



<style lang="scss">

</style>


