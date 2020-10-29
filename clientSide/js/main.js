$(document).ready(function () {
    $("#register").click(function () {
        location.href = "../clientSide/pages/user/register"
    });
});

function checkUserName(url, userName) {
    if (userName !== undefined && userName !== "") {
        let returnValue;
        $.ajax({
            url: url + userName,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.length !== 0) {
                    $("#userNameError").html("کلمه کاربری مورد نظر قبلا ثبت شده است");
                    returnValue = true;
                } else {
                    $("#userNameError").html("");
                    returnValue = false;
                }
            },
            error: function (xhr, status, error) {
                let err = eval("(" + xhr.responseText + ")");
                returnValue = err.Message;
            },
            async: false
        });
        return returnValue;
    }
}

function getDataDB(url) {
    let returnValue;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data) {
                returnValue = data;
            }
        },
        error: function (xhr, status, error) {
            let err = eval("(" + xhr.responseText + ")");
            returnValue = err.Message;
        },
        async: false
    });
    return returnValue;
}

function postDataDB(url, data) {
    let returnValue;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            returnValue = data;
        },
        error: function (xhr, status, error) {
            let err = eval("(" + xhr.responseText + ")");
            returnValue = err.Message;
        },
        async: false
    });
    return returnValue;
}

function validations(name, type, value,title) {
    $("#" + name + "Error").html("");
    if (value !== undefined && value !== "") {
        switch (type) {
            case "email":
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    $("#userNameError").html("");
                    return true;
                } else {
                    $("#" + name + "Error").html("Sorry, The " + title +" format is incorrect.");
                    return false;
                }
                break
            case "text":
                if (/^[A-Za-z]+$/.test(value)) {
                    $("#" + name + "Error").html("");
                    return true;
                } else {
                    $("#" + name + "Error").html("Sorry, The " + title +" format is incorrect.");
                    return false;
                }
                break
            case "password":
                if (value.match(/[0-9]/g))  {
                    if (value.length >= 8)  {
                        $("#" + name + "Error").html("");
                        return true;
                    } else {
                        $("#" + name + "Error").html("Sorry, Password length must be equal to or greater than 8 characters.");
                        return false;
                    }
                } else {
                    $("#" + name + "Error").html("Sorry, Just enter a number.");
                    return false;
                }
                break
        }
    } else {
        $("#" + name + "Error").html("Sorry, This field is required.");
        return false;
    }
}