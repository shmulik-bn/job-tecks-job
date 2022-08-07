const keywords = (/(Software)|(Full.?Stack)|(Front.?End)|(Back.?End)/gi);
const mongoose = require('mongoose')

 mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
 })
const userSchema = new mongoose.Schema({
    link: {
      type: String,
      require: true,
    },
    job: {
      type: String,
      require: true,
    },
    location: {
        type: String,
      },
    company: {
      type: String,
      require: true,
    },
    applyHistory: [{
        date: {
            type: Date
        }
    }]
  })

  userSchema.statics.findByCredentials = async (link) =>{
    const job = await TechJobs.findOne({ link })
    if (!job) {
      return;
    }
    return job
}

  userSchema.pre('save', async function(next){
    const newJob = this
    newJob.applyHistory.push({ date: new Date()})
    next()
  })

  const TechJobs = new mongoose.model("techJobs", userSchema);
  module.exports = { TechJobs, keywords };

