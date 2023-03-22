<script lang="ts" setup>
  import { ref } from 'vue'
   import { contactList } from '@/util/interface'
  import {useRouter} from 'vue-router'
  import Message from '@/api/Message'
  const router =useRouter()
    const dialogVisible=ref(false)
    const reply=ref('')
    const props = withDefaults(defineProps<{
        items:contactList[],
        isquestion:number,
        iszone:number,
    }>(),{
      isquestion:0,
      iszone:0,
      
     })
     console.log(props.items,'fdaf');
     
const handleClick = (id: number) => {
  console.log(id)
  router.push({path:'/contact/detail',query:{id}})
}
const handleReply = (key: string, keyPath: string[]) => {
     //回复内容
}

// const emit = defineEmits(['handleClick'])



</script>


<template>
<i class="fal fa-universal-access" />
      <!-- title -->
      <div class="w-52  md:mt-24 h-0.5 m-auto bg-red-600 text-center" v-if="!iszone">
         <div class="z-10 -translate-y-2 m-auto text-red-600 w-28 bg-white font-bold">{{isquestion?'留言列表':'答复列表'}}</div>
    </div>
    <!-- table -->
    <template v-if="items">
    <el-table :data="items" class="my-5" style="width: 100%">
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
    <el-dialog v-model="dialogVisible" title="回复内容">
      {{ reply }}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
    <el-pagination class="mx-auto my-8 " background layout="prev, pager, next" :total="100" />
    </template>
            <el-empty  description="这里暂时没有内容" v-else
            image="https://img0.baidu.com/it/u=157654677,2313764766&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=543"
        />
   

  </template>
  
