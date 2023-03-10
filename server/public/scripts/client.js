console.log('js');

$(document).ready(function(){
    console.log('JQ');
    fetchAndRenderChores();
    $('#addChoreButton').on('click', createChore);
    $('body').on('click', '#deleteButton', deleteChore);
    $('body').on('click', '#completeButton', switchChoreToDone);
})
// GET ROUTE gets chores and appends to the DOM
function fetchAndRenderChores(){
    console.log('in getChores');
    $.ajax({
        type: 'GET',
        url: '/chores'
    }).then((response) => {
    $('#viewChores').empty();
    for(let chore of response) {
    $('#viewChores').append
    // conditional rendering function goes here 
    (`    
    <tr ${conditionallyApplyGreenDone(chore)} data-id=${chore.id}>
        <td>${chore.chore}</td>
        <td>${chore.whos_it_for}</td>
        <td>${chore.done}</td>
        <td>${chore.notes}</td>
        <td>
            <button type="button" id="completeButton">All done</button>
        </td>
        <td>
            <button type="button" id="deleteButton">Delete</button>
        </td>
    </tr>
    `)
    }
    }).catch((dbErr) => {
        console.log('Error in getChores response', dbErr);
    })
    }
//Conditional rendering  function that changes tr green when complete button is pressed
function conditionallyApplyGreenDone(chore) {
    if (chore.done === 'Y') {
        return 'class= "green"'
    }
    else{
        return ''
    }
}
//Create new chore function grabs values from inputs
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
//POST ROUTE adds new chore 
    $.ajax({
        method: 'POST',
        url: '/chores',
        data: newChore
    }).then((response) => {
        fetchAndRenderChores();
    }).catch((error) => {
        console.log('something broke in createChore():', error);
    });
//clears input fields after new chore is added 
    $('#ChoreIn').val('');
    $('#WhosItForIn').val('');
    $('#DoneIn').val('');
    $('#NotesIn').val('');
}
// PUT ROUTE changes N to Y when complete button is pressed by id 
function switchChoreToDone () {
    let idToUpdate = $(this).parent().parent().data().id;
    $.ajax({
        method: 'PUT',
        url: `/chores/${idToUpdate}`,
        data: {
            done: 'Y'
        }
    }).then((response) => {
        fetchAndRenderChores();
    }).catch((response) => {
        console.log('Error in PUT /chores:', response);
    })
}

//DELETE ROUTE to delete chore from DOM and DB
function deleteChore() {
    let idToDelete = $(this).parent().parent().data().id;
    //pop up when delete button is pressed CONFIRM DELETE
    swal("Are you sure its done? Better double check!", {
        title: "Delete Chore",
        icon: "warning",
        dangerMode: true,
        buttons: true,
    }).then((response) => {
        if (response === true){
    $.ajax({
        method: 'DELETE',
        url: `/chores/${idToDelete}`
    }).then((response) => {
        fetchAndRenderChores();
    }).catch((error) => {
        console.log('deleteChore() is broken:', error);
    })
}
    })
}