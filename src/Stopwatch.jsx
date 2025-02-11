import React, {useState, useEffect, useRef} from 'react';


function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
      if(isRunning){
       intervalIdRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current);
        }, 10);
      }
    return ()=>{
        clearInterval(intervalIdRef.current)
    }
      
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }
    

    return(
        <>
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>

            <div className="controls"></div>
            <button className="start-btn" onClick={start}>Start</button>
            <button className="stop-btn" onClick={stop}>Stop</button>
            <button className="reset-btn" onClick={reset}>Reset</button>
        </div>
        </>
    )
}

export default Stopwatch;