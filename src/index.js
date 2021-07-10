import './sass/main.scss';
import Swal from 'sweetalert2'

function updateStopWatchInterface({ days, hours, minutes, seconds }) {
    daysLabelRef.textContent = `${days}`;
    hoursLabelRef.textContent = `${hours}`;
    minutesLabelRef.textContent = `${minutes}`;
    secondsLabelRef.textContent = `${seconds}`;
};

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.startTime = 0;
        this.onTick = onTick;
    };

    start() {
        if (this.isActive) {
            return;
        };

        const startTime = timer.startTime;
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();

            if (timer.startTime === currentTime) {
                timer.stop;
            };

            const deltaTime = startTime - currentTime;
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000);
    };

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    };

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const days = this.pad(Math.floor(ms / day));
        const hours = this.pad(Math.floor((ms % day) / hour));
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
        return { days, hours, minutes, seconds };
    };

    pad(value) {
        return String(value).padStart(2, '0');
    };

    checkValidTime(event) {
    const inputDate = new Date(event.currentTarget.value);
    const inputDateToMiliSec = inputDate.getTime();

    if (inputDateToMiliSec < Date.now()) {
        Swal.fire("Please choose a date in the future")
        return;
    };

    btnStartRef.removeAttribute('disabled', 'disabled')
        this.startTime = inputDateToMiliSec;
    };
};





const timer = new Timer({
    onTick: updateStopWatchInterface,
});


const inputRef = document.querySelector('#date-selector');
// inputRef.addEventListener('change', checkValidTime);
inputRef.addEventListener('change', timer.checkValidTime.bind(timer));


const btnStartRef = document.querySelector('button[data-start]');
btnStartRef.setAttribute('disabled', 'disabled')
btnStartRef.addEventListener('click', timer.start.bind(timer));


const daysLabelRef = document.querySelector('span[data-days]');
const hoursLabelRef = document.querySelector('span[data-hours]');
const minutesLabelRef = document.querySelector('span[data-minutes]');
const secondsLabelRef = document.querySelector('span[data-seconds]');

