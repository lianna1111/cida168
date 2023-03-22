<script setup lang='ts'>
    import { ref,reactive,onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import type { UploadProps, UploadUserFile,FormInstance, FormRules } from 'element-plus'
    // import Examination from '@/api/Examination'
    import User from '@/api/user'
    import Education from '@/api/Education'
    import router from '@/router'
    import { useRoute } from 'vue-router'
   //省市区选择器
    import { EluiChinaAreaDht } from 'elui-china-area-dht'
    const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat


    const route = useRoute();
    const intentData=ref([{value:1,label:'会员'},{value:2,label:'理事'},{value:3,label:'常务理事'}])
    const educationData=ref([{ID:0,Title:''}])
    const identityData=ref([{value:1,label:'群众'},{value:2,label:'团员'},{value:3,label:'党员'}])
    const ruleFormRef = ref<FormInstance>()
    
    const formLabelWidth = ref(120)
    const src =import.meta.env.VITE_API_BASEURL+'upload?path=user'//图片上传地址
    const active = ref(0)
    

    let ruleForm = reactive({
        id:0,uid:'',type:8,//type:8艺术协会会员
        realname:'', gender:'1', person_intent:'',political_identity:'', idcard:'', brith:'',mobile:'',idcard_front:'', idcard_back:'',nation:'',
        province_id:'',city_id:'',district_id:'',address:'', email:'',unit:'',position:'',education_id:'',
        content:''
    })
    
    ruleForm .uid = localStorage.getItem('uid')as string

    const rules = reactive<FormRules>({
        realname: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  person_intent: [{required: true,message: '请选择意向',trigger: 'blur',},],
  gender: [{required: true,message: '请选择性别',trigger: 'blur',},],
  idcard: [{ required: true, message: '请输入身份证号', trigger: 'blur' },{ min: 18, max: 19, message: '请输入正确身份证号', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }, { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' },],
  idcard_front: [{ required: true, message: '请上传身份证正面', trigger: 'blur' },],
  idcard_back: [{ required: true, message: '请上传身份证反面', trigger: 'blur' },],
  province_id: [{ required: true, message: '请选择省市区', trigger: 'blur' },],
  address: [{ required: true, message: '请输入具体地址', trigger: 'blur' },],

})

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
       await getUserStatus()
       await getEducation()

    }
    const getUserStatus=()=>{
        if(!route.params.status){
        User.get(Number(localStorage.getItem('uid'))).then((res:any)=>{
            if (res.data.data.is_auth==8){
                router.push({name:'member/zone',params:{uid:res.data.data.uid}})
               setTimeout(() => {
                 window.location.reload()
               }, 200);
            }
        })
    }
    }
    const getEducation=()=>{
        Education.get().then((res:any)=>{
            if (res.data.code==0){
               educationData.value=res.data.data
            }
        })
    }
    
    
    const next = () => {
    if (active.value++ > 2) active.value = 0
    }
    const previous=()=>{
        active.value--
    }
    const onChange=(e:any)=>{
        ruleForm.province_id = chinaData[e[0]].value
        ruleForm.city_id = chinaData[e[1]].value
        ruleForm.district_id = chinaData[e[2]].value
    }
    const handleIdCardFront: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .idcard_front = response.data.url
    }
    const handleIdCardBack: UploadProps['onSuccess'] = (response,uploadFile) => {
        ruleForm .idcard_back = response.data.url
        console.log(ruleForm .idcard_back)
    }
    const identityChange=(e:any)=>{
    console.log(e);
 }
 const educationChange=(e:any)=>{
    console.log(e);
 }

    const submitForm = async (formEl: FormInstance | undefined) => {   
          User.auth(ruleForm).then((res)=>{
                    if(res.data.code === 0){
                        ElMessage('申请成功')
                        setTimeout(()=>{
                            router.push({path:'/zone'})
                        },500)
                    }else{
                        ElMessage(res.data.msg)
                        return false
                    }
                });
                 if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
            console.log('submit!')
             console.log(ruleForm);
             
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
        </el-steps>

        <!-- add -->
        <div class="m-auto my-5">
                <el-form ref="ruleFormRef"  :rules="rules" :model="ruleForm" size="large" :label-width="formLabelWidth">
                    <template v-if="active==0">
                        <el-form-item label="姓名：" prop='realname'>
                    <el-col :md="9" :span="18" >
                        <el-input v-model="ruleForm .realname" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="性别：" prop='gender'>
                    <!-- 0男1女 -->
                    <el-col :md="9" :span="18">
                        <div class="mb-2 flex items-center text-sm">
                            <el-radio-group v-model="ruleForm.gender" class="ml-4">
                                <el-radio label="1" size="large">男</el-radio>
                                <el-radio label="2" size="large">女</el-radio>
                            </el-radio-group>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item label="申请意向：" prop='person_intent' >
                    <!-- 0群众1党员2团员 -->
                    <el-col :md="9" :span="18">
                        <el-select v-model="ruleForm .person_intent" class="m-2" placeholder="请选择">
                            <el-option v-for="item in intentData" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="省市区：" prop="province_id">
                    <el-col :md="9" :span="18">
                        <!-- <el-form-item label="省/市/区" prop="addr"> -->
                        <elui-china-area-dht @change="onChange" placeholder="请选择" ></elui-china-area-dht>
                        <!-- <el-cascader size="large" :options="options" v-model="ruleForm.selectedOptions" @change="handleChange"></el-cascader> -->
                    </el-col>
                </el-form-item>
                <el-form-item label="具体地址：" prop="address">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm.address" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobile">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .mobile" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idcard" >
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .idcard" autocomplete="off"/>
                    </el-col>
                </el-form-item>
              
                <el-form-item label="身份证正面：" prop="idcard_front">
                    <el-col :md="9" :span="18">
                        <el-upload
                            class="avatar-uploader"
                            :action='src'
                            :show-file-list="false"
                            :on-success="handleIdCardFront"
                        >
                            <img v-if="ruleForm.idcard_front" :src="ruleForm.idcard_front" class="avatar" />
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
                            :on-success="handleIdCardBack"
                        >
                            <img v-if="ruleForm .idcard_back" :src="ruleForm .idcard_back" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-col>
                </el-form-item>
                        <el-button class="mt-3 text-center bg-red-500"  type="danger" @click="next">下一步</el-button>
                    </template>

 <!-- 第二页 -->
                    <template v-if="active==1">
                <el-form-item label="政治面貌：" prop='political_identity' >
                    <!-- 0群众1党员2团员 -->
                    <el-col :md="9" :span="18">
                        <el-select v-model="ruleForm .political_identity" class="m-2" placeholder="请选择">
                            <el-option v-for="item in identityData" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="民族：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .nation" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="最高学历：">
                    <el-col :md="9" :span="18">
                        <el-select v-model="ruleForm .education_id" class="m-2" placeholder="请选择">
                            <el-option v-for="item in educationData" :key="item.ID" :label="item.Title" :value="item.ID" />
                        </el-select>
                      </el-col>
                </el-form-item>
                <el-form-item label="所在单位：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .unit" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="职务或职称：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .position" autocomplete="off" />
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm .email" autocomplete="off" />
                    </el-col>
                </el-form-item>
              
                <el-form-item label="个人简历：">
                    <el-col :md="9" :span="18">
                        <el-input v-model="ruleForm.content" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>
                    </el-col>
                </el-form-item>
                <el-button class="mt-3 text-center" @click="previous">上一步</el-button>
                <el-button class="mt-3 text-center bg-red-500"  type="danger" @click="next">下一步</el-button>
            </template>
                    </el-form>
            <!-- <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" class="bg-blue-500 text-white" @click="submit">确定</el-button>
                </span>
            </template> -->
             <!-- 第二页 -->
             <template v-if="active==2">
                
            <div class="mt-10 text-center">
                <p class="text-xl p-4 my-40">本人自愿加入湖南省艺术培训协会，并依据协会章程的规定，行驶权力，承担义务。</p>
                <el-button class="mt-3 mr-2 text-center" @click="previous">上一步</el-button>
                <span class="dialog-footer">
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