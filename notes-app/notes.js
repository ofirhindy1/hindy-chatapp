const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote =  (title, body) =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>{
        return note.title===title
    })

    debugger
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote =  (title) =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note)=> {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const saveNotes =  (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.green.inverse("Your Notes: " ))
    notes.forEach((note)=>{
        console.log("Title : "+note.title)
    })

    }
    const readNote=(title)=>{
        const notes = loadNotes()
        const noteTitle = notes.find((note)=>{
            return note.title ===title
        })
        console.log(chalk.inverse("Title: "+noteTitle.title ))
        console.log(chalk.green("Body: "+noteTitle.body ))

    }

module.exports = {
    loadNotes: loadNotes,
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}