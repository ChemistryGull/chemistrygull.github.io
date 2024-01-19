var dbg = {
  canvas: document.getElementById("debugCv"),
  ctx: document.getElementById("debugCv").getContext("2d"),
  count: 0,
  h: 150,
  w: 300,

  plot: function (v, f, color) {

    v = v * f;


    // this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.count, this.h - v, 1, v);
    this.ctx.globalAlpha = 1;


    this.ctx.clearRect(this.count + 1, 0, 10, this.h);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, this.h - 30, this.w, 1)
    this.ctx.fillRect(0, this.h - 60, this.w, 1)
    this.ctx.fillRect(0, this.h - 90, this.w, 1)
    this.ctx.fillRect(0, this.h - 120, this.w, 1)
    this.ctx.font = "20px Monospace"
    this.ctx.fillText(30 / f, 5, this.h - 30);
    this.ctx.fillText(60 / f, 5, this.h - 60);
    this.ctx.fillText(90 / f, 5, this.h - 90);
    this.ctx.fillText(120 / f, 5, this.h - 120);


    this.count++;
    if (this.count >= this.w) {
      this.count = 0;
    }




  }
}
