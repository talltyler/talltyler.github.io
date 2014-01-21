var Text = function(x,y,width,height,text,size){
  var m = new Matrix(1,0,0,1,x,y);
	this.transform = new Transformable(width, height, m, this);
  this.width = width;
  this.height = height;
  this.text = text;
  this.size = size;
};

Text.prototype.draw = function(ctx){
	ctx.save();
	var m = this.transform.matrix;
  //console.log(m.a,m.b,m.c,m.d);
	ctx.setTransform(1,m.b,m.c,1, m.x,m.y);
  var characters = this.text.split('');
  ctx.font = this.size+'px Helvetica';
  ctx.fillStyle = '#000';
  var line = 1;
  var pos = 0;
  for(var i=0;i<characters.length;i++){
    var character = characters[i];
    var w = ctx.measureText(character).width;
    if(pos+w>(this.width*m.a)){
      pos = 0;
      line++;      
    }
    ctx.fillText(character,pos,line*this.size);
    pos = pos+w;
  }
  this.transform.height = (this.size*(line))+10;
	ctx.restore();
};