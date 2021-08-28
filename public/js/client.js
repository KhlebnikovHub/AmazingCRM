const Client = document.querySelector('.addClient');
console.log(Client)
const table = document.querySelector('.responsive-table');
console.log(table)


Client.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log("submit")
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
    table.insertAdjacentHTML('beforeend', createDomElement(dataFromBack))

    function createDomElement(dataFromBack){
        return(`
        <tr>
            <td><a href="/clients/${dataFromBack.id}">${dataFromBack.name}</a></td>
            <td>${dataFromBack.phone}</td>
            <td>${dataFromBack.email}</td>
          </tr>
        `)
    }
  }
})

table.addEventListener('click', async (e) => {
  e.preventDefault()
  if(e.target.tagName === 'BUTTON' && e.target.innerText === 'Delite'){
      console.log(e.target)
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
})
