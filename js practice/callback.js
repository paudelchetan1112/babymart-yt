function callback(){
    console.log("callback is called")

}
function add (num1, num2, callback){
    console.log(`${num1}+${num2}= ${num1+num2}`)
    callback();
}

add(10, 20, callback)