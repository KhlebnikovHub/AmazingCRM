
const Orders = document.forms.addOrder
console.log(Orders)
const table = document.querySelector('.responsive-table');
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
          <td><a href="/orders/${dataFromBack.id}">${dataFromBack.id}</a></td>
          <td> ${dataFromBack.User.firstName} ${dataFromBack.User.lastName} ${dataFromBack.User.email}</td>
          <td> ${dataFromBack.Client.name} </td>
          <td>${dataFromBack.OrderStatus.status}</td>
          </tr>
        `)
    }
  }
  
})
