import React from 'react';
import { Typography, Box, IconButton, Select, InputLabel, MenuItem, FormControl, FormHelperText, TextField, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

//Komponent zarzadzania ustawieniami ankiet
function getCorrectDateFormat(inputDate) {
    var date = new Date(inputDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return(year + '-' + month + '-' + day);
}

export default class SurveySettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.data.isOpen,
            openDate: null,
            closeDate: null,
        }
        

        this.textFieldDates = this.textFieldDates.bind(this);
        this.returnButton = this.returnButton.bind(this);
        this.isOpenChange = this.isOpenChange.bind(this);
        this.openDateChange = this.openDateChange.bind(this);
        this.closeDateChange = this.closeDateChange.bind(this);
        this.updateButtonClick = this.updateButtonClick.bind(this);
        this.updateSurveyData = this.updateSurveyData.bind(this);
    }

    

    textFieldDates(){
        if(this.props.data.openDate)
            this.setState({
                openDate: getCorrectDateFormat(this.props.data.openDate)
            })
        if(this.props.data.closeDate)
            this.setState({
                closeDate: getCorrectDateFormat(this.props.data.closeDate)
            })
    }

    componentDidMount(){
        this.textFieldDates();
    }

    returnButton(){
        this.props.parentCallback("Return");
    }

    isOpenChange(value){
        this.setState({isOpen: value});
        if(value === false){
            this.textFieldDates();
        }
    }

    openDateChange(date){
        this.setState({openDate: date});
    }

    closeDateChange(date){
        this.setState({closeDate: date});
    }

    updateButtonClick(){
        this.updateSurveyData();
    }

    updateSurveyData = async function () {
        await fetch('/surveys/updateSurveyData', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                _id: this.props.data._id,
                isOpen: this.state.isOpen,
                openDate: this.state.openDate,
                closeDate: this.state.closeDate
             })
        });
    }


    render() {
        return (
            <Box>
                <Box display="flex" alignItems="center" mb={4}>
                    <Box>
                        <IconButton aria-label="return" onClick={this.returnButton} display="inline">
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                    <Box mr={2}>
                        <Typography variant="h5" display="inline">
                            Ustawienia ankiety:
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" display="inline">
                                {this.props.data.courseInfo.courseId + " - " + this.props.data.courseInfo.courseName["pl"] + " [" + this.props.data.courseInfo.classType + "] " +
                                this.props.data.courseInfo.termId + " - " + this.props.data.lecturer.firstName + " " + this.props.data.lecturer.lastName}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Box mb={4}>
                        <Button variant="contained" onClick={this.updateButtonClick}>
                            <Typography variant="button">
                                Aktualizuj ankietę
                            </Typography>
                        </Button>
                    </Box>
                    <Box mr={2} mb={4}>
                        <FormControl variant="outlined" >
                            <InputLabel id="select-is-open-label">Otwarta</InputLabel>
                            <Select labelId="select-is-open-label" id="select-is-open" value={this.state.isOpen} label="Otwarta"
                                onChange={(event) => this.isOpenChange(event.target.value)}
                                style={{width: '200px'}}>
                                <MenuItem value={true}>Tak</MenuItem>
                                <MenuItem value={false}>Nie</MenuItem>
                            </Select>
                            <FormHelperText>Czy udostępnić ankietę?</FormHelperText>
                        </FormControl>
                    </Box>
                    {(this.state.isOpen) ?
                        <Box mb={4}>
                            <TextField variant="outlined" value={this.state.openDate} onChange={(event) => { this.openDateChange(event.target.value) }} id="openDate" label="Data otwarcia" type="date" InputLabelProps={{ shrink: true }} style={{ width: "200px" }} />
                            <TextField variant="outlined" value={this.state.closeDate} onChange={(event) => { this.closeDateChange(event.target.value) }} id="closeDate" label="Data zamknięcia" type="date" InputLabelProps={{ shrink: true }} style={{ width: "200px", marginLeft: "16px" }} />
                        </Box> :
                    false
                }
                </Box>
            </Box>
        )
    }
}