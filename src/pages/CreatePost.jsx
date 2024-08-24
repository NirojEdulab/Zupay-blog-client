import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { CircleArrowLeft, CircleX, CloudUpload, Loader2 } from "lucide-react";
import { useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { API_URL, options } from "@/constants/Constants";
import { AuthContext } from "@/contexts/AuthContext";

const CreatePost = () => {
  const { authUser } = useContext(AuthContext);
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    shortDescription: "",
    content: "",
  });

  const config = useMemo(
    () => ({
      readonly: loading ? true : false,
      placeholder: "Start typing...",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "p",
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setPreviewURL(URL.createObjectURL(file));
      } else {
        toast.error("Please upload a valid image file (JPG, PNG, GIF).");
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFile = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setPreviewURL(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("image can not be empty");
      return;
    }

    if (
      !formValues.title ||
      !formValues.shortDescription ||
      !formValues.content ||
      !selectedFile
    ) {
      toast.error("Please fill in all fields and select an image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      formData.append("shortDescription", formValues.shortDescription);
      formData.append("userId", authUser._id);

      const response = await axios.post(`${API_URL}/posts`, formData, {
        withCredentials: true,
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        clearFile();
        setFormValues({
          title: "",
          shortDescription: "",
          content: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
      toast.error(error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10 border border-2-secondary rounded-md p-2">
      <form onSubmit={handleSubmit}>
        <div className="text-end">
          <Link to={"/"}>
            <Button variant="outline">
              <CircleArrowLeft size={32} className="text-primary" />
            </Button>
          </Link>
        </div>
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-4xl">Create your Blog</CardTitle>
          <CardDescription>Start writing about your blog...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">
              Title<span className="text-red-500 text-xl">*</span>
            </Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter Your Blog Title"
              value={formValues.title}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">
              Short Description<span className="text-red-500 text-xl">*</span>
            </Label>
            <Input
              type="text"
              name="shortDescription"
              placeholder="Enter A Short Description for Your Blog"
              value={formValues.shortDescription}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={loading}
            />
            {!selectedFile && !previewURL && (
              <div className="flex flex-col justify-center items-center bg-secondary p-10 rounded-sm outline-dashed outline-1">
                <CloudUpload size={64} className="mb-8" />
                <Button type="button" onClick={onChooseFile} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className=" animate-spin" />
                    </>
                  ) : (
                    "Upload File"
                  )}
                </Button>
              </div>
            )}

            {previewURL && (
              <div className="flex flex-col justify-center items-center p-14 rounded-sm">
                <img src={previewURL} alt="Image Preview" className="mb-4" />

                {!loading && (
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewURL(null);
                    }}
                  >
                    <CircleX />
                  </Button>
                )}
              </div>
            )}

            {/* {selectedFile && (
              <div className="flex flex-col justify-center items-center p-14 rounded-sm">
                <Button onClick={clearFile}>
                  <CircleX />
                </Button>
              </div>
            )} */}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label className="text-lg">
              Description<span className="text-red-500 text-xl">*</span>
            </Label>
            <JoditEditor
              className="text-black border border-gray-300 rounded-md p-2"
              ref={editor}
              config={config}
              value={formValues.content}
              onChange={(newContent) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  content: newContent,
                }))
              }
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreatePost;
