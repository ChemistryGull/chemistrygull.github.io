class objectPool {
  constructor(type) {
    this.type = type;
    this.pool = [];

    this.freeIndexes = []



    switch (this.type) {
      case "graphics":
        this.create = function (index) {
          let item = new PIXI.Graphics();
          item.poolIndex = index;
          this.freeIndexes.push(index);
          return item;
        }
        break;
      case "container":
        this.create = function (index) {
          let item = new PIXI.Container();
          item.poolIndex = index;
          this.freeIndexes.push(index);
          return item;
        }
        break;
      case "tileChunk":
        // --- Theoretical way to implement this
        this.create = function (index) {

          let chunkContainer = new PIXI.Container();
          chunkContainer.poolIndex = index;
          
          
          for (var y = 0; y < S.chunkSize; y++) {
            for (var x = 0; x < S.chunkSize; x++) {

              const graphic = new PIXI.Graphics()
                .rect(x * S.tw, y * S.th, S.tw, S.th)
                .fill({ color: 0xffffff });
                                  
              chunkContainer.addChild(graphic);

            }
          }
          this.freeIndexes.push(index);
          console.log("## CREATE");

          return chunkContainer;

          // return new PIXI.Graphics()
          //   .rect(x * S.tw, y * S.th, S.tw, S.th)
          //   .fill({ color: 0xffffff });
        }
        
        break;
        
      // --- TODO: Add Sprites etc...
    
      default:
        alert("!!! object pool property must be defined!\n'" + this.type + "' is not a available objectPool type.")
        break;
    }
  }


  allocate() {
    if (this.freeIndexes.length == 0) {
      // --- Push a item with the ID 
      // console.log("#DEV: Creating New Element");

      this.pool.push(this.create(this.pool.length));
    }

    return this.pool[this.freeIndexes.pop()];
    
  }

  

  release(returnedObj) {
    this.freeIndexes.push(returnedObj.poolIndex);
    
    /*
    This does not remove the Item from the Renderer/its parent.
    This has to be done seperatedly.
    Example:
    mapContainer.removeChild(mapContainer.children[i]) (Not working for some reason?)
    mapContainer.children[i].removeFromParent();
    mapContainer.children.pop();
    */      
  }

  reserve(val) {

    for (let i = 0; i < val; i++) {
      this.pool.push(this.create(i))
    }
   
  }
}



// --- objectPoolPop is an alternative object pool, currently not used
class objectPoolPop {
    constructor(type) {
      this.type = type;
      this.pool = [];
      this.poolSize = 0
  
      this.freeIndexes = []
  
  
  
      switch (this.type) {
        case "graphics":
          this.create = function (index) {
            let item = new PIXI.Graphics();
            item.poolIndex = index;
            this.freeIndexes.push(index);
            return item;
          }
          break;
        case "container":
          this.create = function (index) {
            let item = new PIXI.Container();
            item.poolIndex = index;
            this.freeIndexes.push(index);
            return item;
          }
          break;
        case "tileChunk":
          // --- Theoretical way to implement this
          this.create = function (index) {
  
            let chunkContainer = new PIXI.Container();
            chunkContainer.poolIndex = index;
            
            
            for (var y = 0; y < S.chunkSize; y++) {
              for (var x = 0; x < S.chunkSize; x++) {
  
                const graphic = new PIXI.Graphics()
                  .rect(x * S.tw, y * S.th, S.tw, S.th)
                  .fill({ color: 0xffffff });
                                    
                chunkContainer.addChild(graphic);
  
              }
            }
            this.freeIndexes.push(index);
            console.log("## CREATE");
  
            return chunkContainer;
  
            // return new PIXI.Graphics()
            //   .rect(x * S.tw, y * S.th, S.tw, S.th)
            //   .fill({ color: 0xffffff });
          }
          
          break;
          
        // --- TODO: Add Sprites etc...
      
        default:
          alert("!!! object pool property must be defined!\n'" + this.type + "' is not a available objectPool type.")
          break;
      }
    }
  
    allocate() {
      if (this.poolSize == 0) {
        // console.log("#DEV: Creating New Element");
        
        const newObj = this.create();
        return newObj;
  
      } else {
        // console.log("#DEV: Using element from pool");
  
        this.poolSize--;
        return this.pool.pop(); 
  
      }
    }
  
    release(returnedObj) {
      this.poolSize++;
      this.pool.push(returnedObj);
    }
  
    reserve(val) {
  
      
      this.poolSize += val;
  
      for (let i = 0; i < val; i++) {
        this.pool.push(this.create(i))
      }
     
      console.log(this.poolSize);
      
  
    }
  }