<template>
    <div class="main__result-info-content">

        <div class="main__result-info-location">
            <p class="location__name">{{current.city}}</p>
            <p class="location__date">
                {{current.month | moment('MMMM')}} {{current.date | moment('DD')}}, {{current.day}}, местное время {{current.time | moment('HH:mm')}}
            </p>
        </div>

        <a href="https://avia.yandex.ru/" target="_blank"  class="main__result-info-tickets">
            <div class="tickets__logo">
                <img src="/src/images/plane.svg" alt="Яндекс.Авиабилеты">
            </div>
            <div class="tickets__text">
                <p>
                    Яндекс.Авиабилеты<br>
                    <span>Поиск дешевых авиабилетов</span>
                </p>         
            </div>
        </a>
</div>
</template>

<script>
export default ({
    name: 'Info',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            current: {
                city: 'Новосибирск',
                month: null,
                daу: null,
                date: null,
                time: null
            }
        }  
    },
    methods: {
        getCurrentTime() {
            this.current.month = this.$moment();
            this.current.date = this.$moment();
            this.current.day = this.setDay(this.$moment().weekday());
            this.current.time = this.$moment().utc().add(7, 'hours');
        },
        setDay(number) {
            switch(number) {
            case 0:
                return 'понедельник';
            case 1:
                return 'вторник'; 
            case 2:
                return 'среда'; 
            case 3:
                return 'четверг'; 
            case 4:
                return 'пятница'; 
            case 5:
                return 'суббота'; 
            case 6:
                return 'воскресенье'; 
            default:
                break;     
            }
        }
    },
    created() {
        this.getCurrentTime();
    }
});
</script>