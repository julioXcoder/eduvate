type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };

type UploadData = Partial<{
  key: string;
  url: string;
  name: string;
  size: number;
}>;

type UploadError = {
  code: string;
  message: string;
  data: any;
};

export type { UploadFileResponse, UploadData, UploadError };
