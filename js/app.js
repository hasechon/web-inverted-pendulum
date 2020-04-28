var Engine = Matter.Engine;
    World = Matter.World,
    Render = Matter.Render,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Matter.js エンジン作成
var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 900,
      wireframes: false
    }
  });

// massを作成
var headMass = Bodies.circle(400, 300, 20);
var bottomMass = Bodies.circle(400, 500, 20);

var constraint = Constraint.create({
    bodyA: headMass,
    bodyB: bottomMass,
    pointA: { x: 0, y: 0 },
    pointB: { x: 0, y: 0 }
});

// an example of using collisionActive event on an engine
Events.on(engine, 'collisionActive', function(event) {
    var timing = event.source.timing.timestamp
});

World.add(engine.world, [headMass, bottomMass, constraint]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            // allow bodies on mouse to rotate
            angularStiffness: 0,
            render: {
                visible: false
            }
        }
    });

// isStatic:静的(完全固定)
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// 二つの箱(四角)と地面を追加
World.add(engine.world, [mouseConstraint ,ground]);

// Matter.js エンジン起動
Engine.run(engine);
Render.run(render);

setInterval(()=>{
    Body.applyForce( headMass, {x: headMass.position.x, y: headMass.position.y},{x: 0.005, y: 0});
},3000);