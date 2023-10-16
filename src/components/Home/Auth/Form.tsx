import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CircleNotch, Eye, EyeClosed } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../../services/auth/registerUser";
import { loginWithEmailAndPassword } from "../../../services/auth/loginWithEmailAndPassword";
import { throwLoginError } from "../../../utils/throwLoginError";
import { registerCredential } from "../../../services/auth/registerCredential";

interface FormProps {
  isLogin: boolean;
}

export function Form({ isLogin }: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ---------- HOOK FORM CONFIG ---------- //

  const formSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(
        8,
        isLogin
          ? "Senha inválida (mín. 8 caracteres)"
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

  const { email, password } = watch();

  // ---------- FORM SUBMIT EVENT ---------- //

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;

    setIsLoading(true);

    if (isLogin) {
      try {
        const user = await loginWithEmailAndPassword(email, password);
        await registerCredential(user);
        navigate("/admin");
      } catch ({ code }: any) {
        throwLoginError(code);
        setIsLoading(false);
      }
      return;
    }

    try {
      const user = await createAccount(email, password);
      await registerCredential(user);
      navigate("/admin");
    } catch ({ code }: any) {
      throwLoginError(code);
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div data-filled={!!email?.length} className="group relative">
          <label
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-zinc-700 transition-all duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-zinc-100 group-data-[filled=true]:left-2 group-data-[filled=true]:top-0 group-data-[filled=true]:text-zinc-100"
            htmlFor="email"
          >
            Endereço de E-mail
          </label>
          <input
            {...register("email")}
            id="email"
            autoComplete="email"
            className="autofill-dark h-12 w-full rounded-md border border-zinc-700 bg-transparent px-4 text-sm text-zinc-100 group-data-[filled=true]:border-zinc-100"
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-zinc-700 transition-all duration-300 group-focus-within:left-2 group-focus-within:top-0 group-focus-within:text-zinc-100 group-data-[filled=true]:left-2 group-data-[filled=true]:top-0 group-data-[filled=true]:text-zinc-100"
            htmlFor="password"
          >
            Senha
          </label>
          <div className="flex gap-1 rounded-md border border-zinc-700 focus-within:outline focus-within:outline-1 focus-within:outline-white group-data-[filled=true]:border-zinc-100">
            <input
              {...register("password")}
              id="password"
              autoComplete="senha"
              className="autofill-dark h-12 w-full bg-transparent px-4 text-sm text-zinc-100 outline-none"
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
        data-loading={isLoading}
        className="mt-2 grid h-12 place-items-center rounded-md bg-sky-500 font-medium text-zinc-100 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 data-[loading=false]:hover:brightness-90"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircleNotch className="h-6 w-6 animate-spin text-zinc-100" />
        ) : (
          "Continuar"
        )}
      </button>
    </form>
  );
}
