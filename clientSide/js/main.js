
$(document).ready(function () {
    $("#register").click(function () {
        location.href = "../clientSide/pages/user/register"
    });
});

function getValuesForm(formId) {
    let dataForm = {};
    $('#' + formId + ' ' + 'input,textarea').each(function () {
        let id = $(this).attr("id");
        let value = $(this).val();
        dataForm[id] = value;
    });
    return dataForm;
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

function putDataDB(url, data) {
    let returnValue;
    $.ajax({
        url: url,
        type: 'PUT',
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


function getNewDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let output = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;
    return output;
}