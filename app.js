(function() {
    let timer;
    //cache the DOM
    const $buttons = [...document.querySelectorAll('.timer__button')];
    const $numForm = document.querySelector('#custom');
    const $minInput = document.querySelector('input[name=minutes]')
    const $timeLeft = document.querySelector('.display__time-left');
    const $endTime = document.querySelector('.display__end-time');

    const countDownTimer = function(sec) {
        const nowTime = Date.now()
        const endDate = Date.now() + sec * 1000
            //1.count down
        startTimer(endDate)
            //2.show end time
        showEndTime(endDate)
    }

    function startTimer(endTime) {
        clearInterval(timer)
        timer = setInterval(function() {
            const secLeft = Math.floor((endTime - Date.now()) / 1000)
            let min = Math.floor(secLeft / 60)
            let sec = secLeft % 60
            if (secLeft > 0) {
                if (min < 10) { min = `0${min}` }
                if (sec < 10) { sec = `0${sec}` }
                $timeLeft.textContent = `${min}:${sec}`
            } else {
                clearInterval(timer)
            }
        }, 16)
    }

    function showEndTime(time) {
        const end = new Date(time)
        const hour = end.getHours()
        const min = end.getMinutes()
        $endTime.textContent = `Be back at ${hour}:${min}`
    }

    const setTimer = function() {
        const seconds = parseInt(this.dataset.time);
        countDownTimer(seconds)
    }

    $buttons.forEach(button => {
        button.addEventListener('click', setTimer)
    })

    $numForm.addEventListener('submit', e => {
        e.preventDefault();
        $minInput.focus();
        if ($minInput.value === '') return
        const value = parseInt($minInput.value)
        if (value) {
            countDownTimer(value * 60)
            $minInput.value = ''
        }
    })
})();