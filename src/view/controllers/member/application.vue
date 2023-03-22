<script setup lang='ts'>
    import { ref,reactive,onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import type { UploadProps, UploadUserFile,FormInstance, FormRules } from 'element-plus'
    // import Examination from '@/api/Examination'
    import User from '@/api/User'
    import Unit from '@/api/Unit'
    import router from '@/router'
    import { useRoute } from 'vue-router'
       //省市区选择器
       import { EluiChinaAreaDht } from 'elui-china-area-dht'
    const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
    const route = useRoute();

    const active = ref(0)
    const formLabelWidth = ref(120)
    const imageUrl = ref('')
    const btnDisable =ref(false)
    const btnText=ref('点击上传')
    const src =import.meta.env.VITE_API_BASEURL+'upload?path=examination'//图片上传地址
    const imageUrl1 = ref('')
    const btnDisable1 =ref(false)
    const btnText1=ref('点击上传')
    const selectedOptions = ref([])
    const unitData=ref([{id:0,title:''}])
    const intentionData=ref([{id:0,title:''}])

    const ruleFormRef = ref<FormInstance>()
    let ruleForm = reactive({
        id:0,type:9,title:'',//企业名称
        nature_id:'',intention_id:'',description:'', //logo:'',pic:'',picture:[],
       credit_code:'',business_license:'',
        realname:'',idcard:'',mobile:'', idcard_front:'',
        idcard_back:'',website:'',telphone:'',
        contact:'',contact_card:'',contact_card_front:'',contact_card_back:'',
        contact_mobile:'',contact_email:'',province_id:'',
        city_id:'',district_id:'',address:'',content:'',
        uid:'',
        selectedOptions:''
    })
    if(route.query.id){
    }
    ruleForm .uid = localStorage.getItem('uid')as string

    const rules = reactive<FormRules>({
        title: [
    { required: true, message: '请输入企业简称', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ], 
  intention_id: [{required: true,message: '请选择申请意向',trigger: 'blur',},],
  nature_id: [{required: true,message: '请选择单位性质',trigger: 'blur',},],
  credit_code: [{required: true,message: '请输入信用代码',trigger: 'blur',},],
  business_license: [{ required: true, message: '请上传营业执照', trigger: 'blur' },],
  realname: [{ required: true, message: '请输入法人姓名', trigger: 'blur' },],
  idcard: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' },],
  mobile: [{ required: true, message: '请输入法人电话', trigger: 'blur' },],
  idcard_front: [{ required: true, message: '请上传法人身份证正面', trigger: 'blur' },],
  idcard_back: [{ required: true, message: '请上传法人身份证反面', trigger: 'blur' },],
  selectedOptions: [{ required: true, message: '请选择省市区', trigger: 'blur' },],
  address: [{ required: true, message: '请输入具体地址', trigger: 'blur' },],

})



    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
       await getUserStatus()
       await getUnitNature()
       await getUnitIntent()
    }
    const getUserStatus=()=>{
        if(!route.params.status){
        User.get(Number(localStorage.getItem('uid'))).then((res:any)=>{
            
            if (res.data.data.is_auth==9){
                router.push({name:'member/zone',params:{uid:res.data.data.uid}})
               setTimeout(() => {
                window.location.reload()
               }, 200);
            }
        })
    }
    }
       
    const getUnitNature=()=>{
        Unit.nature().then((res:any)=>{
            console.log(res.data.code,res.data.data,'nature');
            
            if (res.data.code==0){
                unitData.value=res.data.data
            }
        })
    }
    const getUnitIntent=()=>{
        Unit.intent().then((res:any)=>{
            if (res.data.code==0){
                intentionData.value=res.data.data
            }
        })
    }
       
    const next = () => {
    if (active.value++ > 3) active.value = 0
    }
    const previous=()=>{
        active.value--
    }
    const onChange=(e:any)=>{
        ruleForm.province_id = chinaData[e[0]].value
        ruleForm.city_id = chinaData[e[1]].value
        ruleForm.district_id = chinaData[e[2]].value
    }
    // const handleLogo: UploadProps['onSuccess'] = (response,uploadFile) => {
    //     ruleForm .logo = response.data.url
    // }

    // const handlePic: UploadProps['onSuccess'] = (response,uploadFile) => {
    //     ruleForm .pic = response.data.url
    // }

    const handleLegalCardFront: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .idcard_front = response.data.url
    }
    const handleLegalCardBack: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .idcard_back = response.data.url
        console.log(ruleForm .idcard_back)
    }
    const handleBusinessLicense: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .business_license = response.data.url;
        console.log(ruleForm .idcard_back)
    }
    const handleContactCardFront: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .contact_card_front = response.data.url;
        console.log(ruleForm .idcard_back)
    }
    const handleContactCardBack: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .contact_card_back = response.data.url;
        console.log(ruleForm .idcard_back)
    }
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    // ruleForm .picture
    }
    const handlePreview: UploadProps['onPreview'] = (file) => {
    console.log(file)
    }


 
    const submitForm = async (formEl: FormInstance | undefined) => {    
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
            console.log('submit!')
             console.log(ruleForm);
                User.auth(ruleForm).then((res)=>{
                    if(res.data.code === 0){
                        ElMessage('申请成功')
                        setTimeout(()=>{
                            router.push({path:'/member/zone'})
                        },500)
                    }else{
                        ElMessage(res.data.msg)
                        return false
                    }
                })
            } else {
            console.log('error submit!', fields)
            ElMessage( {message: "请填写必填项",type: 'warning' })
            }
        })
    }
        
    const goback =()=>{
        router.go(-1)
    }
</script>

<template>

<div class="">

        <div  class="text-center m-10">会员单位申请</div> 
        <el-steps :active="active" align-center>
            <el-step title="第一步" />
            <el-step title="第二步"  />
            <el-step title="第三步"  />
            <el-step title="第四步"  />
        </el-steps>

        <!-- add -->
        <div class="m-auto my-5">
                <el-form ref="ruleFormRef"  :rules="rules" :model="ruleForm" size="large" :label-width="formLabelWidth">
                    <template v-if="active==0">
                <el-form-item label="机构名称：" prop='title'>
                    <el-col :md="9" :span="18" >
                        <el-input v-model="ruleForm .title" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="机构全称：" prop='full_title'>
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .full_title" autocomplete="off" />
                    </el-col>
                </el-form-item> -->
                <el-form-item label="单位性质：" prop='nature_id' >
                    <el-col :md="9" :span="18">
                        <el-select v-model="ruleForm.nature_id" class="m-2" placeholder="请选择">
                            <el-option v-for="item in unitData" :key="item.id" :label="item.title" :value="item.id" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="申请意向：" prop='intention_id' >
                    <el-col :md="9" :span="18">
                        <el-select v-model="ruleForm.intention_id" class="m-2" placeholder="请选择">
                            <el-option v-for="item in intentionData" :key="item.id" :label="item.title" :value="item.id" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="企业简介：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .content" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="logo：">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleLogo"
                        >
                            <img v-if="ruleForm .logo" :src="ruleForm .logo" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handlePic"
                        >
                            <img v-if="ruleForm .pic" :src="ruleForm .pic" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item> 
                <el-form-item label="图片组：">
                    <el-col :md="9" :span="18">
                        <el-upload
                            v-model:file-list="ruleForm .picture"
                            class="upload-demo"
                            :action='src'
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            list-type="picture"
                        >
                            <el-button type="primary" class="bg-blue-400">点击上传</el-button>
                           
                        </el-upload>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="信用代码：" prop="credit_code" >
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .credit_code" autocomplete="off"/>
                    </el-col>
                </el-form-item>
                <el-form-item label="营业执照：" prop="business_license">
                    <el-col :md="9" :span="18">
                        <!-- <el-input v-model="ruleForm .business_license" autocomplete="off" /> -->
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleBusinessLicense"
                            
                        >
                            <img v-if="ruleForm .business_license" :src="ruleForm .business_license" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                    <el-form-item label="省市区：" prop="selectedOptions">
                    <el-col :md="9" :span="18">
                        <elui-china-area-dht @change="onChange" placeholder="请选择" ></elui-china-area-dht>
                    </el-col>
                </el-form-item>
                <el-form-item label="具体地址：" prop="address">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm.address" autocomplete="off" />
                    </el-col>
                </el-form-item>  
                <el-button class="mt-3 text-center bg-red-500"  type="danger" @click="next">下一步</el-button>
            </template>

<!-- 第二页 -->
                   <template v-if="active==1">
                <el-form-item label="法人代表：" prop="realname">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .realname" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="法人身份证：" prop="idcard">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .idcard" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="法人手机号：" prop="mobile">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .mobile" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证正面：" prop="idcard_front">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleLegalCardFront"
                        >
                            <img v-if="ruleForm .idcard_front" :src="ruleForm .idcard_front" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证反面：" prop="idcard_back">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleLegalCardBack"
                        >
                            <img v-if="ruleForm .idcard_back" :src="ruleForm .idcard_back" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-button class="mt-3 text-center" @click="previous">上一步</el-button>
                <el-button class="mt-3 text-center bg-red-500"  type="danger" @click="next">下一步</el-button>
          
            </template>

<!-- 第3页 -->
                   <template v-if="active==2">
                <el-form-item label="联系人：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .contact" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="联系人身份证：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .contact_card" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证正面：">
                    <el-col :md="9" :span="18">
                        <!-- <el-input v-model="ruleForm .contact_card_front" autocomplete="off" /> -->
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleContactCardFront"
                        >
                            <img v-if="ruleForm .contact_card_front" :src="ruleForm .contact_card_front" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证反面：">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleContactCardBack"
                        >
                            <img v-if="ruleForm .contact_card_back" :src="ruleForm .idcard_front" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系人电话：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .contact_mobile" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <!-- contact_email:'',,address:'',content:'', -->
                <el-form-item label="联系人邮箱：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .contact_email" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-divider content-position="left">其他</el-divider>
                <el-form-item label="网址：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .website" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="电话：(座机)">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .telphone" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <!-- <el-form-item label="热线：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .hotline" autocomplete="off" />
                    </el-col>
                </el-form-item> -->
                <el-form-item label="其他信息：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .description" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-button class="mt-3 text-center" @click="previous">上一步</el-button>
                <el-button class="mt-3 text-center bg-red-500"  type="danger" @click="next">下一步</el-button>
          
                </template>
            </el-form>
            <template v-if="active==3">
            <!-- <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
                </span>
            </template> -->
            <div class="mt-10 text-center">
                <p class="text-xl p-4 my-40">我（单位）自愿加入湖南省艺术培训协会，并依据协会章程的规定，行驶权力，承担义务。</p>
              
                <span class="dialog-footer">
                <el-button class="mt-3 mr-2 text-center" @click="previous">上一步</el-button>
                    <!-- <el-button @click="goback">取消</el-button> -->
                    <el-button type="primary" class="h-14 w-48 bg-red-700 border border-red-700 rounded-3xl text-white" @click="submitForm(ruleFormRef)">确定</el-button>
                </span>
            </div>
            </template>
      </div>
        
  </div>


</template>


<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
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