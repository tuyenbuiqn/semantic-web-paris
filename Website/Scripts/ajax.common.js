jQuery.callAjaxLoading = function (onOff) {
    if (onOff === true) {
        $(".ajax").css("display", "block");
    } else {
        $(".ajax").css("display", "none");
    }
};

jQuery.showSmallDialog = function () {
    if ($("#closeOpenDialog").length > 0) {
        $("#closeOpenDialog").remove();
        $("#modalSmall").modal("hide");
    }
    //var modalSmall = new bootstrap.Modal(document.getElementById('modalSmall'), {
    //    keyboard: false
    //});
    //modalSmall.show();

    $("#modalSmall").modal({
        keyboard: false,
        show: true
    });

    //.draggable({
    //    handle: ".modal-header"
    //});
}

jQuery.showErrorDialog = function () {
    if ($("#closeOpenDialog").length > 0) {
        $("#closeOpenDialog").remove();
        $("#modalError").modal("hide");
    }
    //var modalError = new bootstrap.Modal(document.getElementById('modalError'), {
    //    keyboard: false
    //});
    //modalError.show();
    $("#modalError").modal({
        keyboard: false,
        show: true
    });

    //$("#modalError").modal({
    //    keyboard: true,
    //    show: true
    //});
    //.draggable({
    //    handle: ".modal-header"
    //});
}


jQuery.showSmallDialogWithContent = function (title, message) {
    
    $("#modalSmallContentAjax").html("");
    var errorContent = '<div class="modal-header">';
    errorContent += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    errorContent += '<h4 class="modal-title">' + title + '</h4></div>';
    errorContent += '<div class="modal-body"><div class="row text-center"><div class="text-danger">';
    errorContent += message;
    errorContent += '</div> </div> <br /> </div>';

    $("#modalSmallContentAjax").html(errorContent);

    this.showSmallDialog();

    $("#modalSmall").on("hidden.bs.modal", function () {
    
        var isExistedDisplayModal = false;
        $(".modal").each(function () {
            if ($(this).css("display") == "block") {
                isExistedDisplayModal = true;
                return false;
            }
        });

        if (isExistedDisplayModal) {
            $("body").addClass("modal-open");
        }
    });
}

jQuery.showSmallDialogWithContentAndOkCancelButton = function (title, message, callback) {
    
    $("#modalSmallContentAjax").html("");
    var errorContent = '<div class="modal-header">';
    errorContent += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    errorContent += '<h4 class="modal-title">' + title + '</h4></div>';
    errorContent += '<div class="modal-body"><div class="row text-center"><div class="text-danger">';
    errorContent += message;
    errorContent += '</div> </div> <br /> </div>';
    errorContent += '<div class="modal-footer">';
    errorContent += '<button type="button" class="btn btn-primary" id="btnOk">&nbsp;&nbsp;&nbsp;&nbsp;Ok&nbsp;&nbsp;&nbsp;&nbsp;</button>';
    errorContent += '<button type="button" class="btn btn-primary" id="btnCancel" data-dismiss="modal">Cancel</button>';
    errorContent += '</div>';
    $("#modalSmallContentAjax").html(errorContent);
    this.showSmallDialog();

    $("#modalSmall").on("hidden.bs.modal", function () {
    
        var isExistedDisplayModal = false;
        $(".modal").each(function () {
            if ($(this).css("display") == "block") {
                isExistedDisplayModal = true;
                return false;
            }
        });

        if (isExistedDisplayModal) {
            $("body").addClass("modal-open");
        }
    });

    $("#modalSmall").one("click", "#btnOk", function () {
    
        var obj = $(this);
        var currentModal = obj.closest(".modal");

        currentModal.on("hidden.bs.modal", function () {
            currentModal.off("hidden.bs.modal");
            callback();

            var isExistedDisplayModal = false;
            $(".modal").each(function () {
                if ($(this).css("display") == "block") {
                    isExistedDisplayModal = true;
                    return false;
                }
            });

            if (isExistedDisplayModal) {
                $("body").addClass("modal-open");
            }
        });

        currentModal.modal("hide");
    });
}

/*Bo sung them phan */
jQuery.showSuccesslDialog = function () {
    callMessage(1, "Thành công");
}

jQuery.showErrorlDialog = function () {
    

    if ($("#closeOpenDialog").length > 0) {
        $("#closeOpenDialog").remove();
        $("#modalError").modal("hide");
    }
    $("#modalError").modal({
        keyboard: false,
        show: true
    });

    //$("#modalError").modal({
    //    keyboard: true,
    //    show: true
    //});
    //.draggable({
    //    handle: ".modal-header"
    //});
}


jQuery.showLargeDialog = function () {
    

    if ($("#noShowDialog").length > 0) {
        $("#noShowDialog").remove();
        $("#modalLarge").modal("hide");
    } else {
        //var modalLarge = new bootstrap.Modal(document.getElementById('modalLarge'), {
        //    keyboard: false
        //});
        //modalLarge.show();

        $("#modalLarge").modal({
            keyboard: false,
            show: true
        });
        //.draggable({
        //    handle: ".modal-header"
        //});
    }
}

jQuery.showFullDialog = function () {

    if ($("#noShowDialog").length > 0) {
        $("#noShowDialog").remove();
        $("#modalFull").modal("hide");
    } else {
        //var modalFull = new bootstrap.Modal(document.getElementById('modalFull'), {
        //    keyboard: false
        //});
        //modalFull.show();

        $("#modalFull").modal({
            keyboard: false,
            show: true
        });

        //$("#modalFull").modal({
        //    keyboard: true,
        //    show: true
        //});
        //.draggable({
        //    handle: ".modal-header"
        //});
    }
}

jQuery.showLargeDialogWithContent = function (title, message) {
    
    $("#modalLargeContentAjax").html("");
    var errorContent = '<div class="modal-header">';
    errorContent += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    errorContent += '<h4 class="modal-title">' + title + '</h4></div>';
    errorContent += '<div class="modal-body"><div class="row text-center"><div class="text-danger">';
    errorContent += message;
    errorContent += '</div> </div> <br /> </div>';
    $("#modalLargeContentAjax").html(errorContent);
    this.showLargeDialog();
}


jQuery.closeErrorDialog = function () {
    $("#modalError").modal("hide");
}

jQuery.closeSmallDialog = function () {
    $("#modalSmall").modal("hide");
}

jQuery.closeLargeDialog = function () {
    $("#modalLarge").modal("hide");
}
jQuery.closeFullDialog = function () {
    $("#modalFull").modal("hide");
}
jQuery.closeAllDialog = function () {
    this.closeErrorDialog();
    this.closeSmallDialog();
    this.closeLargeDialog();
    this.closeFullDialog();
};
jQuery.pagerOnClick = function (pagerId, replaceId, scrollTop) {

    $("#" + pagerId).on("click", "a", function () {
        if (this.href.length > 0) {
            $.ajax({
                type: "POST",
                url: this.href,
                beforeSend: function () {
                    $.callAjaxLoading(true);
                }
            }).done(function (data) {
                $.callAjaxLoading(false);
                $("#" + replaceId).html(data);
                //if (scrollTop != '') {
                //    $('html, body').animate({
                //        scrollTop: $("#" + replaceId).offset().top + scrollTop
                //    }, 500);
                //}

            }).fail(function (jqXHR, textStatus) {
                $.callAjaxLoading(false);
                $.errorExceptionAjax(jqXHR);
            });
        }
        return false;
    });
}


jQuery.showErrorDialogWithContent = function (title, message, callback, callBackParam) {
    
    $("#modalErrorContentAjax").html("");
    var errorContent = '<div class="modal-header">';
    errorContent += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    errorContent += '<h4 class="modal-title">' + title + '</h4></div>';
    errorContent += '<div class="modal-body"><div class="row text-center"><div class="text-danger">';
    errorContent += message;
    errorContent += '</div> </div> <br /> </div>';
    errorContent += '<div class="modal-footer">';
    errorContent += '<button type="button" class="btn btn-primary" id="btnOk" autofocus>&nbsp;&nbsp;&nbsp;&nbsp;Ok&nbsp;&nbsp;&nbsp;&nbsp;</button>';
    errorContent += '</div>';
    $("#modalErrorContentAjax").html(errorContent);

    this.showErrorDialog();

    $("#modalError").on("hidden.bs.modal", function () {
    
        var isExistedDisplayModal = false;
        $(".modal").each(function () {
            if ($(this).css("display") == "block") {
                isExistedDisplayModal = true;
                return false;
            }
        });

        if (isExistedDisplayModal) {
            $("body").addClass("modal-open");
        }
    });

    //function dispatch(fn, args) {
    //    fn = (typeof fn == "function") ? fn : window[fn];  
    //    return fn.apply(this, args || []);  
    //}

    $("#modalError").one("click", "#btnOk", function () {
    
        var obj = $(this);
        var currentModal = obj.closest(".modal");

        currentModal.on("hidden.bs.modal", function () {
            currentModal.off("hidden.bs.modal");
            if (callback !== '') {
                //var fn = window[callback];
                //if ($.isFunction(fn)) {
                //    $.dispatch(callback, callBackParam.split("$"));
                //}
                $.dispatch(callback, callBackParam);

            }

            var isExistedDisplayModal = false;
            $(".modal").each(function () {
                if ($(this).css("display") == "block") {
                    isExistedDisplayModal = true;
                    return false;
                }
            });

            if (isExistedDisplayModal) {
                $("body").addClass("modal-open");
            }
        });

        currentModal.modal("hide");
    });
}

jQuery.dispatch = function (fn, args) {
    var argsApply = [];
    if (args) {
        argsApply = args.split("$");
    }
    fn = (typeof fn == "function") ? fn : window[fn];
    if ($.isFunction(fn)) {
        return fn.apply(this, argsApply || []);
    }
    
}

jQuery.errorExceptionAjax = function (data) {
    $.callAjaxLoading(false);
    $.closeLargeDialog();
    $.closeSmallDialog();
    $.closeFullDialog();
    var jSon = $.parseJSON(data.responseText);
    
    if (jSon.callBack === '') {
        $.showErrorDialogWithContent("Lỗi", jSon.responseText);
    } else {
        $.showErrorDialogWithContent("Lỗi", jSon.responseText, jSon.callBack, jSon.callBackParam);
    }
    
}

jQuery.loadDataAjaxToIdArea = function (method, dataObj, id, replace) {
    $.ajax({
        type: "GET",
        url: method,
        data: dataObj,
        beforeSend: function () {
            $.callAjaxLoading(true);
        }
    }).done(function (data) {
        $.callAjaxLoading(false);
        if (replace) {
            $("#" + id).replaceWith(data);
        } else {
            $("#" + id).html(data);
        }
        

    }).fail(function (jqXHR, textStatus) {
        $.callAjaxLoading(false);
        $.errorExceptionAjax(jqXHR);
    });
    return false;
}

function redirectToUrl(url) {
    window.location.href = url; // location.protocol + "//" + location.host + "/" + url;
    return false;
}


jQuery.showUtilToolDialog = function () {
    if ($("#closeOpenDialog").length > 0) {
        $("#closeOpenDialog").remove();
        $("#modalUtilTool").modal("hide");
    }
    $("#modalUtilTool").modal({
        keyboard: true,
        show: true
    }).draggable({
        handle: ".modal-header"
    });
    //var modalUtilTool = new bootstrap.Modal(document.getElementById('modalUtilTool'), {
    //    keyboard: false
    //});
    //modalUtilTool.show();
}

jQuery.showAutoDialog = function () {
    
    if ($("#closeOpenDialog").length > 0) {
        $("#closeOpenDialog").remove();
        $("#modalAuto").modal("hide");
    }

    //var modalAuto = new bootstrap.Modal(document.getElementById('modalAuto'), {
    //    keyboard: false
    //});
    //modalAuto.show();

    $("#modalAuto").modal({
        keyboard: false,
        show: true
    });

    //$("#modalAuto").modal({
    //    keyboard: true,
    //    show: true
    //}).draggable({
    //    handle: ".modal-header"
    //});
}

jQuery.showDiaChiModal = function (url, title, waterMark, outElementDiaChiId, outElementDghcId) {
    $.ajax({
        type: "POST",
        url: url, //location.protocol + "//" + location.host + "/Admin/DiaChi/ActivePanel",
        data: {
            dghcId: $(outElementDghcId).val(),
            title: title,
            waterMark: waterMark,
            diaChiHienTai: $(outElementDiaChiId).val(),
            outElementDiaChiId: outElementDiaChiId,
            outElementDghcId: outElementDghcId
        },
        beforeSend: function () {
            $.callAjaxLoading(true);
        }
    }).done(function (data) {
        $.callAjaxLoading(false);
        $("#modalUtilToolContentAjax").html(data);
        $.showUtilToolDialog();
    }).fail(function (jqXHR, textStatus, error) {
        $.callAjaxLoading(false);
        $.errorExceptionAjax(jqXHR);
    });
}

jQuery.showNoiCapModal = function (url,title, waterMark, outElementNoiCapId, outElementNcgtId) {
    $.ajax({
        type: "POST",
        url: url, // location.protocol + "//" + location.host + "/Admin/NoiCap/ActivePanel",
        data: {
            ncgtId: $(outElementNcgtId).val(),
            title: title,
            waterMark: waterMark,
            noiCapHienTai: $(outElementNoiCapId).val(),
            outElementNoiCapId: outElementNoiCapId,
            outElementNcgtId: outElementNcgtId
        },
        beforeSend: function () {
            $.callAjaxLoading(true);
        }
    }).done(function (data) {
        $.callAjaxLoading(false);
        $("#modalUtilToolContentAjax").html(data);
        $.showUtilToolDialog();
    }).fail(function (jqXHR, textStatus, error) {
        $.callAjaxLoading(false);
        $.errorExceptionAjax(jqXHR);
    });
}
