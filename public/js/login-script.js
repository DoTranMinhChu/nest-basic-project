function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function login() {


    var username = $('#login-form #username').val();
    var password = $('#login-form #password').val()
    console.log(username + " __ " + password)
    $.ajax({
        url: 'auth/login',
        type: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: {
            username: username,
            password: password
        }
    }).then(data => {
        console.log("------- Begin login---------")
        setCookie("Authorization", "Bearer " + data.token, 365)
        console.log(data)
        console.log("-- ", getCookie("Authorization"))
        getProfile();

    }).catch(err => {
        console.log("errr login")
        console.log(err)
    })
}

function getProfile() {
    $("#profile").empty();
    headerParams = { 'Authorization': getCookie("Authorization") };
    obj = {
        type: 'get',
        url: '/auth/profile',
        headers: headerParams,
        data: [],
        dataType: 'json',
        processData: false,
        success: function (data) {
            console.log("------- Begin getProfile---------")
            console.log('success');
            console.log(data);

            $("#profile").append(`<div>id : ${data.id}</div>`);
            $("#profile").append(`<div>email : ${data.email}</div>`);
            $("#profile").append(`<div>name : ${data.name}</div>`);

        },
        error: function (err) {
            console.log("err")
        }
    };

    $.ajax(obj);
}


function logout() {
    console.log("------- Begin Logout---------")
    setCookie("Authorization", null, 365)
    getProfile();

}


function register() {
    var name = $('#register-form #name').val();
    var email = $('#register-form #email').val();
    var password = $('#register-form #password').val()
    console.log(username + " __ " + password)
    $.ajax({
        url: 'auth/register',
        type: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        data: {
            "name": name,
            "email": email,
            "password": password
        }
    }).then(data => {
        console.log("------- Begin register---------")
        console.log(data)

    }).catch(err => {
        console.log(err)
    })
}