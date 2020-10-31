function validationCheckUserName(url, userName) {
    if (userName !== undefined && userName !== "") {
        let returnValue;
        $.ajax({
            url: url + userName,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.length !== 0) {
                    $("#userNameError").html("This username has been taken.");
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
};

function validations(e) {
    let validation = $(e).attr("data-validation");
    if (validation !== undefined && validation !== "") {
        let id = $(e).attr("id");
        let value = $(e).val();
        let title = $(e).attr("data-title");
        let types = validation.split(",");
        if (value !== undefined) {
            for (let i = 0; i < types.length; i++) {
                let type = types[i];
                let count = "";
                if (type.split("=")[0] == "min") {
                    type = "min";
                }
                if (type.split("=")[0] == "max") {
                    type = "max";
                }
                if (type.split("=")[0] == "minlength") {
                    type = "minlength";
                }
                if (type.split("=")[0] == "maxlength") {
                    type = "maxlength";
                }
                if (type === "required") {
                    if (value == "" || value == null || value.length == 0) {
                        $("#" + id + "Error").html("This field is required.");
                        return false;
                    }
                }
                if (value !== "" && value !== null) {
                    switch (type) {
                        case "email":
                            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                                $("#" + id + "Error").html("");
                            } else {
                                $("#" + id + "Error").html("The " + title + " format is incorrect.");
                                return false;
                            }
                            break;
                        case "text":
                            if (/^[A-Za-z]+$/.test(value)) {
                                $("#" + id + "Error").html("");
                            } else {
                                $("#" + id + "Error").html("The " + title + " format is incorrect.");
                                return false;
                            }
                            break;
                        case "password":
                            if (value.match(/[0-9]/g)) {
                                $("#" + id + "Error").html("");
                            } else {
                                $("#" + id + "Error").html("Just enter a number.");
                                return false;
                            }
                            break;
                        case "number":
                            if (/^\+?[0-9(),.-]+$/.test(value)) {
                                $("#" + id + "Error").html("");
                            } else {
                                $("#" + id + "Error").html("enter a valid number.");
                                return false;
                            }
                            break;
                        case "min":
                            count = types[i].split("=")[1];
                            if (parseInt(value) < parseInt(count)) {
                                $("#" + id + "Error").html("The input should be " + count + " less.");
                                return false;
                            }
                            break;
                        case "max":
                            count = types[i].split("=")[1];
                            if (parseInt(value) > parseInt(count)) {
                                $("#" + id + "Error").html("The input should be " + count + " more.");
                                return false;
                            }
                            break;
                        case "minlength":
                            count = types[i].split("=")[1];
                            if (value.length < parseInt(count)) {
                                $("#" + id + "Error").html("The input length should be " + count + " less.");
                                return false;
                            }
                            break;
                        case "maxlength":
                            count = types[i].split("=")[1];
                            if (value.length < parseInt(count)) {
                                $("#" + id + "Error").html("The input length should be " + count + " more.");
                                return false;
                            }
                            break;
                        case "checkDuplicateUserName":
                            validationCheckUserName("http://localhost:3000/users?userName=", $("#" + id).val());
                            break;
                    }
                }
            }
        }
    }
    return true;
};

function validationsForm(formId) {
    let valid = true;
    $('#' + formId + ' ' + 'input,textarea').each(function () {
      valid = validations(this);
      return valid;
    });
    return valid;
}