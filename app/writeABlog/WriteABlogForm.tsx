"use client";
import { isAxiosError } from "axios";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import uploadImageToCloud from "@/lib/uploadImageToCloud";
import { createNewBlog } from "@/apis/apis";
import CatSelectableDropdown from "@/components/CatSelectableDropdown/CatSelectableDropdown";
import { useRouter } from "next/navigation";

const TextEditor = dynamic(() => import("@/components/TextEditor/TextEditor"), {
  ssr: false,
});

const DropZone = dynamic(() => import("@/components/DropZone/DropZone"), {
  ssr: false,
});

const WriteABlogForm: FC<any> = ({ session, categories }) => {
  const [loader, setLoader] = useState(false);
  const [selectedCat, setSelectedCat] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
  });
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoader(true);
      // Upload featured image to cloud
      const featuredImgResponse = await uploadImageToCloud(files[0]);
      const featuredImg = featuredImgResponse;
      if (!featuredImg) {
        toast.error("Image failed to upload in cloud");
        return;
      }
      // Prepare new blog object
      const newBlog = {
        title: formData?.title,
        content,
        featuredImg,
        categories: selectedCat,
      };

      // Attempt to create new blog
      const response = await createNewBlog(newBlog);
      console.log({ response });
      if (response.status) {
        toast.success("Blog created successfully");
        router.push("/");
      }
    } catch (error) {
      // Handle errors from API
      console.log(error);
      if (isAxiosError(error)) {
        const response: any = error.response;
        toast.error(response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }
  };

  const categoryHandler = (category: any) => {
    setSelectedCat([...category]);
  };

  // maintaining disable state
  useEffect(() => {
    if (
      formData.title &&
      content &&
      files.length > 0 &&
      selectedCat.length > 0
    ) {
      setIsDisabled(false);
    }
  }, [formData.title, content, files, selectedCat]);

  return (
    <form className="mt-6" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-4 col-span-3">
          <input
            type="text"
            placeholder="Title"
            className="px-4 py-2.5 text-lg rounded-md bg-white border w-full outline-blue-500"
            name="title"
            onChange={handleChange}
          />
          <TextEditor value={content} setValue={setContent} />
        </div>
        <div className="flex flex-col gap-4">
          <CatSelectableDropdown
            categories={categories}
            categoryHandler={categoryHandler}
            selectedCat={selectedCat}
          />
          <DropZone files={files} setFiles={setFiles} />
          <button
            type="submit"
            className={`${
              loader
                ? "bg-transparent"
                : isDisabled
                ? "bg-gray-500 border-0"
                : "bg-blue-500"
            } w-full border border-blue-500 text-white rounded-md py-2 px-4`}
            disabled={isDisabled}
          >
            {loader ? (
              <img src="/loader.svg" alt="" className="h-10 mx-auto" />
            ) : isDisabled ? (
              "Please fill all the input"
            ) : (
              "Upload My Blog"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default WriteABlogForm;
