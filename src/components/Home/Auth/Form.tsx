import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { CircleNotch, Eye, EyeClosed } from "phosphor-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLocation } from "react-router-dom";
import throwLoginError from "../../../utils/throwLoginError";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../services/firebase";

interface FormProps {
  isLogin: boolean;
}

export function Form({ isLogin }: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const registeredEmail = new URLSearchParams(search).get("email") || "";

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
    defaultValues: {
      email: registeredEmail,
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  type FormData = z.infer<typeof formSchema>;

  const { email, password } = watch();

  // ---------- FORM SUBMIT EVENT ---------- //

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;

    setIsLoading(true);

    if (isLogin) {
      loginWithAccount(email, password);
      return;
    }
    createAccount(email, password);
  };

  // ---------- AUTH FUNCTIONS ---------- //

  const createAccount = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: "",
          email: user.email,
          profileImage: "",
          createdAt: user.metadata.creationTime,
        });
      })
      .catch((error) => {
        throwLoginError(error.code);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const loginWithAccount = useCallback((email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        throwLoginError(error.code);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
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
        data-loading={isLoading}
        className="mt-2 grid h-12 place-items-center rounded-md bg-sky-500 font-medium text-zinc-100 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 data-[loading=false]:hover:brightness-90"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircleNotch className="h-6 w-6 animate-spin text-white" />
        ) : (
          "Continuar"
        )}
      </button>
    </form>
  );
}
