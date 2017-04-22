$(function () {
    'use strict';


    function initHtml(json) {
        var html_ = '<tr title="' + json.id + '">' +
            '<td>' +
            '<input type="checkbox" name="checkbox" class="check2" title="' + json.id + '">' +
            '<span class="id1">' + json.id + '</span>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.classify + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.title + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.grade + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.status + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.time + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.creator + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="text" class="inp" value="' +
            json.area + '" disabled>' +
            '</td>' +
            '<td>' +
            '<input type="button" class="delete" value="删除"   title="' + json.id + '">' +
            '</td>' +
            '</tr>';
        return html_;

    }
    //把数组里的内容显示到表格里
    function initialize(data) {
        $("tbody").html("");
        $.each(data, function (key, val) {
            $("tbody").append(initHtml(val));
        })
        //        for (var i = 0; i < data.length; i++) {
        //            $("tbody").append(initHtml(data[i]));
        //        }
    }
    initialize(data);
    //删除数组里的内容
    function delfunc(Maybel) {
        for (var i = 0; i < data.length; i++) {
            if (Maybel == data[i].id) {
                data.splice(i, 1)

            }

        }
    }
    //点击“删除”按钮删除每行的内容
    $("body").on("click", ".delete", function () {
        var Maybel = parseInt($(this).attr("title"));
        $(this).parent().parent().remove();
        delfunc(Maybel);
    })
    //给新建的ID最大值
    function getid(data) {
        var id_ = null;
        $.each(data, function (key, val) {
            if (id_ < val.id) {
                id_ = val.id;
            }

        })
        return id_;
    }

    //录入
    function updateHtml(data, class_) {
        data.unshift({
            id: getid(data) + 1,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            status: $(class_.status).val(),
            time: $(class_.time).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val()
        })

        $(".center input[type='text']").val("");

        initialize(data);
    }
    //录入的判断
    $(".addBtn").on("click", function () {

        if ($(".classify").val() == "" || $(".title").val() == "" || $(".grade").val() == "" || $(".status").val() == "" || $(".time").val() == "" || $(".creator").val() == "" || $(".area").val() == "") {
            $(".error").show();

        } else {
            updateHtml(data, {
                classify: '.classify',
                title: '.title',
                grade: '.grade',
                status: '.status',
                time: '.time',
                creator: '.creator',
                area: '.area'
            })
            $(".error").hide();
            $(".check1").removeAttr("checked");
        }

    })
    //排序的方法
    function handle(data, status, fun) {
        var emp = null;
        if (status) {

            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id > data[j].id) {
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                for (var j = i + 1; j < data.length; j++) {
                    if (data[i].id < data[j].id) {
                        emp = data[i];
                        data[i] = data[j];
                        data[j] = emp;
                    }
                }
            }
        }
        fun(); //initialize(data);
    }
    //点击排序
    $(".allid").on("click", function () {
        if ($(this).hasClass("h")) {
            handle(data, true, function () {
                initialize(data);
            })

            $(this).text("ID ↓").removeClass("h");
        } else {
            handle(data, false, function () {
                initialize(data);
            })
            $(this).text("ID ↑").addClass("h");
        }
    })
    //全选
    var status = 0;
    $(".check1").on("click", function () {
        if ($(".check1").is(":checked")) {
            $(".check2").attr("checked", "checked");
            $(".gather").val("全部删除");
            status = 0;
        } else {
            $(".check2").removeAttr("checked");
            $(".gather").val("");
            status = 1;
        }

    })


    //勾选checkbox后面的id要出现在gather里
    $(".check2").on("change", function () {
        var arr = [];
        $("input[name='checkbox']:checked").each(function () {
            arr.push($(this).siblings(".id1").text())
        })
        $(".gather").val(arr);
        if (status = 1) {
            $(".check1").removeAttr("checked");
        }
    })
    //点击全部删除可以将勾选的每行删除
    $(".del").on("click", function () {
        var leng = $(".check2:checked").length
        //        var id = parseInt($(".check2:checked").attr("title"));
        var id = parseInt($(".check2:checked").parent('td').parent('tr').attr("title"));
        $(".check2:checked").parent('td').parent('tr').remove();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, leng); // 删除第key个值  删除checked的个数
            }
        }
        $(".check1").removeAttr("checked");
        $(".gather").val("");
    })


    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
    //点击键盘上的上、下键和delete可以进行上移、下移和删除
    $(window).keydown(function (e) {
        var key = e.keyCode;
        var index = $("tr.bg").index();
        switch (key) {
            case 38:
                if (index > 0) {
                    index--;
                }
                $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 40:
                if (index < $('tbody tr').length - 1) {
                    index++;
                }
                $("tbody tr").eq(index).addClass("bg").siblings("tr").removeClass("bg");
                break;
            case 46:
                var Maybel = parseInt($("tbody tr.bg").attr("title"));
                delfunc(Maybel);
                if ($("tbody tr").hasClass("bg")) {
                    $("tbody tr").eq(index).remove();
                }
                $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
                break;
        }
    })
    //点击表格里的每格（除id那格外）点击一下可进行修改
    $("body").on("click", "td", function () {
        $(".inp").removeAttr("disabled");
    })

    $("body").on("blur", "td", function () {
        $(".inp").attr("disabled", true);
    })

})
