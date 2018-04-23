class Align {
    static center(obj) {
        obj.x = game.width / 2;
        obj.y = game.height / 2;
    }
    static centerH(obj) {
        obj.x = game.width / 2;
    }
     static centerHGroup(obj) {
        obj.x = game.width / 2-obj.width/2;
    }
    static centerV(obj) {
        obj.y = game.height / 2;
    }
    static centerVGroup(obj) {
        obj.y = game.height / 2-obj.height/2;
    }
    static centerGroup(obj) {
        obj.x = game.width / 2 - obj.width / 2;
        obj.y = game.height / 2 - obj.height / 2;
    }
    static alignToBottom(obj2, obj, offset = 0) {
        obj.y = obj2.y + obj2.height - obj.height / 2;

        obj.y += offset;
    }
    static fromRight(obj2, obj, percent, offset = 0) {
        obj.x = obj2.width - (game.width * percent);
        obj.x -= offset;
        //obj.x -= obj.width / 2;
    }
    static fromLeft(obj2, obj, percent, offset = 0) {
        obj.x = game.width * percent;
        obj.x += offset;
    }
    static fromCenter(obj2, obj, percent) {
        obj.x = obj2.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    }
    static getScaleToGameW(obj) {
        console.log("per="+obj.width / game.width);
    }
    static scaleToGameW(obj, percent) {
        obj.width = game.width * percent;
        obj.scale.y = obj.scale.x;
    }
    static fromObjY(obj,obj2,percent)
    {
        obj.y=obj2.y+(game.height*percent);
    }
    static fromObjX(obj,obj2,percent)
    {
        obj.x=obj2.x+(game.width*percent);
    }
    static getDif(obj1,obj2)
    {
        var difX=(obj1.x-obj2.x)/game.width;
        var difY=(obj1.y-obj2.y)/game.height;

        console.log("difX="+difX);
        console.log("difY="+difY);
    }
    static distributeH(hh,smalls,buffer=0)
    {
        var len=smalls.length;
        var mod=hh/(len+1);
        //
        //
        for (var i = 0; i < len; i++) {
            smalls[i].y=(i*mod)+buffer;
        }
    }
    static distributeW(ww,smalls,buffer=0)
    {
        var len=smalls.length;
        var mod=ww/(len+1);
        //
        //
        for (var i = 0; i < len; i++) {
            smalls[i].x=(i*mod)+buffer;
        }
    }
    static clockAlign(obj2, obj, hour) {
        switch (hour) {
            case 12:
                obj.x = obj2.x + obj2.width / 2;
                obj.y = obj2.y + obj.height / 2;
                break;
            case 3:
                obj.x = obj2.x + obj2.width - obj.width / 2;
                obj.y = obj2.height / 2;
                break;
            case 6:
                obj.y = obj2.y + obj2.height - obj.height / 2;
                obj.x = obj2.x + obj2.width / 2
                break;
            case 9:
                obj.x = obj2.x + obj.width / 2;
                obj.y = obj2.height / 2;
                break;
        }
    }
}