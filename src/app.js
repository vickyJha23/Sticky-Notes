// 'use-strict';
const stickyContainer = document.querySelector(".sticky-container");
const form = document.querySelector(".input-form");
let inputSticky = document.querySelector("#sticky-title");
// console.log(inputSticky);
let textAreaContent = document.querySelector("#sticky-content");
let editFlag = false, editElement1, editElement2;
let dragTarget;
let isDragging = false;
let lastOffsetX = 0;
let lastOffsetY = 0;
const stripHTML = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
}
const createStickyNotes = (e) => {
    e.preventDefault();
    let stickyTitle = inputSticky.value;
    let stickyContent = textAreaContent.value;
    if(!editFlag){
         const div = document.createElement('div');
         div.classList.add("drag", "sticky");
         div.innerHTML = `
         <h3>${stripHTML(stickyTitle)}</h3>
         <p>${stripHTML(stickyContent)}</p>
         <button class="close-btn">
              <i class="fa fa-times"></i>
         </button>
         <button class="edit-btn">
              <i class="fa fa-edit"></i>
         </button>`;
         div.style.background = randomColor();
         const closeBtn = div.querySelector(".close-btn");
         closeBtn.addEventListener("click", deleteSticky);
         const editBtn = div.querySelector(".edit-btn");
         editBtn.addEventListener("click", editStickyNotes);
         stickyContainer.append(div);
         handlePostitionOfSticky(div);
         setBackToDefault();
         return;
    }
    if(editFlag){
            const userConfimation = confirm("Do you want to edit it ?");
            if(!userConfimation){
                console.log("Exection terminated !");
                setBackToDefault();
                return;
            }
            else{
                editElement1.textContent = stickyTitle;
                editElement2.textContent = stickyContent;
                setBackToDefault();    
            }
    }
}
function handlePostitionOfSticky(sticky) {
   const xPos = (window.innerWidth / 2) - (sticky.offsetWidth / 2) + (-100 + Math.round(Math.random() * 50));
   const yPos = (window.innerHeight / 2) - (sticky.offsetHeight / 2) + (-100 + Math.round(Math.random() * 50));
   sticky.style.left = `${xPos}px`;
   sticky.style.top = `${yPos}px`;
}

function setBackToDefault() {
    inputSticky.value ="";
    textAreaContent.value = "";
    editFlag = false;
}
function deleteSticky(e){
    const parentNode = e.currentTarget.parentElement;
    // console.log(parentNode);
    stickyContainer.removeChild(parentNode);
}

function randomColor () {
     const r = 100 + Math.round(Math.random() * 156);
     const g = 100 + Math.round(Math.random() * 156);
     const b = 100 + Math.round(Math.random() * 156);
     return `rgb(${r},${g},${b})`;
}
  
function editStickyNotes(e){
    const parentNode = e.currentTarget.parentElement;
    editElement1 = parentNode.querySelector("h3");
    editElement2 = parentNode.querySelector("p");
    inputSticky.value = editElement1.textContent;
    textAreaContent.value = editElement2.textContent;
    editFlag = true ;    

}
function drag(e){
    if(!isDragging){     
        // console.log("Dragging is off");
        return
    }
    // console.log("Hi there I am working...")
    dragTarget.style.left = `${e.clientX - lastOffsetX}px`;
    dragTarget.style.top = `${e.clientY - lastOffsetY}px`;
}

 window.addEventListener("mousedown", function(e){
      dragTarget = e.target;
      while(dragTarget && !dragTarget.classList.contains("drag")){
            dragTarget = dragTarget.parentElement;
      }
      if(!dragTarget){
           return;
      }   
      lastOffsetX = e.offsetX;
      lastOffsetY = e.offsetY;
      isDragging = true;     
 });

window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", () => {
     isDragging = false;
});








form.addEventListener("submit", createStickyNotes);
 