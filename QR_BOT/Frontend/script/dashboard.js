

let btn1 = document.getElementById("btn1")

let btn2 = document.getElementById("btn2")

let gen = document.getElementById("gen")
let analysed = document.getElementById("analysed")



btn1.addEventListener("click",btn1Click)


function btn1Click(){
    gen.style.display="block"
    analysed.style.display = "none"
}


btn2.addEventListener("click",btn2Click)


function btn2Click(){
    gen.style.display="none"
    analysed.style.display = "block"
}

let arr1=[
{
    "url":"String",
    "size":"Number",
    "email":"String",
    "userID":"String"


}
]

let arr2=[
    {
        "url":"hello",
        "size":"Number",
        "email":"String",
        "userID":"String"
    
    
    }
    ]

    arr1.map((item,index)=>{
        let gen = document.getElementById("g")

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        td1.innerHTML = index+1
        td2.innerHTML = item.url
        td3.innerHTML = item.size
        td4.innerHTML = 12

        tr.append(td1,td2,td3,td4)

        gen.append(tr)
        
    })
    arr2.map((item,index)=>{
        let ana = document.getElementById("a")

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")

        td1.innerHTML = index+1
        td2.innerHTML = item.url
        td3.innerHTML = item.size
        td4.innerHTML = 12

        tr.append(td1,td2,td3,td4)

        ana.append(tr)
        
    })

    let name1 = JSON.parse(localStorage.getItem("name"));

    let nameDisplay = document.getElementById("name")

    nameDisplay.innerHTML = name1