import * as http from "http";
import * as url from "url";
import * as path from "path";

function isErrorWithCode(error: unknown): error is Error & { code: string } {
  return (
    error instanceof Error &&
    typeof (error as Error & { code?: string }).code === "string"
  );
}

export class LocalHttpServer {
  private server: http.Server | null = null;
  private port: string;
  private readBinary: (path: string) => Promise<ArrayBuffer>;

  constructor(
    port: string,
    readBinary: (path: string) => Promise<ArrayBuffer>,
  ) {
    this.port = port;
    this.readBinary = readBinary;
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        console.warn(`Server already running on port ${this.port}`);
        return resolve();
      }

      this.server = http.createServer(async (req, res) => {
        const parsedUrl = url.parse(req.url || "/", true);
        let pathname = decodeURIComponent(parsedUrl.pathname || "/");

        if (pathname === "/") {
          pathname = "/index.html";
        }
        try {
          const data = await this.readBinary(pathname);
          const mimeType = this.getMimeType(pathname);
          res.writeHead(200, { "Content-Type": mimeType });
          res.end(Buffer.from(data));
        } catch (err: unknown) {
          console.error(err);
          if (isErrorWithCode(err) && err.code === "ENOENT") {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("File not found");
          } else {
            console.error(`Error serving file ${pathname}:`, err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
          }
        }
      });

      this.server.listen(this.port, resolve);

      this.server.on("error", (err: Error) => {
        this.server = null;
        console.error("Server error:", err);
        reject(err);
      });
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          this.server = null;
          resolve();
        });
        this.server.on("error", (err) => {
          console.error("Error stopping server:", err);
          this.server = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case ".html":
        return "text/html";
      case ".css":
        return "text/css";
      case ".js":
        return "application/javascript";
      case ".json":
        return "application/json";
      case ".png":
        return "image/png";
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      case ".gif":
        return "image/gif";
      case ".svg":
        return "image/svg+xml";
      case ".md":
        return "text/markdown";
      case ".wasm":
        return "application/wasm";
      default:
        return "application/octet-stream";
    }
  }
}
