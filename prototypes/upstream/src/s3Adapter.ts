import { StatusCodes, FSAdapter } from "./types";
import AWS from "aws-sdk";

const s3 = new AWS.S3();

class S3Adapter implements FSAdapter {
  bucket_name: string;

  constructor({ bucket_name }: { bucket_name?: string }) {
    if (!bucket_name) {
      throw new Error("The  bucket name must be set in your environment");
    }
    this.bucket_name = bucket_name;
  }
  async writeFile({ path, data }: { path: string; data?: any }) {
    await s3
      .putObject({
        Bucket: this.bucket_name,
        Key: path,
        Body: data,
      })
      .promise();
    return path;
  }

  async writeJSON({ path, data }: { path: string; data: any }) {
    return await this.writeFile({ path, data: JSON.stringify(data, null, 2) });
  }

  async touch({ path }: { path: string }) {
    return await this.writeFile({ path });
  }
}

export default S3Adapter;
