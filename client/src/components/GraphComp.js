import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'

const GraphComp = () => {
    const times = useSelector(state => { return state.windReducer.times })

    var windStrengths = useSelector(state => { return state.windReducer.windStrengths })


    const windDirection = useSelector(state => { return state.windReducer.windDirection })

    const setUpData = () => {
        return { labels: times, datasets: [{ label: "Wind development", data: windStrengths} ] }
    }
    return (
        <div>
            <Line data={setUpData()}/>
        </div>
    )
}

export default GraphComp;
