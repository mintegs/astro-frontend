/** @jsxImportSource react */

import { useState } from "react";
import Modal from "../common/modal";
import CreatePortfolioForm from "./createPortfolioForm";

export default function CreatePortfolio() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="relative max-w-xs card border-2 border-dashed cursor-pointer text-center group transition-colors duration-150"
        style={{ borderColor: 'var(--gh-border)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gh-accent)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gh-border)' }}
      >
        <div className="mb-6 flex items-center justify-center">
          <div className="h-11 w-11 rounded-full flex justify-center items-center" style={{ backgroundColor: 'var(--gh-bg-muted)', color: 'var(--gh-accent-emphasis)' }}>
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
        <h4 className="text-sm font-medium leading-snug mb-2" style={{ color: 'var(--gh-fg)' }}>
          ایجاد سبد سرمایه گذاری
        </h4>
      </div>
      {modal && (
        <Modal title="ایجاد سبد جدید" close={() => setModal(false)}>
          <CreatePortfolioForm />
        </Modal>
      )}
    </>
  );
}
