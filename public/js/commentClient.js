const addComment = document.forms.addComment
const table = document.querySelector('.table');
console.log(table)

addComment.addEventListener('submit', async (e) => {
  e.preventDefault()
  const dataFromForm = Object.fromEntries(new FormData(e.target));
  console.log(dataFromForm)
  console.log(e.target.dataset.id)
  const response = await fetch(`/clients/${e.target.dataset.id}/comments`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(dataFromForm)
  });
  if(response.ok){
    const dataFromBack = await response.json();
    console.log(dataFromForm)
    table.insertAdjacentHTML('beforeend', createDomElement(dataFromBack))

    function createDomElement(dataFromBack){
        return(`
        <tr>
        <td>${dataFromBack.comment}</td>
        <td>${dataFromBack.User.firstName} ${dataFromBack.User.lastName}</td>
            <td>${dataFromBack.User.email}</td>
            <td>${dataFromBack.date}</td>
            <td> <a href="/clients/${dataFromBack.id}/del">Delite</a>
            <a href="/clients/${dataFromBack.id}/up">Update</a>
          </td>
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
