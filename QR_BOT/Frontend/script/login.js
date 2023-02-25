const form =document.querySelector("form");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    console.log("object");
    if(email==""||pass==""){
        alert("Fill all the Credentials")
    }else{
        let obj={
            email,password
        }
        fetch_login(obj)
    }
});

async function fetch_login(obj){
    try {
        let response=await fetch("http://localhost:5500/login",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        });
        if(response.ok){
            let result=await response.json();
            localStorage.setItem("name",JSON.stringify(result.name))
            localStorage.setItem("token",JSON.stringify(result.token))
            localStorage.setItem("Refresh",JSON.stringify(result.Refreshtoken));
            console.log(result);
            alert(result.msg)
            if(result.name=="Admin"){
                window.location.href="../HTML/admin.html"
            }else{
                window.location.href="../index.html"
            }
            
        }
    } catch (error) {
        console.log(error);
    }
}