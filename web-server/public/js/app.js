console.log('Client side javascript file is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const ms1 = document.querySelector('#ms1')
const ms2 = document.querySelector('#ms2')


ms1.textContent = 'Loading...'
ms2.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loact = search.value
    console.log("succes "+loact)

    fetch('/    weather?address='+loact).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            ms1.textContent = data.error
                }
        else {
            ms1.textContent = data.location
            ms2.textContent = data.forecast 
        }
    })
})
})