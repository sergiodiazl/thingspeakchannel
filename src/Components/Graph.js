import React from 'react';
import {Line} from 'react-chartjs-2';
export default function Graph(props) { 
   
    const createdAt=props.feed.map(
     function (item) {
       var date =new Date(Date.parse(item.created_at))
       return `${date.getHours()}:${date.getMinutes()} `
       
      })
      console.log(createdAt);
    const data = {
      labels:createdAt,
        datasets: [
          {
          
            label: props.label,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: props.feed.map(item=>(item[props.field]))
          }
        ]
      };     
    return (
        <div>
         <Line data={data}
           options={{
            responsive: true,
            maintainAspectRatio: true}}
         
         />
</div>
            
        
    )
}
