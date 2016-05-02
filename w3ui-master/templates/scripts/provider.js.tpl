'use strict';

angular.module('w3uiFrontendApp')
    .provider('<%= name %>', function() {
        // In the provider function, you cannot inject any
        // service or factory. This can only be done at the
        // "$get" method.

        this.name = 'Default';

        this.$get = function() {
            var self = this;
            return {
                sayHello: function() {
                    return "Hello, " + self.name + "!"
                }
            }
        };

        this.setName = function(name) {
            this.name = name;
        };
    });