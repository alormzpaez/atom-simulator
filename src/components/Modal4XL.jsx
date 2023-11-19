import React from "react";

const Modal4XL = ({isOpen = false, onClose, title, children}) => {
    return (
        <>
            {isOpen ?
                <div
                id="authentication-modal"
                tabindex="-1"
                aria-hidden="true"
                class="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full cursor-pointer"
                onClick={onClose}
                >
                <div class="relative p-4 w-full max-w-3xl max-h-full cursor-default" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div class="relative rounded-lg shadow bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 class="text-xl font-semibold text-white">
                        {title}
                        </h3>
                        <button
                        type="button"
                        class="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={onClose}
                        >
                        <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        {children}
                    </div>
                    </div>
                </div>
                </div>
            :
                null}
        </>
    );
};

export default Modal4XL;
