import axios, { AxiosResponse } from "axios";

interface cloudinaryResponse extends AxiosResponse {
  secure_url: string;
}

const uploadImageToCloud = async (file: File) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tutorial");
    data.append("cloud_name", "dwzdvokdy");

    const response: cloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dwzdvokdy/image/upload",
      data
    );

    return response?.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadImageToCloud;
