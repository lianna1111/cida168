import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import User from '@/api/User'
import Config from '@/api/Config'

import { setLogout } from '@/util/main'
import Home from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import Reg from '@/view/Reg.vue'
import Main from '@/view/Main.vue'
import Error from '@/view/Error.vue'
import RtHome from '@/view/RtHome.vue'
import RtMain from '@/view/RtMain.vue'
import Buy from '@/view/Buy.vue'
function getChildrenRoute(){
    const view = import.meta.glob('../view/controller/**/*.vue')
    const routes = [{path:'/',name:'main',component:Main}] as RouteRecordRaw[]

    Object.keys(view).forEach((key)=>{
        const name = key.split('controller/').pop()?.split('.').shift()?.toLocaleLowerCase().replace('/index','') as string
 
        const route = {
            path: `/${name}`,
            name,
            meta: {auth: true},
            component: view[key]
        } as RouteRecordRaw

        routes.push(route)
    })
    

    return routes
}
function getChildrenRoutes(){
    const view = import.meta.glob('../view/controllers/**/*.vue')
    const routes = [{path:'/rt',name:'rtmain',component:RtMain}] as RouteRecordRaw[]

    Object.keys(view).forEach((key)=>{
        const name = key.split('controllers/').pop()?.split('.').shift()?.toLocaleLowerCase().replace('/index','') as string
 
        const route = {
            path: `/rt/${name}`,
            name,
            meta: {auth: true},
            component: view[key]
        } as RouteRecordRaw

        routes.push(route)
    })
    

    return routes
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {auth: true},
            component: Home,
            children:getChildrenRoute()
        },
        {
            path: '/rt',
            name: 'rthome',
            meta: {auth: true},
            component: RtHome,
            children:getChildrenRoutes()
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/buy',
            name: 'buy',
            component: Buy
        },
        {
            path: '/reg',
            name: 'reg',
            component: Reg
        },
        {
            path:'/:any(.*)',
            name:'error',
            component:Error
        }
    ] as RouteRecordRaw[]
})

router.beforeEach((to,from,next)=>{
    if(to.path == 'rt/contact/contact_us'||to.path == 'rt/member/apply'||to.path == 'rt/member/application'||to.path == 'rt/member/zone'){
        const uid = localStorage.getItem('uid')!
        const token = localStorage.getItem('token')!
        User.check(uid,token).then((res:any)=>{
            if(res.data.code === 0){
                
                next()
            }else{
                setLogout()
                next({name:'login'})
            }
        }).catch((res:any)=>{
            setLogout()
            next({name:'login'})
        })
    }else{
        next()
    }
    
})

router.beforeResolve((to,from)=>{
    // console.log('beforeResolve')
})

router.afterEach((to,from,fail)=>{
    // console.log('afterEach')
})

export default router