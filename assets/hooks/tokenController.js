
export function useSetToken (token){
    window.localStorage.setItem('token' , token )
}

export function useGetToken (){
    return window.localStorage.getItem('token')
}

export function useLogout(cb){
    window.localStorage.removeItem('token')
    cb()
}