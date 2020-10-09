import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ArrowDiv, CardDiv, OuterDiv, ColumnElement, SwellTimeElement } from '../styles/styles'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import moment from 'moment-timezone';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));


const useStyles1 = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '40px',
        display: "flex",
        padding: '0px',
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
        margin: '0 10px',
        transform: 'scale(1)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const nearestValue1 = (arr, val) => {
    for (var i = 0; i < arr.length; i++) {
        if (val <= arr[i]) {
            return arr[i]
        }
    }
}
const nearestValue = (arr, val) => arr.reduce((p, n) => (Math.abs(p) > Math.abs(n - val) ? n - val : p), Infinity) + val

const getCorrespondingWind = (date, windData) => {
    const mswEpoch = moment(date).valueOf() // need to find the closest value to this from the yr object
    const times = windData.map(v => v.time_epoch)
    const nearests = (nearestValue1(times, mswEpoch))
    return windData.find(x => x.time_epoch === nearests)
}

const SwellCards1 = (props) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const [cardWind, setYrWindObj] = useState(10 + 'm/s') // holds the wind from yr



    const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    const classes1 = useStyles1();
    const bull = <span className={classes.bullet}>•</span>;
    const data = props.data

    function closest(arr, val) {
        const mapped = arr.map(v => v.time_epoch)
        return Math.max.apply(null, mapped.filter(function (v) { return v <= val }))
    }

    const findClosest = (arr, v) => {
        arr.sort((a, b) => {
            return Math.abs(v - a.time_epoch) - Math.abs(v - b.time_epoch);
        })
    }

    const getCurrentDate = () => {
        const d = new Date(props.data.localTimestamp * 1000)


        if (d.getHours().toString().length == 1) {
            return "0" + d.getHours() + ":00"
        }
        return d.getHours() + ":00"
    }

    const renderSecondarySwell = () => {
        return <ColumnElement>{props.data.swell.components.secondary.height + "m" + " | " + props.data.swell.components.secondary.period + "s" + " | "
        }
            <ArrowRightAltIcon style={{ 'transform': `rotate(${props.data.swell.components.secondary.direction - 90 + "deg"})` }} /></ColumnElement>
    }

    const renderPrimarySwell = () => {
        return <ColumnElement>{props.data.swell.components.primary.height + "m"}{" | "}{props.data.swell.components.primary.period + "s"}{" | "}
            <ArrowRightAltIcon style={{ 'transformOrigin': 'center', 'transform': `rotate(${props.data.swell.components.primary.direction - 90 + "deg"})` }} />
        </ColumnElement>
    }

    const renderYrWind = () => {
        const d = new Date(props.data.localTimestamp * 1000)
        const closestYrObj = getCorrespondingWind(d, props.yrData)
        console.log(d, closestYrObj)
        return <ColumnElement>
            {closestYrObj.speed}<ArrowRightAltIcon style={{ 'transformOrigin': 'center', 'transform': `rotate(${closestYrObj.direction - 90+180 + "deg"})` }}></ArrowRightAltIcon> </ColumnElement>


        //return closestYrObj.speed
    }
    return (
        <li>
            <OuterDiv>
                <Grid container>
                    <Grid item xs={3}>
                        <SwellTimeElement>

                            <ColumnElement>
                                {getCurrentDate()}

                            </ColumnElement>
                        </SwellTimeElement>
                    </Grid>
                    <Grid item xs={3}>
                        {renderPrimarySwell()}
                    </Grid>
                    <Grid item xs={3}>
                        {props.data.swell.components.hasOwnProperty('secondary') ? (renderSecondarySwell()
                        ) : (<ColumnElement>-</ColumnElement>)}
                    </Grid>
                    <Grid item xs={3}>
                        {renderYrWind()}
                    </Grid>
                </Grid>
            </OuterDiv>
        </li>)
}
export default SwellCards1;
