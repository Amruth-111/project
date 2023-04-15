let form=document.getElementById("formid");
let price=document.getElementById("price");
let dish=document.getElementById("dish");
let table=document.getElementById("table");

let options=form.table.options
let form2=document.getElementById("form2");

let userlist1=document.getElementById("ul1");
let userlist2=document.getElementById("ul2");
let userlist3=document.getElementById("ul3");


form.addEventListener("submit",onsubmit)
form2.addEventListener("click",ondelete)



function onsubmit(e){
e.preventDefault();
let li=document.createElement("li");
    li.setAttribute("id","newuser");
    li.appendChild(document.createTextNode(`Price: ${price.value} Dish: ${dish.value} `));

    let del=document.createElement('button');
    del.appendChild(document.createTextNode('Delete'));
    del.classList='delete';

    li.appendChild(del);

    if(this.table.value=="Table 1"){
        userlist1.appendChild(li); 
    }else if(this.table.value=="Table 2"){
        userlist2.appendChild(li); 
    }else{
        userlist3.appendChild(li); 
    }

    let obj={
    price: price.value,
    dish: dish.value,
    table:this.table.value
    };

    axios.post('https://crudcrud.com/api/135554898af54cdeab04f28259af50d7/table',obj)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err));

    axios.get('https://crudcrud.com/api/135554898af54cdeab04f28259af50d7/table')
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.error(err);
        })

        
}

function ondelete(e){
    e.preventDefault();
    if(e.target.classList.contains("delete")){
    let li=e.target.parentElement;
    userlist1.removeChild(li);
    userlist2.removeChild(li);
    userlist1.removeChild(li);
}
}




