import { useAuth } from "../../../hooks/useAuth";

export function User() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <button className="flex select-none items-center gap-4 rounded-md bg-zinc-800 p-2 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700">
      {user?.profileImage ? (
        <img
          className="h-10 w-10 shrink-0 rounded-full"
          src={user.profileImage}
          alt=""
        />
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-100 text-lg font-medium uppercase leading-none">
          {user.email.charAt(0)}
        </span>
      )}

      <span className="truncate whitespace-nowrap">
        {user.name ? user.name : user.email}
      </span>
    </button>
  );
}
