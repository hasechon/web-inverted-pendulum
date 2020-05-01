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
    element: document.getElementById("stage"),
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
var ground = Bodies.rectangle(400, 610, 500, 60, { isStatic: true });

var over_wall = Bodies.rectangle(400, 100, 1000, 20, { isStatic: true });
var under_wall = Bodies.rectangle(400, 700, 1000, 20, { isStatic: true });
var left_wall = Bodies.rectangle(100, 450, 20, 1000, { isStatic: true });
var right_wall = Bodies.rectangle(700, 450, 20, 1000, { isStatic: true });

// 二つの箱(四角)と地面を追加
World.add(engine.world, [mouseConstraint ,ground, over_wall, under_wall, left_wall, right_wall]);



var bottomId = bottomMass.id
var underWallId = under_wall.id
// an example of using collisionActive event on an engine
Events.on(engine, 'collisionActive', function(event) {
    var timing = event.source.timing.timestamp
    for(var i = 0;i < event.pairs.length;i++){
        if(event.pairs[i].bodyA.id == bottomId & event.pairs[i].bodyB.id == underWallId){
            console.log('reset')

        }
    }
});



// Matter.js エンジン起動
Engine.run(engine);
Render.run(render);

setInterval(()=>{
    Body.applyForce( headMass, {x: headMass.position.x, y: headMass.position.y},{x: 0.005, y: 0});
},3000);

setInterval(()=>{
    var text_angle= document.getElementById("angle");  
    var head_x = headMass.position.x,
    head_y = headMass.position.y,
        bottom_x = bottomMass.position.x,
        bottom_y = bottomMass.position.y
    
        pendulum_angle =  Math.atan2(bottom_x - head_x,bottom_y - head_y)* 180/Math.PI
        text_angle.innerHTML= pendulum_angle.toFixed(2); 
        
    // PID
    kp = 0.001

    f = -1 * kp * pendulum_angle
    Body.applyForce( bottomMass, {x: bottomMass.position.x, y: bottomMass.position.y},{x: f, y: 0});

},30);


