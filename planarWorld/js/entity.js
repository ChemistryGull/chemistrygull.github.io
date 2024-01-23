function Entity(inp) {
  this.pos = new Vector(inp.x, inp.y);
  this.vel = new Vector(0, 0);
  this.speed = S.playerSpeed;
  this.color = inp.color || "red";
  this.w = 20;
  this.h = 20;

  this.onTile = [0, 0]
  this.onChunk = [0, 0]

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(mainCv.x + this.pos.x, mainCv.y + this.pos.y, this.w, this.h)
  };
  this.move = function () {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	};
  this.getPos = function () {
    this.onChunk = [Math.floor(this.pos.x / (S.chunkSize * S.tw)), Math.floor(this.pos.y / (S.chunkSize * S.th))]
    this.onChunkTile = [Math.abs(Math.floor(this.pos.x / S.tw % S.chunkSize)), Math.abs(Math.floor(this.pos.y / S.th % S.chunkSize))]
  }

  this.collision = function (hitbox) {
    return this.pos.x + this.w > hitbox[0] && this.pos.x < hitbox[2] && this.pos.y + this.h > hitbox[1] && this.pos.y < hitbox[3];
    // return !(this.pos.x + this.w <= hitbox[0] || this.pos.x >= hitbox[2] || this.pos.y + this.h <= hitbox[1] || this.pos.y >= hitbox[3]);
  }
  this.bouceOf = function (hitbox) {

    // --- Entity Collider. Thanks to https://www.youtube.com/watch?v=LYrge3ylccQ

    var thisCenter = this.pos.add(new Vector(this.w / 2, this.h / 2))
    var hitboxCenter = new Vector(hitbox[0] + (hitbox[2] - hitbox[0]) / 2, hitbox[1] + (hitbox[3] - hitbox[1]) / 2)
    var distVec = hitboxCenter.sub(thisCenter);

    // ctx.strokeStyle = "yellow";
    // ctx.beginPath();
    // ctx.moveTo(thisCenter.x + mainCv.x, thisCenter.y + mainCv.y);
    // ctx.lineTo(hitboxCenter.x + mainCv.x, hitboxCenter.y + mainCv.y);
    // ctx.stroke();

    if (Math.abs(distVec.x * (hitbox[3] - hitbox[1] + this.h)) > Math.abs(distVec.y * (hitbox[2] - hitbox[0] + this.w))) {
      if (distVec.x > 0) {
        this.pos.x = hitbox[0] - this.w;
      } else {
        this.pos.x = hitbox[2];
      }
    } else {
      if (distVec.y > 0) {
        this.pos.y = hitbox[1] - this.h;
      } else {
        this.pos.y = hitbox[3];
      }
    }

  }


}

function Obj(inp) {
  this.pos = new Vector(inp.x, inp.y);
  this.type = inp.type || "tree1"
  this.opac = 1;

  this.w = entityTextures[this.type][2] - 1;
  this.h = entityTextures[this.type][3];

  this.hitbox = null;
  this.hbfade = null;
  if (entityTextures[this.type][4].hitbox) {
    this.hitbox = entityTextures[this.type][4].hitbox.map((n, i) => i % 2 ? this.pos.y - n : n + this.pos.x);
  }
  if (entityTextures[this.type][4].hbfade) {
    this.hbfade = entityTextures[this.type][4].hbfade.map((n, i) => i % 2 ? this.pos.y - n : n + this.pos.x);
  }


  this.update = function () {
    ctx.globalAlpha = this.opac;
    ctx.drawImage(treeTEX.tx, entityTextures[this.type][0], entityTextures[this.type][1], entityTextures[this.type][2], entityTextures[this.type][3], mainCv.x + this.pos.x, mainCv.y + this.pos.y - this.h, this.w, this.h);
    if (this.opac < 1) {
      this.opac += S.fadeOutOpac[0] / 2;
    }

    if (S.debug.doShowHitboxes) {

      if (this.hitbox) {
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(this.hitbox[0] + mainCv.x, this.hitbox[1] + mainCv.y);
        ctx.lineTo(this.hitbox[2] + mainCv.x, this.hitbox[1] + mainCv.y);
        ctx.lineTo(this.hitbox[2] + mainCv.x, this.hitbox[3] + mainCv.y);
        ctx.lineTo(this.hitbox[0] + mainCv.x, this.hitbox[3] + mainCv.y);
        ctx.lineTo(this.hitbox[0] + mainCv.x, this.hitbox[1] + mainCv.y);
        ctx.stroke();
      }
      if (this.hbfade) {
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(this.hbfade[0] + mainCv.x, this.hbfade[1] + mainCv.y);
        ctx.lineTo(this.hbfade[2] + mainCv.x, this.hbfade[1] + mainCv.y);
        ctx.lineTo(this.hbfade[2] + mainCv.x, this.hbfade[3] + mainCv.y);
        ctx.lineTo(this.hbfade[0] + mainCv.x, this.hbfade[3] + mainCv.y);
        ctx.lineTo(this.hbfade[0] + mainCv.x, this.hbfade[1] + mainCv.y);
        ctx.stroke();
      }
    }
    
  };
  this.fadeOut = function () {
    if (this.opac > S.fadeOutOpac[1]) {
      this.opac -= S.fadeOutOpac[0];
    }
  }
}


/* SPEED TEST CASE https://jsbench.me/

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
