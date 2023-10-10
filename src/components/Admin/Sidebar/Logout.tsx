import { CaretDown } from "phosphor-react";
import { useAuth } from "../../../hooks/useAuth";

export function Logout() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <button className="flex select-none items-center justify-between gap-4 rounded-md bg-zinc-800 p-2 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700">
      {user?.profileImage ? (
        <img
          className="h-10 w-10 shrink-0 rounded-full"
          src={user.profileImage}
          alt=""
        />
      ) : (
        <span className="h-10 w-10 shrink-0 rounded-full border border-white text-2xl font-medium">
          {user.email.charAt(0)}
        </span>
      )}

      <span className="truncate whitespace-nowrap">
        {user.name ? user.name : user.email}
      </span>
      <CaretDown className="h-3 w-3 shrink-0" />
    </button>
  );
}
