
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
  <div>
    <!-- carousel begin -->

  <div class="w-screen  text-center  absolute left-0 top-50" >
    <el-carousel >
      <el-carousel-item v-for="item in carouselData" :key="item.id">
        <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
        <el-image :src="item.img" alt="轮播图" class="rounded-xl h-full w-full"/>

      </el-carousel-item>
    </el-carousel>
  </div>
 
    <!-- carousel end -->
<div class="md:h-96 h-64"></div>
     <!-- main begin -->
      <div >
        <div class="flex justify-between  md:my-20 my-10">
          <span class="text-red-800 text-2xl font-bold"><i class="fa fa-file-text-o" /> 新闻资讯</span>
          <span class="cursor-pointer" @click="toNews">更多资讯 <i class="fa fa-chevron-right" /></span>
        </div>
            <el-row class=" my-5">
                <el-col :span="10">
                    <el-image :src="newsData[0].pic" alt="" class="mt-5 md:m-0 w-40 h-38 md:w-96 md:h-72" @click="toNewsDetail(newsData[0].id)"/>
                </el-col>
                <el-col :span="14" class="relactive">
               <template v-for="item in newsData">
                  <div v-if="item.id==newsData[0].id" class="mb-8 cursor-pointer" @click="toNewsDetail(item.id)">
                    <div class="m-3 text-2xl text-blue-900 font-bold" >{{ item.title }}</div>
                    <div class="m-3 text-sm text-red-800" >{{ item.create_time }}</div>
                    <div class="m-3 text-sm d-none" >{{ item.desc }}</div>
                  </div>
                    <div class="m-3 text-lg font-bold  cursor-pointer" @click="toNewsDetail(item.id)" v-else><i class="fa fa-circle text-red-600" />  {{ item.title }}</div>
              </template>
                  </el-col>
            </el-row>
        <div class="md:my-20 my-10 md:pt-20 pt-10">
          <span class="text-red-800 text-2xl font-bold"><i class="fa fa-user" /> 会员专区</span>
        </div>
        <!-- steps -->
       
       <div  class="flex justify-center flex-wrap px-2 md:p-0">
        <template v-for="itm in steps" :key="itm.index">
            <div class="border  border-red-200 rounded-md md:w-44 w-36 relative mx-3 mt-2">
                <div class="text-center  border-red-700 py-5 text-base md:text-lg">{{itm.title}}</div>
                <div class="w-10 h-0.5 m-auto bg-red-600 mb-3"></div>
                <div class="text-center text-5xl"> <font-awesome-icon :icon="itm.icons" />  </div>
                <div class="text-center m-4 text-xs md:text-sm text-gray-600 " v-if="itm.id!=6">{{ itm.descrption }}</div>
                <div class="text-center m-4 text- leading-10 text-red-600 border border-1 rounded-md h-12 border-red-600 cursor-pointer"  v-else>
                  <router-link to="/member/apply">{{ itm.descrption }}</router-link>
                </div>
                <div class="text-xl text-red-700 absolute top-1/2 -right-4" v-if="itm.id!=6"><font-awesome-icon icon="fa-chevron-right" /></div>
                
            </div>
        </template>
      </div>
      </div>
    <!-- main end -->
    <div class="text-center mt-40 mb-10 text-gray-500 text-sm">
      <el-image :src="logo" class=" mx-auto" alt="" style="height: 100px;"/>
      <p class="m-2">地址：{{ adress }}</p>
      <p>友情链接：嵘通互联 备案/许可证编号：湘ICP备2021004465号-3</p>
    </div>
  </div>
</template>



<style lang="scss">
.el-carousel__container{
  height: 400px!important;
  @media (max-width: 600px) { height: 250px!important;}
}
.d-none{
  @media screen and (max-width:600px) {
    display: none;
  }
}

</style>

