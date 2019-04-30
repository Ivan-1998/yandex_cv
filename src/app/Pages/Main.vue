<template>
    <div class="page main">
        <div class="page__title">
            <h1>Онлайн-табло Аэропорта Толмачёво</h1>
        </div>
        <div class="navbar page__section">
            <div class="navbar__left">
                <div class="navbar__left-switcher">
                    <div class="radio">
                        <label for="radio-departure" :class="{'select': event.type === 'dep'}">
                            <input
                                type="radio"
                                name="eventType"
                                value="dep"
                                v-model="event.type"
                                @click="getEvents(params, $event.target.value);"
                                id="radio-departure">
                            <span>Вылет</span>
                        </label>
                    </div>
                    <div class="radio">
                        <label for="radio-arrival" :class="{'select': event.type === 'arr'}">
                            <input
                                type="radio"
                                name="eventType"
                                value="arr"
                                v-model="event.type"
                                @click="getEvents(params, $event.target.value);"
                                id="radio-arrival">
                            <span>Прилет</span>
                        </label>
                    </div>
                </div>
                <div class="navbar__left-days">
                    <span
                        @click="event.day = 'beforeYesterday'; upDate('beforeYesterday')"
                        :class="{'select': event.day === 'beforeYesterday'}"
                        >Позавчера</span>
                    <span
                        @click="event.day = 'yesterday'; upDate('yesterday')"
                        :class="{'select': event.day === 'yesterday'}"
                        >Вчера</span>
                    <span
                        @click="event.day = 'today'; upDate('today')"
                        :class="{'select': event.day === 'today'}"
                        >Сегодня</span>
                </div>
                <div class="navbar__left-checkbox">
                    <label class="container" @click="getEvents(params, event.type)"> Задержанные рейсы
                        <input type="checkbox" v-model="event.delay">
                        <span class="checkmark"></span>
                    </label>   
                </div>
            </div>
            <div class="navbar__right">
                <div class="navbar__right-search">
                    <input
                        type="number"
                        v-model="flightNumber"
                        @input="getEvents(params, event.type)"
                        placeholder="Номер рейса...">
                </div>
            </div>
        </div>


        <div class="main__result page__section">
            <div class="main__result-table">
                <result-component
                    :event="event"
                    :arrivals="arrivals"
                    :departures="departures"
                    :airports="airports"
                ></result-component>
            </div>
            <div class="main__result-info">
                <info-component :params="params"></info-component>
            </div>
        </div>
    </div>
</template>

<script>
import Info from '../Components/Info/Info';
import Result from '../Components/Result/Result';

export default ({
    name: 'Main',
    components: {
        'info-component': Info,
        'result-component': Result
    },
    data() {
        return {
            airports: [],
            departures: [],
            arrivals: [],
            flightNumber: null,
            event: {
                type: 'arr',
                day: 'today',
                delay: false
            },
            params: {
                appId: '866ee32d',
                appKey: '1f673040403b94cbc94a4e8ddd01be19',
                airport: 'OVB',
                year: null,
                month: null,
                day: null,
                hourOfDay: null
            }
        };
    },
    methods: {
        getEvents(params, type) {
            this.$http.get(`${params.airport}/${type}/${params.year}/${params.month}/${params.day}/${params.hourOfDay }`,
                {
                    params: {
                        appId: params.appId,
                        appKey: params.appKey,
                        numHours: '6'
                    }
                }).then((response) => {
                this.airports = response.body.appendix.airports;
                // watch of type
                if (type === 'arr') {
                    this.arrivals = response.body.flightStatuses;
                    this.sortByDate(this.arrivals);
                    // search for flightNumber
                    if(this.flightNumber !== null) {
                        this.arrivals = this.arrivals.filter(el => {
                            if(el.flightNumber.includes(this.flightNumber)) return el;
                        });
                    }
                    // show delay flights
                    if(this.event.delay) {
                        this.arrivals = this.arrivals.filter(el => {
                            if(el.status !== 'L' && el.status !== 'A' && el.status !== 'S') return el;
                        });
                    }
                }
                if (type === 'dep') {
                    this.departures = response.body.flightStatuses;
                    this.sortByDate(this.departures);
                    // search for flightNumber
                    if(this.flightNumber !== null) {
                        this.departures = this.departures.filter(el => {
                            if(el.flightNumber.includes(this.flightNumber)) return el;
                        });
                    }
                    // show delay flights
                    if(this.event.delay) {
                        this.departures = this.departures.filter(el => {
                            if(el.status !== 'L' && el.status !== 'A' && el.status !== 'S') return el;
                        });
                    }
                }
            });
        },
        getCurrentTime() {
            this.params.year = this.$moment().format('YYYY');
            this.params.month = this.$moment().format('MM');
            this.params.day = this.$moment().format('DD');
            this.params.hourOfDay = this.$moment().format('HH');
        },
        showDelay() {
            if(this.delay) {
                if(this.event.type === 'arr') {
                    this.arrivals.filter(el => {
                        if(el.status !== 'L') return el;
                    });
                }
            }
        },
        sortByDate(arr) {
            if (arr === this.arrivals) {
                arr.sort((a, b) => {
                    return this.$moment(a.arrivalDate.dateUtc) - this.$moment(b.arrivalDate.dateUtc);
                });
            }
            if (arr === this.departures) {
                arr.sort((a, b) => {
                    return this.$moment(a.departureDate.dateUtc) - this.$moment(b.departureDate.dateUtc);
                });
            }
        },
        upDate(value) {
            switch(value) {
            case 'beforeYesterday':
                this.params.day = this.$moment().add(-2, 'day').format('DD');
                this.getEvents(this.params, this.event.type);
                break;    
            case 'yesterday':
                this.params.day = this.$moment().add(-1, 'day').format('DD');
                this.getEvents(this.params, this.event.type);
                break;
            case 'today':
                this.params.day = this.$moment().format('DD');
                this.getEvents(this.params, this.event.type);
                break;
            default:
                break;    
            }
        }
    },
    created() {
        this.getCurrentTime();
        this.getEvents(this.params, this.event.type);
    }
});
</script>