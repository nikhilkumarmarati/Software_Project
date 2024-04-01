import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const Stats = () => {
    const [completedclassWorks, setCompletedClassWorks] = useState(null);
    const [classWorks, setClassWorks] = useState(null);
    const [utilizationData, setUtilizationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/getcompletedclassworks");
                const completeddata = await response.json();
                setCompletedClassWorks(completeddata);
                const resp = await fetch("http://localhost:5000/getallclassworks");
                const data = await resp.json();
                setClassWorks(data);
                const utilization = await fetch("http://localhost:5000/utilizationStatistics");
                const utilizationData = await utilization.json();
                setUtilizationData(utilizationData);
                console.log(utilizationData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const compoptions = {labels: completedclassWorks ? Object.keys(completedclassWorks) : []};
    const compseries = completedclassWorks ? Object.values(completedclassWorks) : [];

    const options = {labels: classWorks ? Object.keys(classWorks) : []};
    const series = classWorks ? Object.values(classWorks) : [];

    const labels = utilizationData&&utilizationData.map((item) => item.resourceType);
  const counts = utilizationData&&utilizationData.map((item) => item.count);

  const options1 = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: labels,
    },
  };
  const counts1 = [
    {
      name: 'Resource Counts',
      data: counts,
    },
  ];

    return (
        <div>
            <h2>All Works by Priority Level</h2>
            {classWorks && (
                <ApexCharts options={options} series={series} type="pie" width={500} />
            )}
            <h2>Completed Works by Priority Level</h2>
            {completedclassWorks && (
                <ApexCharts options={compoptions} series={compseries} type="pie" width={500} />
            )}
      <h2>Resource Counts Bar Graph</h2>
            {utilizationData && (
                <ApexCharts options={options1} series={counts1} type="bar" width={500} />
            )}
        </div>
    );
};

export default Stats;

