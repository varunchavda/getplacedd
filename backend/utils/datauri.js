// uri file is used to convert the uploaded file to a special uri format (daytaURI),
//so that can be uploaded easily to cloudinary 
import DataUriParser from "datauri/parser.js"
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;