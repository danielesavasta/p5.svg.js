function preloadSVG(url) {
  let loader = loadStrings(url);
  return loader;
}

function loadSVG(path) {

  let draw;
  let svg=[];
  let n=0;
  for (let i = 0; i < path.length; i++) {
    let p = [];
    let pos;
    if (path[i].indexOf("circle") != -1) {
      svg[n]={"cx":path[i].substr(path[i].indexOf("cx=\"") + 4, path[i].indexOf('"')-(path[i].indexOf("cx=\"")-4)),
              "cy":path[i].substr(path[i].indexOf("cy=\"") + 4, path[i].indexOf('"',path[i].indexOf("cy=\""))-(path[i].indexOf("cy=\"")-4)),
              "r":path[i].substr(path[i].indexOf("r=\"") + 3, path[i].indexOf('"',path[i].indexOf("r=\""))-(path[i].indexOf("r=\"")-3)),
              }; n++;

    } else if (path[i].indexOf("path") != -1) {
      let init = path[i].indexOf("d=\"") + 3;
      let end = path[i].indexOf('"', init) - init;
      draw = path[i].substr(init, end);
      init = draw.indexOf("M") + 1;

      pos = draw.substr(init);
      end = /[a-z]/i.exec(pos).index;
      pos = draw.substr(1, end).split(",");
      draw = draw.substr(end + 1);
      var j = 0;

      while (draw.length > 0) {
        init = /[a-z]/i.exec(p[j]).index;
        p[j] = draw.substr(init+1);
        try {
          end = /[a-z]/i.exec(p[j]).index;
        } catch (err) {
          end = -1;
        }
        if (end > 0) {
          p[j] = draw.substr(1, end).split(/[\s,]+/);
          p[j].unshift(draw[0]);
          j++;
          draw = draw.substr(end + 1);
        } else {
          p[j] = draw.substr(1).split(/[\s,]+/);
          p[j].unshift(draw[0]);
          draw = "";
        }
      }
      svg[n]={"pos":pos,"p":p}; n++;
      //console.log(svg[i]);
    }
  }

  console.log(svg);
  return svg;
}

function drawSVG(svg) {
  for(let j=0;j<svg.length;j++) {
    if(svg[j].pos!=null) {
  beginShape();
  vertex(svg[j].pos[0],svg[j].pos[1]);
  let c=false;
  for(let i=0;i<svg[j].p.length;i++)
    switch(svg[j].p[i][0]) {
      case 'L': vertex(svg[j].p[i][1], svg[j].p[i][2]); break;
      case 'C': bezierVertex(svg[j].p[i][1], svg[j].p[i][2], svg[j].p[i][3], svg[j].p[i][4], svg[j].p[i][5], svg[j].p[i][6]); break;
      case 'Z': c=true; break;
    }
  if(c) endShape(CLOSE); else endShape(); }
  else if(svg[j].cx!=null) {
      circle(svg[j].cx,svg[j].cy,svg[j].r);
    }
  }
}
