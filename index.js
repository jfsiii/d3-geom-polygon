(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        var d3_subclass = {}.__proto__ ? function(object, prototype) {
            object.__proto__ = prototype;
        } : function(object, prototype) {
            for (var property in prototype) object[property] = prototype[property];
        };
        d3.geom = {};
        d3.geom.polygon = function(coordinates) {
            d3_subclass(coordinates, d3_geom_polygonPrototype);
            return coordinates;
        };
        var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
        d3_geom_polygonPrototype.area = function() {
            var i = -1, n = this.length, a, b = this[n - 1], area = 0;
            while (++i < n) {
                a = b;
                b = this[i];
                area += a[1] * b[0] - a[0] * b[1];
            }
            return area * .5;
        };
        d3_geom_polygonPrototype.centroid = function(k) {
            var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
            if (!arguments.length) k = -1 / (6 * this.area());
            while (++i < n) {
                a = b;
                b = this[i];
                c = a[0] * b[1] - b[0] * a[1];
                x += (a[0] + b[0]) * c;
                y += (a[1] + b[1]) * c;
            }
            return [ x * k, y * k ];
        };
        d3_geom_polygonPrototype.clip = function(subject) {
            var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
            while (++i < n) {
                input = subject.slice();
                subject.length = 0;
                b = this[i];
                c = input[(m = input.length - closed) - 1];
                j = -1;
                while (++j < m) {
                    d = input[j];
                    if (d3_geom_polygonInside(d, a, b)) {
                        if (!d3_geom_polygonInside(c, a, b)) {
                            subject.push(d3_geom_polygonIntersect(c, d, a, b));
                        }
                        subject.push(d);
                    } else if (d3_geom_polygonInside(c, a, b)) {
                        subject.push(d3_geom_polygonIntersect(c, d, a, b));
                    }
                    c = d;
                }
                if (closed) subject.push(subject[0]);
                a = b;
            }
            return subject;
        };
        function d3_geom_polygonInside(p, a, b) {
            return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
        }
        function d3_geom_polygonIntersect(c, d, a, b) {
            var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
            return [ x1 + ua * x21, y1 + ua * y21 ];
        }
        function d3_geom_polygonClosed(coordinates) {
            var a = coordinates[0], b = coordinates[coordinates.length - 1];
            return !(a[0] - b[0] || a[1] - b[1]);
        }
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();