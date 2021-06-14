"use strict";
/**
 * Ajoute un marker à la Map
 * @param   {google.maps.Map}    map - Carte à laquelle on ajoute le marker
 * @param   {object}             options - Options à affecter au marker
 * @returns {google.maps.Marker} oMarker - Marker ajouté à la carte pour gestion
 */
function addMarker(map, options) {
  var oMarker = new google.maps.Marker({
    "position": options.position || map.getCenter(),
    "map": map,
    "icon": options.icon || markerColor.blue,
    "shape": markerColor.shape,    
    "zIndex": 0,
    "draggable": options.draggable || false,
    "title": options.title || ""
  });
  return oMarker;
}
/**
 * Action à déclencher suivant la valeur du paramètre
 * @param {Object} param - {
 *       "action"  : string,
 *       "element" : élément du menu ayant déclenché l'action,
 *       "latLng"  : objet google.maps.LatLng
 *     }
 */
function mapAction(param) {
  switch (param.action) {
    case "add_marker":
      addMarker(this, {
        "draggable": true,
        "position": param.latLng
      });
      break;
    case "vue_route":
      this.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      break;
    case "vue_satellite_legende":
      this.setMapTypeId(google.maps.MapTypeId.HYBRID);
      break;
    case "vue_satellite":
      this.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      break;
    case "vue_terrain":
      this.setMapTypeId(google.maps.MapTypeId.TERRAIN);
      break;
    case "zoom+":
      if (param.latLng) {
        this.setCenter(param.latLng);
      }
      this.setZoom(this.getZoom() + 1);
      break;
    case "zoom-":
      if (param.latLng) {
        this.setCenter(param.latLng);
      }
      this.setZoom(this.getZoom() - 1);
      break;
  }
}
function initCarte() {
  // création de la map
  var divCarte = document.getElementById("div_carte");
  var oMap = new google.maps.Map(divCarte, {
    "backgroundColor": "#FFF",
    "streetViewControl": false,
    "zoom": 6,
    "minZoom": 2,
    "mapTypeControl": false,
    "gestureHandling": "greedy",
    "center": {
      "lat": 46.8,
      "lng": 1.7
    },
    "noClear": true,
    "mapTypeId": google.maps.MapTypeId.TERRAIN
  });
  // création context menu pour la map
  var mapContextMenu = new ContextMenu({
    map: oMap,
    idMenu: "cm-map",
    callback: mapAction
  });
  // affectation event pour context menu sur la map
  google.maps.event.addListener(oMap, "rightclick", function(data) {
    mapContextMenu.show(this, data.latLng);
  });
}
google.maps.event.addDomListener(window, "load", initCarte);