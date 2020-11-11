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
                    let taskBoxStyle = todoList[i]["type"] + "TaskBox";
                    let taskBox = '<div class="col-mb-5  ' + taskBoxStyle + '">'
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
                        + '<div class="row" >'
                        + '<div class="col-3  btnTaskModal" data-typeBtn="viewTask" data-id="' + todoList[i].id + '" ><i data-typeBtn="viewTask" data-id="' + todoList[i].id + '" class="fas fa-eye"></i></div>'
                        + '<div class="col-3  btnTaskModal" data-typeBtn="changeStatusTask" data-id="' + todoList[i].id + '"  ><i data-typeBtn="changeStatusTask" data-id="' + todoList[i].id + '" class="fas fa-edit"></i></div>'
                        + '</div>'
                        + '</div></div></div>';
                    $("#" + todoList[i]["status"] + "Body").append(taskBox);
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

    $("#btnSubmitNewTask").click(function () {
        let valid = validationsForm("newTaskFormId");
        if (valid === true) {
            let dataForm = getValuesForm("newTaskFormId");
            let createDate = getNewDate();
            dataForm["id"] = Math.floor(Math.random() * 1000);
            dataForm["userId"] = memberId;
            dataForm["type"] = "BACKLOG";
            dataForm["status"] = "BACKLOG";
            dataForm["createDate"] = createDate;
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


    $(".btnTaskModal").click(function () {
        $("#viewTaskModalTitleHeader").html("View Task");
        let pageType = $(this).attr("data-typeBtn");
        let taskId = $(this).attr("data-id");
        let tasksData = getDataDB("http://localhost:3000/todoList?id=" + taskId);
        let taskData = tasksData[0];
        if (taskData !== undefined && taskData !== null) {
            for (let i in taskData) {
                $("#" + i + "ViewTask").val(taskData[i])
            }
        }

        if (pageType === "changeStatusTask") {
            let nextTaskData = JSON.parse(JSON.stringify(taskData));
            $("#viewTaskModalTitleHeader").html("Change Status Task");
            let btnTitle = "Todo";
            nextTaskData["status"] = "TODO";
            nextTaskData["type"] = "SPRINT";
            if (taskData["status"] === "TODO") {
                btnTitle = "doing";
                nextTaskData["status"] = "DOING";
                nextTaskData["type"] = "SPRINT"
            }
            ;
            if (taskData["status"] === "DOING") {
                btnTitle = "Verify";
                nextTaskData["status"] = "VERIFY";
                nextTaskData["type"] = "SPRINT"
            }
            ;
            if (taskData["status"] === "VERIFY") {
                btnTitle = "Done";
                nextTaskData["status"] = "DONE";
                nextTaskData["type"] = "COMPLETED"
            }
            ;
            $("#changePage").html("");
            $("#changePage").append(
                '<div class="form-group row">'
                + '<label for="btnChangeStatusTask" class="col-sm-4 col-form-label">Change Status:</label>'
                + '<div class="col-sm-8">'
                + '<button id="btnChangeStatusTask"   type="button" class="btn btn-outline-primary">'
                + btnTitle
                + '</button></div></div>'
            );
            $("#btnChangeStatusTask").click(function () {
                let startDate = getNewDate();
                nextTaskData["startDate"] = startDate;
                putDataDB("http://localhost:3000/todoList/" + nextTaskData.id, nextTaskData);
            });
        }
        $('#taskModal').modal('toggle');


    });


});