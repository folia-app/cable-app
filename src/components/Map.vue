<template>
  <div id="map-container"></div>
  <div id="info">&nbsp;</div>
</template>

<script setup>
  import { onMounted } from "vue";
  // 
  import "ol/ol.css";
  import GeoJSON from 'ol/format/GeoJSON';
  import Map from 'ol/Map';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import View from 'ol/View';
  import {Style, Fill, Stroke, Text} from 'ol/style';  

  onMounted(() => {
    const labelStyle = new Style({
      text: new Text({
        font: '6px Verdana,sans-serif',
        placement: 'line',
        overflow: true,
        fill: new Fill({
          color: '#667',
        }),
      }),
    });
  
    const cableStyle = new Style({
      stroke: new Stroke({
        color: '#000',
        width: 8,
      }),
    });
  
    const style = [cableStyle, labelStyle];
  
    const vectorLayer1 = new VectorLayer({
      background: '#333355',
      source: new VectorSource({
        format: new GeoJSON(),
        url: '/data/cable-geo.json',
      }),
      style: function (feature) {
        const label = feature.get('name');
        labelStyle.getText().setText(label);
        return style;
      },
      declutter: true,
    });
  
    const map = new Map({
      layers: [vectorLayer1],
      target: 'map-container',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  
    const highlightStyle1 = new Style({
      stroke: new Stroke({
        color: '#000',
        width: 8,
      }),
    });
    const highlightStyle2 = new Style({
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    });
  
    const highlightStyle = [highlightStyle1, highlightStyle2];
  
    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: function (feature) {
        const color = feature.get('color') || '#eeeeee';
        highlightStyle[1].getStroke().setColor(color);
        return highlightStyle2;
      },
    });
  
    let highlight;
    const displayFeatureInfo = function (pixel) {
      vectorLayer1.getFeatures(pixel).then(function (features) {
        const feature = features.length ? features[0] : undefined;
        const info = document.getElementById('info');
        
        if (features.length) {
          info.innerHTML = feature.get('id') + '&nbsp;' + feature.get('name');
        } else {
          info.innerHTML = '&nbsp;';
        }
  
        if (feature !== highlight) {
          if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
          }
          if (feature) {
            featureOverlay.getSource().addFeature(feature);
          }
          highlight = feature;
        }
      });
    };
  
    map.on('pointermove', function (evt) {
      if (evt.dragging) {
        return;
      }
      const pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });
  
    map.on('click', function (evt) {
      displayFeatureInfo(evt.pixel);
    });
  })
</script>

<style scoped>
  /*html, body, */
  #map-container {
    background: 	#000000;
    margin: 0;
    height: 100%;
    width: 100%;
    /* font-family:  "Verdana",sans-serif; */
    cursor: crosshair;
  }
  #map-container {
    position: absolute;
    z-index: 1;
  }
  #info {
    position: absolute;
    color: #ffffff;
    font-size: 24px;
    bottom:20px;
    left:20px;
   z-index: 100;
  }

</style>