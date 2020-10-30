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

function validations(name, validation, value, title) {
    let flagReturn = false;
    let types = validation.split(",");
    $("#" + name + "Error").html("");
    if (value !== undefined && value !== "") {
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let count = "";
            if (type.split("=")[0] == "min") {
                type = "min";
            }
            if (type.split("=")[0] == "max") {
                type = "max";
            }
            switch (type) {
                case "email":
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                        $("#userNameError").html("");
                        flagReturn = true;
                    } else {
                        $("#" + name + "Error").html("Please The " + title + " format is incorrect.");
                        flagReturn = false;
                    }
                    break;
                case "text":
                    if (/^[A-Za-z]+$/.test(value)) {
                        $("#" + name + "Error").html("");
                        flagReturn = true;
                    } else {
                        $("#" + name + "Error").html("Please The " + title + " format is incorrect.");
                        flagReturn = false;
                    }
                    break;
                case "password":
                    if (value.match(/[0-9]/g)) {
                        if (value.length >= 8) {
                            $("#" + name + "Error").html("");
                            flagReturn = true;
                        } else {
                            $("#" + name + "Error").html("Please password should be at least 8 characters.");
                            flagReturn = false;
                        }
                    } else {
                        $("#" + name + "Error").html("Please Just enter a number.");
                        flagReturn = false;
                    }
                    break;
                case "number":
                    if (/^\+?[0-9(),.-]+$/.test(value)) {
                        $("#" + name + "Error").html("");
                        flagReturn = true;
                    } else {
                        $("#" + name + "Error").html("Please enter a valid number.");
                        flagReturn = false;
                    }
                    break;
                case "min":
                    count = types[i].split("=")[1];
                    if (parseInt(value) < parseInt(count)) {
                        $("#" + name + "Error").html("Please password should be at least " + count + " characters.");
                        flagReturn = false;
                    }
                    break;
                case "max":
                    count = types[i].split("=")[1];
                    if (parseInt(value) > parseInt(count)) {
                        $("#" + name + "Error").html("Please password should be at most " + count + " characters.");
                        flagReturn = false;
                    }
                    break;
            }
        }
    } else {
        $("#" + name + "Error").html("Please This field is required.");
        flagReturn = false;
    }
    return flagReturn;
}