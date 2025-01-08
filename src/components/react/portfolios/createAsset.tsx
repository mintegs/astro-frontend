/** @jsxImportSource react */

import { useState } from "react";
import Modal from "../common/modal";
import CreateAssetForm from "./createAssetFrom";

export default function CreatePortfolio() {
  const [modal, setModal] = useState(false);

  return (
    <>
        <div onClick={()=>setModal(true)} className="cursor-pointer bg-[#556ee6] text-white p-2.5 text-center text-base rounded-lg shadow-lg transition duration-300 ease-in-out">
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
