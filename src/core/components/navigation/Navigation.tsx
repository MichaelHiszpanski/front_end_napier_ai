"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tokenStorage } from "@/core/utils/local_storage";
import DekstopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import CustomWarningModal from "@/core/components/CustomWarningModal/CustomWarningModal";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  function confirmSignOut() {
    tokenStorage.remove();
    router.push("/");
  }

  return (
    <>
      <nav className="bg-white dark:bg-zinc-900 border-b border-cyan-600/30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
            i18n Manager
          </span>

          <DekstopNav handleSingOut={() => setShowSignOutModal(true)} />

          <button
            className="sm:hidden text-zinc-500 focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>

        <MobileNav
          handleSignOut={() => setShowSignOutModal(true)}
          open={open}
          setOpen={setOpen}
          pathname={pathname}
        />
      </nav>

      {showSignOutModal && (
        <CustomWarningModal
          message="Are you sure you want to sign out?"
          onConfirm={confirmSignOut}
          onCancel={() => setShowSignOutModal(false)}
        />
      )}
    </>
  );
}
