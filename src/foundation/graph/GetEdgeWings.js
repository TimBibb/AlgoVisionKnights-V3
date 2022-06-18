// Given a start and destination positions of a directed edge,
// finds the points of the wings of the arrow (including the
// converging point of the wings)

function getEdgeWings(x1p, y1p, x2p, y2p) {
  const WIDTH = 1500;
  const HEIGHT = 650;

  // absolute coordinates
  let p1 = {
    x: (WIDTH * x1p) / 100.0,
    y: (HEIGHT * y1p) / 100.0,
  };

  let p2 = {
    x: (WIDTH * x2p) / 100.0,
    y: (HEIGHT * y2p) / 100.0,
  };

  // vector that represents (x2, y2) -> (x1, y1) from the origin
  let vector = {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  };

  // magnitude of the vector
  let magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  // divide magnitude out of the vector to get the unit vector
  let unit = {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
  };

  // both the wings of the arrow, unrotated
  let wing1 = {
    x: unit.x * 30,
    y: unit.y * 30,
  };
  let wing2 = {
    x: unit.x * 30,
    y: unit.y * 30,
  };

  // rotate vector v around ccw by angle a
  function rotate(v, a) {
    return {
      x: v.x * Math.cos(a) - v.y * Math.sin(a),
      y: v.x * Math.sin(a) + v.y * Math.cos(a),
    };
  }

  // rotate the wings in opposite directions
  wing1 = rotate(wing1, Math.PI / 4.0);
  wing2 = rotate(wing2, -Math.PI / 4.0);

  let tip = {
    x: unit.x * 45,
    y: unit.y * 45,
  };

  // move these wings to start at the tip
  wing1 = {
    x: wing1.x + p2.x + tip.x,
    y: wing1.y + p2.y + tip.y,
  };
  wing2 = {
    x: wing2.x + p2.x + tip.x,
    y: wing2.y + p2.y + tip.y,
  };
  tip = {
    x: tip.x + p2.x,
    y: tip.y + p2.y,
  };

  // convert absolute values into percentage values
  wing1 = {
    x: (wing1.x / WIDTH) * 100.0,
    y: (wing1.y / HEIGHT) * 100.0,
  };
  wing2 = {
    x: (wing2.x / WIDTH) * 100.0,
    y: (wing2.y / HEIGHT) * 100.0,
  };
  tip = {
    x: (tip.x / WIDTH) * 100.0,
    y: (tip.y / HEIGHT) * 100.0,
  };

  console.log(p1);
  console.log(p2);
  console.log(wing1);
  console.log(wing2);

  return [tip.x, tip.y, wing1.x, wing1.y, wing2.x, wing2.y];
}
export default getEdgeWings;
