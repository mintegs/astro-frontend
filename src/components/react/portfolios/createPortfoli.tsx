/** @jsxImportSource react */

import { useState } from "react";
import Modal from "../common/modal";

export default function CreatePortfolio() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="relative max-w-xs card border-2 border-dashed cursor-pointer text-center group border-gray-500 hover:border-[#556ee6]"
      >
        <div className="mb-6 flex items-center justify-center">
          <div className="h-11 w-11 rounded-full flex justify-center items-center bg-gray-400 text-[#556ee6]">
            <svg
              width={20}
              height={20}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
        <h4 className="text-sm font-medium leading-snug mb-2">
          ایجاد سبد سرمایه گذاری
        </h4>
      </div>
      {modal && (
        <Modal title="ایجاد سبد جدید" close={() => setModal(false)}>
          <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-start">
              <div className="mt-3 sm:mt-0">
                <h3
                  className="text-base font-semibold text-gray-900"
                  id="modal-title"
                >
                  Deactivate account
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Deactivate
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
