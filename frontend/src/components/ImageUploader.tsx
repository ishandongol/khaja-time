interface ImageUploaderProps {
  onChange: (files: FileList | null) => void;
}
export const ImageUploader = (props: ImageUploaderProps) => {
  const { onChange } = props;
  return (
    <div className="border border-dashed rounded-md border-gray-500 border-2 relative">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          const {
            target: { files },
          } = e;
          onChange(files);
        }}
        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
      />
      <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
        <h4 className="font-bold">
          Drop image to predict
          <br />
          or
        </h4>
        <p className="border px-4 py-2 rounded-md border-gray-300 border-2">
          Select Image
        </p>
      </div>
    </div>
  );
};
