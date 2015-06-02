window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var main = (function () {

    var canvas, ctx;
    var projectiles = [];

    var Projectile = function () {
        this.x = 0;
        this.y = canvas.height / 2;

        this.draw = function () {
            ctx.fillStyle = '#fafafa';
            ctx.fillRect(this.x, this.y, 10, 2);
        };

        this.update = function () {
            this.x += 15;
        };
    };

    // Create a circle
    var circle = function (x, y, r, colour) {
        ctx.beginPath();
        ctx.fillStyle = colour;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    };

    var drawBarrel = function () {
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, canvas.height / 2, 150, 5);
    };

    // Draw
    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBarrel();

        for (var i = 0, l = projectiles.length; i < l; i++) {
            projectiles[i].draw();
        }
    };

    // Update logic
    var update = function () {

        for (var i = 0, l = projectiles.length; i < l; i++) {
            projectiles[i].update();
        }

        i = projectiles.length;
        while (i--) {
            var p = projectiles[i];

            if (p.y >= canvas.width) {
                projectiles.splice(i, 1);
            }
        }
    };

    // Main loop
    var loop = function _loop () {
        window.requestAnimationFrame(_loop);

        update();
        draw();
    };

    // Initialisation
    var init = function () {

        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Event handlers
        window.addEventListener('click', function () {

            // Add projectile
            // Start propellant gas animation
            projectiles.push(new Projectile());

        }, false);

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        loop();
    };

    return {
        'init': init
    }

})();

window.onload = main.init;