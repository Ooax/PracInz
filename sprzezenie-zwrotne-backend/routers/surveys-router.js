const express = require('express');
const router = express.Router();
const surveys = require('../functions/surveys.js');
require("dotenv").config();

const mongoInfo = {
    url: process.env.MONGO_URL,
    dbName: process.env.MONGO_DBNAME,
}

router.post('/addNewSurvey', function(req, res){
    const data = req.body;
    //Zmienic na staff status
    if(req.session.userData.student_status == 2 && data){
        surveys.addNewSurvey(mongoInfo, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.get('/getCoursesAvailableToSurvey', function(req, res){
    //Zmienic na staff status
    if(req.session.userData.student_status == 2){
        surveys.getCoursesAvailableToSurvey(req.session.token, req.session.userData)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/getSurveyTemplates', function(req, res){
    const data = req.body;
    //Zmienic na staff status
    if(req.session.userData.student_status == 2 && data){
        surveys.getSurveyTemplates(mongoInfo, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.get('/getAvailableSurveys', function(req, res){
    if(req.session.userData.student_status == 2){
        surveys.getAvailableSurveys(mongoInfo, req.session.token, req.session.userData)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/getSurveyData', function(req, res){
    const data = req.body;
    if(req.session.userData.student_status == 2 && data){
        surveys.getSurveyData(mongoInfo, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/fillOutSurvey', function(req, res){
    const data = req.body;
    if(req.session.userData.student_status == 2 && data){
        surveys.fillOutSurvey(mongoInfo, req.session.userData, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.get('/getMySurveys', function(req, res){
    //Zmienic na staff status
    if(req.session.userData.student_status == 2){
        surveys.getMySurveys(mongoInfo, req.session.userData)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/getMySurveyData', function(req, res){
    const data = req.body;
    //Zmienic na staff status
    if(req.session.userData.student_status == 2 && data){
        surveys.getMySurveyData(mongoInfo, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/updateSurveyData', function(req, res){
    const data = req.body;
    //Zmienic na staff status
    if(req.session.userData.student_status == 2 && data){
        surveys.updateSurveyData(mongoInfo, data)
        .then(function(result){
            res.json(result); 
        }).catch(function(err){
            console.error(err);
        })
    }
})

module.exports = router;