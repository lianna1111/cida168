
<script setup lang="ts">
    import router from '@/router'
    import { ref,reactive,onMounted } from 'vue'
    import News from '@/api/News'
    import Carousel from '@/api/Carousel'
    import Config from '@/api/Config'
    import { Edit, Picture, Upload } from '@element-plus/icons-vue'
    const newsid = ref(1)
  const logo =ref()
  const adress=ref()
  const carouselData=ref([{id:'',img:'',title:''}])
  const newsData=ref([{id:'',pic:'',title:'',create_time:'',desc:''}])
    const steps=ref([
      {id:1,title:'提交会员申请',icons:'fa-envelope',descrption:'用户在线填写申请，请认真填写，已填写的将无法修改'},
      {id:2,title:'支付会费',icons:'fa-credit-card',descrption:'用户填写会员申请信息后，在线支付会员费'},
      {id:3,title:'工作人员审核',icons:'fa-check-square',descrption:'用户支付会员费后工作人员会在规定时间内进行信息审核'},
      {id:4,title:'会员状态查询',icons:'fa-search',descrption:'信息审核后新用户可进行会员状态查询'},
      {id:5,title:'制证邮寄',icons:'fa-pencil-square',descrption:'会员支付会费后工作人员制作会员证并邮寄给用户'},
      {id:6,title:'成为会员',icons:'fa-handshake',descrption:'在线申请'}

   
    ])
  onMounted(async () => {
      await init()
  })

    // 初始化数据
    const init = async () => {
        getNews()
        getCarousel()
        getConfigData()
    }

    const toNewsDetail=(id:any)=> {
      router.push({ path: "/news/detail", query: { id } });//
    }
    const toNews= ()=> {
      router.push({ name: "news"});
    }

    const getCarousel= ()=> {
      Carousel.show().then((res:any)=>{
            // console.log(res.data.data)
            carouselData.value = JSON.parse(JSON.stringify(res.data.data.data))
        }).catch((res)=>{
            console.log(res)
        })
     
    }
  //config
    const getConfigData = async () => {
        Config.get().then((res:any)=>{//刷新获取
            if(res.data.code === 0){
            logo.value=res.data.data.logo
            adress.value=res.data.data.adress
            }
         })
    }
    //news
    const getNews =()=>{
    News.indicate(newsid.value).then((res:any)=>{
        newsData.value = res.data.data
        // console.log(res.data.data);
    }).catch((res)=>{
        console.log(res)
    })
}

 

</script>

<template>
    <el-carousel class="h-64 md:h-screen">
      <el-carousel-item v-for="item in carouselData" :key="item.id" class="h-screen">
        <el-image :src="item.img" alt="轮播图" class="h-64 md:h-screen w-full"/>
      </el-carousel-item>
    </el-carousel>
    <div class="m-auto md:px-28">
        <!-- video -->
        <element-news title="视频教材" :items="newsData"/>
        <!--  -->
        <el-image class=" absolute left-0 w-full" src="https://www.cida168.com/assets/ban1.c111157a.png"/>
        <div class="md:h-40 h-20" ></div>
          <!-- tools -->
       <element-news title="舞蹈用具" :items="newsData"/>
       <!-- news -->
     
          <div class="text-gray-800 md:text-3xl text-xl md:mt-40 md:mb-20 mb-10"> 行业新闻</div>
            <el-row class=" md:my-20">
                <el-col :span="10">
                   <div   @click="toNewsDetail(newsData[0].id)">
                        <el-image :src="newsData[0].pic" alt="" class="mt-5 md:m-0 w-40 h-38 md:w-96 md:h-72"/>
                        <div class="m-3 text-md font-bold" >{{ newsData[0].title }}</div>
                        <div class="m-3 text-sm d-none truncate" >{{ newsData[0].desc }}</div>
                   </div>
                </el-col>
                <el-col :span="14" class="relactive">
               <template v-for="item in newsData" :key="index">
                  <div  class="mb-8 cursor-pointer" @click="toNewsDetail(item.id)">
                    <div class="m-3 text-md  font-bold" >{{ item.title }}</div>
                    <div class="m-3 text-sm d-none" >{{ item.desc }}</div>
                  </div>
                   </template>
                  </el-col>
            </el-row>
     
      </div>
</template>



<style lang="scss">
.d-none{
  @media screen and (max-width:600px) {
    display: none;
  }
}

</style>

