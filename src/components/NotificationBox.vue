<template>
	<div class="notification-box">
		<div class="notify" v-for="n in notifications" :key="n.id">
			<div class="flex">
				<div class="n-title box grow"><strong><i :class="n.icon"></i> {{n.title}}</strong></div>
				<div class="n-date">{{n.date}} <i class="mdi mdi-clock"></i></div>
			</div>
			<div class="n-desc">{{n.desc}}</div>
		</div>
		<div class="see-all">Ver todas las notificaciones</div>
	</div>
</template>

<script>
export default {
	name: 'NotificationBox',
	data() {
		return {
			notifications: [
				{
					id: 1,
					title: 'Nuevo punto de acceso',
					icon: 'mdi mdi-access-point',
					desc: 'ID: 125477878787 -34.25647; -64.65477',
					date: 'Ahora!'
				},
				{
					id: 2,
					title: 'Dispositivo sin funcionar',
					icon: 'mdi mdi-alarm-off',
					desc: 'ID: 125477878787',
					date: '2 Min'
				},
				{
					id: 3,
					title: 'Nuevo punto de acceso',
					icon: 'mdi mdi-access-point',
					desc: 'ID: 125477878787 -34.25647; -64.65477',
					date: '10 Min'
				}
			]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/_variables';

.notification-box {
	color: $text-color;
	
	.notify {
		margin-bottom: 20px;
		max-height: 70px;
		overflow: hidden;
		position: relative;

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 20px;
			box-shadow: 0px -20px 20px -10px $background-color inset;
		}

		.n-title {
			text-align: left;
			padding-right: 10px;
		}
		.n-desc {
			color: transparentize($text-color, 0.5);
		}

		&:hover {
			color: $text-color-accent;

			.n-desc {
				color: transparentize($text-color-accent, 0.5);
			}
		}
	}

	.see-all {
		&:hover {
			color: $text-color-accent;
		}
	}
}
</style>

