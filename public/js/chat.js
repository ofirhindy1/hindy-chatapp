const socket = io()


//elemens 
const $messageForm = document.querySelector('#message-form')
const $messageInput= $messageForm.querySelector('input')
const $messageButton = $messageForm.querySelector('button')
const $messageSendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const messageLocationTemplate = document.querySelector('#location-message-template').innerHTML
const messageSideBarTemplate = document.querySelector('#sidebar-template').innerHTML

//options
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoScroll=()=>{
    const $newMessage = $messages.lastElementChild
    
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    const visibleHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight    
    const scrollOffset = $messages.scrollTop + visibleHeight
    
        if (containerHeight - newMessageHeight <= scrollOffset) {
            $messages.scrollTop = $messages.scrollHeight
        }
}

socket.on('message', (message) => {
    console.log( message)
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('k:mm')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})
socket.on('locationMessage', (message)=>{
    console.log(message)
    const html = Mustache.render(messageLocationTemplate,{
        username:message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('k:mm')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoScroll()
})
socket.on('roomData',({room,users})=>{
    const html = Mustache.render(messageSideBarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})
$messageForm.addEventListener('submit' ,(e)=>{
    e.preventDefault()
//disable button
    $messageButton.setAttribute('disabled', 'disabled')

    const message = $messageInput.value


    socket.emit('sendMessage', message,(error)=>{
        //enable button
        $messageButton.removeAttribute('disabled')
        $messageInput.value = ''
        $messageInput.focus()
        
        if(error){
            return console.log(error)
        }
        console.log("message is delivered!")
    })
})

$messageSendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation)
    {
        return alert('Geolocation is not supported in this browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendlocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ()=>{
            console.log('Location shared!')
        })
    })
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})