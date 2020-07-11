<template>
	<vue-scroll class="page-page-headers">
		<div class="page-header header-accent-gradient card-base card-shadow--small">
			<h1>{{title}}</h1>
			<h4>{{subtitle.description}}</h4>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>				
				<el-breadcrumb-item v-if="subtitle !=undefined" :to="{ path: subtitle.path }">{{subtitle.description}} </el-breadcrumb-item>				
				<el-breadcrumb-item v-if="thirdtitle !=undefined" :to="{ path: thirdtitle.path }">{{thirdtitle.description}} </el-breadcrumb-item>			
				<el-breadcrumb-item v-if="title !=undefined">{{title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</vue-scroll>
</template>

<script>
export default {
    name: 'PageHeaders',
	props:['path'],
	data(){
		return {
			title: '',
			subtitle: '',
			thirdtitle: '',
			screendata: null,
			subtitle: null,
			thirdtitle: null
		}
	},
	created () 
	{
		this.screendata= this.$store.getters.userProfile.role.screens.filter(x=>x.path===this.path)[0];
		this.title= this.screendata.description;
		if (this.screendata.parentId!=null){
			this.subtitle = this.$store.getters.userProfile.role.screens.filter(x=>x.systemScreenId===this.screendata.parentId)[0];
			if (this.subtitle!=null)
			{
				if (this.subtitle.parentId!=null){
					this.thirdtitle = this.$store.getters.userProfile.role.screens.filter(x=>x.systemScreenId===this.subtitle.parentId)[0];
			}

		}	
		}
	
		
	}
        
}
</script>

<style lang="scss" scoped>
//@import '../../../assets/scss/_variables';

.page-page-headers {
	.page-header {
		margin-bottom: 50px;
	}
}
</style>

