(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener("resize", () => {
    engine.resize();
});
exports.default = engine;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
var scene = new BABYLON.Scene(engine_1.default);
scene.enablePhysics();
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
scene.collisionsEnabled = true;
scene.enablePhysics();
exports.default = scene;
},{"./engine":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("./utils/stats");
const engine_1 = require("./engine/engine");
const scene_1 = require("./engine/scene");
const player_1 = require("./player");
console.log(player_1.default);
var sun = new BABYLON.DirectionalLight("Directional", new BABYLON.Vector3(2, -5, 0), scene_1.default);
sun.intensity = 0.9;
sun.diffuse = new BABYLON.Color3(1, 1, 0.9);
var floor = BABYLON.Mesh.CreateBox("Floor", 50, scene_1.default);
floor.position.y = 0;
floor.scaling.y = 0.1;
floor.checkCollisions = true;
floor.receiveShadows = true;
var ball = BABYLON.Mesh.CreateSphere("Ball", 20, 8, scene_1.default);
ball.position.x = -5;
ball.position.y = 10;
var box = BABYLON.Mesh.CreateBox("Cube", 2, scene_1.default);
box.position.x = 5;
box.position.y = 4;
box.position.z = -5;
box.checkCollisions = true;
var shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
shadowGenerator.getShadowMap().renderList.push(ball);
shadowGenerator.getShadowMap().renderList.push(box);
var prevTime,
    currentTime,
    deltaTime = 0;
prevTime = currentTime = Date.now();
engine_1.default.runRenderLoop(function () {
    stats_1.default.begin();
    currentTime = Date.now();
    deltaTime = (currentTime - prevTime) / 1000;
    prevTime = currentTime;
    scene_1.default.render();
    stats_1.default.end();
});
},{"./engine/engine":1,"./engine/scene":2,"./player":4,"./utils/stats":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const scene_1 = require("./engine/scene");
var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -15), scene_1.default);
camera.setTarget(new BABYLON.Vector3(0, 0, 0));
camera.checkCollisions = true;
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
camera.applyGravity = true;
scene_1.default.activeCamera.attachControl(canvas);
exports.default = {
    camera: camera
};
},{"./engine/scene":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stats = require("stats.js");
var stats = new Stats();
stats.setMode(0);
exports.default = {
    begin: stats.begin,
    end: stats.end
};
},{"stats.js":6}],6:[function(require,module,exports){
/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var now = ( self.performance && self.performance.now ) ? self.performance.now.bind( performance ) : Date.now;

	var startTime = now(), prevTime = startTime;
	var frames = 0, mode = 0;

	function createElement( tag, id, css ) {

		var element = document.createElement( tag );
		element.id = id;
		element.style.cssText = css;
		return element;

	}

	function createPanel( id, fg, bg ) {

		var div = createElement( 'div', id, 'padding:0 0 3px 3px;text-align:left;background:' + bg );

		var text = createElement( 'div', id + 'Text', 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + fg );
		text.innerHTML = id.toUpperCase();
		div.appendChild( text );

		var graph = createElement( 'div', id + 'Graph', 'width:74px;height:30px;background:' + fg );
		div.appendChild( graph );

		for ( var i = 0; i < 74; i ++ ) {

			graph.appendChild( createElement( 'span', '', 'width:1px;height:30px;float:left;opacity:0.9;background:' + bg ) );

		}

		return div;

	}

	function setMode( value ) {

		var children = container.children;

		for ( var i = 0; i < children.length; i ++ ) {

			children[ i ].style.display = i === value ? 'block' : 'none';

		}

		mode = value;

	}

	function updateGraph( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = Math.min( 30, 30 - value * 30 ) + 'px';

	}

	//

	var container = createElement( 'div', 'stats', 'width:80px;opacity:0.9;cursor:pointer' );
	container.addEventListener( 'mousedown', function ( event ) {

		event.preventDefault();
		setMode( ++ mode % container.children.length );

	}, false );

	// FPS

	var fps = 0, fpsMin = Infinity, fpsMax = 0;

	var fpsDiv = createPanel( 'fps', '#0ff', '#002' );
	var fpsText = fpsDiv.children[ 0 ];
	var fpsGraph = fpsDiv.children[ 1 ];

	container.appendChild( fpsDiv );

	// MS

	var ms = 0, msMin = Infinity, msMax = 0;

	var msDiv = createPanel( 'ms', '#0f0', '#020' );
	var msText = msDiv.children[ 0 ];
	var msGraph = msDiv.children[ 1 ];

	container.appendChild( msDiv );

	// MEM

	if ( self.performance && self.performance.memory ) {

		var mem = 0, memMin = Infinity, memMax = 0;

		var memDiv = createPanel( 'mb', '#f08', '#201' );
		var memText = memDiv.children[ 0 ];
		var memGraph = memDiv.children[ 1 ];

		container.appendChild( memDiv );

	}

	//

	setMode( mode );

	return {

		REVISION: 14,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = now();

		},

		end: function () {

			var time = now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ( ms | 0 ) + ' MS (' + ( msMin | 0 ) + '-' + ( msMax | 0 ) + ')';
			updateGraph( msGraph, ms / 200 );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, fps / 100 );

				prevTime = time;
				frames = 0;

				if ( mem !== undefined ) {

					var heapSize = performance.memory.usedJSHeapSize;
					var heapSizeLimit = performance.memory.jsHeapSizeLimit;

					mem = Math.round( heapSize * 0.000000954 );
					memMin = Math.min( memMin, mem );
					memMax = Math.max( memMax, mem );

					memText.textContent = mem + ' MB (' + memMin + '-' + memMax + ')';
					updateGraph( memGraph, heapSize / heapSizeLimit );

				}

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	};

};

if ( typeof module === 'object' ) {

	module.exports = Stats;

}

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlbmdpbmUvZW5naW5lLmpzIiwiZW5naW5lL3NjZW5lLmpzIiwibWFpbi5qcyIsInBsYXllci5qcyIsInV0aWxzL3N0YXRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3N0YXRzLmpzL3NyYy9TdGF0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbnZhciBlbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUoY2FudmFzLCB0cnVlKTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGVuZ2luZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZW5naW5lXzEgPSByZXF1aXJlKFwiLi9lbmdpbmVcIik7XG52YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZShlbmdpbmVfMS5kZWZhdWx0KTtcbnNjZW5lLmVuYWJsZVBoeXNpY3MoKTtcbnNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC05LjgxLCAwKTtcbnNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcbnNjZW5lLmVuYWJsZVBoeXNpY3MoKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNjZW5lOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBzdGF0c18xID0gcmVxdWlyZShcIi4vdXRpbHMvc3RhdHNcIik7XG5jb25zdCBlbmdpbmVfMSA9IHJlcXVpcmUoXCIuL2VuZ2luZS9lbmdpbmVcIik7XG5jb25zdCBzY2VuZV8xID0gcmVxdWlyZShcIi4vZW5naW5lL3NjZW5lXCIpO1xuY29uc3QgcGxheWVyXzEgPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5jb25zb2xlLmxvZyhwbGF5ZXJfMS5kZWZhdWx0KTtcbnZhciBzdW4gPSBuZXcgQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwiRGlyZWN0aW9uYWxcIiwgbmV3IEJBQllMT04uVmVjdG9yMygyLCAtNSwgMCksIHNjZW5lXzEuZGVmYXVsdCk7XG5zdW4uaW50ZW5zaXR5ID0gMC45O1xuc3VuLmRpZmZ1c2UgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMSwgMSwgMC45KTtcbnZhciBmbG9vciA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJGbG9vclwiLCA1MCwgc2NlbmVfMS5kZWZhdWx0KTtcbmZsb29yLnBvc2l0aW9uLnkgPSAwO1xuZmxvb3Iuc2NhbGluZy55ID0gMC4xO1xuZmxvb3IuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcbmZsb29yLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcbnZhciBiYWxsID0gQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZShcIkJhbGxcIiwgMjAsIDgsIHNjZW5lXzEuZGVmYXVsdCk7XG5iYWxsLnBvc2l0aW9uLnggPSAtNTtcbmJhbGwucG9zaXRpb24ueSA9IDEwO1xudmFyIGJveCA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goXCJDdWJlXCIsIDIsIHNjZW5lXzEuZGVmYXVsdCk7XG5ib3gucG9zaXRpb24ueCA9IDU7XG5ib3gucG9zaXRpb24ueSA9IDQ7XG5ib3gucG9zaXRpb24ueiA9IC01O1xuYm94LmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XG52YXIgc2hhZG93R2VuZXJhdG9yID0gbmV3IEJBQllMT04uU2hhZG93R2VuZXJhdG9yKDIwNDgsIHN1bik7XG5zaGFkb3dHZW5lcmF0b3IuZ2V0U2hhZG93TWFwKCkucmVuZGVyTGlzdC5wdXNoKGJhbGwpO1xuc2hhZG93R2VuZXJhdG9yLmdldFNoYWRvd01hcCgpLnJlbmRlckxpc3QucHVzaChib3gpO1xudmFyIHByZXZUaW1lLFxuICAgIGN1cnJlbnRUaW1lLFxuICAgIGRlbHRhVGltZSA9IDA7XG5wcmV2VGltZSA9IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbmVuZ2luZV8xLmRlZmF1bHQucnVuUmVuZGVyTG9vcChmdW5jdGlvbiAoKSB7XG4gICAgc3RhdHNfMS5kZWZhdWx0LmJlZ2luKCk7XG4gICAgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGRlbHRhVGltZSA9IChjdXJyZW50VGltZSAtIHByZXZUaW1lKSAvIDEwMDA7XG4gICAgcHJldlRpbWUgPSBjdXJyZW50VGltZTtcbiAgICBzY2VuZV8xLmRlZmF1bHQucmVuZGVyKCk7XG4gICAgc3RhdHNfMS5kZWZhdWx0LmVuZCgpO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNjZW5lXzEgPSByZXF1aXJlKFwiLi9lbmdpbmUvc2NlbmVcIik7XG52YXIgY2FtZXJhID0gbmV3IEJBQllMT04uRnJlZUNhbWVyYShcIkZyZWVDYW1lcmFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygwLCA1LCAtMTUpLCBzY2VuZV8xLmRlZmF1bHQpO1xuY2FtZXJhLnNldFRhcmdldChuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsIDApKTtcbmNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xuY2FtZXJhLmVsbGlwc29pZCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMSk7XG5jYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcbnNjZW5lXzEuZGVmYXVsdC5hY3RpdmVDYW1lcmEuYXR0YWNoQ29udHJvbChjYW52YXMpO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIGNhbWVyYTogY2FtZXJhXG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBTdGF0cyA9IHJlcXVpcmUoXCJzdGF0cy5qc1wiKTtcbnZhciBzdGF0cyA9IG5ldyBTdGF0cygpO1xuc3RhdHMuc2V0TW9kZSgwKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBiZWdpbjogc3RhdHMuYmVnaW4sXG4gICAgZW5kOiBzdGF0cy5lbmRcbn07IiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cbnZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgbm93ID0gKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICkgPyBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKCBwZXJmb3JtYW5jZSApIDogRGF0ZS5ub3c7XG5cblx0dmFyIHN0YXJ0VGltZSA9IG5vdygpLCBwcmV2VGltZSA9IHN0YXJ0VGltZTtcblx0dmFyIGZyYW1lcyA9IDAsIG1vZGUgPSAwO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoIHRhZywgaWQsIGNzcyApIHtcblxuXHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggdGFnICk7XG5cdFx0ZWxlbWVudC5pZCA9IGlkO1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzcztcblx0XHRyZXR1cm4gZWxlbWVudDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUGFuZWwoIGlkLCBmZywgYmcgKSB7XG5cblx0XHR2YXIgZGl2ID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkLCAncGFkZGluZzowIDAgM3B4IDNweDt0ZXh0LWFsaWduOmxlZnQ7YmFja2dyb3VuZDonICsgYmcgKTtcblxuXHRcdHZhciB0ZXh0ID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkICsgJ1RleHQnLCAnZm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjlweDtmb250LXdlaWdodDpib2xkO2xpbmUtaGVpZ2h0OjE1cHg7Y29sb3I6JyArIGZnICk7XG5cdFx0dGV4dC5pbm5lckhUTUwgPSBpZC50b1VwcGVyQ2FzZSgpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZCggdGV4dCApO1xuXG5cdFx0dmFyIGdyYXBoID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkICsgJ0dyYXBoJywgJ3dpZHRoOjc0cHg7aGVpZ2h0OjMwcHg7YmFja2dyb3VuZDonICsgZmcgKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoIGdyYXBoICk7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCA3NDsgaSArKyApIHtcblxuXHRcdFx0Z3JhcGguYXBwZW5kQ2hpbGQoIGNyZWF0ZUVsZW1lbnQoICdzcGFuJywgJycsICd3aWR0aDoxcHg7aGVpZ2h0OjMwcHg7ZmxvYXQ6bGVmdDtvcGFjaXR5OjAuOTtiYWNrZ3JvdW5kOicgKyBiZyApICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gZGl2O1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzZXRNb2RlKCB2YWx1ZSApIHtcblxuXHRcdHZhciBjaGlsZHJlbiA9IGNvbnRhaW5lci5jaGlsZHJlbjtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y2hpbGRyZW5bIGkgXS5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gdmFsdWUgPyAnYmxvY2snIDogJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0bW9kZSA9IHZhbHVlO1xuXG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGVHcmFwaCggZG9tLCB2YWx1ZSApIHtcblxuXHRcdHZhciBjaGlsZCA9IGRvbS5hcHBlbmRDaGlsZCggZG9tLmZpcnN0Q2hpbGQgKTtcblx0XHRjaGlsZC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1pbiggMzAsIDMwIC0gdmFsdWUgKiAzMCApICsgJ3B4JztcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudCggJ2RpdicsICdzdGF0cycsICd3aWR0aDo4MHB4O29wYWNpdHk6MC45O2N1cnNvcjpwb2ludGVyJyApO1xuXHRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNldE1vZGUoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvLyBGUFNcblxuXHR2YXIgZnBzID0gMCwgZnBzTWluID0gSW5maW5pdHksIGZwc01heCA9IDA7XG5cblx0dmFyIGZwc0RpdiA9IGNyZWF0ZVBhbmVsKCAnZnBzJywgJyMwZmYnLCAnIzAwMicgKTtcblx0dmFyIGZwc1RleHQgPSBmcHNEaXYuY2hpbGRyZW5bIDAgXTtcblx0dmFyIGZwc0dyYXBoID0gZnBzRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBmcHNEaXYgKTtcblxuXHQvLyBNU1xuXG5cdHZhciBtcyA9IDAsIG1zTWluID0gSW5maW5pdHksIG1zTWF4ID0gMDtcblxuXHR2YXIgbXNEaXYgPSBjcmVhdGVQYW5lbCggJ21zJywgJyMwZjAnLCAnIzAyMCcgKTtcblx0dmFyIG1zVGV4dCA9IG1zRGl2LmNoaWxkcmVuWyAwIF07XG5cdHZhciBtc0dyYXBoID0gbXNEaXYuY2hpbGRyZW5bIDEgXTtcblxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIG1zRGl2ICk7XG5cblx0Ly8gTUVNXG5cblx0aWYgKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2UubWVtb3J5ICkge1xuXG5cdFx0dmFyIG1lbSA9IDAsIG1lbU1pbiA9IEluZmluaXR5LCBtZW1NYXggPSAwO1xuXG5cdFx0dmFyIG1lbURpdiA9IGNyZWF0ZVBhbmVsKCAnbWInLCAnI2YwOCcsICcjMjAxJyApO1xuXHRcdHZhciBtZW1UZXh0ID0gbWVtRGl2LmNoaWxkcmVuWyAwIF07XG5cdFx0dmFyIG1lbUdyYXBoID0gbWVtRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIG1lbURpdiApO1xuXG5cdH1cblxuXHQvL1xuXG5cdHNldE1vZGUoIG1vZGUgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0UkVWSVNJT046IDE0LFxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXG5cdFx0c2V0TW9kZTogc2V0TW9kZSxcblxuXHRcdGJlZ2luOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHN0YXJ0VGltZSA9IG5vdygpO1xuXG5cdFx0fSxcblxuXHRcdGVuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgdGltZSA9IG5vdygpO1xuXG5cdFx0XHRtcyA9IHRpbWUgLSBzdGFydFRpbWU7XG5cdFx0XHRtc01pbiA9IE1hdGgubWluKCBtc01pbiwgbXMgKTtcblx0XHRcdG1zTWF4ID0gTWF0aC5tYXgoIG1zTWF4LCBtcyApO1xuXG5cdFx0XHRtc1RleHQudGV4dENvbnRlbnQgPSAoIG1zIHwgMCApICsgJyBNUyAoJyArICggbXNNaW4gfCAwICkgKyAnLScgKyAoIG1zTWF4IHwgMCApICsgJyknO1xuXHRcdFx0dXBkYXRlR3JhcGgoIG1zR3JhcGgsIG1zIC8gMjAwICk7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0aWYgKCB0aW1lID4gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwcyA9IE1hdGgucm91bmQoICggZnJhbWVzICogMTAwMCApIC8gKCB0aW1lIC0gcHJldlRpbWUgKSApO1xuXHRcdFx0XHRmcHNNaW4gPSBNYXRoLm1pbiggZnBzTWluLCBmcHMgKTtcblx0XHRcdFx0ZnBzTWF4ID0gTWF0aC5tYXgoIGZwc01heCwgZnBzICk7XG5cblx0XHRcdFx0ZnBzVGV4dC50ZXh0Q29udGVudCA9IGZwcyArICcgRlBTICgnICsgZnBzTWluICsgJy0nICsgZnBzTWF4ICsgJyknO1xuXHRcdFx0XHR1cGRhdGVHcmFwaCggZnBzR3JhcGgsIGZwcyAvIDEwMCApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0XHRpZiAoIG1lbSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0dmFyIGhlYXBTaXplID0gcGVyZm9ybWFuY2UubWVtb3J5LnVzZWRKU0hlYXBTaXplO1xuXHRcdFx0XHRcdHZhciBoZWFwU2l6ZUxpbWl0ID0gcGVyZm9ybWFuY2UubWVtb3J5LmpzSGVhcFNpemVMaW1pdDtcblxuXHRcdFx0XHRcdG1lbSA9IE1hdGgucm91bmQoIGhlYXBTaXplICogMC4wMDAwMDA5NTQgKTtcblx0XHRcdFx0XHRtZW1NaW4gPSBNYXRoLm1pbiggbWVtTWluLCBtZW0gKTtcblx0XHRcdFx0XHRtZW1NYXggPSBNYXRoLm1heCggbWVtTWF4LCBtZW0gKTtcblxuXHRcdFx0XHRcdG1lbVRleHQudGV4dENvbnRlbnQgPSBtZW0gKyAnIE1CICgnICsgbWVtTWluICsgJy0nICsgbWVtTWF4ICsgJyknO1xuXHRcdFx0XHRcdHVwZGF0ZUdyYXBoKCBtZW1HcmFwaCwgaGVhcFNpemUgLyBoZWFwU2l6ZUxpbWl0ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aW1lO1xuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzdGFydFRpbWUgPSB0aGlzLmVuZCgpO1xuXG5cdFx0fVxuXG5cdH07XG5cbn07XG5cbmlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBTdGF0cztcblxufVxuIl19
