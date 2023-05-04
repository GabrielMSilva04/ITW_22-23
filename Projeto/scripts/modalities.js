// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Olympics/api/Modalities');
    self.displayName = 'Olympic Modalities List';

    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.allRecords = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };
    self.addFavorite = function (data, event) {
        if (!data) return;
        let favoriteModalities = JSON.parse(window.localStorage.getItem('favoriteModalities') ?? '[]');

        if (!favoriteModalities.includes(data.Id)) favoriteModalities.push(data.Id);
        else favoriteModalities.splice(favoriteModalities.indexOf(data.Id), 1);

        let icon = event.target.closest('.card-body').querySelector('i');
        icon.classList.toggle('fa-heart-o');
        icon.classList.toggle('fa-heart');

        window.localStorage.setItem('favoriteModalities', JSON.stringify(favoriteModalities));
    }
    self.favoritesFilter = false;
    self.filterFavorites = function (data, event) {
        let icon = event.target.querySelector('i');
        icon.classList.toggle('fa-heart-o');
        icon.classList.toggle('fa-heart');
        if (!self.favoritesFilter) {
            getDataPaginated(self.baseUri() + "?page=1&pageSize=100", r => r.favorite);
        } else {
            getDataPaginated(self.baseUri() + "?page=" + self.currentPage() + "&pageSize=20");
        }
        
        
        self.favoritesFilter = !self.favoritesFilter
    }


    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getAthletes...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        

        getDataPaginated(composedUri);
        $("#search").on('change', function (event) {
            var composedUri = self.baseUri() + "/SearchByName" + "?page=" + id + "&pageSize=" + self.pagesize() + "&q=" + event.target.value;
            getAllData(composedUri);
        });
    };
    

    function getDataPaginated (composedUri, filter = null) {
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            let favoriteModalities = JSON.parse(window.localStorage.getItem('favoriteModalities') ?? '[]')
            data.Records.forEach(record => {
                record.favorite = favoriteModalities.includes(record.Id);
            })
            if (filter) data.Records = data.Records.filter(filter)
            self.records(data.Records);
            self.allRecords(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            self.addFavorite();
        });
    }
    function getAllData (composedUri) {
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();

            let favoriteModalities = JSON.parse(window.localStorage.getItem('favoriteModalities') ?? '[]')
            data.forEach(record => {
                record.favorite = favoriteModalities.includes(record.Id);
            })
            self.records(data);
            self.currentPage(1);
            self.hasNext(false);
            self.hasPrevious(false);
            self.pagesize(data.length)
            self.totalPages(1);
            self.totalRecords(data.length);
        });
    }

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


    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
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
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})