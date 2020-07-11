<template>

    <div style="height: 100%; width: 100%">
        <div class="page-gmaps scrollable">
            <div class="card-base card-shadow--medium">         
                <gmap-map
                    :center="center"
                    :zoom="15"
                    :options="{gestureHandling:'cooperative'}"
                    map-type-id="roadmap"
                    style="width: 100%; height: 500px"
                >
                  <GmapMarker                
                        v-for="(m, index) in getMarkers()"                        
                        :key="index"
                        :position="m.position"
						:title="m.title"
                        @click="toggleInfoWindow(m, index)"
                    />
					<gmap-info-window
						:options="infoOptions"
						:position="infoWindowPos"
						:opened="infoWinOpen"
						@closeclick="infoWinOpen=false"
					>			
						<div v-html="infoContent"></div>
					</gmap-info-window>						
                </gmap-map>
            </div>


        

        </div>
    </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import axios from 'axios'

export default {
    name: 'GoogleMap',
	data () {
		return {
            // default to Montreal to keep it simple
            // change this to whatever makes sense
			center:  {lat:-34.80521, lng:-58.27410},
			infoContent: '',
			infoWindowPos: {
			lat: 0,
			lng: 0
			},
			infoWinOpen: false,	
			infoOptions: {
			pixelOffset: {
				width: 0,
				height: -35
			}
			}, 					
            markers: []
		}
    },
  	created() {
		this.loadMarkers();
		
	},    
	mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
				this.loadMarkers();
            },200000);
        })
    },
	methods: {
			loadMarkers(){
				axios.get('api/Georeferences/GetCurrentGeoreferences')
				.then(respuesta => {                
						//debugger
						this.markers= respuesta.data
				})
			},

             getMarkers() {
                 var tempLatLong  =[];                 
                 if (this.markers.length>0) 
                 {
                   for(let i=0;i<this.markers.length;i++){
                    tempLatLong.push({
                        position: {
                            lat: parseFloat( this.markers[i].latitude),
                            lng: parseFloat(this.markers[i].longitude)
						},
						id: this.markers[i].id,
						title: this.markers[i].identifier,
						date: this.markers[i].creationDate
                        });
                    }
                
                 }
                  return tempLatLong;  

			 },
			toggleInfoWindow: function (marker, idx) {
				this.infoWindowPos = marker.position;
				this.infoContent = this.getInfoWindowContent(marker);

				//check if its the same marker that was selected if yes toggle
				if (this.currentMidx == idx) {
				this.infoWinOpen = !this.infoWinOpen;
				}
				//if different marker set infowindow to open and reset current marker index
				else {
				this.infoWinOpen = true;
				this.currentMidx = idx;
				}
			},
			getInfoWindowContent: function (marker) {
				//debugger
				return (
				`<div class="">
				<div>
					<div>
					<div class="m-2"><span style="font-weight: bold;">Tracker Id: </span>
						${marker.title}
					</div>
					</div>
					<div class="m-2"><span style="font-weight: bold;">Fecha:  </span>
						${marker.date}
					<br>
					</div>
					<div class="m-2"><span style="font-weight: bold;">Latitud:  </span>
						${marker.position.lat}
					<br>
					</div>
					<div class="m-2"><span style="font-weight: bold;">Longitud:  </span>
						${marker.position.lng}
					<br>
					</div>										
				</div>
				</div>`);
			}
	  			 
     }

}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/_variables';


// La Sobreescribi
.vue-map-container {
    position: inherit!important;
}

.page-gmaps {
	.map-app {
		max-height: 500px;

		.settings-panel {
			box-sizing: border-box;
			max-width: 400px;

			ul, li, select, button {
				font-size: 10px;
			}

			h3 {
				margin-bottom: 0px;
			}
			ul {
				margin-top: 15px;
			}
			[type="checkbox"] {
				position: relative;
				top: 2px;
			}
			li {
				margin-bottom: 2px;
			}
			pre {
				max-height: 200px;
				overflow: auto;
			}

			.marker-box {
				background: $background-color;
				padding: 10px;
				box-sizing: border-box;
				list-style: none;

				li, select, button {
					font-size: 14px;
				}
			}
		}
	}
}


@media (max-width: 768px) {
	.page-gmaps {
		.map-app {
			max-height: inherit !important;
			display: block;

			.settings-panel, .map-panel {
				display: block;
				overflow: hidden;
				width: 100%;
				max-width: 100%;
				height: 400px;
			}
			.settings-panel {
				overflow: auto;
			}
		}
	}
}
</style>
<style lang="scss">
.page-gmaps {
	.map-app {

		.settings-panel {

			[type="text"] { 
				background-color: rgba(255, 255, 255, 0.2);
				border: 1px solid rgba(255, 255, 255, 0.3);
			}
		}
	}
}
.gm-style .gm-style-iw {
	color: black;
}
</style>


