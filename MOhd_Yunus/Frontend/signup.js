const form= document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value
    let name=document.getElementById("name").value
    let password=document.getElementById("pass").value
if(email==""||name==""||password==""){
alert("Pleasse Fill all Credentials")
}else{
    let obj={
        email,password,name
    }
    fetch_sign(obj)
}
});
async function fetch_sign(obj){
    try {
        let response=await fetch("http://localhost:6500/signup",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        });
        console.log(response);
        if(response.ok){
            let ans=await response.json();
            console.log(ans);
            window.location.href="./login.html"
        }else{
            console.log("something wrong");
        }
    } catch (error) {
        console.log(error);
    }
};

document.getElementById("github").addEventListener("click",async()=>{
try {
    let response=await fetch("https://github.com/login/oauth/authorize?client_id=0d77b585a4e836fdbab8",{
        method:"GET",
        headers : {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
    });
    if(response.ok){
        let result=await response.json();
        console.log(result);
    }
} catch (error) {
    
}

})