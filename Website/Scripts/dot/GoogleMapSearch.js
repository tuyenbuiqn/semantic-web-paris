
// Region Variables
var map;
var geocoder = new google.maps.Geocoder();
var centerChangedLast;
var reverseGeocodedLast;
var currentReverseGeocodeResponse;
var latitude;
var longitude;
var latlng;
var bounds = new google.maps.LatLngBounds();
var markers = [];
var mapCategoryIcons;
var map;
var mapCategories;
var cityCircle = new google.maps.Circle();
var markerOfCircle = new google.maps.Marker();
var service = new google.maps.DistanceMatrixService();
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;
var AllOverlays = [];
var markerSearchFrom = new google.maps.Marker();
var markerSearchTo = new google.maps.Marker();
var MapContextMenu;
var infowindow = new google.maps.InfoWindow();
var globalMarketData = [];
var markerData = [];
var geographyData;
var searchData = [];
var searchPagingData = [];

// End Region Variables
// Region Constants
var MAP_PAGE_SIZE = 20;
var MAP_TYPE_DEFAULT_SEARCH = "DEFAULT_SEARCH";
var MAP_TYPE_ARROUND_SEARCH = "ARROUND_SEARCH";
var MAP_TYPE_POLYGON_SEARCH = "POLYGON_SEARCH";
var MAP_TYPE_FROM_POINT_TO_POINT_SEARCH = "FROM_POINT_TO_POINT_SEARCH";
var MAP_TYPE_FROM_POINT_TO_POINT_RESET_SEARCH = "RESET_SEARCH";

var MAP_SEARCH_TYPE_OBJECT = "OBJECT";
var MAP_SEARCH_TYPE_ADDIV = "ADDIV";
var MAP_SEARCH_TYPE_DIRECTION = "DIRECTION";
var MAP_SEARCH_TYPE_PRODUCT = "PRODUCT";
// End Region Constants

// Region Initials

// Get Map Configuration from DB
function GetMapConfiguration() {
    $.ajax({
        //url:'@Url.Action("GetMapConfiguration", "Map")',
        url: "/Map/GetMapConfiguration",
        type: "POST",
        success: function (data) {
            InitGoogleMap(data);
        },
        error: function () {
            InitGoogleMap();
        }
    });
};

function InitGoogleMap(data) {
    if (data.IsError) {
        map = new google.maps.Map(document.getElementById("map_canvas_e"), {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        return false;
    }

    var mapConfigurationData = JSON.parse(data.Data);
    // Setup google map
    map = new google.maps.Map(document.getElementById("map_canvas_e"), {
        zoom: mapConfigurationData.zoom,
        center: new google.maps.LatLng(mapConfigurationData.center.latitude, mapConfigurationData.center.longitude),
        mapTypeId: mapConfigurationData.mapTypeId,
        styles: mapConfigurationData.stylers,
        disableDefaultUI: true
    });

    // Init Right Menu
    MapContextMenu = InitRightMenu();
    map.addListener("rightclick", function (event) {
        MapContextMenu.show(this, event.latLng);
        return false;
    });

    mapCategoryIcons = mapConfigurationData.mapCategoryIcons;
    mapCategories = mapConfigurationData.mapCategories;
    InitObjectTypeCategory(mapConfigurationData.mapCategories);
    InitDrawingTool();
    return true;
};

function InitDrawingTool() {
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.RIGHT,
            drawingModes: ["polygon"]
        },
        polygonOptions: {
            strokeColor: "#3b84f9",
            strokeOpacity: 0.5,
            strokeWeight: 3,
            fillColor: "#5b9aff",
            fillOpacity: 0.2
        }
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
        RemoveMapItemsByType(MAP_TYPE_POLYGON_SEARCH);
        AllOverlays.push(event);
        if (event.type === "polygon") {
            var path = event.overlay.getPath().getArray();
            var searchInput = CreatePolygonParameter(path);
            SearchMapByPolygon(searchInput);
        }
        //drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
        drawingManager.set(google.maps.drawing.OverlayType.MARKER);
        OverlayRightClickListener(event.overlay);
    });
};

function InitRightMenu() {
    return new ContextMenu({
        map: map,                // objet google.maps.Map
        idMenu: "findByCoordinate",         // id élément DOM du menu
        callback: SearchMapByCoordinate       // réf. fonction appelée
    });
};

function InitObjectTypeCategory(data) {
   // $("#tmplObjectTypes").tmpl(data).appendTo("#divObjectTypes");
};

// End Region Initials

// Region Actions
function OverlayRightClickListener(overlay) {
    google.maps.event.addListener(overlay, "rightclick", function (event) {
        MapContextMenu = InitRightMenu();
        MapContextMenu.show(this, event.latLng);
        return false;
    });
}
// End Region Actions

// Region Functions
// Get the center coordinate of List Coordinates and set google map position to the center coordinate
function SetCenterLocation(map, markerData, position) {
    if (markerData.length > 0) {
        var positionArray = [];
        for (var i = 0; i < markerData.length; i++) {
            var pos = {
                longitude: markerData[i].Lng,
                latitude: markerData[i].Lat
            };
            positionArray.push(pos);
        }
        var centerLocation = GetCenterFromDegrees(positionArray);
        if (!isNaN(centerLocation.latitude) && !isNaN(centerLocation.longitude))
            map.panTo(new google.maps.LatLng(centerLocation.latitude, centerLocation.longitude));
    } else {
        //map.panTo(new google.maps.LatLng(position.Latitude, position.Longitude));
    }
};

function SetCenterByLatLng(labelId, latitude, longitude) {
    var position = new google.maps.LatLng(latitude, longitude);
    map.panTo(position);

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].labelId === labelId) {
            google.maps.event.trigger(markers[i], "click");
        }
    }
}

function ToggleSearchMenu() {
    $("#divSearchMenu").fadeToggle("fast");
    $("#divHideAll").fadeToggle("fast");
};

function ShowSearchMenu(searchType) {
    showOrHideElement("pnlSearchBy" + searchType, "block");
    ToggleSearchMenu();
    $("#objectNameSearch").val("");
    $("#searchFrom").val("");
    $("#searchTo").val("");
    $("#productSearch").val("");

    RemoveMapItemsByType(MAP_TYPE_FROM_POINT_TO_POINT_RESET_SEARCH);
    switch (searchType.toUpperCase()) {
        case MAP_SEARCH_TYPE_OBJECT:
            showOrHideElement("pnlSearchByAdDiv", "none");
            showOrHideElement("pnlSearchByDirection", "none");
            showOrHideElement("pnlSearchByProduct", "none");
            $("#btnSearchMap").attr("data-search-type", MAP_SEARCH_TYPE_OBJECT);
            $("#objectNameSearch").focus();
            showOrHideElement("divObjectTypeContainer", "block");
            break;
        case MAP_SEARCH_TYPE_ADDIV:
            showOrHideElement("pnlSearchByObject", "none");
            showOrHideElement("pnlSearchByDirection", "none");
            showOrHideElement("pnlSearchByProduct", "none");
            $("#btnSearchMap").attr("data-search-type", MAP_SEARCH_TYPE_ADDIV);
            showOrHideElement("divObjectTypeContainer", "block");
            break;
        case MAP_SEARCH_TYPE_DIRECTION:
            showOrHideElement("pnlSearchByAdDiv", "none");
            showOrHideElement("pnlSearchByObject", "none");
            showOrHideElement("pnlSearchByProduct", "none");
            $("#btnSearchMap").attr("data-search-type", MAP_SEARCH_TYPE_DIRECTION);
            $("#searchFrom").focus();
            SetAutocompleteSearchFrom();
            SetAutocompleteSearchTo();
            showOrHideElement("divObjectTypeContainer", "block");
            break;
        case MAP_SEARCH_TYPE_PRODUCT:
            showOrHideElement("pnlSearchByAdDiv", "none");
            showOrHideElement("pnlSearchByDirection", "none");
            showOrHideElement("pnlSearchByObject", "none");
            $("#btnSearchMap").attr("data-search-type", MAP_SEARCH_TYPE_PRODUCT);
            $("#productSearch").focus();
            showOrHideElement("divObjectTypeContainer", "none");
            break;
    default:
    }
}

function SetAutocompleteSearchFrom() {
    var input = document.getElementById("searchFrom");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
        if (autocomplete.getPlace().formatted_address !== undefined) {
            var searchData = autocomplete.getPlace();
            document.getElementById("btnSearchMap").setAttribute("data-search-from-lat", searchData.geometry.location.lat());
            document.getElementById("btnSearchMap").setAttribute("data-search-from-lng", searchData.geometry.location.lng());
        } else {
            alert("Địa chỉ không chính xác, vui lòng nhập lại địa chỉ");
            $("#searchFrom").val("");
            $("#searchFrom").focus();
        }
    });
}

function SetAutocompleteSearchTo() {
    var input = document.getElementById("searchTo");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    google.maps.event.addListener(autocomplete, "place_changed", function () {
        if (autocomplete.getPlace().formatted_address !== undefined) {
            var searchData = autocomplete.getPlace();
            document.getElementById("btnSearchMap").setAttribute("data-search-to-lat", searchData.geometry.location.lat());
            document.getElementById("btnSearchMap").setAttribute("data-search-to-lng", searchData.geometry.location.lng());
        } else {
            alert("Địa chỉ không chính xác, vui lòng nhập lại địa chỉ");
            $("#searchTo").val("");
            $("#searchTo").focus();
        }
    });
}
// Region Functions

function CreatePolygonParameter(path) {
    var polygonData = "";
    for (var i = 0; i < path.length; i++) {
        polygonData += path[i].lng() + " " + path[i].lat() + ",";
    }
    polygonData += path[0].lng() + " " + path[0].lat();
    var searchInput = "POLYGON((" + polygonData + "))";
    return searchInput;
}

function SetMarkersContent(bounds, map, marker, data, i, infowindow) {
    bounds.extend(marker.position);
    google.maps.event.addListener(marker, "click", (function (marker, i) {
        return function () {
            // window.location.hash = "#spanDistance" + (i + 1);
            //if (document.getElementById("map-item" + (i + 1)) != null)
            //    document.getElementById("map-item" + (i + 1)).scrollIntoView();
            var markerDataArray = [];
            markerDataArray.push(data[i]);
            $("#divMarkerContent").html("");
            $("#tmplMarkerContent").tmpl(markerDataArray).appendTo("#divMarkerContent");
            infowindow.setContent($("#divMarkerContent").html());
            infowindow.open(map, marker);
            map.panTo(new google.maps.LatLng(data[i].Lat, data[i].Lng));
        }
    })(marker, i));
};

function getSearchResult(data, type) {
    $("#divSearchResultContainer").html("");
    showOrHideElement("divSearchResultWrapper", "block");
    showOrHideElement("toggleResult", "block");
    if (data) {
        if (type === 1) {
            $("#spanSearchResultCount").html(data.length);
            if (data.length > 0) {
                $("#tmplMarkerSearchResult").tmpl(data).appendTo("#divSearchResultContainer");
            } else {
                $("#spanSearchResultCount").html(data.length);
            }
        }
        else if (type === 2) {
            if (data.length > 0) {
                if (data.length > MAP_PAGE_SIZE) {
                    var firstData = data.slice(0, MAP_PAGE_SIZE);
                    $("#spanSearchResultCount").html(MAP_PAGE_SIZE + "/" + data.length);
                    $("#tmplMarkerSearchResult").tmpl(firstData).appendTo("#divSearchResultContainer");
                    var loadMore = "<p id=\"pButtonLoadMore\" class=\"t-search-result-load-more\"><a id=\"buttonLoadMore\" href=\"javascript:void(0);\" title=\"Tải thêm bản ghi\" onclick=\"AppendSearchData(2)\">Tải thêm bản ghi</p>";
                    $("#divSearchResultContainer").append(loadMore);
                    GetDistanceFromSearch(data[0].SLat, data[0].SLng, firstData, 1);
                } else {
                    $("#spanSearchResultCount").html(data.length);
                    $("#tmplMarkerSearchResult").tmpl(data).appendTo("#divSearchResultContainer");
                    GetDistanceFromSearch(data[0].SLat, data[0].SLng, data, 1);
                }
            } else {
                $("#spanSearchResultCount").html("0");
            }
        }
    }
}

function AppendSearchData(index) {
    var data = searchPagingData;
    data = data.slice(((index - 1) * MAP_PAGE_SIZE), (index * MAP_PAGE_SIZE));
    if (data.length > 0) {
        var currentSelectItems = ((index) * MAP_PAGE_SIZE) < searchPagingData.length ? ((index) * MAP_PAGE_SIZE) : searchPagingData.length;
        $("#spanSearchResultCount").html(currentSelectItems + "/" + searchPagingData.length);
        $("#tmplMarkerSearchResult").tmpl(data).appendTo("#divSearchResultContainer");
        document.getElementById("pButtonLoadMore").remove();
        if (searchPagingData.length > (index) * MAP_PAGE_SIZE) {
            var loadMore = "<p id=\"pButtonLoadMore\" class=\"t-search-result-load-more\"><a id=\"buttonLoadMore\" href=\"javascript:void(0);\" title=\"Tải thêm bản ghi\" onclick=\"AppendSearchData(" + (index + 1) + ")\">Tải thêm bản ghi</p>";
            $("#divSearchResultContainer").append(loadMore);
        }
        GetDistanceFromSearch(searchPagingData[0].SLat, searchPagingData[0].SLng, data, index);
    }
}

function GetDistanceFromSearch(cLat, cLng, destinationData, index) {

    var destinations = [];
    for (var i = 0; i < destinationData.length; i++) {
        var item = { lat: destinationData[i].Lat, lng: destinationData[i].Lng };
        destinations.push(item);
    }
    service.getDistanceMatrix({
        origins: [{ lat: cLat, lng: cLng }],
        destinations: destinations,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true
    }, function (response, status) {
        if (status !== "OK") {
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        } else {
            if (response.rows[0].elements.length >= 0)
                //for (var j = 0; j <= response.rows[0].elements.length; j++) {
                for (var j = 0; j < response.rows[0].elements.length; j++) {
                    var itemIndex = ((index - 1) * MAP_PAGE_SIZE) + j + 1;
                    document.getElementById("spanDistance" + itemIndex).innerText = response.rows[0].elements[j].distance.value + " m";
                }
        }
    });
}

function ResetSearchForm() {
    $("#objectNameSearch").val("");
    $("#ddlDistrict").val("-1").trigger("change");
    $("#ddlWard").val("-1").trigger("change");
    $("#ddlStreet").val("-1").trigger("change");
};
//
function InitForm() {
    var height = $(window).height() - 45;
    $("#map_canvas_e").css("height", height);
    $(".ddlSelect2").select2();
    //$(".selectpicker").selectpicker();
    $("#ddlProductCategory").selectpicker({ noneSelectedText: "Chọn loại sản phẩm" });
    $(".t-map-result").css("height", height);
    /*showOrHideElement("divSearchResultWrapper", "none");*/
    showOrHideElement("divSearchMenu", "none");
    //showOrHideElement("toggleResult", "none");
    // Comment lại khi nhúng vào trang #
    //var url = window.location.href;
    //if (url.toLowerCase().indexOf("/department/map") > 0) {
    //    $("#objectNameSearch").focus();
    //}
}

function GetWards() {
    var wardParentId = parseInt($("#ddlDistrict").val());
    var parameter = {
        IsDisableControl: false,
        Id: "ddlWard",
        Name: "ddlWard",
        ValueField: "AdministrativeDivisionId",
        TextField: "Name",
        ParentId: wardParentId,
        AdministrativeDivisionType: 14,
        Class: "js-responsive",
        Style: "width:100%",
        HasDefaultValue: true,
        DefaultText: "Chọn Phường/xã"
    };
    LoadIoTSelect("/Department/Map/GetAdministrativeDivisionParent", parameter, "divWard");
    //LoadIoTSelect('@Html.Raw(Url.Action("GetAdministrativeDivisionParent", "Map"))',parameter,"divWard");
};

function GetStreets() {
    var ddlDistrict = GetSelect2Data("ddlDistrict");
    var mapSelectedProvinceId = 37;
    var mapSelectedDistrictId = ddlDistrict.id;
    var parameter = {
        IsDisableControl: false,
        Id: "ddlStreet",
        Name: "ddlStreet",
        ValueField: "StreetId",
        TextField: "StreetName",
        ProvinceId: mapSelectedProvinceId,
        DistrictId: mapSelectedDistrictId,
        Class: "js-responsive",
        Style: "width:100%",
        HasDefaultValue: true,
        DefaultText: "Chọn Đường/phố"
    };
    LoadIoTSelect("/Department/Map/GetStreet", parameter, "divStreet");
    //LoadIoTSelect('@Html.Raw(Url.Action("GetStreets", "Map"))', parameter, "divStreet");
};

function DistrictChange() {
    GetWards();
    GetStreets();
};


function ObjectTypeClick(id) {
    var item = $("#aObject" + id);
    var checked = item.hasClass("t-map-object-type-item-selected");
    if (checked) {
        item.removeClass("t-map-object-type-item-selected");
    } else {
        item.addClass("t-map-object-type-item-selected");
    }
};

function MapMultiMedia(objectTypeId, objectId, isDisableControl, selectType, mediaType) {
    var parameter = { ObjectTypeId: objectTypeId, ObjectId: objectId, IsDisableControl: isDisableControl, SelectType: selectType, Type: mediaType, IsGoogleMapView: true };
    ShowPopupAddOrEditMultiMedia("/Department/Multimedia/GetObjectMultiMedia", parameter, "MultiMediaMapObject", "Đa phương tiện", isDisableControl);
    //ShowPopupAddOrEditMultiMedia('@Url.Action("GetObjectMultiMedia", "Multimedia")', parameter, "MultiMediaMapObject", "Đa phương tiện", isDisableControl);
};

function SearchMapByCoordinate(param) {
    var objectTypeIds = "";
    $("#divObjectTypes a.t-map-object-type-item-selected").each(function (index) {
        objectTypeIds += $(this).attr("data-val") + ",";
    });
    if (objectTypeIds === "" || objectTypeIds === ",") {
        alert("Vui lòng chọn ít nhất 1 loại đối tượng.");
    }
    switch (param.action) {
        case "SEARCH":
            RemoveMapItemsByType(MAP_TYPE_ARROUND_SEARCH);
            searchData = [];
            searchPagingData = [];
            var radius = parseInt(param.element.getAttribute("data-value"));
            var lat = param.latLng.lat();
            var lng = param.latLng.lng();
            var cretia = { ObjectTypeIds: objectTypeIds, Radius: radius, Latitude: lat, Longitude: lng };
            var parameter = { PageIndex: 1, PageSize: DoTMaxPageSize, Cretia: cretia };
            $.ajax({
                //url: '@Url.Action("SearchMapByCoordinate", "Map")',
                url: "/Department/Map/SearchMapByCoordinate",
                type: "POST",
                data: parameter,
                success: function (data) {
                    if (!data.IsError) {
                        searchPagingData = data.Data;
                        BindSearchDataToMap(searchPagingData);
                        getSearchResult(searchPagingData, 2);
                        CreateCircleMarkerSearch(param.latLng, radius);
                        switch (radius) {
                            case 100:
                                map.setZoom(19);
                                break;
                            case 200:
                                map.setZoom(18);
                                break;
                            case 500:
                                map.setZoom(17);
                                break;
                            case 1000:
                                map.setZoom(16);
                                break;
                            case 2000:
                                map.setZoom(15);
                                break;
                            case 5000:
                                map.setZoom(14);
                                break;
                        default:
                        }
                    }
                },
                error: function () {
                }
            });
            break;
        case "REMOVE_CIRCLE":
            RemoveCicleMarker();
            break;
        case "RELOAD":
            location.reload();
            break;
        case "SEARCHFROM":
            RemoveMapItemsByType(MAP_TYPE_FROM_POINT_TO_POINT_SEARCH);
            $("#liSearchFrom").css("display", "none");
            $("#liSearchTo").css("display", "block");
            var searchFromCoordicate = { lat: param.latLng.lat(), lng: param.latLng.lng() };
            markerSearchFrom = new google.maps.Marker({
                position: searchFromCoordicate,
                animation: google.maps.Animation.BOUNCE
            });
            markerSearchFrom.setMap(map);

            document.getElementById("liSearchTo").setAttribute("data-search-from-lat", param.latLng.lat());
            document.getElementById("liSearchTo").setAttribute("data-search-from-lng", param.latLng.lng());
            break;
        case "SEARCHTO":
            RemoveMapItemsByType(MAP_TYPE_FROM_POINT_TO_POINT_SEARCH);
            $("#liSearchFrom").css("display", "block");
            $("#liSearchTo").css("display", "none");

            markerSearchTo = new google.maps.Marker({
                position: { lat: param.latLng.lat(), lng: param.latLng.lng() },
                animation: google.maps.Animation.BOUNCE
            });

            var sLat = parseFloat(document.getElementById("liSearchTo").getAttribute("data-search-from-lat"));
            var sLng = parseFloat(document.getElementById("liSearchTo").getAttribute("data-search-from-lng"));
            markerSearchTo.setMap(map);
            directionsService.route({
                origin: { lat: sLat, lng: sLng },
                destination: { lat: param.latLng.lat(), lng: param.latLng.lng() },
                travelMode: "DRIVING"
            }, function (response, status) {
                if (status === "OK") {
                    markerSearchFrom.setMap(null);
                    markerSearchTo.setMap(null);
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);

                    var overviewPath = response.routes[0].overview_path, overviewPathGeo = [];
                    for (var i = 0; i < overviewPath.length; i++) {
                        overviewPathGeo.push(
                            [overviewPath[i].lng(), overviewPath[i].lat()]
                        );
                    }

                    var distance = 10 / 11112, geoInput = {
                        type: "LineString",
                        coordinates: overviewPathGeo
                    };
                    var geoReader = new jsts.io.GeoJSONReader(),
                        geoWriter = new jsts.io.GeoJSONWriter();
                    var geometry = geoReader.read(geoInput).buffer(distance);
                    var polygon = geoWriter.write(geometry);
                    var oLanLng = [];
                    var oCoordinates = polygon.coordinates[0];
                    for (i = 0; i < oCoordinates.length; i += 3) {

                        var oItem = oCoordinates[i];
                        oLanLng.push(new google.maps.LatLng(oItem[1], oItem[0]));
                    }

                    var searchInput = CreatePolygonParameter(oLanLng);
                    SearchMapByPolygon(searchInput);

                } else {
                    window.alert("Có lỗi xảy ra, vui lòng thử lại.");
                }
            }
            );
            break;
        default:
            break;
    }
}

function SearchMapByPolygon(polygonData) {
    var objectTypeIds = "";
    $("#divObjectTypes a.t-map-object-type-item-selected").each(function (index) {
        objectTypeIds += $(this).attr("data-val") + ",";
    });
    if (objectTypeIds === "" || objectTypeIds === ",") {
        alert("Vui lòng chọn ít nhất 1 loại đối tượng.");
    }

    searchData = [];
    searchPagingData = [];

    var cretia = { ObjectTypeIds: objectTypeIds, Polygon: polygonData };
    var parameter = { PageIndex: 1, PageSize: DoTMaxPageSize, Cretia: cretia };

    $.ajax({
        //url: '@Url.Action("SearchMapByPolygon", "Map")',
        url: "/Department/Map/SearchMapByPolygon",
        type: "POST",
        data: parameter,
        success: function (data) {
            if (!data.IsError) {
                searchData = data.Data;
                BindSearchDataToMap(searchData);
                getSearchResult(searchData, 1);
            }
        },
        error: function () {
        }
    });
}

function GetMapDirection(sLat, sLng, lat, lng) {
    RemoveDirections();
    directionsService.route({
        origin: { lat: sLat, lng: sLng },
        destination: { lat: lat, lng: lng },
        travelMode: "DRIVING"
    }, function (response, status) {
        if (status === "OK") {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else {
            window.alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    }
    );
}

function CreateCircleMarkerSearch(latLng, radius) {
    cityCircle = new google.maps.Circle({
        strokeColor: "#3b84f9",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#5b9aff",
        fillOpacity: 0.2,
        map: map,
        center: latLng,
        radius: radius,
        zIndex: -100
    });
    cityCircle.setMap(map);
    markerOfCircle = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.BOUNCE
    });

    MapContextMenu = InitRightMenu();
    cityCircle.addListener("rightclick", function (event) {
        MapContextMenu.show(this, event.latLng);
        return false;
    });
    markerOfCircle.setMap(map);

    map.panTo(new google.maps.LatLng(latLng.lat(), latLng.lng()));
}

function RemoveCicleMarker() {
    markerOfCircle.setMap(null);
    cityCircle.setMap(null);
};

function SearchMapByObjectOrAdDiv(searchType) {
    RemoveMapItemsByType(MAP_TYPE_DEFAULT_SEARCH);
    //var districtId = GetSelect2Data("ddlDistrict").id;
    //var wardId = GetSelect2Data("ddlWard").id;
    //var streetId = GetSelect2Data("ddlStreet").id;
    //var objectNameSearch = $("#objectNameSearch").val().trim();
    var cityName = $("#ddlCity").val();
    searchType = searchType.toUpperCase();
    if (searchType === "") {
        alert("Có lỗi xảy ra, vui lòng tải lại trang");
        return false;
    }
    else if (searchType === MAP_SEARCH_TYPE_OBJECT) {
        if (cityName === "") {
            alert("Vui lòng nhập chọn thành phố để tìm kiếm");
            return false;
        }
    } else if (searchType === MAP_SEARCH_TYPE_ADDIV) {
        //if ((!districtId || districtId <= 0) && (!wardId || wardId <= 0) && (!streetId || streetId <= 0)) {
        //    alert("Vui lòng nhập chọn ít nhất 1 đơn vị hành chính để tìm kiếm");
        //    return false;
        //}
    }
   
    //var objectTypeIds = "";
    //$("#divObjectTypes a.t-map-object-type-item-selected").each(function (index) {
    //    objectTypeIds += $(this).attr("data-val") + ",";
    //});
    //searchData = [];

    //var cretia = { DistrictId: districtId, WardId: wardId, StreetId: streetId, ObjectName: objectNameSearch, ObjectTypeIds: objectTypeIds };
    debugger;
    var parameter = { page: 1, pageSize: DoTMaxPageSize, cityName: cityName };

    $.ajax({
        //url: '@Url.Action("SearchMap", "Map")',
        url: "/Home/SearchMap",
        type: "POST",
        data: parameter,
        success: function (data) {
            if (!data.IsError) {
                searchData = data.Data;
                BindSearchDataToMap(searchData);
                //getSearchResult(searchData, 1);
            }
        },
        error: function () {
        }
    });
    //var filteredGeoraphyByObjectType = FilterDataByObjectType(geographyData,mapCategories);
    //for (var k = 0; k < filteredGeoraphyByObjectType.length; k++) {

    //    var condition = true;
    //    var districtCondition = true;
    //    var wardCondition = true;
    //    var streetCondition = true;
    //    var nameCondition = true;

    //    if (districtId > 0) {
    //        districtCondition = filteredGeoraphyByObjectType[k].DId === districtId;
    //    }
    //    if (wardId > 0) {
    //        wardCondition = filteredGeoraphyByObjectType[k].WId === wardId;
    //    }
    //    if (streetId > 0) {
    //        streetCondition = filteredGeoraphyByObjectType[k].WId === streetId;
    //    }
    //    if (objectNameSearch !== "") {
    //        nameCondition = filteredGeoraphyByObjectType[k].Name.toLowerCase().replace(" ","").includes(objectNameSearch.toLowerCase().replace(" ",""));
    //    }
    //    condition = districtCondition && wardCondition && streetCondition && nameCondition;
    //    if (condition) {
    //        searchData.push(filteredGeoraphyByObjectType[k]);
    //    }
    //}

    //console.log('total: ' + searchData.length);

};

function SearchMapByProduct() {
    RemoveMapItemsByType(MAP_TYPE_DEFAULT_SEARCH);

    var productSearch = $("#productSearch").val().trim();
    if (productSearch === "") {
        alert("Vui lòng nhập tên sản phẩm cần tìm kiếm");
        return false;
    }
    var productCategories = "";
    var productCategoriesData = $("#ddlProductCategory").val();
    if (productCategoriesData) {
        for (var i = 0; i < productCategoriesData.length; i++) {
            productCategories += productCategoriesData[i] + ",";
        }
    }
    var objectTypeIds = "";
    $("#divObjectTypes a.t-map-object-type-item-selected").each(function (index) {
        objectTypeIds += $(this).attr("data-val") + ",";
    });
    var 

    searchData = [];

    var cretia = { ProductName: productSearch, ObjectTypeIds: objectTypeIds, ProductCategories: productCategories };
    var parameter = { PageIndex: 1, PageSize: DoTMaxPageSize, Cretia: cretia };

    $.ajax({
        //url: '@Url.Action("SearchMap", "Map")',
        url: "/Department/Map/SearchMapByProduct",
        type: "POST",
        data: parameter,
        success: function (data) {
            if (!data.IsError) {
                searchData = data.Data;
                BindSearchDataToMap(searchData);
                getSearchResult(searchData, 1);
            }
        },
        error: function () {
        }
    });
};

function SearchMapByDirection() {
    var sLatFrom = parseFloat(document.getElementById("btnSearchMap").getAttribute("data-search-from-lat"));
    var sLngFrom = parseFloat(document.getElementById("btnSearchMap").getAttribute("data-search-from-lng"));
    var sLatTo = parseFloat(document.getElementById("btnSearchMap").getAttribute("data-search-to-lat"));
    var sLngTo = parseFloat(document.getElementById("btnSearchMap").getAttribute("data-search-to-lng"));

    
    if (sLatFrom === "" || sLngFrom === "" || sLatTo === "" || sLngTo === "" || !sLatFrom || !sLngFrom || !sLngTo || !sLatFrom) {
        alert("Dữ liệu đầu vào còn thiếu, vui lòng chọn lại điểm bắt đầu và điểm kết thúc");
        $("#searchFrom").val("");
        $("#searchTo").val("");
        $("#searchFrom").focus();
        $("#searchTo").focus();
        return false;
    }

    directionsService.route({
        origin: { lat: sLatFrom, lng: sLngFrom },
        destination: { lat: sLatTo, lng: sLngTo },
        travelMode: "DRIVING"
    }, function (response, status) {
        if (status === "OK") {
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);

            var overviewPath = response.routes[0].overview_path, overviewPathGeo = [];
            for (var i = 0; i < overviewPath.length; i++) {
                overviewPathGeo.push(
                    [overviewPath[i].lng(), overviewPath[i].lat()]
                );
            }
            var distance = 10 / 11112, geoInput = {
                type: "LineString",
                coordinates: overviewPathGeo
            };
            var geoReader = new jsts.io.GeoJSONReader(),
                geoWriter = new jsts.io.GeoJSONWriter();
            var geometry = geoReader.read(geoInput).buffer(distance);
            var polygon = geoWriter.write(geometry);
            var oLanLng = [];
            var oCoordinates = polygon.coordinates[0];
            for (i = 0; i < oCoordinates.length; i += 3) {

                var oItem = oCoordinates[i];
                oLanLng.push(new google.maps.LatLng(oItem[1], oItem[0]));
            }
            var searchInput = CreatePolygonParameter(oLanLng);
            SearchMapByPolygon(searchInput);

        } else {
            window.alert("Có lỗi xảy ra, vui lòng kiểm thử lại.");
        }
    }
           );
}

function BindSearchDataToMap(searchData) {
     debugger;
    if (searchData) {
        if (searchData.length > 0) {
            var i;
            for (i = 0; i < searchData.length; i++) {
                for (var j = 0; j < mapCategoryIcons.length; j++) {
                    if (searchData[i].OTId === mapCategoryIcons[j].mapCategory) {
                        var marker = new MarkerWithLabel({
                            position: new google.maps.LatLng(searchData[i].Lat, searchData[i].Lng),
                            icon: {
                                url: mapCategoryIcons[j].icon.url,
                                size: new google.maps.Size(mapCategoryIcons[j].icon.size.width, mapCategoryIcons[j].icon.size.height),
                                origin: new google.maps.Point(mapCategoryIcons[j].icon.origin.x, mapCategoryIcons[j].icon.origin.y),
                                anchor: new google.maps.Point(mapCategoryIcons[j].icon.anchor.x, mapCategoryIcons[j].icon.anchor.y)
                            },
                            animation: google.maps.Animation.DROP,
                            map: map,
                            labelId: searchData[i].OTId + "_" + searchData[i].OId,
                            labelContent: "",
                            labelAnchor: new google.maps.Point(0, 0),
                            labelClass: "my-custom-class-for-label", // your desired CSS class
                            labelInBackground: 1
                        });
                        SetMarkersContent(bounds, map, marker, searchData, i, infowindow);
                        markers.push(marker);
                        break;
                    }
                }
            }
            SetCenterLocation(map, searchData);
            //console.log("Search done");
        } else {
            //console.log("Không tìm thấy dữ liệu thích hợp, vui lòng thử lại.");
        }
    }
    else {
        console.log("Không tìm thấy dữ liệu thích hợp, vui lòng thử lại.");
        $("#spanSearchResultCount").html("0");
    }
};

function OnObjectNameResultSearch() {
    var input = $("#objectNameResultSearch").val().trim();
    if (searchData.length <= 0) return false;
    var result = [];
    for (var i = 0; i < searchData.length; i++) {
        var condition = searchData[i].Name.toLowerCase().replace(" ", "").includes(input.toLowerCase().replace(" ", ""));
        if (condition) {
            result.push(searchData[i]);
        }
    }
    getSearchResult(result, 1);
};

function ToggleSearchPanel() {
    var style = $("#pnlSearch").attr("style");
    if (!style) {
        $("#h3SearchTitle").html("Mở khung tìm kiếm");
    } else {
        if (style.indexOf("none") > -1) {
            $("#h3SearchTitle").html("Đóng khung tìm kiếm");
        } else {
            $("#h3SearchTitle").html("Mở khung tìm kiếm");
        }
    }
    $("#pnlSearch").fadeToggle("fast");
};

$(function () {
    GetMapConfiguration();
    
    InitForm();
    $("#toggleResult").click(function () {
        if ($(this).hasClass("t-map-result-toggle-expand")) {
            $(this).removeClass("t-map-result-toggle-expand");
            $(this).addClass("t-map-result-toggle-collapse");
            $(this).attr("title", "Hiện kết quả");
            $("#divSearchResult").fadeToggle("fast");
        } else {
            $(this).removeClass("t-map-result-toggle-collapse");
            $(this).addClass("t-map-result-toggle-expand");
            $(this).attr("title", "Ẩn kết quả");
            $("#divSearchResult").fadeToggle("fast");
        }
    });
    $("#showSearchMenu").click(function () {
        ToggleSearchMenu();
        var width = $(window).width() - 280;
        $("#divHideAll").css("left", "280px");
        $("#divHideAll").css("width", width + "px");

    });
    $("#hideSearchMenu").click(function () {
       
        ToggleSearchMenu();
    });
    $("#divHideAll").click(function () {
        ToggleSearchMenu();
    });
    
    $("#objectNameSearch").on("keydown", function (event) {
        if (event.which === 13) {
            SearchMapByObjectOrAdDiv(MAP_SEARCH_TYPE_OBJECT);
            return false;
        }
    });
    $("#productSearch").on("keydown", function (event) {
        if (event.which === 13) {
            SearchMapByProduct();
            return false;
        }
    });
    $("#btnSearchMap").click(function() {
        var type = $("#btnSearchMap").attr("data-search-type");
        type = type.toUpperCase();
        if (type === "") {
            alert("Có lỗi xảy ra, vui lòng tải lại trang để thử lại.");
        }
        if (type === MAP_SEARCH_TYPE_OBJECT || type === MAP_SEARCH_TYPE_ADDIV) {
            searchTrainStation(1);
            SearchMapByObjectOrAdDiv(type);
            return false;
        } else if (type === MAP_SEARCH_TYPE_DIRECTION) {
            SearchMapByDirection();
            return false;
        } else if (type === MAP_SEARCH_TYPE_PRODUCT) {
            SearchMapByProduct();
        }
        return false;
    });
});

// Clear - Reset...
function RemoveMapItemsByType(type) {
    switch (type.toUpperCase()) {
        case MAP_TYPE_DEFAULT_SEARCH:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            break;
        case MAP_TYPE_ARROUND_SEARCH:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            ResetSearchForm();
            break;
        case MAP_TYPE_POLYGON_SEARCH:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            ResetSearchForm();
            break;
        case MAP_TYPE_FROM_POINT_TO_POINT_SEARCH:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            ResetSearchForm();
            break;
        case MAP_TYPE_FROM_POINT_TO_POINT_RESET_SEARCH:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            ResetSearchForm();
            RemoveSearchResult();
            break;
        default:
            RemoveShapes();
            RemoveMarkers();
            RemoveCicleMarker();
            RemoveDirections();
            ResetSearchForm();
            break;
    }
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function ClearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function RemoveMarkers() {
    ClearMarkers();
    markers = [];
}

function RemoveShapes() {
    for (var i = 0; i < AllOverlays.length; i++) {
        AllOverlays[i].overlay.setMap(null);
    }
    AllOverlays = [];
};

function RemoveDirections() {
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
};
function RemoveSearchResult() {
    $("#divSearchResultContainer").html("");
    //showOrHideElement("divSearchResultWrapper", "none");
}


