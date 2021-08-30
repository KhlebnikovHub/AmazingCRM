const Client = document.querySelector('.addClient');
console.log(Client)
const table = document.querySelector('.simple-little-table');
console.log(table)


Client.addEventListener('submit', async (e) => {
  e.preventDefault()
  const dataFromForm = Object.fromEntries(new FormData(e.target));
  console.log(dataFromForm)
  const response = await fetch('/clients', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataFromForm)
  });
  
  if(response.ok){
    const dataFromBack = await response.json();
    console.log( dataFromBack )
    table.insertAdjacentHTML('beforeend', createDomElement(dataFromBack))

    function createDomElement(dataFromBack){
        return(`
        <tr>
            <td>${dataFromBack.name}</td>
            <td>${dataFromBack.phone}</td>
            <td>${dataFromBack.email}</td>
            <td><a href="/clients/${dataFromBack.id}" class="obl">Открыть</a>
            <a href="/clients/${dataFromBack.id}/del" class="obl">Delite</a>
            <a href="/clients/${dataFromBack.id}/up" class="obl">Update</a>
            </td>
        </tr>
        `)
    }
  }
})

table.addEventListener('click', async (e) => {

  if(e.target.tagName === 'A' && e.target.innerText === 'Delite'){
    e.preventDefault()
      const $postWrap = e.target.closest('[data-id]');
      console.log($postWrap)
      const postId = e.target.closest('[data-id]').dataset.id
      console.log('>>>>>', postId);
      const response = await fetch(`/clients/${postId}`, {
          method:"DELETE",
      })

      if(response.ok){
        $postWrap.remove()
      }
  }
  if(e.target.tagName === 'A' && e.target.innerText === 'Update'){
    e.preventDefault()
      const $postWrap = e.target.closest('[data-id]');
      console.log($postWrap)
      const postId = e.target.closest('[data-id]').dataset.id
      console.log('>>>>>', postId);

      const response = await fetch(`/clients/${postId}`, {
          method:"PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
            name: e.target.name.value,
            lastName: e.target.lastName.value,
            fatherland: e.target.fatherland.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            email: e.target.email.value,

          }
          )
      })
      const responseJson = await response.json();

    if (!responseJson.isUpdateSuccessful) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('error');
      errorDiv.innerText = responseJson.errorMessage;
      e.target.parentElement.append(errorDiv);
      return;
    }

    window.location = `/clients/${responseJson.entryID}`;
  
  }
})
