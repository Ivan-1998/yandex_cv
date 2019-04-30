# Tolmachevo Schedule (задание 1)
Приложение представляет собой онлайн-табло аэропорта Толмачево. Доступно по ссылке http://ivan-yandex.sibtiger.com/, для отображения данных выполнить 3 пункт в разделе "Установка".

## Установка
Для запуска приложения необходимо выполнить следующие действия:
#### 1. Установить менеджер пакетов npm, набрав в консоли следующую команду
```js
npm install
```
#### 2. Запустить приложение, выполнив команду
```js
npm run serve
```
После этого приложение будет доступно по адресу http://localhost:8080/

#### 3. Для получения данных API необходимо использовать браузер GoogleChrome, заранее установить и активировать расширение [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

!Если версия Chrome 73 и выше, необходимо запустить бразуер с отключенной проверкой безопасности, команда для терминала в MacOS:

```js
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```
Для других операционных систем, решение по [ссылке](https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome/3177718#3177718)

## Стек технологий
В проекте был задействован javascript-фреймворк Vue.js. В качестве системы сборки - webpack, пакетный менеджер - npm.

## API
Для получения данных аэропорта используется внешнее API [FlightStats](https://developer.flightstats.com/). API имеет ряд ограничений:
* Количество запросов в месяц - 1000
* Полученный список прибытий/отправлений формируется в диапазоне ближайших 6 часов от указанного часа.


# Ticker (задание 2)
Почему this.i не увеличивается, как исправить?
```js
function Ticker() {
    this._i = 0;
};

Ticker.prototype = {
    tick: function() {
        console.log(this._i++);     
    }
};

var ticker = new Ticker();
setInterval(ticker.tick, 1000);
```

### Способ 1
Передать функцию tick в качестве функции, а не строки в методе setInterval()
```js
function Ticker() {
    this._i = 0;
};

Ticker.prototype = {
    tick: function() {
        console.log(this._i++);     
    }
};

var ticker = new Ticker();
setInterval(function() {
    ticker.tick();
}, 1000);
```

### Способ 2
Через bind() привяжем метод tick к контексту объекта Ticker
```js
function Ticker() {
    this._i = 0;
};

Ticker.prototype = {
    tick: function() {
        console.log(this._i++);     
    }
};

var ticker = new Ticker();
setInterval(ticker.tick.bind(ticker), 1000);
```

### Cпособ 3
Вызвать метод setInterval() внутри метода объекта Ticker(), после чего просто обратиться к методу tick();
```js
function Ticker() {
    this._i = 0;
};

Ticker.prototype = {
    tick: function() {
        setInterval(() => {
            console.log(this._i++);
        }, 1000)     
    }
};

var ticker = new Ticker();
ticker.tick();
```

### Способ 4
Объвить метод tick() в функции конструктор Ticker()
```js
function Ticker() {
    this._i = 0;
    this.tick = () => {
        console.log(this._i++);
    }
};
var ticker = new Ticker();

setInterval(ticker.tick, 1000);
```
