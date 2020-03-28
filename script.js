let httpRequest = new XMLHttpRequest();
document.addEventListener("DOMContentLoaded", function() {
    let tbody = document.getElementsByTagName('tbody')[0];
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
            let content = JSON.parse(httpRequest.response).timeline;
            let length = Object.keys(content.cases).length;

            for (let index = 0; index < length; index++) {
                let keyCases = Object.keys(content.cases)[index];
                let keyDeaths = Object.keys(content.deaths)[index];
                let html = '<tr>' +
                    '<td>' + keyCases + '</td>' +
                    '<td>' + content.cases[keyCases] + '</td>' +
                    '<td>' + content.deaths[keyDeaths] + '</td>' +
                    '</tr>';
                tbody.innerHTML = html + tbody.innerHTML;
            }
        }
    };
    httpRequest.open("GET", 'https://corona.lmao.ninja/v2/historical/france');
    httpRequest.send();
});
