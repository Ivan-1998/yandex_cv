<template>
    <table>
        <thead>
            <tr>
                <td>Номер</td>
                <td>Направление</td>
                <td>Терминал</td>
                <td>Время</td>
                <td>Статус</td>
            </tr>
        </thead>
        <tbody v-if="event.type === 'arr'">
             <tr v-for="item in arrivals" :key="item.flightId">
                <td>{{item.carrierFsCode}} {{item.flightNumber}}</td>
                <td>{{defineCity(item.departureAirportFsCode)}}</td>
                <td>
                    <span v-if="item.airportResources">{{item.airportResources.arrivalTerminal}}</span>
                    <span v-else>-</span>
                </td>
                <td>{{item.arrivalDate.dateUtc | moment('HH:mm')}}</td>
                <td>{{defineStatus(item.status)}}</td>
            </tr>
        </tbody>
        <tbody v-if="event.type === 'dep'">
             <tr v-for="item in departures" :key="item.flightId">
                <td>{{item.carrierFsCode}} {{item.flightNumber}}</td>
                <td>{{defineCity(item.arrivalAirportFsCode)}}</td>
                <td>
                    <span v-if="item.airportResources">{{item.airportResources.departureTerminal}}</span>
                    <span v-else>-</span>
                </td>
                <td>{{item.departureDate.dateUtc | moment('HH:mm')}}</td>
                <td>{{defineStatus(item.status)}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default ({
    name: 'Result',
    props: {
        event: {
            type: Object,
            required: true
        },
        arrivals: {
            type: Array,
            required: true
        },
        departures: {
            type: Array,
            required: true
        },
        airports: {
            type: Array,
            reqiired: true
        }
    },
    methods: {
        defineStatus(name) {
            switch(name) {
            case 'A':
                return 'Active';
            case 'C':
                return 'Canceled';
            case 'D':
                return 'Diverted';
            case 'DN':
                return 'Data source needed';
            case 'L':
                return 'Landed';  
            case 'NO':
                return 'Not Operational';
            case 'R':
                return 'Redirected';
            case 'S':
                return 'Scheduled'              
            default: 
                return 'Unknown'   
            }
        },
        defineCity(fs) {
            let city;
            this.airports.forEach((el) => {
                if (el.fs === fs) {
                    city = el.city;
                }
            });
            return city;
        }
    }
});
</script>