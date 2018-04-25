var express = require('express'),
    fs = require('fs'),
    app = express();

// 跨域设置
app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
      res.header("Access-Control-Allow-Credentials", true);
      // 这里获取 origin 请求头 而不是用 *
      res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

app.use(express.static(__dirname + '/public'));

//保存base64图片POST方法
app.get('/upload', function(req, res){
    //接收前台POST过来的base64
    let imgData = req.query.imgData;
    let fileName = req.query.fileName;
    console.log(fileName);
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	fs.writeFile(__dirname + "/public/images/"+fileName, dataBuffer, function(err) {
		if(err){
		  res.send(err);
		}else{
		  res.send("保存成功！");
		}
    });
});
if (!module.parent) {
  app.listen(8000);
  console.log('Express started on port 8000');
}