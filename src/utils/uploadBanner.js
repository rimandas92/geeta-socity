const multer = require('multer');


var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/uploads');
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);

	}
});
var uploadBanner = multer({ storage:storage });

export default uploadBanner;
