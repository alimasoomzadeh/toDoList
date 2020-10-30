$(document).ready(function () {
    let formDataRegister = {};
    let validDataRegister = false;
    $(".onblurInput").blur(function (e) {
        let name = e.target.name;
        let value = e.target.value;
        let validation = $(this).attr("data-validation");
        let title = $(this).attr("data-title");
        let formName = $(this).attr("data-formName");
        validDataRegister = validations(name, validation, value,title);
        if (validDataRegister === true) {
            if (formName === "register") {
                if (validation == "email") {
                    let check = checkUserName("http://localhost:3000/users?userName=", $("#inputUserName").val());
                    if (check === false) {
                        formDataRegister[name] = value;
                    }
                } else {
                    formDataRegister[name] = value;
                }
            } else {
                formDataRegister[name] = value;
            }
        }
    });


    $("#btnCancel").click(function () {
        location.href = "/"
    });

    $("#btnSubmitRegister").click(function () {
        if (validDataRegister === true) {
            formDataRegister["id"] = Math.floor(Math.random() * 1000);
            let res = postDataDB("http://localhost:3000/users", formDataRegister)
            if (res !== undefined) {
                $("#formId").html(
                    '<div class="alert alert-success" role="alert">'
                    + 'اطلاعات شما با موفقیت ثبت شد'
                    + '</div>');
                setTimeout(function () {
                    location.href = "/"
                }, 2000);
            }
        }
    });


    $("#btnSubmitLogIn").click(function () {
        let username = $("#inputUserName").val();
        let password = $("#inputPassword").val();
        $("#pmError").html("");
        if (username === undefined || username === "" ||  username === null) {
            $("#userNameError").html("Sorry, This field is required." );
            return false;
        }
        if (password === undefined || password === "" ||  password === null) {
            $("#passwordError").html("Sorry, This field is required." );
            return false;
        }
        if (username !== undefined && username !== "" && password !== undefined && password !== "") {
            let res = getDataDB("http://localhost:3000/users?userName=" + username + "&password=" + password)
            if (res !== undefined && res.length !== 0) {
                let id = res[0].id;
                location.href = "../clientSide/pages/task/master?" + id;
            } else {
                $("#pmError").html("Sorry, we don't recognize this username and password.");
            }
        }
    });

});