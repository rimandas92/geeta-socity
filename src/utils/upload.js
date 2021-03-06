const multer = require('multer');


var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/uploads/ebooks');
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);

	}
});
var upload = multer({ storage:storage });

export default upload;
