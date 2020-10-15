# p5.svg.js
A dumb SVG parser for p5.js

p5.svg.js is a parser that read and translate svg objects in their corresponding p5.js primitives.
This allow you to create compositions in your favorite vector program and bring them in p5.js.
Functionality are extremely few at this stage: load svg, draw all the objects in the svg.
The objects drawn can be altered as would be done with other shapes (stroke, fill, translate, etc).
The library is designed to be used in tandem with p5.js.

## Usage
1. Include the library in HTML header.
2. In preload() pass the url of your svg file > path=preloadSVG(url)
3. In setup() create the object svg with > svg=loadSVG(path)
3. Draw the object with > drawSVG(svg)
