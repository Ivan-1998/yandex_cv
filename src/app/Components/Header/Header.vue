<template>
    <header class="header">
        <div class="header__content">
            <div class="header__logo">
                <a href="https://yandex.ru/" target="_blank"><img src="/src/images/logo.svg" alt="Яндекс"></a>
                <a href="/"><img src="/src/images/logo-text.svg" alt="Расписания"></a>
            </div>
            <div class="header__user">
                <div class="header__user-photo"></div>
                <p class="header__user-text"><span>i</span>van@yandex.ru</p>
            </div>
        </div>
    </header>
</template>

<script>
export default ({
    name: 'Header'
});
</script>