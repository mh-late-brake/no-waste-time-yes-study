export default function ImageModal({
  children,
  show,
  closeModal,
}: {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
}) {
  return (
    <div>
      <div
        className={`fixed left-64 top-0 flex h-screen w-[calc(100vw-16rem)] cursor-zoom-out flex-col items-center justify-center bg-[#24242444] backdrop-blur-sm ${show ? "" : "hidden"}`}
        onClick={() => closeModal()}
      >
        <div className="cursor-default" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
        <div className="text-lg text-gray-700">Click outside to close</div>
      </div>
    </div>
  );
}
