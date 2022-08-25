const form = document.querySelector('.grocery-form');
const grocery = document.getElementById("grocery");
const price = document.getElementById("price");
const submitbtn = document.querySelector('.confirm');
const list = document.querySelector('.grocery-list');
const alert = document.querySelector('.alert');
const container = document.querySelector('.grocery-container');
const clearBtn = document.querySelector('.clear');

let editElement;
let editFlag = false;
let editID = "";

//form
form.addEventListener('submit',addItem);

clearBtn.addEventListener('click', clearItems);

//storage
function addToLocalStorage(id,item)
{
    localStorage.setItem(id,item);
}

function setBackToDefault()
{
    grocery.value = '';
    price.value = '';
}

//function
//===============
//add item
function addItem(e){
    e.preventDefault();
    const val = grocery.value;
    const num = price.value;
    const id = new Date().getTime().toString();
    console.log(id);

    if(val&& !editFlag)
    {
        //add item to list
        const element = document.createElement('article');
        //add class
        element.classList.add('groc-item');
        //add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML =
        `
            <p class="name">${val}</p>
            <p class="price">${num}</p>
            <div class="btn-container">
                <button class="edit">
                    edit
                </button>
                <button class="del">
                    del
                </button>
            </div>
        `;
        
        //buttons selected here since the classes are added dynamically
        const deleteBtn = element.querySelector('.del');
        const editBtn = element.querySelector('.edit');

        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);

        list.appendChild(element);
        //diplay alert
        displayAlert("Item Added", "success");
        //make container visible
        container.classList.add("show-container");
        //add to local storage
        addToLocalStorage(id,val);
        //back to default
        setBackToDefault();
    }
    else if (val && editFlag)
    {
        //signify edit
    }
    else{
        //error empty val
        console.log("the form is still empty!");
        displayAlert("Form Incomplete", "danger");
    }
}

//clear all items
function clearItems(){
    //select all sections with class groc-item, returned as list
    const items = document.querySelectorAll('.groc-item');

    console.log(items.length);
    if (items.length > 0)
    {
        //loop through every item in the list and remove from lsit
        items.forEach(function(item){
            list.removeChild(item);
        })

        //remove container from screen
        container.classList.remove("show-container");

        displayAlert(`Cleared ${items.length} items`, "success");

        setBackToDefault();

        //remove from local storage
        localStorage.clear();
    }
    else
    {
        console.log("malfunction");
    }
}

//delete a certain item
function deleteItem(){
    console.log("delete");
}

function editItem()
{
    console.log("edit");
}




//alert display
function displayAlert(text, action)
{
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent = 'a';
        alert.classList.remove(`alert-${action}`);

    }, 1000)
}