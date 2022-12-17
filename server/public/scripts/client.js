console.log('js');

$(document).ready(function(){
    console.log('JQ');
    fetchAndRenderChores();
    $('#addChoreButton').on('click', createChore);
})

function fetchAndRenderChores(){
    console.log('in getChores');
    $.ajax({
        type: 'GET',
        url: '/chores'
    }).then((response) => {
    $('#viewChores').empty();
    for(let chore of response) {
    $('#viewChores').append(`
    <tr data-id=${chore.id}>
        <td>${chore.chore}</td>
        <td>${chore.whos_it_for}</td>
        <td>${chore.done}</td>
        <td>${chore.notes}</td>
        <td>
            <button type="button" id="complete">All done</button>
        </td>
    </tr>
    `)
    }
    }).catch((dbErr) => {
        console.log('Error in getChores response', dbErr);
    })
    }

function createChore() {
    let newTask = $('#ChoreIn').val();
    let newWhoseItFor = $('#WhosItForIn').val();
    let newDone = $('#DoneIn').val();
    let newNotes = $('#NotesIn').val();

    let newChore = {
        chore: newTask,
        whos_it_for: newWhoseItFor,
        done: newDone,
        notes: newNotes
    }

    $.ajax({
        method: 'POST',
        url: '/chores',
        data: newChore
    }).then((response) => {
        fetchAndRenderChores();
    }).catch((error) => {
        console.log('something broke in createChore():', error);
    })
}