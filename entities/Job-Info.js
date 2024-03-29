const { TechJobs } = require("../models/job-details");

const FIVE_MONTH_IN_MILLISECONDS = 5 * 30 * 24 * 60 * 60 * 1000 ;


class JobInfo {

    constructor(data){
        try {
            this.link = data.entities[1].url;
            this.job = data.text.match(/.*(?= at)/gi)[0]
            this.location = data.text.match(/Location.*/gi)[0]
            this.company = data.text.match(/at \w+/gi)[0]

        } catch (error) {
            console.log(`erroe occured in constructor: ${error}`); //(logger)
        }
    };

    job;
    location;
    company;
    link;


    save = async () =>{
        try {
            const oldApply = await TechJobs.findByCredentials(this.link);
            
            if (oldApply) {
                if (oldApply.applyHistory[oldApply.applyHistory.length-1].date.getTime() - new Date().getTime() > FIVE_MONTH_IN_MILLISECONDS) {
                    await oldApply.save()
                    return true;
                } 
                
                console.log("they are still searching"); //(logger)
                return;

            }
            else {
                const newApply = await new TechJobs({
                    job: this.job,
                    location: this.location,
                    company: this.company,
                    link: this.link,
                    applyHistory : []
                });
                await newApply.save();
                return true;
            }

        } catch (error) {
            console.log(`erroe occured: ${error}`); //(logger)
        }

        return;
    }
}
module.exports = JobInfo;