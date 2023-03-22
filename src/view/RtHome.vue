<script setup lang="ts">
import { ref ,reactive,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import {setLogout} from '@/util/main'
import WebNav from '@/api/WebNav'
import { useRouter } from 'vue-router';
import User from '@/api/User';
import Config from '@/api/Config';
const homeUrl=ref('/rt')
const router = useRouter()
//当前路由
const CurrentRoute=router.currentRoute.value.fullPath.substring(1)
const pid = ref(1)
const isCollapse = ref(false)
// level:1单级2多级0子级//number:1-有无子集//pid对应id 
const logo=ref()
const menuData=ref([])
const uid=localStorage.getItem('uid')
const nickname=localStorage.getItem('nickname')
const is_auth=ref(0)
onMounted(async ()=>{

        await init()

    })

const init = async () => {
        await getUserStatus()
        await getConfigData()
    }

    const setShowData = async (is_auth:number) => {
        WebNav.get(is_auth).then((res:any)=>{//刷新获取
            if(res.data.code === 0){
                console.log(res,'res');
                menuData.value = res.data.data as any
                
            }else{
                ElMessage(res.data.msg)
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }
    const getUserStatus=()=>{
        if(Number(localStorage.getItem('uid'))){
            User.get(Number(localStorage.getItem('uid'))).then((res:any)=>{
                setShowData(res.data.data.is_auth)
            })
        }else{
            setShowData(is_auth.value)
        }
    }
    const getConfigData = async () => {
        Config.get().then((res:any)=>{//刷新获取
            if(res.data.code === 0){
            logo.value=res.data.data.logo
            }
         })
    }
    
    const handleOpen = (key: string, keyPath: string[]) => {
        console.log('menu',key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
        console.log('menu',key, keyPath)
    }

    const handleSelect = (key: number, keyPath: string[]) => {
    }
    const login=()=>{
        router.push({name:'login'})
    }
    const reg=()=>{
        router.push({name:'reg'})
    }
    const logout=()=>{
        ElMessage('退出成功!')
        setLogout()
        router.push('/rt')
        setTimeout(() => {
            router.go(0)
        }, 200);
        // User.logout().then((res)=>{
        //     if(res.data.code == 0){
        //         ElMessage('退出成功!')
        //         setLogout()
        //     }
        // }).catch((res)=>{
        //     console.log(res)
        // })
    }
</script>
<template>
  <div class="flex flex-wrap md:no-wrap md:justify-between container md:w-9/12 w-full  md:mx-auto my-2">
    <el-image :src="logo" alt="" style="width:600px;height: 100px;" @click="router.push(homeUrl)"/>
   <template  v-if="uid">
   <!-- 退出登录 -->
   <div class="my-auto"> {{ nickname }} |<span class=" cursor-pointer ml-1 " @click="logout">退出登录 </span></div>
   </template>
   <template v-else>
    <div class="my-auto ml-5 cursor-pointer">
      <span @click="login">登录</span>
      /
      <span @click="reg">注册</span>
    </div>
   </template>
   
  </div>
  <!--    bgcolor,textColor,activeTextColor,listyle -->
  <element-menu   :items="menuData"  @handleSelect="handleSelect"></element-menu>
  <router-view class="md:w-5/6 w-full px-2 md:mx-auto" />
 <div class="my-10"></div>

</template>


<style lang="">


</style>