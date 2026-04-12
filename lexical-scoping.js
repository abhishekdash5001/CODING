// lexical Scoppig



export function outside(){

const a = 'check'
    function inside(){
       const a ='test'
     console.log(a,'second')
    }
    console.log(a,'first')

    inside()
    console.log(a,'third')
}

outside()

