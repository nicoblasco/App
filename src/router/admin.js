import Administration from '../views/apps/admin/Administration.vue'
import Roles from '../views/apps/admin/Roles.vue'
import Sistema from '../views/apps/admin/Sistema.vue'
import Users from '../views/apps/admin/Users.vue'

import layouts from '../layout'

export default {
	path: '/admin',
	name: 'admin',
	component: Administration,
	meta: {
		auth: true,
		layout: layouts.navLeft
	},
	children: [
		{
			path: 'users',
			name: 'users',
			component: Users,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Usuarios',
				tags: ['admin']
			}
		},		
		{
			path: 'roles',
			name: 'roles',
			component: Roles,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Roles',
				tags: ['admin']
			}
		},
		{
			path: 'sistema',
			name: 'sistema',
			component: Sistema,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Sistema',
				tags: ['admin']
			}
		}
	]
}

