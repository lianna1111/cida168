interface strorageFunType{
    getItem(key:string):any;
    setItem(key:string,value:string):void;
    removeItem(key:string):void;
    clear():void;
}

// sessionStorage  
class sessionStorageProxy implements strorageFunType{
    private storage:strorageFunType;
    constructor (storageModel:strorageFunType){
        this.storage=storageModel;
    }
    getItem(key: string):any {
       return JSON.parse(this.storage.getItem(key))||null
    }
    setItem(key: string, value: string): void {
         this.storage.setItem(key,JSON.stringify(value))
    }
    removeItem(key: string): void {
       this.storage.removeItem(key)
    }
    clear(): void {
       this.storage.clear();
    }

    
}
// 本地储存
class localStorageProxy extends sessionStorageProxy implements strorageFunType{
    constructor(localStorage:strorageFunType){
        super(localStorage)
    }

}

export const storageSession = new sessionStorageProxy(sessionStorage);//调用系统的session
export const storageLocal= new localStorageProxy(localStorage)
