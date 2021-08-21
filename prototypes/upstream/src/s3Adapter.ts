import { StatusCodes, FSAdapter } from "./types";

class S3Adapter implements FSAdapter {
  bucket_name: string;

  constructor({ bucket_name }: { bucket_name: string }) {
    this.bucket_name = bucket_name;
  }

  async touch(path: string): Promise<[StatusCodes, string]> {
    return [StatusCodes.ERROR, path];
  }
}

export default S3Adapter;
