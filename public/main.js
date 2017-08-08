const url = 'info/:id'

fetch(url, {method: delete}).then(reponse => response.json()).then(json => {
  button.addEventListener('click', event => {
    app.delete()
  })
})
