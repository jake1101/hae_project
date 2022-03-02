/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**
 * @requires OpenLayers/Layer/XYZ.js
 */ 

OpenLayers.Layer.DaumStreet = OpenLayers.Class(OpenLayers.Layer.XYZ, {

    name: "Daum Street Map", 
    url: [
    	conf.map.daum.url0+"/map_2d_hd/1909dms/L${z}/${y}/${x}.png",
    	conf.map.daum.url1+"/map_2d_hd/1909dms/L${z}/${y}/${x}.png",
    	conf.map.daum.url2+"/map_2d_hd/1909dms/L${z}/${y}/${x}.png"
    ],
  resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
  sphericalMercator: false,
  buffer: 1,
  numZoomLevels: 14,
  minResolution: 0.25,
  maxResolution: 2048,
  units: "m",
  projection: new OpenLayers.Projection("EPSG:5181"),
  displayOutsideMaxExtent: true,
  maxExtent: new OpenLayers.Bounds(-30000, -60000, 494288, 988576),
    initialize: function(name, options) {
    if (!options) options = {resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25]};
    else if (!options.resolutions) options.resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
        var newArgs = [name, null, options];
        OpenLayers.Layer.XYZ.prototype.initialize.apply(this, newArgs);
    },
    clone: function(obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.DaumStreet(
                this.name, this.getOptions());
        }
        obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
        return obj;
    },

  getXYZ: function(bounds) {
        var res = this.getServerResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h));
        var z = this.numZoomLevels - this.getServerZoom();

        if (this.wrapDateLine) {
            var limit = Math.pow(2, z);
            x = ((x % limit) + limit) % limit;
        }

        return {'x': x, 'y': y, 'z': z};
    },
  
    CLASS_NAME: "OpenLayers.Layer.DaumStreet"
});
