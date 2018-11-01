require('dotenv/config')
const lodashId = require('lodash-id')
const aws = require('aws-sdk')
const server = require('json-server')
const multer = require('multer')
const multerS3 = require('multer-s3')

const FileSync = require('lowdb/adapters/FileSync')
const low = require('lowdb')
const adapter = new FileSync('db.json')
const db = low(adapter)

db._.mixin(lodashId)

const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')

const s3 = new aws.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  Bucket: process.env.BUCKET_NAME
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body))
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/files', upload.single('testdoc'), (req, res) => {
  const file = {
    location: req.file.location,
    name: req.file.originalname,
    jobId: req.body.jobId
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
