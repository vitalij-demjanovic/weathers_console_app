#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/stortage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError(' No Token')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess(' Token saved')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError(' City not transferred!')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess(' Город сохранён!')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const city = await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Wrong entry City')
        } else if (e?.response?.status === 401) {
            printError('Wrong entry Token')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        //Select help
       return printHelp()
    }
    if (args.s) {
        //Save city
       return saveCity(args.s);
    }
    if (args.t) {
        //Save token
        return saveToken(args.t)
    }
    getForcast();
};

initCLI();