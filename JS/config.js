fetch("index.html")
.then((response)=>response.text())
.then((data)=>{
    document.getElementById("index").innerHTML=data;
}) 
.catch((error) =>
    console.error("error al cargar la barra de navegacion", error)
)