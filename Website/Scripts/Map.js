    function SetUpMap() {

        var longtitude = $("#txtLongtitude");
        var latitude = $("#txtLatitude");
        var address = "75 Đinh Tiên Hoàng, phường Tràng Tiền";

        var map = new google.maps.Map(document.getElementById('map_canvas_e'), {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: noPoi
        });

        var infowindow = new google.maps.InfoWindow();

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                map.setCenter(results[0].geometry.location);

                marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: "title",
                    draggable: true,
                    icon: {
                        path: fontawesome.markers.EDGE,
                        scale: 0.3,
                        strokeWeight: 0.1,
                        strokeColor: "black",
                        strokeOpacity: 1,
                        fillColor: "red",
                        fillOpacity: 0.7
                    }
                });

                bounds.extend(marker.position);
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        var content = ReturnContent("Title'", address, "Mobile", "Phone");
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker));

                longtitude.val(roundGPS(results[0].geometry.location.lng()));
                latitude.val(roundGPS(results[0].geometry.location.lat()));
                $('#txtAddress').val(results[0].formatted_address);


                google.maps.event.addListener(marker, 'dragend', function (event) {
                    longtitude.value = roundGPS(event.latLng.lng());
                    latitude.value = roundGPS(event.latLng.lat());
                    var eventLatLng = new google.maps.LatLng(latitude.value, longtitude.value);

                    geocoder.geocode({ 'latLng': eventLatLng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                longtitude.val(roundGPS(results[0].geometry.location.lng()));
                                latitude.val(roundGPS(results[0].geometry.location.lat()));
                                $('#txtAddress').val(results[0].formatted_address);
                                $('#defAddress').html(results[0].formatted_address);
                                $('#spanLat').html(latitude.val());
                                $('#spanLong').html(longtitude.val());

                                document.getElementById('formatedAddress').innerHTML = results[0].formatted_address;
                                document.getElementById('latlng').innerHTML = '(' + roundGPS(event.latLng.lat()) + ', ' + roundGPS(event.latLng.lng()) + ')';
                            }
                        }
                    });
                });
                geocoder = new google.maps.Geocoder();
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        return false;
    }
    function GPSToMap() {

        var longtitude = $("#txtLongtitude");
        var latitude = $("#txtLatitude");

        latlng = new google.maps.LatLng(latitude.val(), longtitude.val());
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: noPoi
        };
        map = new google.maps.Map(document.getElementById("map_canvas_e"), myOptions);
        var infowindow = new google.maps.InfoWindow();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        draggable: true
                    });

                    var content = '';
                    content = '<div class="info_content">';
                    content += '<p><b>Address: </b><span id="spanGPSAddress">' + results[0].formatted_address + '</span></p>';
                    content += '<p><b>Latitude: </b><span id="spanLat">' + roundGPS(latitude.val()) + '</span></p>';
                    content += '<p><b>Longitude: </b><span id="spanLong">' + roundGPS(longtitude.val()) + '</span></p>';
                    content += '</div>';
                    infowindow.setContent(content);
                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infowindow.open(map, marker);
                        }
                    })(marker));

                    longtitude.val(roundGPS(results[0].geometry.location.lng()));
                    latitude.val(roundGPS(results[0].geometry.location.lat()));
                    $('#txtAddress').val(results[0].formatted_address);

                    /**/
                    //if (results[0].address_components) {
                    //    txtPostalCode.val(results[0].address_components[5].long_name);
                    //    drdCountry.val(results[0].address_components[4].short_name);
                    //    txtRegion.val(results[0].address_components[3].long_name);
                    //    txtCity.val(results[0].address_components[2].long_name);
                    //    txtStreet.val(results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name);
                    //}

                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        longtitude.val(roundGPS(event.latLng.lng()));
                        latitude.val(roundGPS(event.latLng.lat()));
                        var eventLatLng = new google.maps.LatLng(latitude.val(), longtitude.val());

                        geocoder.geocode({ 'latLng': eventLatLng }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    longtitude.val(roundGPS(results[0].geometry.location.lng()));
                                    latitude.val(roundGPS(results[0].geometry.location.lat()));
                                    $('#txtAddress').val(results[0].formatted_address);
                                    $('#spanGPSAddress').html(results[0].formatted_address);
                                    $('#spanLat').html(latitude.value);
                                    $('#spanLong').html(longtitude.value);

                                    document.getElementById('formatedAddress').innerHTML = results[0].formatted_address;
                                    document.getElementById('latlng').innerHTML = '(' + roundGPS(event.latLng.lat()) + ', ' + roundGPS(event.latLng.lng()) + ')';
                                }
                            }
                        });
                    });
                    geocoder = new google.maps.Geocoder();
                }
            }
        });
    }
    function AddressToMap() {

        var longtitude = $("#txtLongtitude");
        var latitude = $("#txtLatitude");

        var address = $("#txtAddress").val();
        //$('#map').dialog('display', 'block');

        var map = new google.maps.Map(document.getElementById('map_canvas_e'), {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: noPoi
        });

        var infowindow = new google.maps.InfoWindow();

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                map.setCenter(results[0].geometry.location);
                var marker = new window.google.maps.Marker({
                    position: results[0].geometry.location,//new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng),
                    map: map,
                    draggable: true
                });

                bounds.extend(marker.position);
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        var content = ReturnContent("Title", address, "Mobile", "Phone");
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker));
                longtitude.val(roundGPS(results[0].geometry.location.lng()));
                latitude.val(roundGPS(results[0].geometry.location.lat()));
                google.maps.event.addListener(marker, 'dragend', function (event) {
                    longtitude.val(roundGPS(event.latLng.lng()));
                    latitude.val(roundGPS(event.latLng.lat()));
                    $('#txtAddress').val(results[0].formatted_address);

                    var eventLatLng = new google.maps.LatLng(latitude.val(), longtitude.val());

                    geocoder.geocode({ 'latLng': eventLatLng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            //if (results[0]) {
                            //    $('#defAddress').html(results[0].formatted_address);

                            //    document.getElementById('formatedAddress').innerHTML = results[0].formatted_address;
                            //    document.getElementById('latlng').innerHTML = '(' + roundGPS(event.latLng.lat()) + ', ' + roundGPS(event.latLng.lng()) + ')';
                            //}
                        }
                    });
                });
                geocoder = new google.maps.Geocoder();
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        return false;
    };