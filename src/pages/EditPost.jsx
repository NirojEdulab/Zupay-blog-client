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
import { API_URL } from "@/constants/Constants";
import axios from "axios";
import JoditEditor from "jodit-react";
import { CircleArrowLeft, CircleX, CloudUpload, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    shortDescription: "",
    content: "",
  });
  const [originalValues, setOriginalValues] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const editor = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const config = useMemo(
    () => ({
      readonly: loading ? true : false,
      toolbar: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      toolbarInlineForSelection: true,
      showPlaceholder: false,
    }),
    []
  );

  useEffect(() => {
    // Fetch the existing post data
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/${postId}`, {
          withCredentials: true,
        });
        const { title, shortDescription, content, image } = response.data.data;
        setOriginalValues({ title, shortDescription, content, image });
        setFormValues({ title, shortDescription, content });
        setSelectedFile(image);
        setPreviewURL(image);
      } catch (error) {
        toast.error("Failed to load post data.");
        console.error(
          "Error fetching post data:",
          error.response || error.message
        );
      }
    };

    fetchPostData();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file (JPG, PNG, GIF).");
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("image can not be empty");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();

      // Append only changed fields to formData
      if (formValues.title !== originalValues.title) {
        formData.append("title", formValues.title);
      }
      if (formValues.shortDescription !== originalValues.shortDescription) {
        formData.append("shortDescription", formValues.shortDescription);
      }
      if (formValues.content !== originalValues.content) {
        formData.append("content", formValues.content);
      }
      if (selectedFile !== originalValues.image) {
        formData.append("image", selectedFile);
      }

      await axios
        .put(`${API_URL}/posts/${postId}`, formData, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate(`/posts/${postId}`);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update the post.");
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10 border border-2-secondary rounded-md p-2">
      <form onSubmit={handleEditSubmit}>
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-4xl">Edit your Blog</CardTitle>
          <CardDescription>Here you can change your blog...</CardDescription>
          <div className="text-end">
            <Link to={"/"}>
              <Button variant="outline">
                <CircleArrowLeft />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
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
            <Label>Short Description</Label>
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
                    "Upload"
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
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <JoditEditor
              className="text-black"
              ref={editor}
              config={config}
              value={formValues.content}
              onChange={(newContent) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  content: newContent,
                }))
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className=" animate-spin" />
              </>
            ) : (
              "Confirm Edit"
            )}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default EditPost;
