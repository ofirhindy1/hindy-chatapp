const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
    command: 'list',
    describe: 'list',
    handler: function(){
        notes.listNotes()
    }
})
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
       notes.removeNote(argv.title)
    }
})
yargs.command({
        command: 'read',
        describe: 'read',
        builder:{
            title:{
                describe:'Read',
                demandOption:true,
                type: 'string'
            }
        },
        handler(argv){
            notes.readNote(argv.title)
        }
})

yargs.parse()
