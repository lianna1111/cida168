<script setup lang="ts">
import { ref,onMounted } from 'vue'
// import { NavList } from '@/util/interface'
import WebNav from '@/api/WebNav'
import News from '@/api/News'
import { useRouter } from 'vue-router'
const router = useRouter()
const CurrentTitle=ref()
const newsData=ref([{id:0,pic:'',title:'',desc:'',hits:0 ,create_time:''}])
//  const cid=ref(8) 企业类别
const props = withDefaults(defineProps<{
    page_id?: number | string
    showTitle:number
}>(),{
    page_id: 0,
    showTitle:1
 })
 

onMounted(async () => {
    await init()
})
const init = async () => {
    getTitle()
    setTimeout(() => {
        getNews()
    }, 200);
    
}

 const getTitle= ()=> {
    WebNav.get(Number(props.page_id)).then((res:any)=>{
        CurrentTitle.value = res.data.data.title
    }).catch((res)=>{
        console.log(res)
    })
}
const todetail=(id:number)=>{
    router.push({path:'/news/detail',query:{id}})
}
const getNews =()=>{//home匹配导航栏设置newsid
    News.indicate(Number(sessionStorage.getItem('news_id'))).then((res:any)=>{
        newsData.value = res.data.data
        console.log(res.data.data);
        
    }).catch((res)=>{
        console.log(res)
    })
}




</script>

<template>
 
    
    <!-- main -->
    <template v-if="newsData[0].id">
         <template v-for="item in newsData">
            <!-- lis -->
            <el-row class="border-b  my-5 pb-8 border-gray-500 cursor-pointer" @click="todetail(item.id)">
                <el-col :md="6" :span="7" class="">
                    <el-image :src="item.pic" alt="" class="w-28 h-24 md:w-36 md:h-32"/>
                </el-col>
                <el-col :md="14" :span="17" class="relactive">
                    <div class="m-2">{{ item.title }}</div>
                    <div class="m-2 text-gray-400 text-sm truncate">{{ item.desc }}</div>
                    <div class="m-2 absolute md:bottom-5">阅读：{{ item.hits }}</div>
                </el-col>
                <el-col :md="4">
                    <div  class="float-right md:border-l border-gray-600 md:my-10 px-2 flex flex-wrap">
                        <div class="md:text-2xl font-bold mr-1">{{item.create_time.substring(5,10)}}</div>   
                        <div class="md:ml-8">{{item.create_time.substring(0,4)}}</div>
                    </div>


                </el-col>
            </el-row>
            
        </template>
        <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="1000" />
    </template>
    <div v-else>
        <el-empty  description="这里暂时没有内容" 
            image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
        />
    </div>
            
   
  
</template>

<style scoped>
</style>