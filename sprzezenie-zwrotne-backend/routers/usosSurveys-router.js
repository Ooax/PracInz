const express = require('express');
const router = express.Router();
const usosSurveys = require('../functions/usos-surveys.js');

router.get('/getUsosSurveysToFill', function(req, res){
    usosSurveys.getSurveysToFill(req.session.token)
    .then(function(result){
        res.json(result);
    }).catch(function(err){
        console.error(err);
    })
})

router.post('/getUsosSurvey', function(req, res){
    const surveyId = req.body.surveyId;
    if(surveyId){
        usosSurveys.getSurvey(req.session.token, surveyId)
        .then(function(result){
            res.json(result);
        }).catch(function(err){
            console.error(err);
        })
    }
})

router.post('/fillUsosSurvey', function(req, res){
    const data = req.body;
    if(data && data.surveyId){
        data.answers = JSON.stringify(data.answers);
        usosSurveys.fillSurvey(req.session.token, data)
        .then(function(result){
            res.json(result);
        }).catch(function(err){
            console.error(err);
        })
    }
})

module.exports = router;