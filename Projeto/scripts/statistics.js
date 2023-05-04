// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Statistics/Medals_Country');
    self.baseUri2 = ko.observable('http://192.168.160.58/Olympics/api/Statistics/Games_Athletes');
    self.displayName = 'Statistics';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    
    
    
    
    

    //--- Page Events
    self.activate = function (id) {
        var composedUri = self.baseUri();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            // hideLoading();
            data = data.splice(0, 20);
            
            const dataChart = data.map(country => {
                return {
                    id: country.CountryId,
                    name: country.CountryName,
                    golds: country.Medals[0].Counter,
                    silvers: country.Medals[1].Counter,
                    bronzes: country.Medals[2].Counter,
                }
            })
            
            new Chart(
                document.getElementById('medals'),
                {
                type: 'bar',
                options: {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            labels: {
                                boxHeight: 32,
                                boxWidth: 32,
                                useBorderRadius: true,
                                borderRadius: 16
                            }
                        },
                    },
                },
                data: {
                    labels: dataChart.map(row => row.name),
                    datasets: [
                        {
                            label: 'Gold Medals',
                            data: dataChart.map(row => row.golds),
                            backgroundColor: '#D4AF37'
                        },
                        {
                            label: 'Silver Medals',
                            data: dataChart.map(row => row.silvers),
                            backgroundColor: '#BEC2CB'
                        },
                        {
                            label: 'Bronze Medals',
                            data: dataChart.map(row => row.bronzes),
                            backgroundColor: '#CD7F32'
                        }
                    ]
                }
                }
            );
            
        });
        
    };

    self.activate2 = function (id) {
        var composedUri2 = self.baseUri2();
        ajaxHelper(composedUri2, 'GET').done(function (data) {
            console.log(data);
            // hideLoading();
            //data = data.splice(0, 20);
            
            const dataChart = data.map(game => {
                return {
                    id: game.Id,
                    name: game.Name,
                    year: game.Year,
                    counter: game.Counter,
                }
            })
            
            new Chart(
                document.getElementById('athletes'),
                {
                type: 'bar',
                options: {
                    plugins: {
                        legend: {
                            display: false
                        },
                    }
                },
                data: {
                    labels: dataChart.map(row => row.name),
                    datasets: [
                        {
                            label: 'Athletes number',
                            data: dataChart.map(row => row.counter),
                        },
                        
                    ]
                }
                }
            );
            
        });
        
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                // hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    // showLoading();
    self.activate();
    self.activate2();
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});