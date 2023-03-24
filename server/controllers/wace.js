import multer from 'multer';
import fs, { readdirSync, createWriteStream } from 'fs';
import { compiledProjectArchivePath } from '../../src/utils';
import archiver from 'archiver';
import { compileStateToProduction } from '../../src/utils/compileStateToProduction';

const current = 'current';
// const current = 'current';

const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

const upload = require('multer')({
  storage: multer.diskStorage({
    filename: function (req, file, callback) {
      callback(null, file.originalname.replace(' ', ''));
    },
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
  }),
});

export const getState = async (request, response) => {
  response.json(JSON.parse(await getAsync(current)));
};

export const compile = async (request, response) => {
  try {
    const state = JSON.parse(await getAsync(current));
    const fileName = (name) => `project/${name}`;
    const archivePath = __dirname + `/../public/${compiledProjectArchivePath}`;
    const output = createWriteStream(archivePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    // open possibility to write files to archive
    archive.pipe(output);

    // compile global state to name/file Record
    const pages = compileStateToProduction(state);

    // iteratively write all files to the archive
    Object.entries(pages).forEach(([key, value]) => archive.append(value, { name: fileName(key) }));

    // send archive and finish
    await archive.finalize();
    response.send(200);
  } catch (e) {
    response.status(500).send(e.message);
  }
};

export const getFiles = async (request, response) => {
  response.json(await readdirSync('public/uploads').map((path) => '/uploads/' + path));
};

export const deleteState = async (request, response) => {
  response.json({ ok: await client.set(current, '') });
};

export const update = async (request, response) => {
  try {
    // console.log('im in update, data:', request.body)
    client.set(current, JSON.stringify(request.body));
    response.json(JSON.parse(await getAsync(current)));
  } catch (e) {
    response.status(500).send(e);
  }
};

export const uploadAssets = [
  upload.array('asset'),
  async (req, res) => {
    res.redirect(req.headers.origin);
  },
];
