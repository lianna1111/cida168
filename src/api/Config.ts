import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Config{
    get(){
        return http.request({url:'webconfig/'+import.meta.env.VITE_CID})
    }

    show(data:Object){
        return http.request({method:'post',url:'webconfig/show',data:data})
    }

}

export default new Config()