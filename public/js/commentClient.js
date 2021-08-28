const addComment = document.forms.addComment
const table = document.querySelector('.responsive-table');

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
            <td>${dataFromBack.User.firstName} ${dataFromBack.User.lastName}</td>
            <td>${dataFromBack.User.email}</td>
            <td>${dataFromBack.comment}</td>
            <td>${dataFromBack.date}</td>
            
          </tr>
        `)
    }
  }
})
