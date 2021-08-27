const Client = document.querySelector('.addClient');
console.log(Client)
const table = document.querySelector('.responsive-table');
console.log(table)
const $newCli = document.querySelector('[data-postWrapper]')

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
