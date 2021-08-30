
const Orders = document.forms.addOrder
console.log(Orders)
const table = document.querySelector('.simple-little-table');
console.log(table)


Orders.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log("submit")
  const dataFromForm = Object.fromEntries(new FormData(e.target));
  console.log(dataFromForm)
  const response = await fetch('/orders', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataFromForm)
  });
  if(response.ok){
    const dataFromBack = await response.json();
    console.log(dataFromBack)
    table.insertAdjacentHTML('beforeend', createDomElement(dataFromBack))

    function createDomElement(dataFromBack){
        return(`
        <tr>
          <td>${dataFromBack.id}</td>
          <td> ${dataFromBack.User.firstName} ${dataFromBack.User.lastName} ${dataFromBack.User.email}</td>
          <td> ${dataFromBack.Client.name} </td>
          <td>${dataFromBack.OrderStatus.status}</td>
          <td><a href="/orders/${dataFromBack.id}" class="obl">Открыть</a>
          <a href="/orders/${dataFromBack.id}/del" class="obl">Delite</a>
          <a href="/orders/${dataFromBack.id}/up" class="obl">Update</a></td>
        </tr>
         
        `)
    }
  }
  
})

table.addEventListener('click', async (e) => {
  if(e.target.tagName === 'A' && e.target.innerText === 'Delite'){
    e.preventDefault()
      console.log(e.target)
      const $postWrap = e.target.closest('[data-id]');
      console.log($postWrap)
      const postId = e.target.closest('[data-id]').dataset.id
      console.log('>>>>>', postId);
      const response = await fetch(`/orders/${postId}`, {
          method:"DELETE",
      })

      if(response.ok){
        $postWrap.remove()
      }
  }
  // if(e.target.tagName === 'A' && e.target.innerText === 'Update'){
  //   e.preventDefault()
  //     const $postWrap = e.target.closest('[data-id]');
  //     console.log($postWrap)
  //     const postId = e.target.closest('[data-id]').dataset.id
  //     console.log('>>>>>', postId);
  //     const response = await fetch(`/orders/${postId}`, {
  //         method:"PUT",
  //     })

  //     if(response.ok){
  //       $postWrap.remove()
  //     }
  // }
})
