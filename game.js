const c=document.getElementById("game");
const x=c.getContext("2d");

function r(){
c.width=innerWidth;
c.height=innerHeight;
}
r();
onresize=r;

let px=0,py=0;
let k={};

onkeydown=e=>k[e.key]=1;
onkeyup=e=>k[e.key]=0;

function loop(){

if(k.w)py-=4;
if(k.s)py+=4;
if(k.a)px-=4;
if(k.d)px+=4;

x.clearRect(0,0,c.width,c.height);

for(let gx=-2000;gx<2000;gx+=50){

x.beginPath();

x.moveTo(
gx-px+c.width/2,
0
);

x.lineTo(
gx-px+c.width/2,
c.height
);

x.stroke();

}

for(let gy=-2000;gy<2000;gy+=50){

x.beginPath();

x.moveTo(
0,
gy-py+c.height/2
);

x.lineTo(
c.width,
gy-py+c.height/2
);

x.stroke();

}

x.save();

x.translate(
c.width/2,
c.height/2
);

x.fillStyle="skyblue";

x.beginPath();

x.arc(0,0,30,0,7);

x.fill();

x.fillRect(0,-8,45,16);

x.restore();

requestAnimationFrame(loop);

}

loop();
