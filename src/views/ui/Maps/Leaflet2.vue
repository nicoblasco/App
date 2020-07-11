<template>
	<div class="page-leaflet scrollable">

		<div class="card-base card-shadow--medium map-box">
			<l-map :zoom="zoom" :center="center" :options="{dragging: dragging}" ref="mymap">
				<l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
				<l-marker :lat-lng="marker"></l-marker>
			</l-map>
		</div>
	</div>
</template>

<script>
//const $ = require('jquery');
//window.$ = $;
import axios from 'axios'
export default {
	name: 'LeafletPage',
	data() {
		return {
			id: 4,
			latlng: null,
			zoom:13,
			center: L.latLng(47.413220, -1.219482),
			url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
			attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
			marker: L.latLng(47.413220, -1.219482),
			innerWidth: 0,
			dragging: true
		}
	},
	methods: {
		setDragging() {
			this.innerWidth = window.innerWidth
			if(window.innerWidth <= 768) 
				this.dragging = false	
			else
				this.dragging = true	
		}
	},
	created() {
		this.setDragging()
		window.addEventListener('resize', this.setDragging);
		axios.get('api/Georeferences/'+this.id)
        .then(respuesta => {
			this.latlng=[respuesta.data.latitude,respuesta.data.longitude];
			if (this.mounted) this.createMap()
               //return respuesta.data                
        })
		
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.setDragging);
	},
	mounted() {
		const map = this.$refs.mymap.mapObject;	
		var full = new L.Control.Fullscreen();	
		map.addControl(full);		
		 if (this.latlng) this.createMap()
 			this.mounted = true;
		//map.toggleFullscreen({pseudoFullscreen: true})
	}
}



</script>

<style lang="scss" scoped>
.page-leaflet {
	.map-box {
		height: 500px;
		width: 100%;
	}
}
</style>

