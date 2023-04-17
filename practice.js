let form=document.getElementById("formid");
let price=document.getElementById("price");
let dish=document.getElementById("dish");
let table=document.getElementById("table");
let button=document.getElementById("button");
let options=form.table.options
let userlist1=document.getElementById("ul1");
let userlist2=document.getElementById("ul2");
let userlist3=document.getElementById("ul3");


//fetching data from browser
axios.get('https://crudcrud.com/api/1e785583c9274374b55b0f570576b7f1/table')
    .then((res)=>{
        showbrowser(res.data)
    })
    .catch((err)=>{
        console.error(err);
    })

function showbrowser(show){
    let parentNode = userlist2;
        
        for (let i = 0; i < show.length; i++){
            if(show[i].table==="Table 1"){
                parentNode=userlist1
           }else if(show[i].table==="Table 2"){
                parentNode=userlist2
           }else{ 
                parentNode=userlist3
           }
            var childNode=`<li id=${show[i]._id} >${show[i].price}-${show[i].dish} - ${show[i].table}
            <button onclick="deleteProduct('${show[i]._id}','${show[i].table}')">Delete</button>
            </li>`
            parentNode.innerHTML=parentNode.innerHTML+childNode;
        }

}     


//deleting 
function deleteProduct(key,show){
    axios.delete(`https://crudcrud.com/api/1e785583c9274374b55b0f570576b7f1/table/${key}`)
    .then(()=>{
     removeScreen(key);
    })
    function removeScreen(key){
      let parent=userlist1;
      if(show==="Table 1"){
        parent=userlist1
        }else if(show==="Table 2"){
            parent=userlist2
        }else{ 
            parent=userlist3
        }
      child=document.getElementById(key)
      if(child){
         parent.removeChild(child)
      }
   }
   }   

//submitting the data
button.addEventListener("click",(e)=>{

    e.preventDefault();

    let obj={
        price: price.value,
        dish: dish.value,
        table:this.table.value
        };

    axios.post('https://crudcrud.com/api/1e785583c9274374b55b0f570576b7f1/table',obj)
    .then((res1)=>{
        console.log(res1);
        showuseronScreen(res1.data)
    })
    .catch((err)=>{
        console.error(err);
    })

    
    
    function showuseronScreen(show){
        //console.log(show)
        let parentNode =userlist2
        //for (let i=show.length-1; i>show.length-2; i--){
            if(show.table==="Table 1"){
                parentNode=userlist1
           }else if(show.table==="Table 2"){
                parentNode=userlist2
           }else{ 
                parentNode=userlist3
           }
           var childNode=`<li id=${show._id} >${show.price}-${show.dish} - ${show.table}
            <button onclick="deleteProduct('${show._id}','${show.table}')">Delete</button>
            </li>`
            parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
//}

    price.value="";
    dish.value="";

})






