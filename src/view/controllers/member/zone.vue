<script setup lang="ts">
  import { ref,reactive,onMounted } from 'vue'
  import User from '@/api/user'
  import Message from '@/api/Message'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { UploadProps } from 'element-plus'
    import { useRouter } from 'vue-router'
    const router = useRouter();
    
  const src =import.meta.env.VITE_API_BASEURL+'upload?path=user'//图片上传地址
  
    const userData=ref({realname:'',nickname:'',face:'',mobile:'',gender:0,birth:'',address:'',content:'',idcard:'',idcard_front:'',idcard_back:'',is_auth:'',})
    const type=ref(1)
    const messageData=ref()
    const ordered=ref()
    const dialogFormVisible = ref(false)
    const dialogCardVisible = ref(false)
    const formLabelWidth = '120px'
    const face=ref();const idcard_front=ref();const idcard_back=ref()
    const form = reactive({uid:localStorage.getItem('uid'),is_auth:0,face:'',idcard:'',realname:'',nickname:'',address:'',content:'',idcard_front:'',idcard_back:''})

onMounted(async ()=>{
        await init()
    })

    const init = async () => {
       await getUserStatus()
       await getMessage()
    }
    //用户基本信息
    const getUserStatus=()=>{
        User.get(Number(localStorage.getItem('uid'))).then((res:any)=>{
            userData.value=res.data.data
            form.is_auth=res.data.data.is_auth
            console.log(res.data.data);
        })
    }
//用户留言
    const getMessage=()=>{
        Message.get(Number(localStorage.getItem('uid'))).then((res:any)=>{
        if(res.data.code==0){
            messageData.value=res.data.data
        }
      })
    }
    //修改全部信息
    const modInfo=()=>{
        if(form.is_auth==8){ router.push({name:'member/apply',params:{status:1}})}
       else  if(form.is_auth==9){ router.push({name:'member/application',params:{status:1}})}
    }
    //图片上传
const handleFaceSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  face.value = URL.createObjectURL(uploadFile.raw!)
  form.face = response.data.url
}
const beforeFaceUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {ElMessage.error('图片大小不得超过2MB!');return false}
  return true}

  const handleCardFSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
    idcard_front.value = URL.createObjectURL(uploadFile.raw!)
    form.idcard_front = response.data.url
}
const beforeCardFUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {ElMessage.error('图片大小不得超过2MB!');return false}
  return true}

  const handleCardBSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
    idcard_back.value = URL.createObjectURL(uploadFile.raw!)
    form.idcard_back = response.data.url
}
const beforeCardBUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {ElMessage.error('图片大小不得超过2MB!');return false}
  return true}
    //修改
    const mod=()=>{
        dialogFormVisible.value = false
        dialogCardVisible.value = false
        User.mod(form).then((res:any)=>{
            console.log(res);
        })
    }
</script>

<template>
    <el-row class="mt-16">
    <!-- left -->
        <el-col :span="8">
        <!-- header -->
        <div class="m-auto text-center">
            <el-avatar :src="userData.face" size="large" />
            <div>绑定手机：{{userData.mobile}}</div>
        </div>
        <div class="mt-20 md:ml-8">
            <span class="text-red-700 text-sm md:text-base"><font-awesome-icon class="mr-1" icon="fa-user-circle" /></span><span>账号管理</span>
            <div class="ml-5 mt-2 cursor-default text-sm md:text-base" @click="type=1" :class="type==1?'text-red-700':''">个人资料</div>
            <div class="ml-5 my-2 mb-4 cursor-default  text-sm md:text-base" @click="type=2" :class="type==2?'text-red-700':''">身份认证</div>
            <span class="text-red-700 text-sm md:text-base"><font-awesome-icon class="mr-1" icon="fa-chess-queen" /></span><span>账号管理</span>
            <div class="ml-5 mt-2 cursor-default text-sm md:text-base" @click="type=3"  :class="type==3?'text-red-700':''">{{userData.is_auth=='8'?"会员申请":"会员单位申请"}}</div>
            <div class="ml-5 mt-2 cursor-default text-sm md:text-base" @click="type=4" :class="type==4?'text-red-700':''">会员地图</div>
            <div class="ml-5 mt-2 cursor-default text-sm md:text-base" @click="type=5" :class="type==5?'text-red-700':''">我的留言</div>
            <div class="ml-5 mt-2 cursor-default text-sm md:text-base" @click="type=6" :class="type==6?'text-red-700':''">我的发票</div>
        </div>
        </el-col>
    <!-- right -->
        <el-col :span="16">
            <template v-if="type==1">
                <div class="flex justify-between border-b-2 p-2">
                    <div>个人资料</div>
                    <div class="text-red-700 cursor-pointer" @click="dialogFormVisible = true">编辑资料</div>
                </div>
                <el-row class="my-8"><el-col :md="4">头像:</el-col>  <el-avatar :src="userData.face" size="large" /></el-row>
                <el-row class="my-8"><el-col :md="4">姓名:</el-col> {{ userData.realname }}</el-row>
                <el-row class="my-8"><el-col :md="4">昵称:</el-col> {{ userData.nickname }}</el-row>
                <el-row class="my-8"><el-col :md="4">性别:</el-col> {{ userData.gender==1?'男':'女' }}</el-row>
                <el-row class="my-8"><el-col :md="4">出生日期:</el-col> {{ userData.birth }}</el-row>
                <el-row class="my-8"><el-col :md="4">详细地址:</el-col> {{ userData.address }}</el-row>
                <el-row class="my-8"><el-col :md="4">个人简介:</el-col> {{ userData.content }}</el-row>
            </template>
<!-- dialog -->
            <el-dialog v-model="dialogFormVisible" title="修改个人资料">
                <el-form :model="form">
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-upload
                    class="avatar-uploader"
                    :action="src"
                    :show-file-list="false"
                    :on-success="handleFaceSuccess"
                    :before-upload="beforeFaceUpload"
                >
                    <img v-if="face" :src="face" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.realname" autocomplete="off" />
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off" />
                </el-form-item>
               <el-form-item label="详细地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off" />
                </el-form-item>
                <el-form-item label="个人简介" :label-width="formLabelWidth">
                    <el-input v-model="form.content" type='textarea' autocomplete="off" />
                </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                    <el-button type="primary" class="bg-blue-600" @click="mod">修改</el-button>
                </span>
                </template>
            </el-dialog>
            
            <template v-if="type==2">
                <div class="flex justify-between border-b-2 p-2">
                    <div>身份认证</div>
                    <div class="text-red-700 cursor-pointer"  @click="dialogCardVisible = true">编辑资料</div>
                </div>
                <el-row class="my-8"><el-col :md="4">证件类型:</el-col> 国内身份证</el-row>
                <el-row class="my-8"><el-col :md="4">姓名:</el-col> {{ userData.realname }}</el-row>
                <el-row class="my-8"><el-col :md="4">证件号:</el-col> {{ userData.idcard }}</el-row>
                <el-row class="my-8"><el-col :md="4">证件照:</el-col>  
                <el-col :md="20" class="flex flex-col">  <el-image :src="userData.idcard_front" class="md:w-96 md:mb-8" />
                    <el-image :src="userData.idcard_back" class="md:w-96"/></el-col>  
                </el-row>
            </template>
<!-- dialog -->
<el-dialog v-model="dialogCardVisible" title="修改身份信息">
                <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.realname" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.idcard" autocomplete="off" />
                </el-form-item>
               <el-form-item label="身份证照" :label-width="formLabelWidth">
                <el-upload
                    class="avatar-uploader mr-2"
                    :action="src"
                   :show-file-list="false"
                    :on-success="handleCardFSuccess"
                    :before-upload="beforeCardFUpload"
                >
                    <img v-if="idcard_front" :src="idcard_front" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <el-upload
                    class="avatar-uploader"
                    :action="src"
                   :show-file-list="false"
                    :on-success="handleCardBSuccess"
                    :before-upload="beforeCardBUpload"
                >
                    <img v-if="idcard_back" :src="idcard_back" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogCardVisible = false">关闭</el-button>
                    <el-button type="primary" class="bg-blue-600" @click="mod">修改</el-button>
                </span>
                </template>
            </el-dialog>
            

            <template v-if="type==3">
                <div class="border-b-2 p-2">
                    <div>{{userData.is_auth=='8'?"会员申请":"会员单位申请"}}</div>
                </div>
                <template class="flex justify-around md:flex-nowrap flex-wrap mt-8 text-gray-500">
                    <div class="m-auto border border-gray-300 rounded-sm text-center md:w-40"><p class="text-red-700 py-3"><font-awesome-icon icon="fa-edit" class="block m-auto border-red-700 border-2 p-2 text-2xl rounded-3xl my-1"/>已提交</p><p class="text-sm">申请加入</p><el-button class="text-red-700 my-6" type="danger" @click="modInfo">修改信息</el-button></div>
                    <font-awesome-icon class="my-auto" icon="fa-angle-double-right" />
                    <div class="m-auto border border-gray-300 rounded-sm text-center md:w-40"><p class="py-3"><font-awesome-icon icon="fa-donate" class="block m-auto border-gray-500 border-2 p-2 text-2xl rounded-3xl my-1"/>未支付</p><p class="text-sm">待支付入会费用</p><el-button class="text-red-700 my-6"   type="danger">去支付</el-button></div>
                    <font-awesome-icon class="my-auto" icon="fa-angle-double-right" />
                    <div class="m-auto border border-gray-300 rounded-sm text-center md:w-40"><p class="py-3"><font-awesome-icon icon="fa-stamp"  class="block m-auto border-gray-500 border-2 p-2 text-2xl rounded-3xl my-1"/>未审核</p><p class="text-sm">等待人工审核身份信息</p><div class="text-red-700 my-20"></div></div>
                    <font-awesome-icon class="my-auto" icon="fa-angle-double-right" />
                    <div class="m-auto border border-gray-300 rounded-sm text-center md:w-40"><p class="py-3"><font-awesome-icon icon="fa-check-square"  class="block m-auto border-gray-500 border-2 p-2 text-2xl rounded-3xl my-1"/>未加入</p><p class="text-sm">未加入</p><div class="text-red-700 my-20"></div></div>
                
                </template>
                  
             </template>
            <template v-if="type==4">
                <div class=" border-b-2 p-2 mb-8">
                    <div>会员地图</div>
                </div>
                <el-col :span="16" >
                    <el-image style="width: 100%;" fit="fill" src="https://appwk.baidu.com/naapi/doc/view?ih=5253&o=jpg_6_0_______&iw=4623&ix=0&iy=0&aimw=4623&rn=1&doc_id=8cb1b9305a8102d276a22fdf&pn=1&sign=40b8819543e3a8224c851da6ecd1ee08&type=1&app_ver=2.9.8.2&ua=bd_800_800_IncredibleS_2.9.8.2_2.3.7&bid=1&app_ua=IncredibleS&uid=&cuid=&fr=3&Bdi_bear=WIFI&from=3_10000&bduss=&pid=1&screen=800_800&sys_ver=2.3.7" alt=""/>
                </el-col>
                <el-col :span="8">
                    <el-table  border header-cell-class="bg-red-700">
                    <el-table-column prop="adress" label="地区" width="80" />
                    <el-table-column prop="count" label="会员人数(人)" width="120" />
                </el-table>
            </el-col>
           </template>
           <template v-if="type==5">
                <div class="border-b-2 p-2">
                    <div>留言记录</div>
                </div>
                <template v-if="messageData">
                    <element-table :items="messageData" :isquestion="1" :iszone="1"/>
                    <div>
                        
                    </div>
                </template>
                <el-empty v-else description="这里暂时没有内容" 
              image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/>
               
           </template>
           <template v-if="type==6">
                <div class=" border-b-2 p-2">
                    <div>订单记录</div>
                </div>
                <template v-if="ordered">
                    <div>
                        
                    </div>
                </template>
                <el-empty v-else description="这里暂时没有内容" 
              image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"/>
               
               
           </template>
        </el-col>
    </el-row>

</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>