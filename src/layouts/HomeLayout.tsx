import { Link, Outlet, useLocation } from "react-router-dom";
import homeIllustration from "/img/home-illustration.svg";
import { motion } from "framer-motion";
import { User } from "phosphor-react";
import { Logo } from "../components/Logo";
import { useEffect } from "react";
import { throwErrorMessage } from "../utils/throwErrorMessage";
import { useStore } from "../stores/userData";

export function HomeLayout() {
  const { pathname } = useLocation();
  const isHome = pathname == "/";

  const userData = useStore((state) => state.userData);

  useEffect(() => {
    if (!isHome) {
      if (!navigator.onLine && !userData) {
        throwErrorMessage("Fique online para acessar sua conta!");
      }
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-zinc-700 bg-zinc-900 px-4 lg:px-8">
        <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between">
          <Link to="/" title="Kpz Finances">
            <Logo className="h-10 w-10" color="#f5f5f5" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-4 rounded-md bg-zinc-700 px-3 py-2 font-medium text-zinc-100 transition-all duration-300 hover:brightness-90"
          >
            <span className="inline-block rounded-full bg-sky-500 p-1">
              <User className="text-zinc-900" weight="bold" />
            </span>
            Entrar
          </Link>
        </div>
      </header>
      <main className="px-4 pt-20 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-screen-xl gap-4 md:min-h-home-content md:grid-cols-2 md:items-center lg:mt-0">
          <div
            data-home={isHome}
            className="order-1 pb-4 text-zinc-100 data-[home=false]:hidden md:order-none md:pb-0 data-[home=false]:md:block"
          >
            <strong className="text-lg lg:text-xl">
              👋 Olá, Seja bem-vindo!
            </strong>
            <h1 className="mt-7 text-4xl font-black lg:text-6xl">
              Gestão Financeira <br />
              Simples e Eficiente
            </h1>
            <p className="mt-6 font-medium">
              Organize suas finanças de forma descomplicada
              <br className="hidden md:block" /> e obtenha um controle total.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block rounded-md bg-sky-500 px-5 py-3 font-medium text-zinc-100 transition-all  duration-300 hover:brightness-90 lg:text-lg"
            >
              Cadastre-se
            </Link>
          </div>
          <div>
            {isHome ? (
              <motion.div
                initial={{
                  y: "2rem",
                  opacity: 0,
                }}
                animate={{
                  y: "0",
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <img
                  width={520}
                  height={520}
                  className="mx-auto max-h-[250px] md:ml-auto md:mr-0 md:max-h-[550px]"
                  src={homeIllustration}
                  alt=""
                />
              </motion.div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
