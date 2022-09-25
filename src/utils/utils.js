
export function isEmpty(value){
    //"",0,"undefined","null"
    if(value==="")return true;
    if(value===0)return true;
    //检验 undefined 和 null  
    if (!value) return true;  
    //检验{}和[]     
    if(Array.prototype.isPrototypeOf(value)&&value.length===0)return true;
    if(Object.prototype.isPrototypeOf(value)&&Object.keys(value).length===0)return true;
    return false;
}

console.log(isEmpty([]))
console.log(isEmpty({}))
console.log(isEmpty({DFD:"FDF"}))
console.log(isEmpty([1,2]))
console.log(isEmpty(""))
console.log(isEmpty(0))
console.log(isEmpty(null))
console.log(isEmpty(undefined))
