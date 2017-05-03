'use strict';

const sharp = require('sharp');
//remove fs?
const fs = require('fs');
const uuidV4 = require('uuid/v4');

const gcs = require('@google-cloud/storage')({
  projectId: 'project_id',
  keyFilename: './location/of/keyfile.json'
});

const bucketName = 'bucket_name';
let bucket = gcs.bucket(bucketName);


function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}



let profileImageHandler = {};

let profileImageValidation = (req, res, next) => {
  if(!req.file) {
    //gets called when multer.fileFilter returns false
    return res.status(400).json({errors: {global: 'Invalid file type'}});
  }

  const fileTypeMagicNumbers = req.file.buffer.toString('hex', 0, 4);
  let type = 'invalid';

  switch (fileTypeMagicNumbers) {
    case '89504e47':
        type = 'image/png';
      break;
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
    case 'ffd8ffdb':
        type = 'image/jpeg';
      break;
    default:
        type = 'invalid';
      break;
  }

  if(type === 'invalid') return res.status(400).json({errors: {global: 'Invalid file type'}});

}



profileImageHandler.uploadToGcs = (req, res, next) => {
  profileImageValidation(req, res, next);

  let imageEnding = req.file.originalname.substr(req.file.originalname.length - 5);

  const gcsname =  uuidV4() + '-' + Date.now() + imageEnding;
  const file = bucket.file(gcsname);

  const remoteWriteStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    predefinedAcl: "publicRead"
  });

  sharp(req.file.buffer).resize(150, 150).pipe(remoteWriteStream);

  remoteWriteStream.on('error',  (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  remoteWriteStream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

}



export default profileImageHandler;
