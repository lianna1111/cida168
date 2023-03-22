<script setup lang="ts">
    import { ref,onMounted } from 'vue'
    import { NavList,NewsList,userlist,contactList } from '@/util/interface'

    import { useRouter } from 'vue-router'
    const router = useRouter()  

    const props = withDefaults(defineProps<{
        pid:number,
        aid:number,
        items:NavList[]
        news:NewsList[]
        persons:userlist[]
        table:contactList[]
        isquestion:number,
        iszone:number,
        right:number
    }>(),{
        pid:1,
        aid:0,
        isquestion:0,
        iszone:0,
        right:1
     })
     const dialogVisible=ref(false)
     const reply=ref('')
console.log(props.news,'items');
const todetail=(id:number)=>{
    router.push({path:'/news/detail',query:{id}})
}
const handleClick = (id: number) => {
  console.log(id)
  router.push({path:'/contact/detail',query:{id}})
}
</script>

<template>
    <el-col :md="8">  
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

        <!-- title -->
        <div class="d-none m-5 w-3/4 h-20 md:h-40 bg-red-600 text-white align-middle text-2xl flex items-center justify-center">
            <template v-if="aid"><template v-for="item in items"> <span v-if="item.id==aid">{{ item.title }} </span></template></template>    
            <template v-else><template v-if="items.length">{{ items[0].title }}</template></template>    
        </div>
        
        <!-- nav -->
        <div  class="d-none pt-5 md:ml-14" v-if="aid">
            <template v-for="(item,index) in items" :key="item.index">
                    <template  v-if="index != 0">
                        <div class="m-4 text-red-600  cursor-pointer" v-if="item.id==aid">
                            <font-awesome-icon icon="fa-caret-right" class="mr-2"/>
                            <router-link :to="{name:item.router}">{{item.title}}</router-link>
                        </div>
                        <div class="m-4  cursor-pointer" v-else>
                            <font-awesome-icon icon="fa-caret-right" class="mr-2" />
                            <!-- <span @click="setStorage(itm.router,itm.id)">{{itm.title}}</span> -->
                            <router-link :to="{name:item.router}">{{item.title}}</router-link>
                        </div>
                    </template> 
            </template>   
        </div>
        <template v-else> 
            <div class="m-4 text-red-600 cursor-pointer" >
            <font-awesome-icon icon="fa-caret-right"  class="mr-2"/>
            <template v-if="items.length">{{ items[0].title }}</template>
            </div>
        </template>
    </el-col>
    <el-col :md="16" v-if="right">  
        <!-- title -->
        <div class="w-52 md:mt-24 h-0.5 m-auto bg-red-600 text-center">
            <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">
                <template v-if="items.length">
                    <template  v-if="aid"><template v-for="item in items"> <span v-if="item.id==aid">{{ item.title }} </span></template></template>
                  <template v-else>{{ items[0].title }}</template>
                </template>
            </div>
        </div>
          <!-- main -->
          <div v-if="!news&&!persons&&!table">
            <el-empty  description="这里暂时没有内容" 
                image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
            />
        </div>
        <template v-else-if="news">
            <template v-if="news.length>0">
                <template v-for="item in news">
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
            <div v-else><el-empty  description="这里暂时没有内容" image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/></div>
         </template>
     <!-- person -->
        <template v-else-if="persons">
        <template v-for="item in persons">
            <template v-if="persons.length>0">
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
             <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="1000" />
            </template>
            <div v-else><el-empty  description="这里暂时没有内容" image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/></div>
            </template>  
        </template>
        <template v-else-if="table">
            <template v-if="table.length>0">
            <el-table :data="table" class="my-5" style="width: 100%">
                <template v-if="isquestion"> 
                    <el-table-column fixed prop="content" label="标题" width="800" />
                </template>
                <template v-else> 
                    <el-table-column fixed prop="reply" label="标题" width="800" />
                </template>
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                    <!-- <el-button v-if="iszone" link type="waring" size="small" @click="dialogVisible = true;handleReply(scope.row.id)">查看回复</el-button> -->
                    <el-button v-if="!iszone" link type="waring" size="small" @click="handleClick(scope.row.id)">查看</el-button>
                    </template>
                </el-table-column>
          </el-table>
        <!-- table_dialog -->
            <el-dialog v-model="dialogVisible" title="回复内容">
            {{ reply }}
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">关闭</el-button>
                </span>
                </template>
          </el-dialog>
            <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="1000" />
        </template>
        <div v-else><el-empty  description="这里暂时没有内容" image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/></div>
        </template>
    </el-col>
</template>

<style scoped>
@media screen and (max-width: 600px) { .d-none{display:none; }}
</style>