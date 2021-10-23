// const insertValue = document.getElementById('insertValue').value;

let list;

//INSERTAR NUEVAS TAREAS
function AgregarTareas() {
  // console.log('click');

  //METODO TRIM() ELIMINA LOS ESPACIOS VACIOS DE UN STRING
  const insertValue = document.getElementById('insertValue').value.trim();
  // console.log(insertValue);
  let localItem = JSON.parse(localStorage.getItem('tareas'));

  if (localItem === null) {
    list = [];
  } else {
    list = localItem;
  }

  list.push(insertValue);

  localStorage.setItem('tareas', JSON.stringify(list));

  /*Limpiando los campos o inputs*/
  document.getElementById('insertValue').value = '';

  showItem();
}

///////////////////////////////

function showItem() {
  let localItem = JSON.parse(localStorage.getItem('tareas'));
  if (localItem === null) {
    list = [];
  } else {
    list = localItem;
  }

  //<span class="check">&#10004;</span>

  let html = '';
  let itemShow = document.querySelector('.list-ul');
  list.forEach((data, index) => {
    html += `
      <div class="content">
        <li class="list-li">${data}</li>
        <span onclick="borrar(${index})" class="delete">&#10006;</span>
      </div>
      `;
  });
  itemShow.innerHTML = html;
}
showItem();

//BOTON DE ELIMINAR
//prueba

// const eliminar = document.querySelector('.delete');

// eliminar.addEventListener('click', borrar);

function borrar(id) {
  console.log('borra');
  // let localItem = JSON.parse(localStorage.getItem('tareas'));
  list.splice(id, 1);
  localStorage.setItem('tareas', JSON.stringify(list));
  showItem();
}

//BUSCADOR DE FILTROS
const listas = document.getElementById('list-ul');
const filteredToDos = (userSearch) => {
  // console.log(userSearch);

  // console.log(listas.children);
  // console.log(Array.from(listas.children));
  // const arryDeListas = Array.from(listas.children);

  // let filterTodos = [];

  // if (!userSearch.length >= 1) {
  //   filterTodos = arryDeListas;
  // } else {
  //   filterTodos = arryDeListas.filter((task) => {
  //      !task.textContent.toLocaleLowerCase().includes(userSearch)
  //   });
  // }



  Array.from(listas.children)
    .filter(
      (task) => !task.textContent.toLocaleLowerCase().includes(userSearch)
       //queremos quedarnos con los <li> que NO coincidan con el término que el usuario está buscando
    ).forEach((filteredTask) => {
      filteredTask.classList.add('filteredOut');
      filteredTask.classList.remove('list-ul');
    });


    Array.from(listas.children)
    .filter(task => task.textContent.includes(userSearch))
    .forEach(filteredTask => {
        filteredTask.classList.remove('filteredOut');
        filteredTask.classList.add('content');
    });


    // filteredTask.classList.remove('filteredOut');
    // filteredTask.classList.add('d-flex');


    // .forEach((filteredTask) => {
    //   if (filteredTask) {
    //   //  filteredTask.classList.add('d-flex');
    //   filteredTask.classList.add('filteredOut');
    //   filteredTask.classList.remove('list-ul');

    //   }else{
    //     filteredTask.classList.remove('filteredOut');
    //     filteredTask.classList.add('d-flex');
    //   }
    //   // filteredTask.classList.add('filteredOut');
    //   // filteredTask.classList.remove('d-flex');
    // });
};

const buscarTarea = document.getElementById('buscarTarea');
buscarTarea.addEventListener('input', buscador);

function buscador(e) {
  const press = e.target.value.toLocaleLowerCase(); //el valor introducido

  filteredToDos(press);
}
