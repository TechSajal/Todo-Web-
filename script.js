const addtask = document.querySelector(".addtask");
const task = document.querySelector(".task-ul");
const clearall = document.querySelector(".clearall")
const messagespan = document.querySelector(".pendingtask-div span")
const searchform = document.querySelector(".search")


//function to pending task
function updatemessage(){
    const tasklenght = task.children.length;
    messagespan.textContent = `You have ${tasklenght} pending task`
}
updatemessage();
// instead of deleting we will put event listener in the form and if we click the delete button its parent will be deletef i.e li
addtask.addEventListener("submit", event => {
    event.preventDefault();
    const value = addtask.task.value.trim();
    if (value.length) {
        task.innerHTML += `<li>
                           <span>${value}</span>
                           <i class="bi bi-trash delete"></i>
                           </li>`
        updatemessage();
        addtask.reset()
    }
})


task.addEventListener("click", event =>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updatemessage()
    }
})

clearall.addEventListener("click",(event)=>{
  const taskitems = task.querySelectorAll("li");
  taskitems.forEach(elemant =>{
    elemant.remove();
  })
  updatemessage()
})

 //searching
searchform.addEventListener("keyup",event =>{
    const term = searchform.task.value.trim().toLowerCase();
    filterTask(term);

})

function filterTask(term){
    Array.from(task.children).filter(task =>{
          return !task.textContent.toLowerCase().includes(term); 
    })
    .forEach(task =>{
          task.classList.add("hide");
    });
    
    Array.from(task.children).filter(task =>{
        return task.textContent.toLowerCase().includes(term); 
  })
  .forEach(task =>{
        task.classList.remove("hide");
  });
}

searchform.addEventListener("click",event =>{
    if(event.target.classList.contains("reset")){
        searchform.reset();
        const term = searchform.task.value.trim().toLowerCase();
        filterTask(term);
    }
})