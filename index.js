require('dotenv/config')
const aws = require('aws-sdk')
const server = require('json-server')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')
const { db } = router

const s3 = new aws.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    contentDisposition: 'attachment',
    ACL: 'public-read',
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body))
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname))
    }
  })
})

app.post('/files', upload.single('testdoc'), (req, res) => {
  const file = {
    location: req.file.location,
    name: req.file.originalname,
    jobId: parseInt(req.body.jobId, 10)
  }
  db.get('files')
    .insert(file)
    .write()
  res.json(file)
})

app.use(middleware)
app.use(router)
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
