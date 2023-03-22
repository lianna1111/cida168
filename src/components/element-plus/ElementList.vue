<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import { NavList,NewsList,userlist,contactList } from '@/util/interface'

    import { useRouter } from 'vue-router'
    const router = useRouter()  

    const props = withDefaults(defineProps<{
        pid:number,
        aid:number,
        title:string,
        isPic:number,
        items:NavList[]
        news:NewsList[]
    }>(),{
        pid:1,
        aid:0,
        isPic:0
     })
     const dialogVisible=ref(false)
const todetail=(id:number)=>{
    router.push({path:'/news/detail',query:{id}})
}
const handleClick = (id: number) => {
  console.log(id)
  router.push({path:'/contact/detail',query:{id}})
}
</script>

<template>
 <el-row>
    <el-col :md="8">  
     <!-- title -->
     <div class=" m-5  text-xl  "> {{title}} </div>
        <!-- nav -->
        <div  class="text-center flex flex-row flex-wrap md:flex-col">
            <template v-for="(item,index) in items" :key="item.index">
                    <template  v-if="index != 0">
                        <div class="p-4 md:w-4/5 bg-red-800 text-white  cursor-pointer" v-if="item.id==aid">
                          {{ item.title }}</div>
                        <div class="p-4 md:w-4/5 cursor-pointer"  v-else>
                            <!-- <span @click="setStorage(itm.router,itm.id)">{{itm.title}}</span> --> <div @click="aid=item.id">{{ item.title }}
                            </div> 
                           </div>
                    </template> 
            </template>   
        </div>
        <div class="hidden md:block mt-8 ">
           <div class="text-xl ">新闻搜索</div>
            <el-input class="m-2 w-3/4 border-gray-600 "></el-input>
        </div>
        <!-- <div class="hidden md:block mt-8 ">
           <div class="text-xl ">新闻排行榜</div>
          
        </div> -->
    </el-col>
    <el-col :md="16">  
           <!-- breadcrumb -->
           <el-breadcrumb class="m-5 text-xs md:text-sm" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <template v-if="aid">
                <template v-if="items.length">
                    <el-breadcrumb-item >{{ items[0].title }}</el-breadcrumb-item>  
                    <el-breadcrumb-item><template v-for="item in items"> <span v-if="item.id==aid">{{ item.title }} </span></template></el-breadcrumb-item>
                </template>
                </template>    
            <el-breadcrumb-item v-else><template v-if="items.length">{{ items[0].title }}</template></el-breadcrumb-item>             
        </el-breadcrumb>

          <!-- main -->
          <template v-for="(item,index) in items" :key="item.index">
            <template v-if="aid==item.id">

          <div v-if="!item.list">
            <el-empty  description="这里暂时没有内容" 
                image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
            />
        </div>
        <template v-else>
                <template v-for="itm in item.list" >
                <!-- lis -->
                <div v-if="isPic" class=" py-2 px-6 cursor-pointer transition duration-500 ease-in-out hover:scale-95" @click="todetail(item.id)">
                    <el-row>
                        <el-col :span="16"><el-image :src="itm.pic" class="md:w-96 md:h-52 w-52 h-30"/></el-col>
                        <el-col :span="8" class="px-2"> 
                            <div class="text-xl my-3"> {{ itm.title }}</div> 
                             <div class="text-sm text-gray-600">  {{ itm.desc }}</div>
                        </el-col>
                    </el-row>
                   
                </div>
                <div v-else class=" py-2 px-6 cursor-pointer transition duration-500 ease-in-out hover:scale-95" @click="todetail(item.id)">
                <div class="text-lg my-3"> {{ itm.title }}</div> 
                  <div class="text-sm text-gray-600">  {{ itm.desc }}</div> 
                </div>
                

                </template>
                <!-- <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="1000" /> -->

                </template>
            <!-- <div v-else><el-empty  description="这里暂时没有内容" image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/></div> -->
         </template>
        </template>
    </el-col>
    </el-row>
</template>

<style scoped>
</style>