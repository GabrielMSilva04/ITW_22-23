// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Games/');
    self.displayName = 'Olympic Games edition Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.CountryName = ko.observable('');
    self.City = ko.observable('');
    self.Logo = ko.observable('');
    self.Name = ko.observable('');
    self.Photo = ko.observable('');
    self.Season = ko.observable('');
    self.Year = ko.observable('');
    self.Url = ko.observable('');
    self.Lat = ko.observable('');
    self.Lon = ko.observable('');
    
    
    self.Mapsrc = ko.computed(function() {
        return "https://www.openstreetmap.org/export/embed.html?bbox="+parseFloat(self.Lon()-0.004)+"%2C"+parseFloat(self.Lat()-0.001)+"%2C"+parseFloat(self.Lon()+0.004)+"%2C"+parseFloat(self.Lat()+0.005)+"&layer=mapnik&marker="+parseFloat(self.Lat())+"%2C"+parseFloat(self.Lon())
    }, this);

    
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getGame...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();

            //MAPA
            if(id<21){
            $.get("http://192.168.160.58/olympics/api/games?pagesize=51&page=1" , (data) => {self.Lat(data["Records"][parseFloat(id)-1]["Lat"])});
            $.get("http://192.168.160.58/olympics/api/games?pagesize=51&page=1" , (data) => {self.Lon(data["Records"][parseFloat(id)-1]["Lon"])});
            }
            else{
                $.get("http://192.168.160.58/olympics/api/games?pagesize=51&page=1" , (data) => {self.Lat(data["Records"][parseFloat(id)-2]["Lat"])});
                $.get("http://192.168.160.58/olympics/api/games?pagesize=51&page=1" , (data) => {self.Lon(data["Records"][parseFloat(id)-2]["Lon"])});
            }
            //

            self.Id(data.Id);
            self.CountryName(data.CountryName);
            self.City(data.City);
            self.Logo(data.Logo);
            self.Name(data.Name);
            self.Photo(data.Photo);
            self.Season(data.Season);
            self.Year(data.Year);
            
            
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