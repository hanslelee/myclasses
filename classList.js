const classForm = document.querySelector(".js-classForm"),
    className = document.querySelector(".js-className"),
    classAddress = document.querySelector(".js-classAddress"),
    classList = document.querySelector(".js-classList");
    //클래스명 앞에 . 안붙여서 cannot read property "appendChild" of null 오류남
    
const CLASSES_LS = 'classes';

let classes =[];

function deleteClass(event) {
    const btn = event.target;
    const li = btn.parentNode;
    classList.removeChild(li);
    const cleanClasses = classes.filter(function(c) {
        return c.id !== parseInt(li.id);
    });
    classes = cleanClasses;
    saveClasses();
}

function saveClasses() {
    localStorage.setItem(CLASSES_LS, JSON.stringify(classes));
}

function paintClass(name, address) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const link = document.createElement("a");
    const newId = classes.length + 1;
    delBtn.innerText="delete";
    delBtn.addEventListener("click", deleteClass);
    link.innerText="💕  "+name;
    link.setAttribute('href',address);
    li.appendChild(link);
    li.appendChild(delBtn);
    li.id = newId;
    classList.appendChild(li);

    const classObj = {
        name: name,
        address: address,
        id: newId
    };
    classes.push(classObj);
    saveClasses();
}

function loadClasses() {
    const loadedClasses = localStorage.getItem(CLASSES_LS);
    if(loadedClasses !== null){
        const parsedClasses = JSON.parse(loadedClasses);
        parsedClasses.forEach(function(c) {
            paintClass(c.name, c.address);
        });
    }
}



function handleSubmit(event) {
    event.preventDefault();
    const newClassName = className.value;
    const newClassAddress = classAddress.value;
    console.log(newClassAddress);
    paintClass(newClassName, newClassAddress);
    className.value="";
    classAddress.value="";

}

function init() {
    console.log("init");
    loadClasses();
    classForm.addEventListener("submit", handleSubmit);
}

init();