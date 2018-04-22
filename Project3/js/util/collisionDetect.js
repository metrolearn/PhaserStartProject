class Collisions {
    constructor() {}
    static overLap(obj1, obj2, xDist = -1, yDist = -1) {
        if (xDist == -1) {
            xDist = obj1.width;
            if (obj1.anchor.x==.5)
            {
                xDist=obj1.width/2;
            }
        }
        if (yDist == -1) {
            yDist = obj1.height;
             if (obj1.anchor.y==.5)
            {
                yDist=obj1.height/2;
            }
        }
        var distX = Math.abs(obj1.x - obj2.x);
        var distY = Math.abs(obj1.y - obj2.y);
        if (distX < xDist && distY < yDist) {
            return true;
        }
        return false;
    }
    static byDist(obj1, obj2, distance) {
        var distX = Math.abs(obj1.x - obj2.x);
        var distY = Math.abs(obj1.y - obj2.y);
        var dist = Math.sqrt((distX * distX) + (distY * distY));
        if (dist < distance) {
            return true;
        }
        return false;
    }
}