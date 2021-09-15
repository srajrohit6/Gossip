const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: 'geralt',
    api_key: '521273754354987',
    api_secret: 'donjf-RVgRLXg1EhG8UzRGrQMRA'
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
    folder: 'Gossip',
    allowedFormats: ['jpeg','png','jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}