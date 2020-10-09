import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NumberDiv } from '../styles/styles'
const ColumnDiv = styled.div`
display: flex;
flex-direction: row;
font-size:40px !important;
`;
const Time = (props) => {
    const [currentTime, updateCurrentTime] = useState(new Date());
    useEffect(() => {
        const intervalID = setInterval(() => getCurrentTime(), 1000);
    }, []);
    const getCurrentTime = () => {
        var d = new Date();
        //console.log(d.getTime())
        updateCurrentTime(d)
        d.getHours(); // => 9
        d.getMinutes(); // =>  30
        d.getSeconds(); // => 51
        return;


    };
    const getMonth = () => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = months[currentTime.getMonth()]
        return (currentMonth.toString())

    }

    const getThisDate = () => {

        var d = currentTime.getDate()
        var res
        if (d.toString().length == 1) {
            res = "0" + d.toString()
            return res
        }
        return d
    }
    return (
        <div>
            <ColumnDiv >
                <NumberDiv>{`${getThisDate()}/`}</NumberDiv>
                <NumberDiv>{`${getMonth()}/`}</NumberDiv>
                <NumberDiv>{`${currentTime.getFullYear()}\xa0`}</NumberDiv>


                <NumberDiv>{`${currentTime.getHours()}:`}</NumberDiv>
                <NumberDiv>{`${currentTime.getMinutes()}:`}</NumberDiv>
                <NumberDiv>{`${currentTime.getSeconds()}  ` + " "}</NumberDiv>
            </ColumnDiv>
        </div>
    );
};
export default Time;