import { Alert, Button, Rating, Spinner, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import request from "../utils/request";
import { useToast } from "../context/toastContext";

function Feedback() {
  document.title = "Phản hồi";
  const MAX_LENGTH_CONTENT = 1000;
  const [formData, setFormData] = useState({
    rate: 0,
    content: "",
  });
  const {addMessage} =useToast()
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [ratingError, setRatingError] = useState(false);
  const [errorContent, setErrorContent] = useState({
    error: false,
    message: "",
  });
  const handleChangeRating = (value) => {
    if (ratingError) {
      setRatingError(false);
    }
    setFormData({
      ...formData,
      rate: value,
    });
  };
  const handleChangeContent = (e) => {
     setFormData({
       ...formData,
       content: e.target.value,
     });
     setErrorContent({
       error: e.target.value.length > MAX_LENGTH_CONTENT,
       message: `Nội dung không được vượt quá ${MAX_LENGTH_CONTENT} ký tự`,
     });
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rate < 1) {
      setRatingError(true);
      return;
    }
    if (ratingError) {
      setRatingError(false);
    }
    try {
      const response  = await request('/feedback', {
        method: 'POST',
        body: formData
      })
      if(response.status === 'success') {
        setFormData({
          rate: response.data.rate,
          content: response.data.content
        });
      }
      addMessage(response)

    } catch (error) {
      console.log(error);
      
      addMessage({
        status: 'error',
        message: error.message || 'Lỗi '
      })
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingFeedback(true)
      try {
        const response = await request('/feedback')
        if(response.status === 'success') {
          setFormData(response.data || formData)
        }
      } catch (error) {
        console.log(error);
        
      }finally {
        setIsLoadingFeedback(false)
      }
    }
    fetchData()
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="max-w-2xl w-full">
          <div className="flex justify-center items-center px-4 py-2 h-full flex-col gap-4">
            {isLoadingFeedback && <Spinner />}

            {!isLoadingFeedback && (
              <form
                className="flex flex-col gap-4 w-full border p-4 rounded-md"
                onSubmit={handleSubmit}
              >
                <h1 className="text-2xl font-bold sm:text-4xl text-center">
                  Phản hồi
                </h1>
                <Rating
                  className="flex justify-center"
                  value={formData?.rate}
                  onChange={handleChangeRating}
                />
                <Alert color="red" open={ratingError}>
                  Vui lòng đánh giá sao
                </Alert>
                <Textarea
                  label="Nội dung phản hồi"
                  rows={15}
                  value={formData.content}
                  onChange={handleChangeContent}
                  required
                />
                <p className="flex justify-end w-full">
                  <span
                    className={`${
                      formData.content.length >= MAX_LENGTH_CONTENT
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {formData.content.length}
                  </span>
                  /<span>{MAX_LENGTH_CONTENT}</span>
                </p>
                <Alert open={errorContent.error} color="red">{errorContent.message}</Alert>
                <Button type="submit" className="bg-primary-500">
                  Xác nhận
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
