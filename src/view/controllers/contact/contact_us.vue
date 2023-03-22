<script setup lang="ts">
import { reactive, ref ,onMounted} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import { useRoute } from 'vue-router';
import WebNav from '@/api/WebNav'
import Message from '@/api/Message'
import { ElMessage } from 'element-plus'
import router from '@/router';
const cid=import.meta.env.VITE_CID
const pid=ref(7)
const aid=ref(17)
const item=ref([])

const formLabelWidth = ref('120px')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({uid:Number(localStorage.getItem('uid')),cid:import.meta.env.VITE_CID,classify: '',username:'', title: '',content:'',is_open:''})
const rules = reactive<FormRules>({
    title: [{ required: true, message: '请填写留言标题', trigger: 'blur' },],
    classify: [{required: true,message: '请选择分类',trigger: 'change',},],
    is_open: [{required: true,message: '请选择是否公开',trigger: 'change',},],
    content: [{ required: true, message: '请填写留言内容', trigger: 'blur' },],
})
onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNav()
    }
    const getNav= ()=> {
        WebNav.pid(pid.value).then((res:any)=>{
          item.value = res.data.data
            console.log(res.data.data,'item1');
            
        }).catch((res)=>{
            console.log(res)
        })
    }
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm,'submit!')
      Message.save(ruleForm).then((res:any)=>{
        console.log(res,'msg');
        if(res.data.code==0){
          ElMessage({message: '留言成功！',type: 'success'})
          setTimeout(() => {
          router.push({ name: "contact"});
          window.location.reload()
          }, 200);
        }
      })
    } else {
      console.log('error submit!', fields)
      ElMessage({message: '请填写必填项！',type: 'warning'})

    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
    <el-row>
      <element-nav :pid="pid" :aid="aid" :items="item" :right="0"  />

        <el-col :md="16">
        <!-- title -->
        <div class="w-52 md:mt-24 h-0.5 m-auto bg-red-600 text-center">
            <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">答复列表</div>
        </div>
        <!-- main -->
          <div class="my-5">进行留言</div>
          <el-form class="px-5" ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large" :label-width="formLabelWidth">
            <el-form-item label="分类" prop="classify">
                <el-radio-group v-model="ruleForm.classify">
                    <el-radio label="咨询" />
                    <el-radio label="建议" />
                    <el-radio label="其他" />
                </el-radio-group>
             </el-form-item>
            <el-form-item label="留言标题：" prop="title">
                <el-col :span="16">
                    <el-input v-model="ruleForm.title" autocomplete="off" />
                </el-col>
            </el-form-item>
            <el-form-item label="留言内容：" prop="content">
                <el-input v-model="ruleForm.content" type="textarea" autocomplete="off" />
            </el-form-item>
            <el-form-item label="联系人：(姓名+电话)">
                <el-input v-model="ruleForm.username"  autocomplete="off" />
            </el-form-item>
            
            <el-form-item label="是否公开：" prop="is_open">
                <el-switch v-model="ruleForm.is_open" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bg-red-700" @click="submitForm(ruleFormRef)">
                    留言
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
             </el-form-item>
        </el-form>
        </el-col>

    </el-row>

</template>

<style scoped>
</style>