let myPromise=new Promise (function (resolve, reject)
{
    let result=false;
    if(result===true){
        resolve("ok")

    }
    else{
        reject("error")
    }

})
myPromise
.then(value=>console.log("Resolved", value))
.catch(value=>console.log("Reject", value))

dehhfge