import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Unit{
    nature(){
        return http.request({url:'unit_nature'})
    }
    intent(){
        return http.request({url:'unit_intent'})
    }



}

export default new Unit()
