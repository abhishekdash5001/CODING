function findSmallest(array){
if(array.length === 0){
    return
}

let counter = array[0]

for(let i =1;i<array.length;i++){
    if(counter > array[i]){
        counter = array[i]
    }
}

return counter
}

findSmallest([3, 7, 2, 9, 4]) // 2
findSmallest([-1, -5, -2]) // -5