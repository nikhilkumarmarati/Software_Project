// import React, { useState, useEffect } from "react";
// import ApexCharts from "react-apexcharts";
// // import { Bar } from "react-chartjs-2";

// const Stats = () => {
//     const [completedclassWorks, setCompletedClassWorks] = useState(null);
//     const [classWorks, setClassWorks] = useState(null);
//     const [utilizationData, setUtilizationData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/getcompletedclassworks");
//                 const completeddata = await response.json();
//                 setCompletedClassWorks(completeddata);
//                 const resp = await fetch("http://localhost:5000/getallclassworks");
//                 const data = await resp.json();
//                 setClassWorks(data);
//                 const utilization = await fetch("http://localhost:5000/utilizationStatistics");
//                 const utilizationData = await utilization.json();
//                 setUtilizationData(utilizationData);
//                 console.log(utilizationData)
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const compoptions = {labels: completedclassWorks ? Object.keys(completedclassWorks) : []};
//     const compseries = completedclassWorks ? Object.values(completedclassWorks) : [];

//     const options = {labels: classWorks ? Object.keys(classWorks) : []};
//     const series = classWorks ? Object.values(classWorks) : [];

//     const labels1 = utilizationData&&utilizationData.map((item) => item.resourceType);
//   const counts = utilizationData&&utilizationData.map((item) => item.count);

//   const options1 = {
//     chart: {
//       type: 'bar',
//     },
//     xaxis: {
//       categories: labels1,
//     },
//   };
//   const counts1 = [
//     {
//       name: 'Resource Counts',
//       data: counts,
//     },
//   ];

//     return (
//         <div className="stats_container">
//           <div className="stat">
//             <h2>All Works by Priority Level</h2>
//             {classWorks && (
//                 <ApexCharts options={options} series={series} type="pie" width={500} />
//             )}
//             </div>
//             <div className="stat">
//             <h2>Completed Works by Priority Level</h2>
//             {completedclassWorks && (
//                 <ApexCharts options={compoptions} series={compseries} type="pie" width={500} />
//             )}
//             </div>
//             <div className="stat">
//             <h2>Resource Counts Bar Graph</h2>
//             {utilizationData && (
//                 <ApexCharts options={options1} series={counts1} type="bar" width={500} />
//             )}
//             </div>
//         </div>
//     );
// };

// export default Stats;

import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const Stats = () => {
    const [completedClassWorks, setCompletedClassWorks] = useState(null);
    const [classWorks, setClassWorks] = useState(null);
    const [utilizationData, setUtilizationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const completedResponse = await fetch("http://localhost:5000/getcompletedclassworks");
                const completedData = await completedResponse.json();
                setCompletedClassWorks(completedData);

                const allWorksResponse = await fetch("http://localhost:5000/getallclassworks");
                const allWorksData = await allWorksResponse.json();
                setClassWorks(allWorksData);

                const utilizationResponse = await fetch("http://localhost:5000/utilizationStatistics");
                const utilizationData = await utilizationResponse.json();
                setUtilizationData(utilizationData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const completedOptions = { labels: completedClassWorks ? Object.keys(completedClassWorks) : [] };
    const completedSeries = completedClassWorks ? Object.values(completedClassWorks) : [];

    const allWorksOptions = { labels: classWorks ? Object.keys(classWorks) : [] };
    const allWorksSeries = classWorks ? Object.values(classWorks) : [];

    const utilizationLabels = utilizationData && utilizationData.map(item => item.resourceType);
    const utilizationCounts = utilizationData && utilizationData.map(item => item.count);

    const utilizationOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: utilizationLabels,
        },
    };

    const utilizationSeries = [
        {
            name: "Resource Counts",
            data: utilizationCounts,
        },
    ];

    return (
        <div className="background-image_none">
        <div className="page-container">
        <div className="stats_container">
            <div className="stat">
                <h2>All Works by Priority Level</h2>
                {classWorks && (
                    <ApexCharts options={allWorksOptions} series={allWorksSeries} type="pie" width={500} />
                )}
            </div>
            <div className="stat">
                <h2>Completed Works by Priority Level</h2>
                {completedClassWorks && (
                    <ApexCharts options={completedOptions} series={completedSeries} type="pie" width={500} />
                )}
            </div>
            <div className="stat">
                <h2>Resources Taken </h2>
                {utilizationData && (
                    <ApexCharts options={utilizationOptions} series={utilizationSeries} type="bar" width={1000} />
                )}
            </div>
        </div>
        </div>
        </div>
    );
};

export default Stats;
