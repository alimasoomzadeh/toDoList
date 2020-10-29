$(document).ready(function () {
    let formDataRegister = {};
    let validDataRegister = false;
    $(".onblurInput").blur(function (e) {
        let name = e.target.name;
        let type = e.target.type;
        let value = e.target.value;
        let title = $(this).attr("data-title");
        let formName = $(this).attr("data-formName");
        console.log($(this).attr("data-formName"))
        validDataRegister = validations(name, type, value,title);
        if (validDataRegister === true) {
            if (formName === "register") {
                if (type == "email") {
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
            console.log(formDataRegister);
            formDataRegister["id"] = Math.floor(Math.random() * 1000);
            let res = postDataDB("http://localhost:3000/users", formDataRegister)
            console.log(res);
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
        console.log(username)
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
            console.log(res);
            if (res !== undefined && res.length !== 0) {
                let id = res[0].id;
                location.href = "../clientSide/pages/task/master?" + id;
            } else {
                $("#pmError").html("Sorry, we don't recognize this username and password.");
            }
        }
    });

});