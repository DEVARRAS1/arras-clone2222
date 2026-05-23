let mx=0;
let my=0;

onmousemove=e=>{
mx=e.clientX;
my=e.clientY;
};

function tank(){

x.save();

x.translate(
c.width/2,
c.height/2
);

let angle=Math.atan2(
my-c.height/2,
mx-c.width/2
);

x.rotate(angle);

const outline="#666";

/* BIG barrel */

x.fillStyle="#A9A9A9";
x.strokeStyle=outline;

x.lineWidth=4;

x.beginPath();

x.roundRect(
0,
-8,
52,
16,
8
);

x.fill();
x.stroke();

x.restore();

/* LV0 tiny body */

x.beginPath();

x.fillStyle="#5FA8FF";

x.lineWidth=4;

x.strokeStyle=outline;

x.arc(
c.width/2,
c.height/2,
20,
0,
Math.PI*2
);

x.fill();
x.stroke();

let mx=0;
let my=0;

onmousemove=e=>{
mx=e.clientX;
my=e.clientY;
};
}
