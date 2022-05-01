jQuery(function() {
    "use strict";

    let currentRoute = undefined;

    function Route(obj){
        const self = this;
        self.routeName = obj.RouteName;
        self.world = obj.World;
        self.route = obj.Route;
        self.leadIn = obj.LeadIn;
        self.map = obj.Map;
        self.elevationProfile = obj.ElevationProfile;

        self.viewMaps = function(){
            pubsub.publish("map-selected", self);
            let mapModal = new bootstrap.Modal(document.getElementById("mapModal"));
            mapModal.show();
        };
    }
    
    function ViewModel(){
        const self = this;
        self.routes = ko.observableArray([]);
        self.currentRoute = ko.observable();

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