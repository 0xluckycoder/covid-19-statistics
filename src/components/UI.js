class UI {
    constructor(allImages, countUp) {
        this.rowElement = document.querySelector('.row-state');
        this.localHospitals = document.querySelector('.hospital-row');
        this.updatedDate = document.querySelector('.last-updated-date');
        this.updatedTime = document.querySelector('.last-updated-time');
        // images object
        this.allImages = allImages;
        // count up dependency
        this.countUp = countUp;
    }

    showLocalRowElementData(data) {

        let totalCases = data.data.data.local_total_cases;
        let newCases = data.data.data.local_new_cases;
        let inHospital = data.data.data.local_total_number_of_individuals_in_hospitals;
        let deaths = data.data.data.local_deaths;
        let recovered = data.data.data.local_recovered;



        this.rowElement.innerHTML = `
            <div class="col-sm">
                <div class="icon">
                    <img class="pb-3" src="${this.allImages.totalCases}">
                    <h3 class="icon-number" id="local-total" class="icon"></h3>
                    <h3 class="icon-content">Total Cases</h3>
                </div>
            </div>
            <div class="col-sm">
                <div class="icon">
                    <img class="pb-3" src="${this.allImages.newCases}">
                    <h3 class="icon-number" id="local-new"></h3>
                    <h3 class="icon-content">New Cases</h3>
                </div>
            </div>
            <div class="col-sm">
                <div class="icon">
                    <img class="pb-3" src="${this.allImages.inHospital}">
                    <h3 class="icon-number" id="in-hospital"></h3>
                    <h3 class="icon-content">In Hospitals</h3>
                </div>
            </div>
            <div class="col-sm">
                <div class="icon">
                    <img class="pb-3" src="${this.allImages.deaths}">
                    <h3 class="icon-number" id="local-deaths"></h3>
                    <h3 class="icon-content">Deaths</h3>
                </div>
            </div>
            <div class="col-sm">
                <div class="icon">
                    <img class="pb-3" src="${this.allImages.recover}">
                    <h3 class="icon-number" id="local-recovered"></h3>
                    <h3 class="icon-content" id="local-recovered">Recovered</h3>
                </div>
            </div>`

            this.countHelper('local-total', totalCases, this.countUp);
            this.countHelper('local-new', newCases, this.countUp);
            this.countHelper('in-hospital', inHospital, this.countUp);
            this.countHelper('local-deaths', deaths, this.countUp);
            this.countHelper('local-recovered', recovered, this.countUp);
    }
    
    countHelper(id, amount, countup) {
        let countUp = new countup(id, amount);

        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }


    showGlobalRowElementData(data) {

        let totalCases = data.data.data.global_total_cases;
        let newCases = data.data.data.global_new_cases;
        let newDeaths = data.data.data.global_new_deaths
        let deaths = data.data.data.global_deaths;
        let recovered = data.data.data.global_recovered;

        // console.log('global',data);
        this.rowElement.innerHTML = `    
        <div class="col-sm">
            <div class="icon">
                <img class="pb-3" src="${this.allImages.totalCases}">
                <h3 class="icon-number" id="global-total"></h3>
                <h3 class="icon-content">Total Cases</h3>
            </div>
        </div>
        <div class="col-sm">
            <div class="icon">
                <img class="pb-3" src="${this.allImages.newCases}">
                <h3 class="icon-number" id="global-new"></h3>
                <h3 class="icon-content">New Cases</h3>
            </div>
        </div>
        <div class="col-sm">
            <div class="icon">
                <img class="pb-3" src="${this.allImages.deaths}">
                <h3 class="icon-number" id="global-new-deaths"></h3>
                <h3 class="icon-content">New Deaths</h3>
            </div>
        </div>
        <div class="col-sm">
            <div class="icon">
                <img class="pb-3" src="${this.allImages.deaths}">
                <h3 class="icon-number" id="global-deaths"></h3>
                <h3 class="icon-content">Deaths</h3>
            </div>
        </div>
        <div class="col-sm">
            <div class="icon">
                <img class="pb-3" src="${this.allImages.recover}">
                <h3 class="icon-number" id="global-recovered"></h3>
                <h3 class="icon-content">Recovered</h3>
            </div>
        </div>`

        this.countHelper('global-total', totalCases, this.countUp);
        this.countHelper('global-new', newCases, this.countUp);
        this.countHelper('global-new-deaths', newDeaths, this.countUp);
        this.countHelper('global-deaths', deaths, this.countUp);
        this.countHelper('global-recovered', recovered, this.countUp);
    }

    showLocalHospitalData(data) {
        // console.log(data);

        const arr = data.data.data.hospital_data;

        let output = '';

        arr.forEach((item) => {
            // console.log(item.treatment_local);
            output += `
            <div class="hospital-cards col-sm-6 mb-5" data-aos="fade-up">
                <div class="card shadow">
                <div class="card-body mt-3 pt-4 text-center shadow-sm">
                    <h5 class="card-title">${item.hospital.name}</h5>
                    
                    <div class="row pt-4">
                        <div class="col">
                            <p class="mb-0"><strong>${item.treatment_local}</strong></p>
                            <p>Sri Lankans</p>
                        </div>
                        <div class="col">
                            <p class="mb-0"><strong>${item.treatment_foreign}</strong></p>
                            <p>Foreigners</p>
                        </div>
                        <div class="col">
                            <p class="mb-0"><strong>${item.treatment_total}</strong></p>
                            <p>Total</p>
                        </div>
                    </div>

                </div>
                </div>
            </div>
            `;
        });

        this.localHospitals.innerHTML = output;
    }

    showLastUpdatedTime(data) {
        let updatedTime = data.data.data.update_date_time;

        // Get name of the month
        let month = updatedTime.substr(6, 1);

        let monthName;

        switch (month) {
            case '1':
                monthName = 'January';
                break;
            case '2':
                monthName = 'February';
                break;
            case '3':
                monthName = 'March';
                break;
            case '4':
                monthName = 'April';
                break;
            case '5':
                monthName = 'May';
                break;
            case '6':
                monthName = 'June';
                break;
            case '7':
                monthName = 'July';
                break;
            case '8':
                monthName = 'August';
                break;
            case '9':
                monthName = 'September';
                break;
            case '10':
                monthName = 'October';
                break;
            case '11':
                monthName = 'November';
                break;
            case '12':
                monthName = 'December';
                break;
            default:
                console.log('Something went wrong!!!');
        }

        // Get date
        let date = updatedTime.substr(8,2);

        // Get time
        let time = updatedTime.substr(11, 5);

        this.updatedDate.textContent = `${date} of ${monthName}`;
        this.updatedTime.textContent = time;
    }

}

export default UI;



