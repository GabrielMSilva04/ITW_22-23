// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    //self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Athletes/');
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Athletes/FullDetails?id=');
    self.displayName = 'Olympic Athlete Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Name = ko.observable('');
    self.Sex = ko.observable('');
    self.Height = ko.observable('');
    self.Weight = ko.observable('');
    self.BornDate = ko.observable('');
    self.BornPlace = ko.observable('');
    self.DiedDate = ko.observable('');
    self.DiedPlace = ko.observable('');
    self.Photo = ko.observable('');
    self.OlympediaLink = ko.observable('');

    self.Games = ko.observableArray('');
    self.Modalities = ko.observableArray('');
    self.Competitions = ko.observableArray('');
    self.Medals = ko.observableArray('');
    
    
    

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getAthlete...');
        var composedUri = self.baseUri() + id;
        var composedUri2 = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Name(data.Name);
            self.Sex(data.Sex);
            if (data.Height != "NA"){
            self.Height(data.Height + " cm");
            }
            if (data.Weight != "NA"){
            self.Weight(data.Weight + " kg");
            }
            self.BornDate(data.BornDate);
            self.BornPlace(data.BornPlace);
            self.DiedDate(data.DiedDate);
            self.DiedPlace(data.DiedPlace);
            self.Photo(data.Photo);
            self.OlympediaLink(data.OlympediaLink);

            self.Games(data.Games);
            self.Modalities(data.Modalities);
            self.Competitions(data.Competitions);
            self.Medals(data.Medals);
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
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
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
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})