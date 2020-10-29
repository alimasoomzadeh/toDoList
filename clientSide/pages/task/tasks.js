$(document).ready(function () {
    let memberId = window.location.href.split("?")[1];
    if (memberId !== undefined && memberId !== "" && memberId !== null) {
        let memberData = getDataDB("http://localhost:3000/users?id=" + memberId);
        $("#memberNameLabel").html(memberData[0].firstName + " " + memberData[0].lastName);

        $("#btnNewTask").click(function () {
            location.href = "../task/newTask?" + memberId;

        });


    } else {
        location.href = "/"
    }

});