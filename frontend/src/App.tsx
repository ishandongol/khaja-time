import { useCallback, useEffect, useState } from "react";
import { helloServer } from "./api/hello";
import { predictImage, PredictResponse } from "./api/predict";
import { ImageUploader } from "./components/ImageUploader";
import { Wrapper } from "./components/Wrapper";

function App() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictResponse>();
  const [error, setError] = useState<boolean>(false);
  const [failedToConnect, setFailedToConnect] = useState<boolean>(false);
  const [isConnectingToServer, setIsConnectingToServer] =
    useState<boolean>(false);

  useEffect(() => {
    const pingServer = async () => {
      try {
        setIsConnectingToServer(true);
        await helloServer();
        setFailedToConnect(false);
      } catch (err) {
        setFailedToConnect(true);
      } finally {
        setIsConnectingToServer(false);
      }
    };
    pingServer();
  }, []);

  const predict = useCallback(async (file: File) => {
    try {
      setIsPredicting(true);
      setError(false);
      const prediction = await predictImage(file);
      setPrediction(prediction);
    } catch (err) {
      setError(true);
      setPrediction(undefined);
    } finally {
      setError(false);
      setIsPredicting(false);
    }
  }, []);

  const handleChange = (files: FileList | null) => {
    if (files !== null) {
      setSelectedImage(URL.createObjectURL(files[0]));
      predict(files[0]);
    } else {
      setSelectedImage("");
    }
  };

  if (isConnectingToServer) {
    return (
      <div
        className="flex justify-center items-center flex-col gap-4"
        style={{
          height: "100vh",
        }}
      >
        <div className=" w-40 h-40 border-2 p-2 border-dashed animate-pulse rounded-md">
          <div className="bg-momo bg-cover bg-center bg-contain bg-no-repeat w-full h-full" />
        </div>
        <p className="text-3xl animate-pulse">Connecting to server.</p>
        <p className="text-xl">
          It may take some time to load as I am deployed on{" "}
          <span className="font-bold">Heroku Free Dyno</span>.
        </p>
      </div>
    );
  }

  if (failedToConnect) {
    return (
      <div
        className="flex justify-center items-center flex-col gap-4"
        style={{
          height: "100vh",
        }}
      >
        <div className=" w-40 h-40 border-2 p-2 border-dashed rounded-md">
          <div className="bg-momo bg-cover bg-center bg-contain bg-no-repeat w-full h-full" />
        </div>
        <p className="text-3xl">Failed to connect to server.</p>
        <p className="text-xl">
          Please <span className="font-bold">refresh</span> or try again{" "}
          <span className="font-bold">Later</span>.
        </p>
      </div>
    );
  }

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
                className={isPredicting ? "animate-pulse" : ""}
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
                {isPredicting ? (
                  "Predicting..."
                ) : error ? (
                  "Error"
                ) : (
                  <p className="text-5xl">{prediction?.label}</p>
                )}
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
