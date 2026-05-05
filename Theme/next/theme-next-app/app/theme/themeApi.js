const userPreferenceTheme={
    theme:'dark'
}


export const fetchUserPreference=()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
         resolve(userPreferenceTheme.theme)
        },1000)
    })
}


export const updateUserPreference=(theme)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            userPreferenceTheme.theme = theme
         resolve({
            message:"theme changes"
         })
        },1000)
    })
}