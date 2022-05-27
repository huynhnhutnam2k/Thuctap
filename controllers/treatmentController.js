const SubDiagnose = require("../models/subDiagnose")
const Treatment = require("../models/treatment")

const treatmentController = {
    //add 
    add: async(req,res) => {
        try {
            const treatment = await new Treatment(req.body)
            if(req.body.diagnoseId){
                const subDiagnose = await SubDiagnose.findOneAndUpdate({_id: req.body.diagnoseId} , {$push: {treatment: treatment._id}})
            }
            const newTreatment = await treatment.save()
            res.status(200).json(newTreatment)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    }
}

module.exports = treatmentController