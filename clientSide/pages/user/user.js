$(document).ready(function () {
    let formData = {};
    $(".onblurInput").blur(function (e) {
        let name = e.target.name;
        let type = e.target.type;
        let value = e.target.value;
        let valid = validations(name, type, value);
        if (valid === true) {
            formData[name] = value;
        }
    });


    $("#btnCancel").click(function () {
        location.href = "/"
    });


    $("#btnSubmitSignIn").click(function () {
        console.log(formData);
        formData["id"] = Math.floor(Math.random() * 1000);
        let res = postDataDB("http://localhost:3000/users", formData)
        console.log(res);
        if (res !== undefined) {
           $("#formId").html(
           '<div class="alert alert-success" role="alert">'
                    +'اطلاعات شما با موفقیت ثبت شد'
            +'</div>');
            setTimeout(function(){ location.href = "/" }, 2000);
        }
    });


});