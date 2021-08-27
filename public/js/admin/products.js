const $table = document.querySelector("#userTable");
const $did = document.querySelector("[data-did]");
let curId;
$addButton = document.querySelector("#addbutton");




$table.addEventListener('click', async (event) => {

  console.log(event.target.tagName);

  if (event.target.tagName === "BUTTON" && event.target.innerText === "ДОБАВИТЬ") {



    const $closTr = document.querySelector("[data-id]");
    curId = $closTr.dataset.id;

    $addContainer = document.querySelector("#addcontainer")
    $addButton.disabled = "true";

    const response = await fetch('/admin/categories/all', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify(9),
    });
    let dataBack;
    if (response.ok) {
      dataBack = await response.json();
      console.log(dataBack);
    }



    $closTr.insertAdjacentHTML('beforebegin', `
  <form name="addform">
  <tr  id="addform">
  <td style="width:20%;"><select class="browser-default" name = "category" id = "superselect">
  <option value="" disabled selected>Выберите права пользователя</option>` +

  + `</select>
  </td>
  <td style="width:20%;"><input type="text" style="width:90%;" name = "description" id = "description">
  </td>
  <td style="width:20%;"><input type="text" style="width:90%;" name = "stock" id = "stock">
  </td>
  <td style="width:15%;"><input type="text" style="width:90%;" name = "price" id = "price">
  </td>
  <td><button class="waves-effect waves-light btn-large" id = "newAdd">Отправить</button></td>
</tr>
  </form>
  `);

  // <option value="guest">Гость</option>
  // <option value="moderator">Менеджер</option>
  // <option value="admin">Админ</option>

    const newAdd = document.querySelector("#newAdd");

    newAdd.addEventListener('click', async (event) => {
      const category = document.querySelector("#category").value;

      const response = await fetch('/admin/categories/new', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ category }),
      });
      let dataBack;
      if (response.ok) {
        dataBack = await response.json();
        console.log(dataBack);
      }

      $closTr.insertAdjacentHTML('beforebegin', `
    <div data-did="${dataBack[0].id}">
          <tr data-id="${dataBack[0].id}">
          <td>${dataBack[0].categories}</td>
    
          <td style="width:10%"><a id="adminEdit">Редактировать</a></td>
          <td><a id="adminEdit">Удалить</a></td>
        </tr>
        </div>
    `);

      $addForm = document.querySelector("#addform");
      $addForm.remove();
      $addButton.disabled = "";

    })

  }

})
