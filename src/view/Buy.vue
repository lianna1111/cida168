<script setup lang="ts">
    import router from '@/router'
import { ElMessage } from 'element-plus';
    import { ref,reactive,onMounted } from 'vue'
    const dialogVisible = ref(false)
    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
    }
    const buy=(id:number)=>{
        if(id==1){
            ElMessage('购买源代码')
        }else if(id==2){
            ElMessage('绑定域名')
        }else if(id==3){
            ElMessage('子网站')
        }
    }

</script>

<template>
    <el-container class="h-screen" style=" background-image: linear-gradient(rgb(242,242,242), rgb(208,208,208));">
        <el-header class="flex items-center">
            <div class="container md:mx-20">
                <div class="flex items-center">
                    <a href="/"><i class="fa fa-chevron-left" /> <font-awesome-icon class="mr-1" icon="fa-chevron-left" />返回首页</a>
                </div>
            </div>
        </el-header>
        <el-main >
            <div class="container m-auto md:w-[600px] mt-10 md:mt-0">
               <el-card class='md:mt-20'>
                <div  class="flex flex-col items-center">
                   <el-button type="primary" class='m-4 w-44 h-20 text-gray-700' @click="buy(1)">我有域名，需要源代码</el-button>
                    <el-button type="primary" class='m-4 w-44 h-20 text-gray-700' @click="buy(2)">我有域名，需要模板</el-button>
                    <el-button type="primary" class='m-4 w-44 h-20 text-gray-700' @click="buy(3)">我没有域名，需要模板</el-button>
                </div>
               </el-card>
             
            </div>
        </el-main>
    </el-container>
</template>

