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

const S3_BUCKET = process.env.S3_BUCKET
const WS_ACCESS_KEY_ID = process.env.WS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  accessKeyId: WS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: S3_BUCKET
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    contentDisposition: 'attachment',
    ACL: 'public-read',
    bucket: S3_BUCKET,
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
