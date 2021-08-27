
const $table = document.querySelector("#userTable");
const $did = document.querySelector("[data-did]");  



$table.addEventListener('click', async (event) => {
  console.log(event.target); 
  if(event.target.tagName === "A" && event.target.innerText === "Редактировать") {
    
    const $closTr = event.target.closest("[data-id]");
    const curId = $closTr.dataset.id;
    const $prev = document.querySelector(`[data-did="${curId}"]`);

    $closTr.innerHTML = "";
    
    const response = await fetch('/admin/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ curId }),
    });
    let dataBack;
    if(response.ok) {
      dataBack = await response.json();
      console.log(dataBack);
    }

    $closTr.insertAdjacentHTML('afterbegin', `
      <form name="editform" id="editform">
      <tr>
      <td style="width:25%;"><input type="text" value="${dataBack.lastName} ${dataBack.firstName}" name="username" id = "username"></td>
      <td style="width:12%;"><input type="text" value="${dataBack.phoneNumb}" name="phoneNumb" id = "phonoNumb"></td>
      <td style="width:20%;"><input type="text" value="${dataBack.email}" style="width:90%;" name = "email" id = "email"></td>
      <td style="width:20%;">

      <select class="browser-default" name = "user_type" id = "superselect">
      <option value="" disabled selected>Выберите права пользователя</option>
      <option value="guest">Гость</option>
      <option value="moderator">Менеджер</option>
      <option value="admin">Админ</option>
      </select>
      
      </td>
      <td><button class="waves-effect waves-light btn-large" id = "newEdit">Изменить</button></td>
    </tr>
      </form>
    `);

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    const newEdit = document.querySelector('#newEdit');
   
   

    newEdit.addEventListener('click', async (event) => {
      event.preventDefault();
      const username = document.querySelector("#username").value; 
      
      const editResponse = await fetch('/admin/users', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ dataEdit }),
      });

      if(editResponse.ok) {

      }

    })

    

  }

});