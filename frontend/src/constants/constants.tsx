export const curlyRegex = /{{.*?}}/;

export const defaultHandleStyles = {
  width: "0.6rem",
  height: "0.6rem",
  background: "white",
  border: "1px solid black",
};

export const fileAcceptFormats = {
  images: "image/png, image/jpeg, image/gif, image/bmp, image/webp", // Accepts image file types
  csv: "text/csv, application/vnd.ms-excel", // Accepts CSV and Excel files
  word: "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Accepts .doc and .docx files
};

export type AcceptedFileTypes = keyof typeof fileAcceptFormats;
