let form=document.getElementById("formid");
let price=document.getElementById("price");
let product=document.getElementById("product");
let category=document.getElementById("category");
let button=document.getElementById("btn");
let options=form.category.options
let userlist1=document.getElementById("ul1");
let userlist2=document.getElementById("ul2");
let userlist3=document.getElementById("ul3");


async function get(){
    try{
        let abc=await axios.get('https://crudcrud.com/api/3d3954d82aa8486ba9d8b0c702c011f5/table')
        showbrowser(abc.data)
    }catch(e){
        console.error(e)
    }
    
    
}
get();

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
async function deleteProduct(key,show){
    try{
        await axios.delete(`https://crudcrud.com/api/3d3954d82aa8486ba9d8b0c702c011f5/table/${key}`)
        removeScreen(key);

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

    }catch(e){
        console.error(e)
    }
}

//submitting the data
button.addEventListener("click",async(e)=>{
    try{
        e.preventDefault();

    let obj={
        price: price.value,
        product: product.value,
        category:this.category.value
        };

   let res1=await axios.post('https://crudcrud.com/api/3d3954d82aa8486ba9d8b0c702c011f5/table',obj)
      showuseronScreen(res1.data)
    
    function showuseronScreen(show){
        let parentNode =userlist2
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

    price.value="";
    product.value="";
    }catch(e){
            console.error(err);

    }

})






