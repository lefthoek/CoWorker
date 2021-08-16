import { promises as fs } from "fs";
import { StatusCodes } from "../types";

const filenameToTimestamp = (filename: string) => {
  return filename.replace(/.json$/, "");
};

export const ls = async (path: string) => {
  try {
    const filenames = await fs.readdir(path);
    return [StatusCodes.SUCCESS, filenames];
  } catch {
    return [StatusCodes.ERROR, "Couldn't read dir", path];
  }
};

export const touch = async (path: string) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  } finally {
    return [StatusCodes.SUCCESS, path];
  }
};

export const readFile = async (path: string) => {
  try {
    const file = await fs.readFile(path, "utf-8");
    return [StatusCodes.SUCCESS, file];
  } catch {
    return [StatusCodes.ERROR, "Couldn't read file", path];
  }
};

export const writeFile = async (path: string, data: string) => {
  try {
    await fs.writeFile(path, data);
    return [StatusCodes.SUCCESS, path];
  } catch {
    return [StatusCodes.ERROR, "Couldn't write file", path];
  }
};

export const deleteFile = async (path: string) => {
  try {
    const file = await fs.unlink(path);
    return [StatusCodes.SUCCESS, file];
  } catch {
    return [StatusCodes.ERROR, path];
  }
};

export const writeJSON = async (path: string, data: any) => {
  const [status, _] = await writeFile(path, JSON.stringify(data));
  if (status === StatusCodes.SUCCESS) {
    return [StatusCodes.SUCCESS, path];
  } else {
    return [StatusCodes.ERROR, "Couldn't write JSON", path];
  }
};

export const readJSON = async (path: string) => {
  const [status, file] = await readFile(path);
  if (status === StatusCodes.SUCCESS) {
    const json = JSON.parse(file);
    return [StatusCodes.SUCCESS, json];
  } else {
    return [StatusCodes.ERROR, path];
  }
};

export const timestamps = async (path: string) => {
  const [status, filenames] = (await ls(path)) as [string, string[]];
  if (status === StatusCodes.SUCCESS) {
    const tss = filenames.map(filenameToTimestamp).sort().reverse();
    return [StatusCodes.SUCCESS, tss];
  } else {
    return [StatusCodes.ERROR, "Couldn't extract timestamps", path];
  }
};
