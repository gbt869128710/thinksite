$(function () {
    'use strict';


    function initHtml(json) {
        var html_ = '<tr title="' + json.id + '">' +
            '<td>' +
            '<input type="checkbox" class="check2">' +
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

    $("body").on("click", ".delete", function () {
        var id = parseInt($(this).attr("title"));
        var ind = $(this).parent("td").parent("tr").index();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, 1)
                $("tbody tr").eq(ind).remove();
            }

        }

    })
    var id_ = null;
    $.each(data, function (key, val) {
        if (id_ < val.id) {
            id_ = val.id;
        }
    })

    function updateHtml(data, class_) {
        data.unshift({
            id: id_,
            classify: $(class_.classify).val(),
            title: $(class_.title).val(),
            grade: $(class_.grade).val(),
            status: $(class_.status).val(),
            time: $(class_.time).val(),
            creator: $(class_.creator).val(),
            area: $(class_.area).val()
        })

        $(".center input[type='text']").val("");
        if ($(".center input[type='text']").val() == '') {
            $(".error").show();
            $(".addBtn").attr("disabled");
        } else {
            $(".error").hide();
            $(".addBtn").removeAttr("disabled");
        }
        initialize(data);
    }
    $(".addBtn").on("click", function () {
        id_ = id_ + 1;
        updateHtml(data, {
            classify: '.classify',
            title: '.title',
            grade: '.grade',
            status: '.status',
            time: '.time',
            creator: '.creator',
            area: '.area'
        })
    })

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
        fun(); //initPage(data);
    }

    $(".list").on("click", function () {
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

    $(".del").on("click", function () {
        $(".check2:checked").parent().parent().remove();
        //        var id = $(".check2:checked").parent("td").parent("tr").index();
        //        var ids = [];
        //        for (var i = 0; i <= $(".check2:checked").length - 1; i++) {
        //            ids.push($("tbody tr").eq(i).attr('title'));
        //        }
        //
        //        var ind = $(".check2:checked").parent("td").parent("tr").index();
        //        for (var i = 0; i < ids.length; i++) {
        //            if (ids[i] == data[i].id) {
        //                data.splice(i, 1); // 删除第key个值  删除1个
        //                $("tbody tr").eq(ids[i] - 1).remove();
        //            }
        //        }
        //
        //
        $(".check1").removeAttr("checked");
    })
    //勾选checkbox后面的id要出现在gather里
    $(".check2").on("change", function () {
        var arr = [];
        $(".check2:checked").each(function () {
            arr.push($(this).siblings(".id1").text())
        })
        $(".gather").val(arr);
        if (status = 1) {
            $(".check1").removeAttr("checked");
        }
    })
    $("tbody tr").eq(0).addClass("bg").siblings("tr").removeClass("bg");
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
                var id = parseInt($("tbody tr.bg").attr("title"));
                var ind = $(this).parent("td").parent("tr").index();
                for (var i = 0; i < data.length; i++) {
                    if (id == data[i].id) {
                        data.splice(i, 1)
                        $("tbody tr").eq(ind).remove();
                    }

                }
                break;
        }
    })


    $("body").on("click", "td", function () {
        $(this).children("input").removeAttr("disabled");
    })

    $("body").on("blur", "td", function () {
        $(this).children("input").attr("disabled", true);
    })

})
