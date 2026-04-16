'use client";';
import Link from "next/link";
import { links } from "./links";
import { FC } from "react";
import { useAuth } from "@/core/hooks/useAuth";

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pathname: string;
  handleSignOut: () => void;
}

const MobileNav: FC<MobileNavProps> = ({
  open,
  setOpen,
  pathname,
  handleSignOut,
}) => {
  const isSignedIn = useAuth();
  return (
    <>
      {isSignedIn && open && (
        <div className="sm:hidden border-t border-cyan-600/30 px-4 py-3 flex flex-col gap-3 bg-white dark:bg-zinc-900">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${
                (
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href)
                )
                  ? "text-cyan-600 font-medium"
                  : "text-zinc-500"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="text-sm text-left text-zinc-500 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default MobileNav;
