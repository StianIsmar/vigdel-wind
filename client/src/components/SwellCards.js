import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ArrowDiv, CardDiv } from '../styles/styles'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '40px',
        display: "flex",
        padding:'0px' ,
    },
    root: {
        minWidth: 275,
        backgroundColor: '#333',
        color: 'white',
        margin: '3px',
        padding: '0px',

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(1)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SwellCards = (props) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const data = props.data
    console.log(data.swell.components.primary)

    const getCurrentDate = () => {
        console.log(props.data.localTimestamp)
        const d = new Date(props.data.localTimestamp * 1000)
        return d.getHours() + ":00"
    }

    const fillData = () => {
        const data = props.data
        console.log(data.swell)
    }
    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardDiv>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>

                        </Typography>
                        <Typography variant="h5" component="h2">
                            {getCurrentDate()}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {props.data.swell.components.primary.height + "m"}{bull}{props.data.swell.components.primary.period + "s"}{bull}
                            {props.data.swell.components.primary.direction}
                            <ArrowDiv>
                                <ArrowRightAltIcon />
                            </ArrowDiv>
                        </Typography>
                    </CardContent>
                </CardDiv>
            </Card>
        </div>)
}

export default SwellCards;