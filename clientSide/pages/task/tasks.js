$(document).ready(function () {
    let memberId = window.location.href.split("?")[1];
    if (memberId !== undefined && memberId !== "" && memberId !== null) {
        let memberData = getDataDB("http://localhost:3000/users?id=" + memberId);
        $("#memberNameLabel").html(memberData[0].firstName + " " + memberData[0].lastName);
    } else {
        location.href = "/"
    }

    $("#btnNewTask").click(function () {
        location.href = "../task/newTask?" + memberId;
    });

    let formDataRegister = {};
    let validDataRegister = false;
    $(".onblurInput").blur(function (e) {
        let name = e.target.name;
        let value = e.target.value;
        let validation = $(this).attr("data-validation");
        let title = $(this).attr("data-title");
        let formName = $(this).attr("data-formName");
        validDataRegister = validations(name, validation, value, title);
        if (validDataRegister === true) {
                formDataRegister[name] = value;
        }
    });

    $("#btnCancel").click(function () {
        location.href = "../task/master?" + memberId;
    });


    $("#btnSubmitNewTask").click(function () {
        let valid = validationsForm("newTaskFormId");
        if (valid === true) {
            let dataForm = getValuesForm("newTaskFormId");
            dataForm["id"] = Math.floor(Math.random() * 1000);
            dataForm["userId"] = memberId;
            dataForm["type"] = "BACKLOG";
            dataForm["status"] = "BACKLOG";
            let res = postDataDB("http://localhost:3000/todoList", dataForm);
            if (res !== undefined) {
                $("#newTaskFormId").html(
                    '<div class="alert alert-success" role="alert">'
                    + 'Successfully registered'
                    + '</div>');
                setTimeout(function () {
                    location.href = "../task/master?" + memberId;
                }, 2000);
            }


        }

    })

});