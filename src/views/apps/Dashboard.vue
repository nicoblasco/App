<template>
	<vue-scroll class="page-dashboard">
		
		Pagina En blanco
	
	</vue-scroll>
</template>

<script>
export default {
	name: 'Dashboard',
	data () {
		return {}
	},
	computed: {},
	methods: {},
	mounted() {},
	beforeDestroy() {},
	components: {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

</style>

<style lang="scss">
.page-dashboard {}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>


