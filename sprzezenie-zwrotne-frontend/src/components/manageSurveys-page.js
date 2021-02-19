import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { StaffSurveysTable } from './tables.js';
import SurveyStatistics from './surveyStatistics.js';
import SurveySettings from './surveySettings.js';


//Strona zarzadzania ankietami
export default class ManageSurveysPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveysLoaded: false,
            surveyDataLoaded: false,
            surveysAvailableToManage: [],
            surveyChosen: null,
            actionOnSurvey: null
        };

        this.handleSurveyToGetCallback = this.handleSurveyToGetCallback.bind(this);
        this.handleSurveyStatisticsCallback = this.handleSurveyStatisticsCallback.bind(this);
        this.handleSurveySettingsCallback = this.handleSurveySettingsCallback.bind(this);
        this.getMySurveys = this.getMySurveys.bind(this);
        this.getMySurveyData = this.getMySurveyData.bind(this);
    }

    componentDidMount(){
        this.getMySurveys();
    }

    handleSurveyToGetCallback = async function(surveyChosen, button) {
        await this.setState({surveyChosen: surveyChosen._id, actionOnSurvey: button});
        if(button === "statistics"){
            await this.getMySurveyData();
        }
        else if(button === "settings"){
            await this.getMySurveyData();
        }
    }

    handleSurveyStatisticsCallback(data){
        if(data === "Return"){
            this.setState({surveyChosen: null, surveysLoaded: true});
        }
    }

    handleSurveySettingsCallback(data){
        if(data === "Return"){
            this.setState({surveyChosen: null, surveysLoaded: true});
        }
    }

    getMySurveys = async function(){
        const response = await fetch('/surveys/getMySurveys', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const surveysData = await response.json();
        if(surveysData || surveysData.length > 0)
            this.setState({surveysLoaded: true, surveyLoaded: false, surveysAvailableToManage: surveysData});
        else
            this.setState({surveysLoaded: true, surveyLoaded: false});
    }

    getMySurveyData = async function(){
        const response = await fetch('/surveys/getMySurveyData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: this.state.surveyChosen})
        });
        const surveyData = await response.json();
        if(!surveyData)
            return;
        this.surveyData = surveyData;
        this.setState({surveysLoaded: false, surveyDataLoaded: true});
    }



    render() {
        return (
            <Box>
                {
                    (!this.state.surveyChosen)
                        ?
                        (
                            (this.state.surveysAvailableToManage)
                                ?
                                <Box>
                                    <Box mb={2}>
                                        <Typography variant="h5">
                                            Wybierz ankietę którą chcesz zarządzać
                                    </Typography>
                                    </Box>
                                    <Box>
                                        <StaffSurveysTable data={this.state.surveysAvailableToManage} buttons={{ statistics: true, settings: true }} parentCallback={this.handleSurveyToGetCallback} />
                                    </Box>
                                </Box>
                                :
                                false
                        )
                        :
                        false
                }
                {
                    (this.state.surveyChosen)
                    ?
                    (
                        (this.state.surveyDataLoaded)
                            ?
                            (
                                (this.state.actionOnSurvey === "statistics")
                                ?
                                (
                                    <Box>
                                        <SurveyStatistics data={this.surveyData} parentCallback={this.handleSurveyStatisticsCallback} />
                                    </Box>
                                )
                                :
                                false
                            )
                            :
                            false
                    )
                    :
                    false
                }
                {
                    (this.state.surveyChosen)
                    ?
                    (
                        (this.state.surveyDataLoaded)
                            ?
                            (
                                (this.state.actionOnSurvey === "settings")
                                ?
                                (
                                    <Box>
                                        <SurveySettings data={this.surveyData} parentCallback={this.handleSurveySettingsCallback} />
                                    </Box>
                                )
                                :
                                false
                            )
                            :
                            false
                    )
                    :
                    false
                }
            </Box>
        )
    }
}