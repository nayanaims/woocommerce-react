import React, { useEffect, useState } from 'react';
import {debounce} from 'lodash'
import {OptionsRadio} from '../common'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { Button, TextField, Snackbar } from '@mui/material';
import sData from './surveyData'
import Box from '@mui/material/Box';
import './home.scss'
import { Container } from '@mui/system';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Home = () => {
    const [expanded, setExpanded] = useState('panel1')
    const [surveyData, setSurveyData] = useState( sData );
    const [alertOpen, setAlertOpen] = useState(false)

    /* On click Save Button */
    const saveSurvey = (surveyID) => {
        const matchingSurvey = surveyData.find(survey => survey.id === surveyID)
        const emptyAnswer = matchingSurvey.questions.find(question => question.ans === '')
        if(emptyAnswer || matchingSurvey.comment === ''){
            // alert('Can\'t submit until all answers and comment is not provided.')
            setAlertOpen(true);
        }else{
            const matchingSurveyIndex = surveyData.findIndex(survey => survey.id === surveyID);
            const newSurveyData = surveyData;
            newSurveyData[matchingSurveyIndex].completed = true
            setSurveyData([...newSurveyData]);
        }
    }

    /* Toggle Survey Box */
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        const incomplete = surveyData.findIndex(survey => survey.completed === false);
        setExpanded(`panel${incomplete+1}`)
    }, [surveyData])

    /* Update Survey Ansewers */
    const updateSurvey = (a, q, s) => {
        const matchingSurvey = surveyData.find(survey => survey.id === s)
        const matchingQuestion = matchingSurvey.questions.find(question => question.id === q)
        matchingQuestion.ans = parseInt(a)
        const matchingSurveyIndex = surveyData.findIndex(survey => survey.id === s);
        const newSurveyData = surveyData;
        newSurveyData[matchingSurveyIndex].questions = matchingSurvey.questions;
        setSurveyData([...newSurveyData]);
    }

    /* Update Survey Comment */
    const updateSurveyComment = debounce((c, s) => {
        console.log('ccc', c)
        const matchingSurvey = surveyData.find(survey => survey.id === s)
        matchingSurvey.comment = c;
        const newSurveyData = surveyData;
        const matchingSurveyIndex = surveyData.findIndex(survey => survey.id === s);
        // console.log('matchingSurvey', matchingSurveyIndex);
        newSurveyData[matchingSurveyIndex].comment = c
        setSurveyData([...newSurveyData]);
    }, 500)

    return (
        <Container sx={{ mt: 2 }}>
            {surveyData.map((survey, ind) =>
            (
                /* Survey Start */ 
                <Box sx={{position: 'relative'}} key={(ind + 1)}>
                    <Accordion disabled={survey.completed} sx={{ position: 'relative' }} className={`panel${(ind + 1)}`} expanded={expanded === `panel${(ind + 1)}`} onChange={handleChange(`panel${(ind + 1)}`)} >
                        {/* Survey Title */} 
                        <AccordionSummary className="customAccordion" expandIcon={false} aria-controls="panel1d-content" id={`panel${(ind + 1)}d-header`}>
                            <Typography>{survey.name}</Typography>
                        </AccordionSummary>
                        {/* Survey Content */}
                        <AccordionDetails>
                            {
                                /* Options Loop */
                                survey.questions.map((question, qid) => {
                                    return (
                                        <Box key={qid}>
                                            <p>{qid + 1}. {question.title}</p>
                                            <OptionsRadio value={question.ans} qid={question.id} setAnswer={(ans) => updateSurvey(ans, question.id, survey.id)} /> 
                                        </Box>
                                    )
                                })
                            }
                            {/* Survey Comment */}
                            <Box sx={{ marginTop: '20px', width: '50%' }}>
                                <TextField
                                    defaultValue={survey.comment !== '' ? survey.comment : ''}
                                    id="outlined-multiline-static"
                                    label="Comment"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={(e) => updateSurveyComment(e.target.value, survey.id)}
                                    />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    {/* Save Button */}
                    <Button disabled={survey.completed} onClick={() => saveSurvey(survey.id)}  sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, margin: '6px' }}  variant="contained" startIcon={<SaveIcon />}>Save</Button>
                </Box>
            ))}
            {/* Message Alert */}
            <Snackbar
                severity="error"
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alertOpen}
                message="Can't submit until all answers and comment is not provided."
                autoHideDuration={2000}
                onClose={() => setAlertOpen(false)}
                />
        </Container>
    );
}
export default Home;