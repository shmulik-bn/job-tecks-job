const { TechJobs } = require("../models/job-details");

const FIVE_MONTH_IN_MILLISECONDS = 5 * 30 * 24 * 60 * 60 * 1000 ;


class JobInfo {

    constructor(data){
        try {
            this.link = data.entities[1].url;
            this.job = this.findText(data.text, 0, "at");
            this.location = this.findText(data.text, "Location", "\n");
            this.company = this.findText(data.text, "at", "\n");

        } catch (error) {
            console.log(`erroe occured in constructor: ${error} (for the logger use)`);
        }
    };

    job;
    location;
    company;
    link;

    findText = (data, keyStart, keyEnd) =>{
        let indexOfProp = keyStart? data.search(keyStart) : keyStart;

        if(indexOfProp !== -1){
            let subStr = data.slice(indexOfProp, data.length);
            let subStringEndIndex = subStr.search(keyEnd);

            return subStr.substring(0, subStringEndIndex);
        }
        else return;
    }

    save = async () =>{
        //לא צריך פעמיים טרי וקאצ מספיק ההוא בקונסטרקטור
        try {

            const oldApply = await TechJobs.findByCredentials(this.link);


            if (oldApply) {
                if (oldApply.applyHistory[oldApply.applyHistory.length-1].date.getTime() - new Date().getTime() > FIVE_MONTH_IN_MILLISECONDS) {
                    await oldApply.save()
                    return true;
                } 
                
                console.log("they are still searching (for the logger)");
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
            console.log(`erroe occured: ${error} (for the logger use)`);
        }

        return;
    }
}
module.exports = JobInfo;