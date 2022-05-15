function login() {
 
    var username = $('#login-form #username').val();
    var password = $('#login-form #password').val()
    console.log(username + " __ " + password)
    $.ajax({
        url: 'auth/login',
        type: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        data: {
            "username": username,
            "password": password
        }
    }).then(data => {
        if (data.id) {
            console.log(data)
        } else {
            alert('The username or password is Incorrect')
        }

    }).catch(err => {
        console.log(err)
    })
}