import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Education{
    get(id:number = 0){
        return http.request({url:'education/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'education/show',data:data})
    }

}

export default new Education()