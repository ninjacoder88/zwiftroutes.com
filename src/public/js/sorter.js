const sorter = (function(){
    return {
        sort: function(routes, sortParameters){
            const sortParameter = sortParameters[0];

            if(sortParameter.fieldName === "route-distance"){
                routes.sort((a, b) => {
                    if(a.route.distance.miles < b.route.distance.miles){
                        return sortParameter.sortOption === "low-to-high" ? -1 : 1;
                    }
                    if(a.route.distance.miles > b.route.distance.miles){
                        return sortParameter.sortOption === "low-to-high" ? 1 : -1;
                    }
                    return 0;
                });
                return routes;
            }

            if(sortParameter.fieldName === "route-elevation"){
                routes.sort((a, b) => {
                    if(a.route.elevation.feet < b.route.elevation.feet){
                        return sortParameter.sortOption === "low-to-high" ? -1 : 1;
                    }
                    if(a.route.elevation.feet > b.route.elevation.feet){
                        return sortParameter.sortOption === "low-to-high" ? 1 : -1;
                    }
                    return 0;
                });
                return routes;
            }

            if(sortParameter.fieldName === "route-dist-per-elev"){
                routes.sort((a, b) => {
                    if(a.route.distPerElev.feetPerMile < b.route.distPerElev.feetPerMile){
                        return sortParameter.sortOption === "low-to-high" ? -1 : 1;
                    }
                    if(a.route.distPerElev.feetPerMile > b.route.distPerElev.feetPerMile){
                        return sortParameter.sortOption === "low-to-high" ? 1 : -1;
                    }
                    return 0;
                });
                return routes;
            }

            if(sortParameter.fieldName === "world"){
                routes.sort((a, b) => {
                    if(a.world < b.world){
                        return sortParameter.sortOption === "a-to-z" ? -1 : 1;
                    }
                    if(a.world > b.world){
                        return sortParameter.sortOption === "a-to-z" ? 1 : -1;
                    }
                    return 0;
                });
                return routes;
            }

            if(sortParameter.fieldName === "route-name"){
                routes.sort((a, b) => {
                    if(a.routeName < b.routeName){
                        return sortParameter.sortOption === "a-to-z" ? -1 : 1;
                    }
                    if(a.routeName > b.routeName){
                        return sortParameter.sortOption === "a-to-z" ? 1 : -1;
                    }
                    return 0;
                });
                return routes;
            }
        }
    }
})();