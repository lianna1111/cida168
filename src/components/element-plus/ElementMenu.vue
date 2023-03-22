<script setup lang="ts">
    import { ref,onMounted} from 'vue'
    import { ItemList } from '@/util/interface'
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'
    const isEllipsis=ref(true)
    const props = withDefaults(defineProps<{
        pid?: number | string,
        isCollapse: boolean,
        bgcolor:string,
        textColor:string,
        listyle:string,
        activeTextColor:string,
        items: ItemList[]
    }>(),{
        pid: 0,
        bgcolor:'#cd0101',
        textColor:'#fff',
        activeTextColor:'#fff',
        listyle:'padding: 0 80px;',
        isCollapse: false
    })

  
    const handleSelect = (key: string, keyPath: string[]) => {
      emit('handleSelect',key,keyPath)
}

const emit = defineEmits(['handleSelect'])
  
  onMounted(() => {
       init()
    })
    
    const init=()=>{
      if (window.innerWidth > 700) { 
        isEllipsis.value=false
      }

    }

</script>

<template>
  
 
  <div class="h-6" />

  <el-menu
    default-active=""
    class="el-menu-demo  shadow-2xl"
    mode="horizontal" 
    :ellipsis='isEllipsis'
    :background-color="bgcolor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    @select="handleSelect"
    
  >
  <template v-for="item in items" :key="item.id" >

    <el-menu-item  :index="`${item.id}`"  v-if="item.level==1" class="px-10">
      <template #title>
          <router-link :to="{name:item.router,params:{id:item.id}}">{{item.title}}</router-link>
       </template>  
    </el-menu-item>

    <template v-else-if="item.level==2">

      <el-sub-menu :index="`${item.id}`" class="px-8" >
          <template #title>
              <span>{{item.title}}</span>
          </template>

         <!-- <template> -->
        <template v-for="itm in items" :key="itm.id">
            <template v-if="itm.pid == item.id">  

            <el-menu-item :index="`${itm.id}`" >
                <!-- <el-icon><icon-menu /></el-icon>
                 -->
                <template #title>
                    <router-link :to="{name:itm.router,params:{id:itm.id}}">{{itm.title}}</router-link>
                </template>
                
            </el-menu-item>
        
</template>
        </template>
          
          </el-sub-menu>
</template>  
</template>
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal {
    justify-content: center; 
    
}
</style>