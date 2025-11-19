import multer from 'multer';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/profile-pictures/");
  },
  filename: (request, file, callback) => {
    var uniqueId = Math.random().toString(16).slice(2);
    var uniqueName = uniqueId + "-" + file.originalname;
    callback(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
}).single("profilePicture");

export {upload};
