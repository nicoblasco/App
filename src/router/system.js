import System from '../views/apps/system/System.vue'
import Configuration from '../views/apps/system/Configuration.vue'
import Companies from '../views/apps/system/Companies.vue'
import Company from '../views/apps/system/Company.vue'
import layouts from '../layout'


export default {
	path: '/system',
	name: 'system',
	component: System,
	meta: {
		auth: true,
        layout: layouts.navSystem,
        searchable: true,
        title: 'Sistema',
        tags: ['admin']
	},
	children: [
		{
			path: 'configuration',
			name: 'configuration',
			component: Configuration,
			searchable: true,
			meta: {
				auth: true,
				layout: layouts.navSystem,				
				title: 'Configuracion',
				tags: ['configuracion']
			}
		},
		{
			path: 'companies',
			name: 'companies',
			component: Companies,
			searchable: true,
			meta: {
				auth: true,
				layout: layouts.navSystem,
				title: 'Empresas',
				tags: ['empresas']
			}
		},
		{
			path: 'company',
			name: 'company',
			component: Company,
			props: true,			
			meta: {
				auth: true,
				layout: layouts.navSystem,
				searchable: true,
				title: 'Empresa',
				tags: ['empresa']
			}
		}			
	]
}



