import axios, { AxiosResponse } from "axios";

interface cloudinaryResponse extends AxiosResponse {
  data: {
    secure_url: string;
  };
}

const uploadImageToCloud = async (file: File) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogApp");
    data.append("cloud_name", "dwzdvokdy");
    data.append("folder", "blogapp");
    const response: cloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dwzdvokdy/image/upload",
      data
    );
    return response?.data?.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadImageToCloud;
