const $table = document.querySelector("#userTable");
const $did = document.querySelector("[data-did]");
let curId;
$addButton = document.querySelector("#addbutton");




$table.addEventListener('click', async (event) => {


  if (event.target.tagName === "BUTTON" && event.target.innerText === "ДОБАВИТЬ") {



    const $closTr = document.querySelector("[data-id]");
    curId = $closTr.dataset.id;


    $addContainer = document.querySelector("#addcontainer")
    $addButton.disabled = "true";

    const response = await fetch('/admin/categories/all', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ name: 'trololo' }),
    });
    let dataBack;
    if (response.ok) {
      dataBack = await response.json();
    }
    let optionString = '';
    for (let oneCat of dataBack) {
      optionString += `<option value="${oneCat.id}">${oneCat.categories}</option>`;
    }

    console.log($closTr);

    $closTr.innerHTML = `
  
  <td style="width:15%;"><select class="browser-default" name = "category" id = "category">
  <option value="" disabled selected>Выберите категорию продукта</option> 
  ${optionString}
  </select>
  </td>
  <td style="width:25%;"> <textarea id="description" class="materialize-textarea" name="description"></textarea>
  </td>
  <td style="width:5%;"><input type="text" style="width:90%;" name = "stock" id = "stock">
  </td>
  <td style="width:5%;"><input type="text" style="width:90%;" name = "price" id = "price">
  </td>
  <td style="width:3%;"></td>
  <td style="width:5%;"><button class="waves-effect waves-light btn-large" id = "newAdd">Отправить</button></td>
  `;


    const newAdd = document.querySelector("#newAdd");


    newAdd.addEventListener('click', async (event) => {

      const category = +document.querySelector("#category").value;
      const description = document.querySelector("#description").value;
      const stock = +document.querySelector("#stock").value;
      const price = +document.querySelector("#price").value;


      const responseNew = await fetch('/admin/products/new', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ category, description, stock, price }),
      });
      let dataFromBack;
      if (responseNew.ok) {
        dataFromBack = await responseNew.json();
        console.log(dataFromBack);
      }

      $closTr.insertAdjacentHTML(`afterend`, `
    <div data-did="${dataFromBack.id}">
          <tr data-id="${dataFromBack.id}">
          <td>${dataFromBack.Category.categories}</td>
          <td>${dataFromBack.description}</td>
          <td style="width: 5%;">${dataFromBack.stock}</td>
          <td>${dataFromBack.price}</td>
          <td style="width: 3%;"><a id="adminEdit">Редактировать</a></td>
          <td><a id="adminEdit">Удалить</a></td>
        </tr>
        </div>
    `);

      $closTr.innerHTML = "";
      $addButton.disabled = "";

    })

  }

  if (event.target.tagName === "A" && event.target.innerText === "Удалить") {

    const $closTr = event.target.closest("[data-id]");
    curId = $closTr.dataset.id;

    const response = await fetch('/admin/products', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ curId }),
    });
    let dataBack;
    if (response.ok) {
      dataBack = await response.json();
      $closTr.remove();
      console.log(dataBack);
    }
  }

  if (event.target.tagName === "A" && event.target.innerText === "Редактировать") {

    const $closTr = event.target.closest("[data-id]");
    curId = $closTr.dataset.id;
    const $prev = document.querySelector(`[data-did="${curId}"]`);
    $closTr.innerHTML = ``;


    const responseEdit = await fetch('/admin/products/edit', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ curId }),
    });
    let editBack;
    if (responseEdit.ok) {
      editBack = await responseEdit.json();
      console.log(editBack);
    }





    const responseCat = await fetch('/admin/categories/all', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ name: 'trololo' }),
    });
    let dataBackCat;
    if (responseCat.ok) {
      dataBackCat = await responseCat.json();
    }
    let optionString = '';
    for (let oneCat of dataBackCat) {
      let selected = '';
      if (oneCat.id == editBack.categories_id) {
        selected = 'selected'
      }
      optionString += `<option value="${oneCat.id}" ${selected}>${oneCat.categories}</option>`;
    }




    $closTr.innerHTML = `
  
    <td style="width:15%;"><select class="browser-default" name = "category" id = "category">
    <option value="">Выберите категорию продукта</option> 
    ${optionString}
    </select>
    </td>
    <td style="width:25%;"> <textarea id="description" class="materialize-textarea" name="description">${editBack.description}</textarea>
    </td>
    <td style="width:5%;"><input type="text" style="width:90%;" name = "stock" id = "stock" value="${editBack.stock}">
    </td>
    <td style="width:5%;"><input type="text" style="width:90%;" name = "price" id = "price" value="${editBack.price}">
    </td>
    <td style="width:3%;"></td>
    <td style="width:5%;"><button class="waves-effect waves-light btn-large" id = "newEdit">Отправить</button></td>
    `;


    const newEdit = document.querySelector('#newEdit');



    newEdit.addEventListener('click', async (event) => {
      event.preventDefault();

      const category = +document.querySelector("#category").value;
      const description = document.querySelector("#description").value;
      const stock = +document.querySelector("#stock").value;
      const price = +document.querySelector("#price").value;
      const category_name = dataBackCat.find(el => el.id === category).categories;

      const responseEdit2 = await fetch('/admin/products/edit', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ category, description, stock, price, curId }),
      });
      let editBack2;
      if (responseEdit2.ok) {
        editBack2 = await responseEdit2.json();
        $closTr.innerHTML = `
        <td>${category_name}</td>
            <td>${description}</td>
            <td style="width: 5%;">${stock}</td>
            <td>${price}</td>
            <td style="width: 3%;"><a id="adminEdit">Редактировать</a></td>
            <td><a id="adminEdit">Удалить</a></td>
        `;
        console.log(editBack2);
      }

    
    })



  }

})
