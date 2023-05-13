"use strict";

// The following script animates the ring image at the top of the page.
// It depends on nanop5.js
var f0= function(p){
  var maxR=250, b=0, sectorMap=[], i,j;

  p.setup=()=> {
    let cnv = p.createCanvas(1400, 420);
    cnv.onmouseover = p.loop;
    p.noStroke();
    p.fill(77);
    for(j=0; j<16; j++){
      sectorMap[j]=[];
      for(i=0; i<24; i++){ // light-gray,dark-gray,black or deep reds
        var c,r0=p.random(),r1=Math.floor(p.random(3))*63,r2=p.random();
        c = (r0<0.9)?[r1,r1,r1]:[1,r2*180,r2*180]; // palette generation
        sectorMap[j].push(c);
      }
    }
  }

  p.draw=()=> {
    p.background(0);
    p.translate(p.width*0.618,p.height*0.45);
    for(j=0; j<16; j++) // number of rings
      if(j!=3 && j!=10) //rings to skip
      for(i=0; i<24; i++) // number of sectors (max 24)
        if(sectorMap[j][i][0]!=0) { // only draw if non-zero
          p.fill(sectorMap[j][i][0],sectorMap[j][i][1],sectorMap[j][i][2]);
          let theta=p.radians(i*15);
          let r = (j+10)*16;
          annulus(r,r+14, theta+b, 0.041*p.TAU, 6);
        }
    if(p.frameCount%500==0)p.noLoop();
    b+=0.001;
  }


  // jWilliamDunn 2023.0113 2D optimizations
  var mul=4, q=7, angl=1.0472; //60 deg
  function annulus(inner, outer, start, angle, segs) {
    var i,y1,a,x,y,z=0,pz,ca,sa; p.beginShape();
    for(i=0; i<=segs; i++) { //outer path
      a=start+angle*i/segs, ca=p.cos(a), sa=p.sin(a);
      x = ca - sa; // rotate around z-axis
      y1 = ca + sa;   //x=cos(a)  y=sin(a)
      y = y1*p.cos(angl); // rotate around x-axis
      z = y1*p.sin(angl);
      pz = q - z;
      p.vertex(mul*outer*x/pz,mul*outer*y/pz);
    }
    for(i=segs; i>=0; i--) { // inner path
      a=start+angle*i/segs, ca=p.cos(a), sa=p.sin(a);
      x = ca - sa; y1 = ca + sa;
      y = y1*p.cos(angl); z = y1*p.sin(angl);
      pz = q - z;
      p.vertex(mul*inner*x/pz,mul*inner*y/pz);
    }
    p.endShape(p.CLOSE);
  }
}
  new p5(f0, "_0_");