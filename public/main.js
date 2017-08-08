const url = '/info/'

document.querySelector('#deleteButton').addEventListener('click', function() {
  let id = this.getAttribute('data-id')
  let _url = url + id
  fetch(_url, { method: 'delete' }).then(response => response.json()).then(json => {
    console.log(json)
  })
})
