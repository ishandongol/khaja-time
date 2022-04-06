import { useCallback, useEffect, useState } from "react";
import { ImageUploader } from "./components/ImageUploader";
import { Wrapper } from "./components/Wrapper";

function App() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [predicting, setPredicting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const predict = useCallback(async () => {
    if (selectedImage) {
      try {
        setPredicting(true);
        setError(false);
        // TODO: call api
      } catch (err) {
        setError(true);
      } finally {
        setError(false);
        setPredicting(false);
      }
    }
  }, [selectedImage]);

  useEffect(() => {
    predict();
  }, [selectedImage, predict]);

  const handleChange = (files: FileList | null) => {
    if (files !== null) {
      setSelectedImage(URL.createObjectURL(files[0]));
    } else {
      setSelectedImage("");
    }
  };
  return (
    <div
      className="flex md:gap-10 p-5 md:p-10 justify-center h-full w-full items-center"
      style={{
        height: "100vh",
      }}
    >
      {/* <div className="p-5 border-dashed border-gray-500 h-full md:w-1/2  hidden md:block border rounded-md border-2">
        <div className="bg-ai bg-center bg-contain w-full bg-no-repeat h-full" />
      </div> */}
      <div className="md:w-1/2 h-full">
        <div className="flex flex-col justify-between h-full">
          <p className="font-extrabold text-3xl md:text-4xl">Khaja Time</p>
          <div className="flex gap-6 flex-grow justify-center items-center">
            <div className="w-1/2 h-1/2">
              <Wrapper
                title="Selected Image"
                className={predicting ? "animate-pulse" : ""}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    className="w-full h-full object-contain"
                    key={selectedImage}
                  />
                ) : (
                  "None"
                )}
              </Wrapper>
            </div>
            <div className="w-1/2 h-1/2">
              <Wrapper title="Prediction">
                {predicting ? "Predicting..." : <>None</>}
              </Wrapper>
            </div>
          </div>
          <ImageUploader onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
