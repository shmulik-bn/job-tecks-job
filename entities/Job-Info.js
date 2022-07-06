//מיון


class JobInfo {

    constructor(data){
        try {
            this.link = data.entities[1].url;
        this.job = this.findText(data.text, 0, "at");

        this.location = this.findText(data.text, "Location", "\n");
        this.company = this.findText(data.text, "at", "\n");
        } catch (error) {
            console.log('error in class JobInfo:', error);
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
}
module.exports = JobInfo;