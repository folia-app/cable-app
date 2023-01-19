<template>
  <div id="map-container"></div>
  <MapCableInfo :id="highlightId"></MapCableInfo>
</template>

<script setup>
  import { onMounted, watch, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  // 
  import "ol/ol.css";
  import GeoJSON from 'ol/format/GeoJSON';
  import Map from 'ol/Map';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import View from 'ol/View';
  import {Style, Fill, Stroke, Text} from 'ol/style';  
  import store from '@/store'
  import MapCableInfo from "./MapCableInfo.vue";

  const highlightId = ref()

  // get owners
  store.dispatch('getMintCount').then((count) => {
    const tokenIds = new Array(count.toNumber()).fill(0).map((v, i) => i + 1)
    tokenIds.forEach(id => store.dispatch('getNFTOwnerByTokenId', { tokenId: id }))
  })
  
  onMounted(() => {
    const labelStyle = new Style({
      text: new Text({
        font: '6px Anybody,sans-serif',
        placement: 'line',
        overflow: true,
        fill: new Fill({
          color: '#778',
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
        const tokenId = feature.id_
        const owner = store.state.owners[tokenId]
        const color = owner ? '#eeeeee' : '#2222ff' // feature.get('color')
        highlightStyle[1].getStroke().setColor(color);
        return highlightStyle2;
      },
    });
    
    // highlight feature on hover + click
    let highlight;
    let highlightIsPinned = false
    
    function highlightFeature (feature, { pin }) {
      if (highlight === feature) return
      featureOverlay.getSource().removeFeature(highlight);
      featureOverlay.getSource().addFeature(feature);
      highlight = feature
      highlightId.value = feature.id_
      if (pin) {
        highlightIsPinned = true
      }
    }

    function clearHighlight () {
      featureOverlay.getSource().removeFeature(highlight);
      highlight = undefined
      highlightId.value = undefined
      highlightIsPinned = false
    }

    const displayFeatureInfo = function (pixel, isClick) {
      const features = map.getFeaturesAtPixel(pixel, { hitTolerance: 10 })
      const feature = features.length ? features[0] : undefined; 
      
      if (feature) {            
        if (isClick) {
          highlightFeature(feature, { pin: true })
          highlightIsPinned = true
        } else if (!highlightIsPinned) {
          // hover
          highlightFeature(feature, { pin: false })
        }
      } else {
        if ((isClick && highlightIsPinned) || (!isClick && !highlightIsPinned)) {
          // remove highlight/info
          clearHighlight()
        }
      }
    };
    
    const canHover = window.matchMedia('(hover:hover)').matches

    map.on('pointermove', function (evt) {
      if (evt.dragging || !canHover) {
        return;
      }
      const pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });
  
    map.on('click', function (evt) {
      displayFeatureInfo(evt.pixel, true);
      router.replace({query: {}}) // remove url query highlight
    });

    // highlight cable when url query (?cable=2)
    const route = useRoute()
    const router = useRouter()
    
    watch(() => route.query.id, highlightFeatureByID)

    function highlightFeatureByID (id) {
      if (!id || isNaN(id)) {
        clearHighlight()
        return
      }
      const source = vectorLayer1.getSource()
      const ft = source.getFeatureById(id)
      console.log(source, ft, typeof id)
      return ft && highlightFeature(ft, { pin: true })
    }

    // loaded with id?
    // DOESNT WORK?? map.on('ready') ?
    // if (route.name === 'home') {
    //   console.log(route.query.cable)
    //   highlightFeatureByID(route.query.cable)
    // }
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
    position: fixed;
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

<style>
.ol-zoom{
  top:auto;
  left:auto;
  right:8px;
  bottom:8px;
}
</style>