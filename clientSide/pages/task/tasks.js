$(document).ready(function () {
    let pageName = window.location.href.split("?")[0].split("/")[6];
    let memberId = window.location.href.split("?")[1];
    if (memberId !== undefined && memberId !== "" && memberId !== null) {
        let memberData = getDataDB("http://localhost:3000/users?id=" + memberId);
        $("#memberNameLabel").html(memberData[0].firstName + " " + memberData[0].lastName);

        if (pageName == "master") {
            let todoList = getDataDB("http://localhost:3000/todoList?userId=" + memberId);
            if (todoList !== undefined && todoList !== null) {
                for (let i = 0; i < todoList.length; i++) {
                    $("#backLogBody").append(
                        '<div class="col-mb-5 backLogTaskBox">'
                        + '<div class="backLogTaskBox-header">'
                        + '<h5>' + todoList[i].title + '</h5>'
                        + '</div><div class="backLogTaskBox-body" >'
                        + todoList[i].description + '</div>'
                        + '<div class="backLogTaskBox-footer" >'
                        + todoList[i].duration
                        + '</div></div>'
                    );
                }
            }
        }
    } else {
        location.href = "/"
    }

    $("#btnNewTask").click(function () {
        location.href = "../task/newTask?" + memberId;
    });

    $("#btnCancel").click(function () {
        location.href = "../task/master?" + memberId;
    });

    $(".onblurInput").blur(function (e) {
        validations(this);
    });


    $("#btnSubmitNewTask").click(function () {
        let valid = validationsForm("newTaskFormId");
        if (valid === true) {
            let dataForm = getValuesForm("newTaskFormId");
            let startDate = getNewDate();
            dataForm["id"] = Math.floor(Math.random() * 1000);
            dataForm["userId"] = memberId;
            dataForm["type"] = "BACKLOG";
            dataForm["status"] = "BACKLOG";
            dataForm["createDate"] = startDate;
            let res = postDataDB("http://localhost:3000/todoList", dataForm);
            if (res !== undefined) {
                $("#newTaskFormId").html(
                    '<div class="alert alert-success" role="alert">'
                    + 'Successfully registered'
                    + '</div>');
                setTimeout(function () {
                    location.href = "../task/master?" + memberId;
                }, 2500);
            }
        }
    })
});