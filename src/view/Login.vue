<script setup lang="ts">
    import router from '@/router'
    import { require } from '@/util/require';
    import { ref,reactive,onMounted } from 'vue'
    import { ElMessage,ElMessageBox } from 'element-plus'
    import { Iphone, User as Users,ChatDotRound } from '@element-plus/icons-vue'
    import FingerprintJS from '@fingerprintjs/fingerprintjs'
    import User from '@/api/User'
    import Config from '@/api/Config'

    import { setLogin } from '@/util/main'
    import { UserObj } from '@/util/interface'
    const homeUrl=ref('/rt/')
    const baseUrl = import.meta.env.VITE_API_BASEURL;
    const tagIndex = ref(false)
    const dialogVisible = ref(false)
    const random = ref('')
    const issend = ref(true)
    const sendText = ref('发送验证码')
    const form = reactive({username:'admin', password:'Admin@dacK2022ou',nickname:'',mobile:'',visitorid:'', numcode:'', smscode:'', type:'username',token:''})
    const pic=ref()
    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await setVisitor()
        await getConfig()

    }

    // 设置visitor
    const setVisitor = async () => {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        form.token = result.visitorId
    }
    const getConfig=()=>{
    Config.get().then((res:any)=>{
          pic.value=res.data.data.pic
              
        })
}
    // 发送验证码
    const send = (time = 30) => {
        
    }

    // 提交登录
    const onSubmit = () => {
        User.login(form).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 0){
                ElMessage('登录成功!')
                setLogin(res.data.data as unknown as UserObj)
                    
                setTimeout(()=>{
                    router.push(homeUrl.value)
                },1000)
            }else{
                ElMessage(res.data.msg)
                random.value = Math.random().toString().split('.').pop() as string
                return false
            }
        }).catch((res)=>{
            console.log(res)
        })
    }

    // 忘记密码
    const forget = (e:any) => {
        return false
    }

    // 第三方登录
    const third = (type:string) => {
        switch(type){
            case 'wechat':
                break;
            case 'qq':
                break;
            case 'weibo':
                break;
            default:
                
        }
    }
</script>

<template>
    <el-container class="h-screen" style=" background-image: linear-gradient(rgb(242,242,242), rgb(208,208,208));">
        <el-header class="flex items-center">
            <div class="container md:mx-20">
                <div class="flex items-center">
                    <a :href="homeUrl"><i class="fa fa-chevron-left" /> <font-awesome-icon class="mr-1" icon="fa-chevron-left" />返回首页</a>
                </div>
            </div>
        </el-header>
        <el-main >
            <div class="container m-auto md:w-3/4 mt-10 md:mt-0 ">
                <el-row class=" border rounded-xl">
                    <el-col :md="12" class="logo">
                        <el-image :src="pic" alt="" class="logo  rounded-l-xl"/>
                    </el-col>
                    <el-col :md="12"  class=" bg-white md:rounded-l-none rounded-xl p-5 ">
                        <div class="my-8 text-center text-red-700 text-3xl font-bold">用户登录</div>
                         <div>
                            <div class="flex justify-between my-16 mx-12">
                                <h4 :class="['cursor-pointer pb-2 text-gray-400',!tagIndex?'active':'']" @click="tagIndex = !tagIndex">账号登录</h4>
                                <h4 :class="['cursor-pointer pb-2 text-gray-400',tagIndex?'active':'']" @click="tagIndex = !tagIndex">短信登录</h4>
                            </div>

                            <el-form :model="form" size="large" class="mt-8 mx-2">
                                <el-form-item>
                                    <el-input v-model.trim="form.username" class="" :placeholder="!tagIndex?'用户名/手机号码':'手机号码'" :prefix-icon="Users" clearable />
                                </el-form-item>
                                <el-form-item v-if="!tagIndex">
                                    <el-input v-model.trim="form.password" class="" placeholder="您的密码" :prefix-icon="Iphone" show-password clearable />
                                </el-form-item>
                                <el-form-item v-if="!tagIndex">
                                    <div class="flex justify-between item-center">
                                        <el-input v-model="form.numcode" placeholder="验证码" :prefix-icon="ChatDotRound" />
                                        <img :src="baseUrl+'captcha?token='+form.token+'&r='+random" class="cursor-pointer w-[130px] ml-2" @click="random=Math.random().toString().split('.').pop() as string" alt="">
                                    </div>
                                </el-form-item>
                                <el-form-item class="relative" v-else>
                                    <el-input v-model="form.smscode" placeholder="短信验证码" :prefix-icon="Iphone" />
                                    <h5 class="absolute right-5 inline-block text-blue-500 cursor-pointer" @click="send(30)">{{sendText}}</h5>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="w-full mt-5 rounded-2xl h-12  text-white hover:text-slate-100 btn-submit" @click="onSubmit">登 录</el-button>
                                </el-form-item>
                                <div class="-mt-3 flex justify-between mx-1" v-if="!tagIndex">
                                    <span class="text-sm cursor-pointer" @click="forget">忘记密码</span>
                                   <span>没有账号？ <router-link  class="text-sm text-red-700 cursor-pointer" to="reg">立即注册</router-link> </span>
                                    
                                </div>

                        
                            </el-form>
                        </div>
                    </el-col>

                </el-row>
               
            </div>
        </el-main>
     
    </el-container>
</template>

<style lang="scss" scoped>
.logo{
    height: 600px;
    width: 100%;
    @media (max-width: 600px) { display: none;}
}
    .el-main{
        background-repeat: no-repeat;
        background-size: 100% 100%;
       
    }
    .active{
        color: #333;
        border-bottom: 2px solid #fd6589;
    }
    .el-button.btn-submit{
        background-image: linear-gradient(to left,#b50a0a,#f63643);
        border: unset;
    }
</style>