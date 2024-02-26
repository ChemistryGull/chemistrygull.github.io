function Entity(inp) {
  this.pos = new Vector(inp.x, inp.y);
  this.vel = new Vector(0, 0);
  this.speed = S.playerSpeed;
  this.color = inp.color || "red";
  this.w = 20;
  this.h = 20;

  this.onTile = [0, 0]
  this.onChunk = [0, 0]

  // this.inventory = [["brown", 1], ["white", 4], ["black", 1], ["white", 1], ["brown", 1], ["white", 5], ["black", 1], ["white", 1], ["brown", 1], ["white", 25], ["black", 1], ["white", 1], ["brown", 1], ["white", 1], ["black", 1], ["white", 1], ["brown", 1], ["white", 1], ["black", 1], ["white", 1]];
  // this.hotbar = [["red", 8], ["orange", 54], ["yellow", 1], ["lime", 1], ["green", 1], ["cyan", 7], ["lightblue", 2], ["blue", 64], ["purple", 1]];

  this.inventory = [["red_apple", 62], ["red_apple", 4], ["red_apple", 1], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0], ["_", 0]];
  this.hotbar = [["debug", 8], ["red_apple", 54], ["carrot", 1], ["raw_chicken", 1], ["cooked_chicken", 1], ["fig", 7], ["fig", 2], ["_", 0], ["_", 0]];

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
  this.type = inp.type || "oak"
  this.opac = 1;
  this.posOffset = entityTextures[this.type][4].posOffset || [0, 0];

  this.w = entityTextures[this.type][2] * S.tw - 1;
  this.h = entityTextures[this.type][3] * S.th;

  this.hitbox = null;
  this.hbfade = null;
  if (entityTextures[this.type][4].hitbox) {
    this.hitbox = entityTextures[this.type][4].hitbox.map((n, i) => i % 2 ? this.pos.y + n - this.posOffset[1] * S.th : n + this.pos.x - this.posOffset[0] * S.tw);
  }
  if (entityTextures[this.type][4].hbfade) {
    this.hbfade = entityTextures[this.type][4].hbfade.map((n, i) => i % 2 ? this.pos.y + n - this.posOffset[1] * S.th : n + this.pos.x - this.posOffset[0] * S.th);
  }


  this.update = function () {
    ctx.globalAlpha = this.opac;
    // ctx.drawImage(treeTEX.tx, entityTextures[this.type][0] * S.tw, entityTextures[this.type][1] * S.tw, entityTextures[this.type][2] * S.tw, entityTextures[this.type][3] * S.tw, mainCv.x + this.pos.x, mainCv.y + this.pos.y - this.h, this.w, this.h);
    ctx.drawImage(treeTEX.tx, entityTextures[this.type][0] * S.tw, entityTextures[this.type][1] * S.th, entityTextures[this.type][2] * S.tw, entityTextures[this.type][3] * S.th, mainCv.x + this.pos.x - this.posOffset[0] * S.tw, mainCv.y + this.pos.y - this.posOffset[1] * S.th, this.w, this.h);
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
      ctx.strokeStyle = "orangered";
      ctx.strokeRect(mainCv.x + this.pos.x, mainCv.y + this.pos.y, 32, 32)
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
