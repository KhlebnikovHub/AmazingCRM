const $table = document.querySelector('#userTable');
const $did = document.querySelector('[data-did]');
let curId;
$addButton = document.querySelector('#addbutton');

$table.addEventListener('click', async (event) => {
  if (event.target.tagName === 'A' && event.target.innerText === 'Редактировать') {
    const $closTr = event.target.closest('[data-id]');
    curId = $closTr.dataset.id;
    const $prev = document.querySelector(`[data-did="${curId}"]`);
    $closTr.innerHTML = '';

    const response = await fetch('/admin/categories', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ curId }),
    });
    let dataBack;
    if (response.ok) {
      dataBack = await response.json();
    }

    $closTr.innerHTML = `

      <form name="editform" >
      <tr id = "editform">
      <td style="width:40%;"><input type="text" value="${dataBack.categories}" style="width:90%;" name = "category" id = "category"></td>
      <td style="width:10%;">
      </td>
      <td><button class="waves-effect waves-light btn-large" id = "newEdit">Изменить</button></td>
    </tr>
      </form>

    `;

    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems);
    });

    const newEdit = document.querySelector('#newEdit');

    newEdit.addEventListener('click', async (event) => {
      event.preventDefault();
      const $editForm = document.querySelector('#editform');
      const category = document.querySelector('#category').value;

      const editResponse = await fetch('/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ category, curId }),
      });

      if (editResponse.ok) {
        const editted = await editResponse.json();
        $table.insertAdjacentHTML(
          'beforeend',
          `
        <tbody>

          <div data-did="${editted.id}">
            <tr data-id="${editted.id}">
            <td>${editted.categories}</td>
            <td style="width:10%"><a id="adminEdit">Редактировать</a></td>
            <td><a id="adminEdit">Удалить</a></td>
          </tr>
          </div>

        </tbody>
        `
        );
        const trtr = document.querySelector(`tr[data-id="${curId}"]`);
        trtr.remove();
      }
    });
  }

  if (event.target.tagName === 'A' && event.target.innerText === 'Удалить') {
    const $closTr = event.target.closest('[data-id]');
    curId = $closTr.dataset.id;

    const response = await fetch('/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ curId }),
    });
    let dataBack;
    if (response.ok) {
      dataBack = await response.json();
      $closTr.remove();
    }
  }

  if (event.target.tagName === 'BUTTON' && event.target.innerText === 'ДОБАВИТЬ') {
    const $closTr = document.querySelector('[data-id]');
    curId = $closTr.dataset.id;

    $addContainer = document.querySelector('#addcontainer');
    $addButton.disabled = 'true';

    $closTr.insertAdjacentHTML(
      'beforebegin',
      `
    <form name="addform">
    <tr  id="addform">
    <td style="width:40%;"><input type="text" style="width:90%;" name = "category" id = "category"></td>
    </td>
    <td><button class="waves-effect waves-light btn-large" id = "newAdd">Отправить</button></td>
  </tr>
    </form>
    `
    );

    const newAdd = document.querySelector('#newAdd');

    newAdd.addEventListener('click', async (event) => {
      const category = document.querySelector('#category').value;

      const response = await fetch('/admin/categories/new', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ category }),
      });
      let dataBack;
      if (response.ok) {
        dataBack = await response.json();
      }

      $closTr.insertAdjacentHTML(
        'beforebegin',
        `
      <div data-did="${dataBack[0].id}">
            <tr data-id="${dataBack[0].id}">
            <td>${dataBack[0].categories}</td>

            <td style="width:10%"><a id="adminEdit">Редактировать</a></td>
            <td><a id="adminEdit">Удалить</a></td>
          </tr>
          </div>
      `
      );

      $addForm = document.querySelector('#addform');
      $addForm.remove();
      $addButton.disabled = '';
    });
  }
});
