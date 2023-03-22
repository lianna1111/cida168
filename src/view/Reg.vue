<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import User from "../api/user";
import { Iphone, User as Users,ChatDotRound } from '@element-plus/icons-vue'
import Config from '@/api/Config'
const homeUrl=ref('/rt')
const router = useRouter();

const select = ref("");
const checkPassword = ref("");
const checkbtn = ref(false);
const pic=ref('')
// data
const form = reactive({
  username: "",
  password: "",
});

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await getConfig()

    }
    // const login = () => {
    //     router.push({name:"login"});
    // };
    const getConfig=()=>{
        Config.get().then((res:any)=>{
          pic.value=res.data.data.pic
    })}

// console.log(form, "submit!");

const onSubmit = () => {
  if (form.password != checkPassword.value) {
    ElMessage({
      message: "两次密码输入不一致，请重新输入！",
      type: "warning",
    });
    return
  }
  User.add(form)
    .then((res:any) => {
      console.log(res);
      if(res.data.code==0){
        ElMessage({message: res.data.msg});
        router.push({ path: "/login"});
      }else{
        ElMessage({message: res.data.msg});
      }
     
    })
    .catch((res:any) => {
      console.log(res);
    });
};
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
                        <div class="my-8 text-center text-red-700 text-3xl font-bold">用户注册</div>
                         <div>
                            <el-form :model="form" size="large" class="m-12 mx-2">
                                <el-form-item>
                                    <el-input v-model="form.username" class="my-2 mt-10" size="large"  :prefix-icon="Users"  placeholder="用户名(字母开头,5-15位数字、字母、_、-组成)"/>
                                </el-form-item>      
                                <el-form-item>
                                   <el-input v-model="form.password" class="my-2" size="large"  :prefix-icon="ChatDotRound"   type='password' placeholder="密码,长度6-16位"/>
                                </el-form-item>  
                                <el-form-item>
                                      <el-input v-model="checkPassword" class="my-2" size="large"  :prefix-icon="ChatDotRound"  type='password' placeholder="确认密码"/>
                                </el-form-item>    
                                <el-form-item>
                                    <el-button class="w-full mt-5 rounded-2xl h-12  text-white hover:text-slate-100 btn-submit" @click="onSubmit">注 册</el-button>
                                </el-form-item>
                                <div class="-mt-3 text-center mx-1">
                                    已有账号？
                                    <router-link  class="text-sm cursor-pointer text-red-700" to="login">立即登录</router-link>

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