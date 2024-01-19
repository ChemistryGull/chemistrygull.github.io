function Entity(inp) {
  this.pos = new Vector(inp.x, inp.y);
  this.vel = new Vector(0, 0);
  this.speed = 3;
  this.color = inp.color || "red";

  this.onTile = [0, 0]
  this.onChunk = [0, 0]

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(mainCv.x + this.pos.x, mainCv.y + this.pos.y, 30, 30)
  };
  this.move = function () {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	};
  this.getPos = function () {
    this.onChunk = [Math.floor(this.pos.x / (S.chunkSize * S.tw)), Math.floor(this.pos.y / (S.chunkSize * S.th))]

  }

}
