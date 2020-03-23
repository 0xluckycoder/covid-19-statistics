import './style.css';
import './scss/style.scss'
import './assets/main-slider.png';

// Countup Dependency
import { CountUp } from 'countup.js';

// ChartJS Dependency
import Chart from 'chart.js';

// JS components
import getReport from './components/Data';

import FlagComponent from './components/FlagComponent';
import IconComponent from './components/IconComponent';
import UI from './components/UI';

// importing sl flag & global icon
import slFlag from './assets/sri-lanka.png';
import global from './assets/global.png';

import deaths from './assets/deaths.png';
import inHospital from './assets/in-hospital.png';
import newCases from './assets/new-cases.png';
import recover from './assets/recover.png';
import totalCases from './assets/total-cases.png';

const allImages = {deaths, inHospital, newCases, recover, totalCases};

// Load Flag Components
FlagComponent(slFlag, global);

// Instantiate UI
const ui = new UI(allImages, CountUp);

/*
  State pattern for change the state of the
  local & global data
*/
function data(initialDataState = {}) {
    const btnState = initialDataState;
    return {
        setState(newDataState = btnState) {
            return e => {
                //console.log('Previous state', btnState);
                Object.assign(btnState, {...newDataState});
                // console.log('Updated state', newDataState);
                // btnState.content();
                btnState.content();
                console.log(btnState);
                e.preventDefault();
            }
        }
    }
}

function localComponent() {
    getReport()
    .then(dataReport => ui.showLocalRowElementData(dataReport))
    .catch(error => console.log(error));
}

function globalComponent() {
    getReport()
    .then(dataReport => ui.showGlobalRowElementData(dataReport))
    .catch(error => console.log(error));
}

const buttonState = data();

// Local data
document.addEventListener(
    'DOMContentLoaded',
    buttonState.setState({ content: localComponent })
);
document.querySelector('#local').addEventListener('click', buttonState.setState({ content: localComponent }));
// Global data
document.querySelector('#global').addEventListener('click', buttonState.setState({ content: globalComponent }));

// Last updated time
function lastUpdatedTime() {
    getReport()
    .then(dataReport => ui.showLastUpdatedTime(dataReport))
    .catch(error => console.log(error));
}

lastUpdatedTime();

// Hospital Data
function hospitalData() {
    getReport()
    .then(dataReport => ui.showLocalHospitalData(dataReport))
    .catch(error => console.log(error));
}

hospitalData();

// Chart
function chart(dataReport, Chart) {
    console.log('chart',dataReport);

    let localTotal = dataReport.data.data.local_total_cases;
    let localDeaths = dataReport.data.data.local_deaths;
    let recovered = dataReport.data.data.local_recovered;

    let globalTotal = dataReport.data.data.global_total_cases;
    let globalDeaths = dataReport.data.data.global_deaths;
    let globalRecovered = dataReport.data.data.global_recovered;

    console.log(localTotal);


    // local chart
    let localChart = document.querySelector('#local-chart').getContext('2d');
    let globalChart = document.querySelector('#global-chart').getContext('2d');

    let localDataChart = new Chart(localChart, {
        type: 'pie',
        data: {
            labels: ['Total Cases', 'Deaths', 'Recovered'],
            datasets: [{
                label: '# of Votes',
                data: [localTotal, localDeaths, recovered],
                backgroundColor: [
                    '#ff9e43',
                    '#ea5454',
                    '#29c76e'
                ],
                borderColor: [
                    '#ff9e43',
                    '#ea5454',
                    '#29c76e'
                ],
                borderWidth: 1
            }]
        }
    });

    let globalDataChart = new Chart(globalChart, {
        type: 'pie',
        data: {
            labels: ['Total Cases', 'Deaths', 'Recovered'],
            datasets: [{
                label: '# of Votes',
                data: [globalTotal, globalDeaths, globalRecovered],
                backgroundColor: [
                    '#ff9e43',
                    '#ea5454',
                    '#29c76e'
                ],
                borderColor: [
                    '#ff9e43',
                    '#ea5454',
                    '#29c76e'
                ],
                borderWidth: 1
            }]
        }
    });
}

// parse data to charts
getReport()
.then(dataReport => chart(dataReport, Chart))
.catch(error => console.log(error));