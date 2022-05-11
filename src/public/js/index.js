jQuery(function() {
    "use strict";

    function Route(obj){
        const self = this;
        self.routeName = obj.routeName;
        self.world = obj.world;
        self.route = obj.route;
        self.leadIn = obj.leadIn;
        self.total = obj.routePlusLeadIn;
        self.map = obj.map;
        self.elevationProfile = obj.elevationProfile;
        self.isMetric = ko.observable(false);

        self.viewMaps = function(){
            pubsub.publish("map-selected", self);
            let mapModal = new bootstrap.Modal(document.getElementById("mapModal"));
            mapModal.show();
        };

        pubsub.subscribe("system-selected", (message) => {
            self.isMetric(message === 2);
        });
    }
    
    function ViewModel(){
        const self = this;
        self.routes = ko.observableArray([]);
        self.currentRoute = ko.observable();
        self.measurementSystems = [{id: 1, systemName: "Imperial"}, {id: 2, systemName: "Metric"}];
        self.selectedSystem = ko.observable(self.measurementSystems[0]);
        self.isMetric = ko.computed(function(){
            pubsub.publish("system-selected", self.selectedSystem().id);
            return self.selectedSystem().id === 2;
        });

        self.dataFields = [
            {id: 1, fieldName: "route-distance", fieldOptions: [{id: 1, optionName: 'high-to-low'}, {id: 2, optionName: 'low-to-high'}]},
            {id: 2, fieldName: "route-elevation", fieldOptions: [{id: 1, optionName: 'high-to-low'}, {id: 2, optionName: 'low-to-high'}]},
            {id: 3, fieldName: "route-dist-per-elev", fieldOptions: [{id: 1, optionName: 'high-to-low'}, {id: 2, optionName: 'low-to-high'}]},
            {id: 4, fieldName: "world", fieldOptions: [{id: 1, optionName: 'a-to-z'}, {id: 2, optionName: 'z-to-a'}]},
            {id: 5, fieldName: "route-name", fieldOptions: [{id: 1, optionName: 'a-to-z'}, {id: 2, optionName: 'z-to-a'}]}
        ];

        self.firstSortField = ko.observable();
        self.firstSortOptions = ko.computed(function(){
            if(self.firstSortField() === undefined){
                return [];
            }
            return self.firstSortField().fieldOptions;
        });
        self.firstSortOption = ko.observable();

        self.sortAndFilter = function(){
            console.log(self.firstSortField());
            console.log(self.firstSortOption());

            const sortParameters =[
                {fieldName: self.firstSortField().fieldName, sortOption: self.firstSortOption().optionName}
            ];

            const sortedRoutes = sorter.sort(self.routes(), sortParameters);
            self.routes(sortedRoutes);
        };

        pubsub.subscribe("map-selected", (message) => {
            self.currentRoute(message);
        });

        function loadRoutes(){
            $.ajax({
                method: "GET",
                url: "/routes"
            }).done(function(routes){
                const array = [];
                routes.forEach(route => {
                    array.push(new Route(route));
                });
                self.routes(array);
            }).fail(function(jqHXR, textStatus, errorThrown){
                console.error({jqHXR:jqHXR, textStatus:textStatus, errorThrown:errorThrown});
            });
        }

        loadRoutes();
    }

    ko.applyBindings(new ViewModel(), document.getElementById("application"));
});