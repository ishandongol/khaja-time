from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import aiofiles
from matplotlib.pyplot import axis
from tensorflow import keras
import os
import numpy as np
import pandas as pd

origins = ["*"]

app = FastAPI()
current_file_dir = os.getcwd()
model_path = os.path.join(current_file_dir, 'my_model.h5')
reconstructed_model = keras.models.load_model(
    model_path)

test_generator = keras.preprocessing.image.ImageDataGenerator(
    preprocessing_function=keras.applications.mobilenet_v2.preprocess_input
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
async def read_item(file: UploadFile):
    fileExtension = file.filename.split('.')[-1]
    fileName = "predict.{0}".format(fileExtension)
    async with aiofiles.open(fileName, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write
    file_path = os.path.join(
        current_file_dir, fileName)
    print(file_path, "here")
    image_df = pd.DataFrame({'Filepath': [file_path], "Label": ['predict']})
    predict_images = test_generator.flow_from_dataframe(
        dataframe=image_df,
        x_col='Filepath',
        y_col='Label',
        target_size=(224, 224),
        color_mode='rgb',
        class_mode='categorical',
        batch_size=4,
        shuffle=False
    )
    predictions = np.argmax(
        reconstructed_model.predict(predict_images))
    return {"label": str(predictions)}
