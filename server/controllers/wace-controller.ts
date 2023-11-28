import multer from 'multer';
import fs from 'fs';
import { compiledProjectArchivePath } from '../../src/utils';
import archiver from 'archiver';
import { Response, Request } from 'express';
import prettier from 'prettier';
import { compileStateToProduction } from '../../src/utils/compileStateToProduction';
import { GlobalState } from '../../src/core/store/modules/template/reducer';
// import { compileFigmaProject } from '../compileFigmaProject';

const current = 'travel_data';

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
      cb(null, `server/public/uploads/${current}`);
    },
  }),
});

const uploadsDirName = `server/public/uploads/${current}`;

const getState = async (): Promise<GlobalState> => {
  let files: string[];
  if (fs.existsSync(uploadsDirName)) {
    files = fs.readdirSync(uploadsDirName);
  } else {
    fs.mkdirSync(uploadsDirName, { recursive: true });
    files = [];
  }

  return {
    ...JSON.parse(await getAsync(current)),
    files,
  };
};

export const getStateController = async (request: Request, response: Response) => {
  const state = await getState();
  response.json({ ...state, files: state.files.map((path) => `uploads/${current}/` + path) });
};

export const compile = async (request: Request, response: Response) => {
  try {
    const state = await getState();
    const fileName = (name: string) => `DataAnalysis/${name}`;
    const archivePath = __dirname + `/../public/${compiledProjectArchivePath}`;
    const output = fs.createWriteStream(archivePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    // open possibility to write files to archive
    archive.pipe(output);

    // compile global state to name/file Record
    const pages = compileStateToProduction(state, prettier.format);

    // iteratively write all files to the archive
    Object.entries(pages).forEach(([key, value]) => archive.append(value, { name: fileName(key) }));

    // inject files using in project
    const files = state.files;

    if (files.length) {
      files.forEach((name) => {
        archive.append(fs.readFileSync(`${uploadsDirName}/${name}`), { name: fileName(`files/${name}`) });
      });
    }

    // send archive and finish
    await archive.finalize();
    response.send(200);
  } catch (e: any) {
    console.error(e);
    response.status(500).send(e.message);
  }
};

export const getFiles = async (request: Request, response: Response) => {
  response.json(fs.readdirSync(`public/uploads/${current}`).map((path) => `uploads/${current}` + path));
};

export const deleteFile = async (request: Request, response: Response) => {
  fs.rmSync(`${uploadsDirName}/${request.params.fileName}`);
  response.json({ ok: true });
};

export const deleteState = async (request: Request, response: Response) => {
  response.json({ ok: await client.set(current, '') });
};

export const update = async (request: Request, response: Response) => {
  try {
    client.set(current, JSON.stringify(request.body));
    response.json(JSON.parse(await getAsync(current)));
  } catch (e) {
    response.status(500).send(e);
  }
};

export const uploadAssets = [
  upload.array('asset'),
  async (request: Request, response: Response) => {
    response.send(200);
  },
];

export const readFigma = async (request: Request, response: Response) => {
  const res = JSON.stringify(request.body);
  response.json(res);
  const name = request.body.children[0].children[0].name
  fs.writeFileSync(`./figma-${name}.json`, res);
  console.log('Ok written');
};

// compileFigmaProject('CountriesTable')
