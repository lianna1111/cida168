import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class WebNav{
    get(id:number = 0){
        return http.request({url:'webnav/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'webnav/show',data:data})
    }

    list(){
        return http.request({url:'webnav/list'})
    }
    pid(pid:number|string){
        return http.request({url:'webnav/pid?pid='+pid})
    }

    tree(){
        return http.request({url:'webnav/tree'})
    }

    child(){
        return http.request({url:'webnav/child'})
    }
    // 获取菜单接口
    all(){
        return http.request({url:'webnav'})
    }

    // 获取最大排序值
    sort(pid:number){
        return http.request({
            method:'post',
            url: 'webnav/sort',
            data: qs.stringify({pid:pid})
        })
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'webnav/add',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'webnav/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'webnav/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new WebNav()