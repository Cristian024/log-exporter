(async function () {
    const originalLog = console.log;
    console.log = function (...args) {
        customLogCallback(args);
        originalLog.apply(console, args);
    };
    console.test = function (...args){
        originalLog.apply(console, args);
    }

    function customLogCallback(logArgs) {
        const logDay = new Date();
        const logName = `user.log-${logDay.getFullYear()}${logDay.getMonth()}${logDay.getDay()}`;

        const log = JSON.parse(localStorage.getItem(logName)) || [];

        const objectLog = {
            date: `${logDay.getFullYear()}-${logDay.getMonth()}-${logDay.getDay()} ${logDay.getHours()}:${logDay.getMinutes()}:${logDay.getSeconds()}.${logDay.getMilliseconds()}`,
            message: logArgs[0]
        }

        log.push(objectLog);
        localStorage.setItem(logName, JSON.stringify(log))
    }
})();

