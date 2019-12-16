import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Graph from './Graph';
import './GraphContainer.css';
export default function GraphsContainer() {
    const [feed,setFeed]=useState ([]);
    const [feedReady,setFeedReady]=useState(false)
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'https://api.thingspeak.com/channels/937838/feeds.json?api_key=XMD0WU2YR6LBPMN9&results=10',
          );
          console.log(result.data.feeds);
          setFeed(result.data);
          setFeedReady(true);
        };
        fetchData();
      }, []);
     
    return (
        <div>
        
         <div className='graph-box'>
         {feedReady?<Graph feed={feed.feeds}field='field1' label="temperature"/>:"waiting for feed"} 
         {feedReady?<Graph feed={feed.feeds}field='field2' label="Humidity"/>:"waiting for feed"} 
         {feedReady?<Graph feed={feed.feeds}field='field3' label="Gas"/>:"waiting for feed"} 
         </div>
        </div>
    )
}
