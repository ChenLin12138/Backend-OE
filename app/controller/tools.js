const Tools={
    randomString : (length,chars)=>{
        let result='';
        for(var i=length;i>0;i--){
            result += chars[Math.floor(Math.random()*chars.length)];
        }
        return result;
    }
}
module.exports = Tools;