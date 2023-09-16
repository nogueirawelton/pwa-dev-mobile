import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { OAuthButton } from "./OAuthButton";
import { GithubLogo, GoogleLogo } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";

export function AuthForm() {
  const { pathname } = useLocation();

  const formSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password:
      pathname == "/login"
        ? z.string()
        : z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const { email, password } = watch();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[300px] space-y-2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div data-filled={!!email?.length} className="group relative">
              <label
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-zinc-700 transition-all duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-zinc-100 group-data-[filled=true]:left-2 group-data-[filled=true]:top-0 group-data-[filled=true]:text-white"
                htmlFor="email"
              >
                Endereço de E-mail
              </label>
              <input
                {...register("email")}
                id="email"
                className="h-14 w-full rounded-md border border-zinc-700 bg-transparent px-4 text-zinc-100 group-data-[filled=true]:border-zinc-100"
                type="email"
              />
            </div>
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>
          <div>
            <div data-filled={!!password?.length} className="group relative">
              <label
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-zinc-700 transition-all duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-zinc-100 group-data-[filled=true]:left-2 group-data-[filled=true]:top-0 group-data-[filled=true]:text-white"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                {...register("password")}
                id="password"
                className="h-14 w-full rounded-md border border-zinc-700 bg-transparent px-4 text-zinc-100 group-data-[filled=true]:border-zinc-100"
                type="password"
              />
            </div>
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
          <button
            className="mt-4 h-14 rounded-md bg-sky-500 font-medium text-zinc-100"
            type="submit"
          >
            Continuar
          </button>
        </form>
        <OAuthButton
          className="flex h-14 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GoogleAuthProvider()}
        >
          <GoogleLogo className="h-5 w-5" weight="bold" />
          Continuar com o Google
        </OAuthButton>
        <OAuthButton
          className="flex h-14 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GithubAuthProvider()}
        >
          <GithubLogo className="h-5 w-5" weight="bold" />
          Continuar com o Github
        </OAuthButton>
      </div>
    </div>
  );
}
