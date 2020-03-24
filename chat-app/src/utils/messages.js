const generateMessage =(username,text) =>{
    return {
        username,
        text,
    createdAt: new Date().getTime()
}
}
const generateLocationMessage = (userame, url)=>{
    return{
        userame,
        url,
        createdAt:new Date().getTime()
    }
}
module.exports={generateMessage, generateLocationMessage}