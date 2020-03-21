function getDataByProvince(data, province) {
    return data.filter(
        function(data){ return data.province === province }
    )[0].timeline;
}

document.addEventListener("DOMContentLoaded", function() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
            let content = getDataByProvince(JSON.parse(httpRequest.response), 'France');
            drawChart(content);
        }
    };
    httpRequest.open("GET", 'https://corona.lmao.ninja/historical');
    httpRequest.send();

    google.charts.load('current', {'packages':['line']});

    function drawChart(content) {

        let data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Cas confirmés');
        data.addColumn('number', 'Rétablis');
        data.addColumn('number', 'Morts');

        let length = Object.keys(content.cases).length;
        for (let index = 0; index < length; index++) {
            let keyCases = Object.keys(content.cases)[index];
            let keyDeaths = Object.keys(content.deaths)[index];
            let keyRecovered = Object.keys(content.recovered)[index];
            data.addRow(
                [new Date(keyCases), parseInt(content.cases[keyCases]), parseInt(content.recovered[keyRecovered]), parseInt(content.deaths[keyDeaths])]
            );
        }

        var options = {
            chart: {
                title: 'Progression du COVID-19 en France',
                subtitle: 'Source : corona.lmao.ninja'
            },
            width: 900,
            height: 500
        };

        var chart = new google.charts.Line(document.getElementById('chart'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }

});
