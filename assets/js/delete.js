$('a').on('click', function () {
    var userID = $(this).data('id');
    //console.log(userID)
    fetch('/user/:userId', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userID
        })
    })
    location.reload()
});