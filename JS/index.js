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

  Array.from(listas.children)
    .filter(
      (task) => !task.textContent.toLocaleLowerCase().includes(userSearch)
    )
    .forEach((filteredTask) => {
      filteredTask.classList.add('filteredOut');
      // filteredTask.classList.remove('d-flex');
    });
};

const buscarTarea = document.getElementById('buscarTarea');
buscarTarea.addEventListener('keyup', buscador);

function buscador(e) {
  const press = e.target.value.toLocaleLowerCase(); //el valor introducido

  filteredToDos(press);
}
