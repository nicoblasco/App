<template>
  <div style="height: 100%; width: 100%">
    <!-- <div style="height: 200px overflow: auto;">
      <ul id="example-1">
        <li v-for="dato in datos" v-bind:key="dato.Id">
          {{dato.latitude}} {{dato.longitude}}
        </li>
      </ul>
    </div> -->
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"

      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        layer-type="overlay"
        name="Default Base"
        :url="url"
        :attribution="attribution"


      />
      <!-- <li v-for="dato in datos" v-bind:key="dato.Id">
        <l-marker :lat-lng="withTooltip">
          <l-tooltip :options="{ permanent: true, interactive: true }">
            <div @click="innerClick">
              I am a tooltip
              <p v-show="showParagraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                Donec finibus semper metus id malesuada.
              </p>
            </div>
          </l-tooltip>
        </l-marker>
      </li> -->
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import axios from 'axios'

export default {
  name: "Visor",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {    
      
    return {
      //datos:[] ,
      zoom: 13,
      center: latLng(-34.80521, -58.27410),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     // url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/1/1/0?access_token=pk.eyJ1Ijoibmljb2JsYXNjbyIsImEiOiJjazg3bzB5djAwZXhwM2ZxaXJwYTBhaHFyIn0.k1QkNm5uq2OjqIlTsX-KcA',
     //  url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      //  {
      //    id= 'mapbox/streets-v11'

      //    }
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     // id: 'mapbox/streets-v11',
      // tileSize: 512, 
      // zoomOffset: -1,      
      withPopup: latLng(-34.80521, -58.27410),
      withTooltip: latLng(-34.80521, -58.27410),
      currentZoom: 11.5,
      currentCenter: latLng(-34.80521, -58.27410),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
    computed: {

    },
  	created() {
		axios.get('api/Georeferences/GetCurrentGeoreferences')
        .then(respuesta => {
			      this.datos=respuesta.data    
        })
		
	},
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },    
    innerClick() {
      alert("Click!");
    }
  }
};
</script>