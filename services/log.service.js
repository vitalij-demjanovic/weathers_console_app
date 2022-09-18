import chalk from 'chalk';
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + '' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCES ') + '' + message);
};


const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ' )}
        No parameters - weather
        -s [CITY] for saving cities
        -h call help
        -t [API_KEY] save token
        `
    );
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')} Počasie v meste ${res.name}
		${icon}  ${res.weather[0].description}
		Teplota: ${res.main.temp} (feels like ${res.main.feels_like})
		Vlhkosť vzduchu: ${res.main.humidity}%
		Rýchlosť vetra: ${res.wind.speed}
        `
    );
}

export { printError, printSuccess, printHelp, printWeather };
