import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { OAuthButton } from "./OAuthButton";
import { Eye, EyeClosed, GithubLogo, GoogleLogo } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function AuthForm() {
  const { pathname } = useLocation();
  const isLoginPage = pathname == "/login";
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(
        8,
        isLoginPage
          ? "Senha inválida"
          : "A senha deve ter no mínimo 8 caracteres",
      ),
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
      {isLoginPage ? (
        <div className="mb-10 w-full max-w-[320px]">
          <h2 className="text-center text-3xl font-bold text-zinc-100">
            Acesse sua Conta
          </h2>
        </div>
      ) : (
        <div className="mb-10 w-full max-w-[320px]">
          <h2 className="text-center text-3xl font-bold text-zinc-100">
            Crie sua Conta
          </h2>
        </div>
      )}
      <div className="w-full max-w-[320px] space-y-2">
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
                autoComplete="email"
                className="h-12 w-full rounded-md border border-zinc-700 bg-transparent px-4 text-sm text-zinc-100 group-data-[filled=true]:border-zinc-100"
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
              <div className="flex gap-1 rounded-md border border-zinc-700 focus-within:outline focus-within:outline-1 focus-within:outline-white group-data-[filled=true]:border-zinc-100">
                <input
                  {...register("password")}
                  id="password"
                  autoComplete="senha"
                  className="h-12 w-full bg-transparent px-4 text-sm text-zinc-100 outline-none"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Esconder Senha" : "Mostrar Senha"}
                  aria-pressed={showPassword}
                  className="grid w-12 shrink-0 place-items-center"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? (
                    <EyeClosed className="h-6 w-6 text-zinc-700" />
                  ) : (
                    <Eye className="h-6 w-6 text-zinc-700" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
          <button
            className="mt-2 h-12 rounded-md bg-sky-500 font-medium text-zinc-100 transition-all duration-300 hover:brightness-90"
            type="submit"
          >
            Continuar
          </button>
        </form>
        {isLoginPage ? (
          <span className="block py-2 text-center text-sm text-zinc-100">
            Não tem uma conta?{" "}
            <Link className="font-medium text-sky-500" to="/signup">
              Cadastre-se
            </Link>
          </span>
        ) : (
          <span className="block py-2 text-center text-sm text-zinc-100">
            Já possui uma conta?{" "}
            <Link className="font-medium text-sky-500" to="/login">
              Fazer Login
            </Link>
          </span>
        )}
        <div className="flex items-center gap-2 py-2">
          <span className="h-[.5px] w-full bg-zinc-500"></span>
          <span className="text-sm uppercase text-zinc-500">Ou</span>
          <span className="h-[.5px] w-full bg-zinc-500"></span>
        </div>
        <OAuthButton
          className="flex h-12 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GoogleAuthProvider()}
        >
          <GoogleLogo className="h-5 w-5" weight="bold" />
          Continuar com o Google
        </OAuthButton>
        <OAuthButton
          className="flex h-12 w-full items-center justify-center gap-4 rounded-md border border-zinc-700 px-5 text-zinc-100 transition-colors duration-300 hover:bg-zinc-700"
          provider={new GithubAuthProvider()}
        >
          <GithubLogo className="h-5 w-5" weight="bold" />
          Continuar com o Github
        </OAuthButton>
      </div>
    </div>
  );
}
