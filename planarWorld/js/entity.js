function Entity(inp) {
  this.pos = new Vector(inp.x, inp.y);
  this.vel = new Vector(0, 0);
  this.speed = S.playerSpeed;
  this.color = inp.color || "red";

  this.onTile = [0, 0]
  this.onChunk = [0, 0]

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(mainCv.x + this.pos.x, mainCv.y + this.pos.y, 20, 20)
  };
  this.move = function () {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	};
  this.getPos = function () {
    this.onChunk = [Math.floor(this.pos.x / (S.chunkSize * S.tw)), Math.floor(this.pos.y / (S.chunkSize * S.th))]
    this.onChunkTile = [Math.abs(Math.floor(this.pos.x / S.tw % S.chunkSize)), Math.abs(Math.floor(this.pos.y / S.th % S.chunkSize))]

  }

}


/* SPEED TEST CASE

var obj = {}
var arr = []

for (var y = -10; y < 10; y++) {
	for (var x = -10; x < 10; x++) {
		obj[x + "," + y] = {c: [1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1], ent: [{typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}]}
		arr.push({x: x, y: y, c: [1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1], ent: [{typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}, {typ: "animal", vel: "fast"}]})
	}
}


obj[[0, 0].toString()].c

arr.find(e => e.x == 0 && e.y == 0).c

*/
