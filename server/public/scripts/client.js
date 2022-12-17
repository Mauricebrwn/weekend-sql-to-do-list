console.log('js');

$(document).ready(function(){
    console.log('JQ');
    fetchAndRenderChores();
})

function fetchAndRenderChores(){
    console.log('in getChores');
    $.ajax({
        type: 'GET',
        url: '/chores'
    }).then((response) => {
    $('#viewChores').empty();
    for(let chore of response) {
    $('viewChores').append(`
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