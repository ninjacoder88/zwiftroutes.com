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