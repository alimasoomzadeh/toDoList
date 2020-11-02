$(document).ready(function () {
    let pageName = window.location.href.split("?")[0].split("/")[6];
    let memberId = window.location.href.split("?")[1];
    if (memberId !== undefined && memberId !== "" && memberId !== null) {
        let memberData = getDataDB("http://localhost:3000/users?id=" + memberId);
        $("#memberNameLabel").html(memberData[0].firstName + " " + memberData[0].lastName);



        if (pageName == "master") {
            let todoList = getDataDB("http://localhost:3000/todoList?userId=" + memberId);
            console.log("todoList",todoList)
            if (todoList !== undefined && todoList !== null) {
                for (let i = 0; i < todoList.length; i++) {
                    $("#backLogBody").append(
                        '<div class="col-mb-5  backLogTaskBox">'
                        + '<div class="box">'
                        + '<div class="backLogTaskBox-header">'
                        + '<h5>' + todoList[i].title + '</h5>'
                        + '</div><div class="backLogTaskBox-body" >'
                        + todoList[i].description
                        + '</div>'
                        + '<div class="backLogTaskBox-footer" >'
                        + '<label><i class="fas fa-clock iconTime">'
                        + '</i><span class="numberTime">'
                        + todoList[i].duration
                        + '</span><span class="unitTime">' + 'Week'
                        + '</span></label>'
                        + '</div></div><div class="middle">'
                        + '<div class="btnChangeStatus">'
                        +'<div class="row" >'
                        + '<div class="col-3 viewTask" data-id="'+todoList[i].id+'" ><i data-id="'+todoList[i].id+'" class="fas fa-eye"></i></div>'
                        + '<div class="col-3 changeStatusTask" data-id="'+todoList[i].id+'"  ><i data-id="'+todoList[i].id+'" class="fas fa-edit"></i></div>'
                        +'</div>'
                        + '</div></div></div>'
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

    $(".onblurInput").blur(function () {
        validations(this);
    });

    $(".viewTask").click(function () {
        console.log($(this).attr("data-id"))
    });

    $(".changeStatusTask").click(function () {
        console.log($(this).attr("data-id"))
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