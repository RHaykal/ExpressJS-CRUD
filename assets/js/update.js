const update = document.getElementById('update');

update.addEventListener('click', _ => {
    //console.log('hello there')
    fetch('/user/:userId', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            city: document.getElementById('city').value,
            phone: document.getElementById('phone').value
        })
    })
    location.reload();
})