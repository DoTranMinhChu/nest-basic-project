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
        dataType: 'json',
        data: {
            "username": username,
            "password": password
        }
    }).then(data => {
        setCookie("Authorization", "Bearer " + data.token, 365)
        console.log(data)
        console.log("-- ", getCookie("Authorization"))
        getProfile();

    }).catch(err => {
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
            console.log('success');
            console.log(data);

            $("#profile").append(`<div>id : ${data.id}</div>`);
            $("#profile").append(`<div>email : ${data.email}</div>`);
            $("#profile").append(`<div>password : ${data.password}</div>`);

        },
        error: function (err) {
            console.log("err")
        }
    };

    $.ajax(obj);
}


function logout() {
    setCookie("Authorization", null, 365)
    getProfile();

}