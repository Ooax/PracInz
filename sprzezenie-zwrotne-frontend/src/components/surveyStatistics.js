import React from 'react';
import { Typography, Box, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {HorizontalBar} from 'react-chartjs-2';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { SurveyCommentsTable } from './tables.js';


//Komponent statystyk ankiety
export default class SurveyStatistics extends React.Component {
    constructor(props) {
        super(props);
        
        

        this.organizeDataToView = this.organizeDataToView.bind(this);
        this.returnButton = this.returnButton.bind(this);
        this.renderHorizontalBars = this.renderHorizontalBars.bind(this);
        this.renderCommentsTable = this.renderCommentsTable.bind(this);
    }

    organizeDataToView(){
        this.questions = [];
        this.comments = [];
        this.props.data.questions.forEach((question, questionIndex) => {
            var questionData = {
                questionText: question.text,
                questionType: question.questionType,
                questionStats: {
                    labels: [],
                    datasets: [{
                        label: "",
                        backgroundColor: lightBlue[200],
                        borderColor: lightBlue[400],
                        borderWidth: 1,
                        hoverBackgroundColor: lightBlue[800],
                        hoverBorderColor: lightBlue[900],
                        data: []
                      }]
                }
            }
            if(questionData.questionType === "Radio"){
                questionData.questionStats.datasets[0].label = "Odpowiedzi jednokrotnego wyboru";
                question.answers.forEach((questionAnswer, answerIndex) => {
                    questionData.questionStats.labels.push(questionAnswer.text);
                    questionData.questionStats.datasets[0].data.push(this.props.data.surveyAnswers.filter((surveyAnswer) => surveyAnswer.answers[questionIndex] === questionAnswer.id).length);
                })
            }
            else if(questionData.questionType === "Checkbox"){
                questionData.questionStats.datasets[0].label = "Odpowiedzi wielokrotnego wyboru";
                question.answers.forEach((questionAnswer, answerIndex) => {
                    questionData.questionStats.labels.push(questionAnswer.text);
                    questionData.questionStats.datasets[0].data.push(this.props.data.surveyAnswers.filter((surveyAnswer) => surveyAnswer.answers[questionIndex][answerIndex] === true).length);
                })
            }
            this.questions.push(questionData);
        })
        this.props.data.surveyAnswers.forEach((answer) => {
            if(answer.surveyComment && answer.surveyComment !== "")
                this.comments.push(answer.surveyComment);
        })
    }

    componentDidMount(){
    }

    returnButton(){
        this.props.parentCallback("Return");
    }

    renderHorizontalBars(){
        if((this.props.data.surveyAnswers)?(this.props.data.surveyAnswers.length > 0):false)
        {
            return this.questions.map((question, index) => {
                return(
                    <Box key={"hb-box-"+index} maxWidth="88%" m={4} p={2} border={1} borderRadius="borderRadius">
                        <HorizontalBar data={question.questionStats} height={300} options={{ maintainAspectRatio: false, scales: {xAxes:[{ticks:{stepSize: 1}}]} }} />
                    </Box>
                )
            })
        }
        else{
            return (
                <Box mt={5} color={lightBlue[600]}>
                    <Typography variant="h5" >
                        Ta ankieta nie ma jeszcze żadnych odpowiedzi
                    </Typography>
                </Box>
            )
        }
    }

    renderCommentsTable(){
        if((this.props.data.surveyAnswers)?(this.props.data.surveyAnswers.length > 0 && this.comments.length > 0):false){
            return(
                <Box>
                    <SurveyCommentsTable data={this.comments} />
                </Box>
            )
        } 
        else if((this.props.data.surveyAnswers)?(this.props.data.surveyAnswers.length > 0 && this.comments.length === 0):false){
            return(
                <Box mt={5} color={lightBlue[600]}>
                    <Typography variant="h5" >
                        Brak komentarzy do ankiety
                    </Typography>
                </Box>
            )
        }
        else{
            return(
                <Box mt={5} color={lightBlue[600]}>
                </Box>
            )
        }
    }

    render() {
        this.organizeDataToView();
        return (
            <Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <Box>
                        <IconButton aria-label="return" onClick={this.returnButton} display="inline">
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                    <Box mr={2}>
                        <Typography variant="h5" display="inline">
                            Statystyki ankiety:
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" display="inline">
                                {this.props.data.courseInfo.courseId + " - " + this.props.data.courseInfo.courseName["pl"] + " [" + this.props.data.courseInfo.classType + "] " +
                                this.props.data.courseInfo.termId}
                        </Typography>
                    </Box>
                </Box>
                {
                    this.renderHorizontalBars()
                }
                {
                    this.renderCommentsTable()
                }
            </Box>
        )
    }
}