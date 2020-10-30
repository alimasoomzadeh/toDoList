$(document).ready(function () {
    $(".onblurInput").blur(function (e) {
        validations(this);
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
        let valid = validationsForm("logInFormId");
        if (valid === true) {
            let dataForm = getValuesForm("logInFormId");
            let res = getDataDB("http://localhost:3000/users?userName=" + dataForm.userName + "&password=" + dataForm.password)
            if (res !== undefined && res.length !== 0) {
                let id = res[0].id;
                location.href = "../clientSide/pages/task/master?" + id;
            }else{
                $("#pmError").html("Please we don't recognize this username and password.");
                return false;
            }
        }
    });
});