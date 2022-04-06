export const Wrapper = ({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <>
      <p className="font-extrabold mb-2">{title}</p>
      <div
        className={`w-full h-full border border-dashed border-gray-500 p-4 rounded-md border-2 flex justify-center items-center ${className}`}
      >
        {children}
      </div>
    </>
  );
};
