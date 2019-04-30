import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import moment from 'moment';

// style
import './index.scss';

// Pages
import Main from './app/Pages/Main.vue';
// Skeleton
import Skeleton from './app/Skeleton.vue';

// Vue plugin init
Vue.use(VueRouter);
Vue.use(VueResource);
moment.locale('ru');
Vue.use((VueMoment), {
    moment
});

Vue.http.options.root = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/';
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        }
    ]
});

export default new Vue({
    el: '#app',
    router,
    render: h => h(Skeleton)
})