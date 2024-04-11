const Modal = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg overflow-hidden relative">
                <div className="flex justify-end p-2">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-4 font-semibold text-lg text-blue-gray-900">
                    {title}
                </div>
                <div className="p-4 text-blue-gray-500">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
