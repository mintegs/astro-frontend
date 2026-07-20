/** @jsxImportSource react */

import { useState } from "react";
import Modal from "../common/modal";
import CreateAssetForm from "./createAssetForm";

export default function CreateAsset() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="cursor-pointer py-2.5 px-5 text-center text-base rounded-md shadow-sm font-medium transition-colors duration-150"
        style={{ backgroundColor: 'var(--gh-accent-emphasis)', color: 'var(--gh-on-accent)' }}
      >
        ثبت دارایی جدید
      </div>
      {modal && (
        <Modal title="دارایی جدید" close={() => setModal(false)}>
          <CreateAssetForm />
        </Modal>
      )}
    </>
  );
}
