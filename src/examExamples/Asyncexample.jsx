import React, { useEffect, useState } from 'react'

export const Asyncexample = () => {
    
    const [async, setAsync] = useState("Idle async");
    const [sync, setSync] = useState("begun sync");

    const syncFunction = () => {
        setSync("Start sync");
        const end = Date.now() + 5000;
        while (Date.now() < end) {
            console.log('Sync is running');
        }
        setSync("Ended sync");
    }
    
    const asyncFunction = async () => {
        setAsync('Start async');
        await new Promise(resolve => setTimeout(resolve, 6000));
        setAsync('Ended async');
    }
    
    useEffect(() => {
        
        syncFunction();
        asyncFunction();
    }, [])
    
    return (
    <>
        <h1>Async example</h1>
        <h2>Async status: {async.toString()}</h2>
        <h2>Sync status: {sync.toString()}</h2>
    </>
  )
}
