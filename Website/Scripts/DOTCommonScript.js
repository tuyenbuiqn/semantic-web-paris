// Compare two arrays
// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
// Compare two arrays

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function disableEnableTab(element, isDisable) {
    if (isDisable) {
        $("#" + element).addClass("t-tab-disable");
        // $("#" + element + " a[data-toggle='tab']").attr("title","Vui lòng tạo mới công ty lữ hành trước.");
    } else {
        $("#" + element).removeClass("t-tab-disable");
    }
}
function disableButton(element) {
    $("#" + element).addClass("disabled-button");
};
function enableButton(element) {
    $("#" + element).removeClass("disabled-button");
};
function disableCheckbox(element) {
    $("#" + element).attr("disabled", "disabled");
};
function enableCheckbox(element) {
    $("#" + element).removeAttr("disabled");
};
function showOrHideElement(element, style) {
    $("#" + element).css("display", style);
};
function hideButton(element) {
    $("#" + element).addClass("hided-button");
};
function showButton(element) {
    $("#" + element).removeClass("hided-button");
};
function togglePanel(e) {
    $(e).parent().siblings().slideToggle();
};
function addpendLoading(id, parent) {
    var divLoading = "<div class=\"t-loading-panel\" id=\"" + id + "\"></div>";
    $("#" + parent).append(divLoading);
};
function appendLoading(id, parent) {
    var divLoading = "<div class=\"t-loading-panel\" id=\"" + id + "\"></div>";
    $("#" + parent).append(divLoading);
};
function appendTextLoading(id, parent) {
    var divLoading = "<label class=\"t-loading-text control-label t-overwrite-label\" id=\"" + id + "\">Đang tải dữ liệu...</label>";
    $("#" + parent).append(divLoading);
};

function removeTextLoading(id) {
    $("label#" + id).remove();
};

function removeElement(element) {
    $("#" + element).html("");
};
function removeElementByClass(parentId, element) {
    $("#" + parentId + " ." + element).html("");
};
function addpendElementLoading(id, parent) {
    var divLoading = "<div class=\"t-loading-element\" id=\"" + id + "\"></div>";
    $("#" + parent).append(divLoading);
};
function removeLoading(id) {
    $("div#" + id).remove();
    $("div#" + id).fadeOut("fast", "swing", function () { $("div#" + id).remove(); });
};

function removeOrAppendAttribute(elementId, type, attribute, attributeValue) {
    if (type === "remove") {
        $("#" + elementId).removeAttr(attribute);
    } else {
        $("#" + elementId).attr(attribute, attributeValue);
    }
};
function focusElement(element) {
    $("#" + element).focus();
};
function LoadIoTSelect(url, parameter, parentId) {
    //debugger;
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            //debugger;
            $("#" + parentId).html(data);
        },
        error: function () {
        }
    });
};
function LoadIoTSelect2(url, parameter, parentId) {
    //debugger;
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        async: false,
        success: function (data) {
            //debugger;
            $("#" + parentId).html(data);
        },
        error: function () {
        }
    });
};
function LoadSelectPicker(url, parameter, parentId) {
    //debugger;
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            //debugger;
            $("#" + parentId).html(data);
        },
        error: function () {
        }
    });
};
function LoadSelectPickerSynchronous(url, parameter, parentId) {
    //debugger;
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        async: false,
        success: function (data) {
            //debugger;
            $("#" + parentId).html(data);
        },
        error: function () {
        }
    });
};
function LoadCommonAjax(url, parameter, parentId) {
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            $("#" + parentId).html(data);
        },
        error: function () {
        }
    });
};

function ShowPopupAddOrEdit(url, parameter, typeName, titleModelName, readonly) {
    // typeName: complex
    // typeName + "Model" = divComplexModel
    // title + typeName + "Model" = complexTitleModel
    // body + typeName + "Model" = complexBodyModel
    var modelContainer = $("#" + typeName + "Model");
    var titleModel = $("#" + typeName + "TitleModel");
    var bodyModel = $("#" + typeName + "BodyModel");
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            modelContainer.modal("show");
            titleModel.html(titleModelName);
            bodyModel.html(data);
            if (readonly === true) {
                $("#" + typeName + "BodyModel .js-responsive").prop("disabled", true);
                $("div.add-or-edit-form-container :button").attr("disabled", "disabled");
                $(".hide-when-disable-form").css("display", "none");
                //$("div.add-or-edit-form-container :button").css("display", "none");
                $("div.add-or-edit-form-container input[type=text]").attr("disabled", "disabled");
                $("div.add-or-edit-form-container input[type=number]").attr("disabled", "disabled");
                $("div.add-or-edit-form-container textarea").attr("disabled", "disabled");
                $("div.add-or-edit-form-container input[type='radio']").prop("disabled", true);
                $("div.add-or-edit-form-container input[type='checkbox']").prop("disabled", "disabled");
                $("div.add-or-edit-form-container input[type='checkbox']").prop("readonly", true);
                // for form addoredit of mr Quang
                $("#" + typeName + "BodyModel :button").attr("disabled", "disabled");
                //$("#" + typeName + "BodyModel :button").css("display", "none");
                $("#" + typeName + "BodyModel select").attr("disabled", true);
                // $("#" + typeName + "BodyModel input[type=text], textarea").attr("disabled", "disabled");
                $("#" + typeName + "BodyModel input[type='radio']").prop("disabled", true);
            }
        },
        error: function () {
        }
    });
};

function ShowPopupAddOrEditMultiMedia(url, parameter, typeName, titleModelName, readonly) {
    // typeName: complex
    // typeName + "Model" = divComplexModel
    // title + typeName + "Model" = complexTitleModel
    // body + typeName + "Model" = complexBodyModel
    var modelContainer = $("#" + typeName + "Model");
    var titleModel = $("#" + typeName + "TitleModel");
    var bodyModel = $("#" + typeName + "BodyModel");
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            modelContainer.modal("show");
            titleModel.html(titleModelName);
            bodyModel.html(data);
            if (readonly === true) {
                //$("#" + typeName + "BodyModel .js-responsive").prop("disabled", true);
                //$("div.add-or-edit-form-container :button").attr("disabled", "disabled");
                //$("div.add-or-edit-form-container input[type=text], textarea").attr("disabled", "disabled");
                //$("div.add-or-edit-form-container input[type='radio']").prop("disabled", true);
                //$("div.add-or-edit-form-container input[type='checkbox']").prop("disabled", "disabled");
                //$("div.add-or-edit-form-container input[type='checkbox']").prop("readonly", true);
                //// for form addoredit of mr Quang
                //$("#" + typeName + "BodyModel :button").attr("disabled", "disabled");
                //$("#" + typeName + "BodyModel select").attr("disabled", true);
                //$("#" + typeName + "BodyModel input[type=text], textarea").attr("disabled", "disabled");
                //$("#" + typeName + "BodyModel input[type='radio']").prop("disabled", true);
            }
        },
        error: function () {
        }
    });
};


function UpdatePopupAddOrEdit(url, parameter, typeName) {
    // typeName: complex
    // typeName + "Model" = divComplexModel
    // title + typeName + "Model" = complexTitleModel
    // body + typeName + "Model" = complexBodyModel
    var bodyModel = $("#" + typeName + "BodyModel");
    $.ajax({
        url: url,
        type: "POST",
        data: parameter,
        success: function (data) {
            bodyModel.html(data);
        },
        error: function () {
        }
    });
};
function toggleSelect2Dropdown(id, type) {
    if (type === "disable") {
        $("#" + id).prop("disabled", true);
    } else {
        $("#" + id).removeAttr("disabled");
    }
}

function LoadAjaxFormByButton(url, parameter, type, key, parentId) {
    appendLoading("loadingPanel" + type, "div" + type);
    $.ajax({
        type: "POST",
        data: parameter,
        url: url,
        success: function (data) {
            $("#" + parentId + key + " #div" + type).html(data);
            removeLoading("loadingPanel" + type);
        },
        error: function () {
            removeLoading("loadingPanel" + type);
        }
    });
};

function LoadAjaxAddNewForm(url, parameter, parentId) {
    $.ajax({
        type: "POST",
        data: parameter,
        url: url,
        success: function (data) {
            $("#" + parentId).html(data);
            ScrollToWorkingView(parentId);
        },
        error: function () {
        }
    });
};
// Load google map Partial view
function LoadGoogleMap(url, parameter, container) {
    if (url === "") url = '/Common/GetGoogleMap';
    //var geography = {
    //    Address: DefaultAddress,
    //    Latitude: DefaultLatitude,
    //    Longitude: DefaultLongtitude,
    //    ProvinceId: DefaultProvinceId,
    //    DistrictId: DefaultDistrictId,
    //    WardId: DefaultWardId,
    //    StreetId: DefaultStreetId
    //};

    //if (parameter === null) {

    //    parameter = { Geography: geography };
    //} else {
    //    if (parameter.Geography === null) {
    //        parameter.Geography = geography;
    //    }
    //}

    //if (parameter.Geography.Address === null || parameter.Geography.Address === "") {
    //    parameter.Geography.Address = "";//DefaultAddress;
    //}
    //if (!parameter.Geography.Latitude > 0) {
    //    parameter.Geography.Latitude = DefaultLatitude;
    //}
    //if (!parameter.Geography.Longitude > 0) {
    //    parameter.Geography.Longitude = DefaultLongtitude;
    //}
    //if (!parameter.Geography.ProvinceId > 0) {
    //    parameter.Geography.ProvinceId = DefaultProvinceId;
    //}
    //if (!parameter.Geography.DistrictId > 0) {
    //    parameter.Geography.DistrictId = -1;// DefaultDistrictId;
    //}
    //if (!parameter.Geography.WardId > 0) {
    //    parameter.Geography.WardId = -1;// DefaultWardId;
    //}
    //if (!parameter.Geography.StreetId > 0) {
    //    parameter.Geography.StreetId = -1;// DefaultStreetId;
    //}

    $.ajax({
        type: "POST",
        data: parameter,
        url: url,
        success: function (data) {
            $("#" + container).html(data);
        },
        error: function () {
        }
    });
};
function LoadTouristPlaceGoogleMap(url, parameter, container) {
    if (url === "") url = '/Common/GetTouristPlaceGoogleMap';
    //var geography = {
    //    Address: DefaultAddress,
    //    Latitude: DefaultLatitude,
    //    Longitude: DefaultLongtitude,
    //    ProvinceId: DefaultProvinceId,
    //    DistrictId: DefaultDistrictId,
    //    WardId: DefaultWardId,
    //    StreetId: DefaultStreetId
    //};

    //if (parameter === null) {

    //    parameter = { Geography: geography };
    //} else {
    //    if (parameter.Geography === null) {
    //        parameter.Geography = geography;
    //    }
    //}

    //if (parameter.Geography.Address === null || parameter.Geography.Address === "") {
    //    parameter.Geography.Address = "";//DefaultAddress;
    //}
    //if (!parameter.Geography.Latitude > 0) {
    //    parameter.Geography.Latitude = DefaultLatitude;
    //}
    //if (!parameter.Geography.Longitude > 0) {
    //    parameter.Geography.Longitude = DefaultLongtitude;
    //}
    //if (!parameter.Geography.ProvinceId > 0) {
    //    parameter.Geography.ProvinceId = DefaultProvinceId;
    //}
    //if (!parameter.Geography.DistrictId > 0) {
    //    parameter.Geography.DistrictId = -1;// DefaultDistrictId;
    //}
    //if (!parameter.Geography.WardId > 0) {
    //    parameter.Geography.WardId = -1;// DefaultWardId;
    //}
    //if (!parameter.Geography.StreetId > 0) {
    //    parameter.Geography.StreetId = -1;// DefaultStreetId;
    //}

    $.ajax({
        type: "POST",
        data: parameter,
        url: url,
        success: function (data) {
            $("#" + container).html(data);
        },
        error: function () {
        }
    });
};
function RemoveAddNewForm(divWrapper) {
    $("#" + divWrapper).html("");
};

function LoadEditForm(tableClass, divWrapperEditForm, editBodyClass, parent, keyId, editFormId) {
    $("." + editBodyClass).html("");
    var divWrapper = "<div id=\"" + divWrapperEditForm + "\" style=\"margin:15px;position:relative;\">" + $("#" + editFormId).html() + "</div>";
    $("#tdBody" + parent + keyId).html(divWrapper);
    HighlightEditingRowById(tableClass + parent, "trHead" + parent + keyId, "trBody" + parent + keyId);
};

function LoadEditForm(type, id) {
    $(".tdBody" + type).html("");
    var divWrapper = "<div id=\"div" + type + "\" style=\"margin:15px;position:relative;\"></div>";
    $("#tdBody" + type + id).html(divWrapper);
    HighlightEditingRowById("table" + type, "trHead" + type + id, "trBody" + type + id);
};

function HighlightEditingRow(rowId) {

    $(".hight-light-editing-row-head").removeClass("hight-light-editing-row-head");
    $(".hight-light-editing-row-body").removeClass("hight-light-editing-row-body");
    $("#trHead" + rowId).addClass("hight-light-editing-row-head");
    $("#trBody" + rowId).addClass("hight-light-editing-row-body");
};
function RemoveHighlightEditingRow(parentId) {
    $("#" + parentId + " tr.hight-light-editing-row-head").removeClass("hight-light-editing-row-head");
    $("#" + parentId + " tr.hight-light-editing-row-body").removeClass("hight-light-editing-row-body");
};
function HighlightEditingRowById(parentId, headId, bodyId) {
    $("#" + parentId + " tr.hight-light-editing-row-head").removeClass("hight-light-editing-row-head");
    $("#" + parentId + " tr.hight-light-editing-row-body").removeClass("hight-light-editing-row-body");
    $("#" + headId).addClass("hight-light-editing-row-head");
    $("#" + bodyId).addClass("hight-light-editing-row-body");
    $("html,body").animate({
        scrollTop: $("#" + headId).offset().top
    }, "fast");
};
function HighlightEditingRowByIdNotAnimate(parentId, headId, bodyId) {
    $("#" + parentId + " tr.hight-light-editing-row-head").removeClass("hight-light-editing-row-head");
    $("#" + parentId + " tr.hight-light-editing-row-body").removeClass("hight-light-editing-row-body");
    $("#" + headId).addClass("hight-light-editing-row-head");
    $("#" + bodyId).addClass("hight-light-editing-row-body");
};
function ScrollToWorkingView(elementId) {
    $("html,body").animate({
        scrollTop: $("#" + elementId).offset().top
    }, "fast");
};


var dotNotification;
$(function () {
    //// Register Kendo Notification
    //dotNotification = $("#doTNotification").kendoNotification({
    //    position: {
    //        pinned: true,
    //        top: 30,
    //        right: 30
    //    },
    //    autoHideAfter: 10000,
    //    stacking: "down",
    //    templates: [{
    //        type: "info",
    //        template: $("#doTSuccessTemplate").html()
    //    }, {
    //        type: "error",
    //        template: $("#doTErrorTemplate").html()
    //    }]

    //}).data("kendoNotification");
});

function callDoTNotification(title, message, type) {
    //dotNotification.show({
    //    title: title,
    //    message: message
    //}, type);
    $("#tGlobalAlertHeader").html("");
    $("#tGlobalAlertBody").html("");
    if (type === "info") {
        $("#tGlobalAlertHeader").html(title);
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-success-alert");
        $("#tGlobalAlertBody").html(message);
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    } else {
        $("#tGlobalAlertHeader").html(title);
        $("#tGlobalAlertBody").html(message);
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-error-alert");
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    }
};


function GetCenterFromDegrees(data) {
    if (!(data.length > 0)) {
        return false;
    }

    var num_coords = data.length;

    var X = 0.0;
    var Y = 0.0;
    var Z = 0.0;
    var lat;
    var lon;
    for (i = 0; i < data.length; i++) {
        lat = data[i].latitude * Math.PI / 180;
        lon = data[i].longitude * Math.PI / 180;
        var a = Math.cos(lat) * Math.cos(lon);
        var b = Math.cos(lat) * Math.sin(lon);
        var c = Math.sin(lat);

        X += a;
        Y += b;
        Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;
    lon = Math.atan2(Y, X);
    var hyp = Math.sqrt(X * X + Y * Y);
    lat = Math.atan2(Z, hyp);
    var newX = (lat * 180 / Math.PI);
    var newY = (lon * 180 / Math.PI);

    return { latitude: newX, longitude: newY };
}

//QuangNM
function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}


function GetSelect2Data(elementId) {
    var object = {
        id: -1,
        text: ""
    };
    var ddl = $("#" + elementId);
    var id = -1;
    var text = "";
    if (ddl) {
        if (ddl.select2("data") !== window.underfined) {
            if (ddl.select2("data")[0] !== window.underfined) {
                id = parseInt(ddl.select2("data")[0].id);
                text = "";
                if (id !== -1) {
                    text = ddl.select2("data")[0].text;
                }
            }
        }
        object.id = id;
        object.text = text;
    }
    return object;
}
function GetSelectPickerData(elementId) {
    var object = {
        id: -1,
        text: ""
    };
    var ddl = $("#" + elementId);
    var id = -1;
    var text = "";
    if (ddl) {
        id = parseInt(ddl.val());
        text = ddl.find("option:selected").text();
    }

    object.id = id;
    object.text = text;
    return object;
}
function GetSelectPickerDataByText(elementId) {
    var object = {
        id: "",
        text: ""
    };
    var ddl = $("#" + elementId);
    var id = "";
    var text = "";
    if (ddl) {
        id = ddl.val();
        text = ddl.find("option:selected").text();
    }
    object.id = id;
    object.text = text;
    return object;
}
function setSelectPickerData(elementId, value) {
    $("#" + elementId).val(value);
    $('.selectpicker').selectpicker('refresh');
}
function GetRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function OpenNewLink(url) {
    if (!url) {
        return false;
    }
    if (url.indexOf("http") === 0) {
        // https://www.google.com.vn or http://www.google.com.vn
        window.open(url);
    } else {
        url = "http://" + url;
        window.open(url);
    }
    return false;
};

function CalculateDistanceBetween2Coordinates(orginLat, orginLng, desLat, desLng) {
    // km : R = 6371
    var R = 6371e3; // Radius of the earth in m
    var dLat = (desLat - orginLat) * Math.PI / 180;  // deg2rad below
    var dLon = (desLng - orginLng) * Math.PI / 180;
    var a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(orginLat * Math.PI / 180) * Math.cos(desLat * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;
    var result = R * 2 * Math.asin(Math.sqrt(a));
    return Math.round(result * 100) / 100;
}

function DecodeGoogleMapPolyline(encodedPolyline) {

    // array that holds the points

    var points = [];
    var index = 0, len = encodedPolyline.length;
    var lat = 0, lng = 0;
    while (index < len) {
        var b, shift = 0, result = 0;
        do {

            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);


        var dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lat += dlat;
        shift = 0;
        result = 0;
        do {
            b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) });

    }
    return points;
}


function GenerateRandomPoints(center, radius, count) {
    var points = [];
    for (var i = 0; i < count; i++) {
        points.push(GenerateRandomPoint(center, radius));
    }
    return points;
}


/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function GenerateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;

    var u = radius / 4326;
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    // Resulting point.
    return { 'latitude': y + y0, 'longitude': xp + x0 };
}

function RoundGPS(position) {
    var val = parseFloat(position);
    if (isNaN(val)) {
        return 0;
    }
    else
        return val.toFixed(6);
}

function ShowEnterprisePopUp(type, content) {
    if (type === 1) {
        $("#tGlobalAlertHeader").html("Thành công");
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-success-alert");
        $("#tGlobalAlertBody").html(content);
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    } else {
        $("#tGlobalAlertHeader").html("Cảnh báo");
        $("#tGlobalAlertBody").html(content);
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-error-alert");
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    }
};

function ShowDepartmentPopUp(type, content) {
    if (type === 1) {
        $("#tGlobalAlertHeader").html("Thành công");
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-success-alert");
        $("#tGlobalAlertBody").html(content);
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    } else {
        $("#tGlobalAlertHeader").html("Cảnh báo");
        $("#tGlobalAlertBody").html(content);
        $("#tGlobalAlert").removeClass();
        $("#tGlobalAlert").addClass("alert alert-success t-global-error-alert");
        $("#tGlobalAlert").fadeTo(5000, 500).slideUp(500, function () {
            $("#tGlobalAlert").slideUp(500);
        });
    }
};
function ProductPanelClick(panel) {
    var displayStyle = $("div#collapse" + panel + "Body").css("display");
    if (displayStyle === "none") {
        CollapseOrExpandPanel(panel, false);
    } else {
        CollapseOrExpandPanel(panel, true);
    }
}
function CollapseOrExpandPanel(panel, isCollapse) {
    if (isCollapse) {
        //$("#pnl" + panel + "Title").attr("aria-expanded","false");
        //$("#pnl" + panel + "Title").removeClass("collapsed");
        //$("#pnl" + panel + "Title").addClass("collapsed");

        $("div#collapse" + panel + "Body").hide(400);

    } else {
        //$("#pnl" + panel + "Title").attr("aria-expanded","true");
        //$("#pnl" + panel + "Title").removeClass("collapsed");

        $("div#collapse" + panel + "Body").show(400);
    }
};


function RemoveLastComma(str) {
    return str.replace(/,(\s+)?$/, "");
}
function GenerateIdByDateTime() {
    var d = new Date();
    return d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDay() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();
};

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ?
                (comparison * -1) : comparison
        );
    };
}

function getComboBoxId(id) {
    debugger;
    var item = $("#" + drlTypeAlbum).val();
    return item.id;
}
function getComboBoxName(id) {
    var item = $("#" + drlTypeAlbum).val();
    return item.label;
}

function PrintDiv(id) {
    var data = document.getElementById(id).innerHTML;
    var myWindow = window.open('', 'my div', 'height=600,width=800');
    myWindow.document.write('<html><head><title></title>');
    /*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    myWindow.document.write('<link href="/Content/bootstrap.css" rel="stylesheet">');
    myWindow.document.write('<link href="/Content/bootstrap-theme.css" rel="stylesheet">');
    myWindow.document.write('<link href="/Content/bootstrap-select.min.css" rel="stylesheet">');
    myWindow.document.write('<link href="/Content/AdminLTE.css" rel="stylesheet">');
    myWindow.document.write('</head><body >');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload = function () { // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
}

//function PrintDiv(divName) {//
//    var printContents = document.getElementById(divName).innerHTML;
//    var originalContents = document.body.innerHTML;
//    document.body.innerHTML = printContents;
//    window.print();
//    document.body.innerHTML = originalContents;
//}
var countMessage = 1;
function callMessage(type, message) {
    countMessage += 1;
    var item = "alert-success";
    var idRemove = "message_" + countMessage;
    var itemClass = "";
    if (parseInt(type) === 1) {
        itemClass = "alert-success";
    } else {
        itemClass = "alert-danger";
    }
    item = "<div id='message_" + countMessage + "' class='alert " + itemClass + " '><a href='#' class='close' data-dismiss='alert' aria-label='close' title='đóng'>×</a>" + message + "</div>";

    $("#divshowmessage ").append(item);

    setTimeout(function () {
        $("#divshowmessage #" + idRemove).remove();
    }, 6000);
};