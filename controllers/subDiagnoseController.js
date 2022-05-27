const SubDiagnose = require("../models/subDiagnose")
const Diagnose = require("../models/diagnose")
const subDiagnoseController = {
    //add
    add: async(req,res) => {
        try {
            const subDiagnose = await new SubDiagnose(req.body)
            if(req.body.parentId){
                const diagnose = await Diagnose.findOneAndUpdate({_id: req.body.parentId}, {$push: {subDiagnose: subDiagnose._id}})
            }
            await subDiagnose.save()
            res.status(200).json(subDiagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
        
    }
}

module.exports = subDiagnoseController