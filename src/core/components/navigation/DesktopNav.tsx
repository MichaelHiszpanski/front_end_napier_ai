"use client";
import Link from "next/link";
import { links } from "./links";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useAuth } from "@/core/providers/AuthProvider";

interface DekstopNavProps {
  handleSingOut: () => void;
}

const DekstopNav: FC<DekstopNavProps> = ({ handleSingOut }) => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  return (
    <div className="hidden sm:flex items-center gap-6">
      {isSignedIn && (
        <>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                (
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href)
                )
                  ? "text-cyan-600 font-medium"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={handleSingOut}
            className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
};

export default DekstopNav;
