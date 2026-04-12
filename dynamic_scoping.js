let x='global'


function outer(){
    let x ='outer'

    inner()
}


function inner(){
    console.log(x)// this will gobal bcz js will look for x in inner and for inner x is 'global'
}


outer()