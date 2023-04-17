let form=document.getElementById("formid");
let price=document.getElementById("price");
let product=document.getElementById("product");
let category=document.getElementById("category");
let button=document.getElementById("button");
let options=form.category.options
let userlist1=document.getElementById("ul1");
let userlist2=document.getElementById("ul2");
let userlist3=document.getElementById("ul3");


//fetching data from browser
axios.get('https://crudcrud.com/api/f9ae2c4c244b4a1aa5fc7a0f54bf8a8b/table')
    .then((res)=>{
        showbrowser(res.data)
    })
    .catch((err)=>{
        console.error(err);
    })

function showbrowser(show){
    let parentNode = userlist2;
        
        for (let i = 0; i < show.length; i++){
            if(show[i].category=="Electronics"){
                parentNode=userlist1
           }else if(show[i].category==="Food Items"){
                parentNode=userlist2
           }else{ 
                parentNode=userlist3
           }
            var childNode=`<li id=${show[i]._id} >${show[i].price}-${show[i].product} - ${show[i].category}
            <button onclick="deleteProduct('${show[i]._id}','${show[i].category}')">Delete</button>
            </li>`
            parentNode.innerHTML=parentNode.innerHTML+childNode;
        }

}     


//deleting 
function deleteProduct(key,show){
    axios.delete(`https://crudcrud.com/api/f9ae2c4c244b4a1aa5fc7a0f54bf8a8b/table/${key}`)
    .then(()=>{
     removeScreen(key);
    })
    function removeScreen(key){
      let parent=userlist1;
      if(show==="Electronics"){
        parent=userlist1
        }else if(show==="Food Items"){
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
        product: product.value,
        category:this.category.value
        };

    axios.post('https://crudcrud.com/api/f9ae2c4c244b4a1aa5fc7a0f54bf8a8b/table',obj)
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
            if(show.category==="Electronics"){
                parentNode=userlist1
           }else if(show.category==="Food Items"){
                parentNode=userlist2
           }else{ 
                parentNode=userlist3
           }
           var childNode=`<li id=${show._id} >${show.price}-${show.product} - ${show.category}
            <button onclick="deleteProduct('${show._id}','${show.category}')">Delete</button>
            </li>`
            parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
//}

    price.value="";
    product.value="";

})






