<script setup lang="ts">
import {ref,onMounted}  from 'vue'
import WebNav from '@/api/WebNav'
import Config from '@/api/Config'

    const cid=import.meta.env.VITE_CID
    const pid=ref(7)
    const aid=ref(16)
    const item=ref([])
    const title=ref('')

onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNav()
        getConfig()
    }
    const getNav= ()=> {
        WebNav.pid(pid.value).then((res:any)=>{
          item.value = res.data.data
            console.log(res.data.data,'item1');
            
        }).catch((res)=>{
            console.log(res)
        })
    }
   
    const getConfig=()=>{
    Config.get().then((res:any)=>{
          title.value=res.data.data.title
              
        })
}



</script>

<template>
    <el-row>
            <element-nav :pid="pid" :aid="aid" :items="item" :right="0"/>
        <el-col :md="16">
             <!-- title -->
        <div class="w-52  md:mt-24 h-0.5 m-auto bg-red-600 text-center">
            <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">我要留言</div>
        </div>
        <!-- main -->
         <div class="mt-10">留言须知</div>   
           <p>欢迎您进入{{title}}“公众留言”栏目，并就{{title}}职责范围内的问题进行咨询留言。为保障您的咨询留言得到有效反馈，请通过{{title}}进行注册并填写真实个人身份和联系信息。我们将对您的有效留言进行研究和答复并可能以不同方式向社会公开，如果您希望保护个人隐私，请在留言的同时做出声明，我们将充分尊重您的意愿并妥善处理。</p>  
           <p>留言前请先阅读以下条款：</p>
            <p>一、不得发表违反中华人民共和国宪法和法律的内容；</p>
            <p>二、不得发表造谣、诽谤他人的言论；</p> 
            <p>三、请勿发表任何形式的广告，企业推广产品或服务；</p> 
            <p>四、公众留言实行“一事一留言”，请勿一次同时提交多个问题或重复提交同一问题；</p> 
            <p>五、为了您的留言得到及时有效处理和回应，请填写真实信息，我们将根据留言情况及时通过本栏目或邮件方式予以答复,敬请留意。经核实身份和联系信息不实者，留言将按无效留言处理；</p> 
            <p>六、“公众留言”栏目不受理信访、投诉和举报等事项，如有此类内容，将作为无效留言处理，请您认真核对留言内容。</p> 
            <p>七、本栏目拥有发布、编辑、删除网上留言的权利，凡不符合本须知规定的留言将予以删除；</p> 
            <p>八、留言人承担一切因留言行为而直接或间接引起的法律责任；</p> 
            <p>九、如在本栏目留言，即表明已阅读并接受了上述各项条款。</p> 
            <p>  感谢您对{{title}}工作的关注、理解和支持！</p>
            <div class="m-auto text-center">
                <router-link :to="{ name: 'contact/contact_us' }" >
                 <el-button type="danger" class="bg-red-700 px-5 my-5" @click="">留言</el-button> 
            </router-link>      
            </div>
        </el-col>
   </el-row>

</template>

<style scoped>
p{
    margin: 30px 10px;
    font-weight: bold;
}
</style>