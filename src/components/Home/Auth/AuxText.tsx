import { Link } from "react-router-dom";

interface AuxTextProps {
  isLogin: boolean;
}

export function AuxText({ isLogin }: AuxTextProps) {
  if (isLogin) {
    return (
      <span className="block py-2 text-center text-sm text-zinc-100">
        Não tem uma conta?
        <Link className="ml-2 font-medium text-sky-500" to="/signup">
          Cadastre-se
        </Link>
      </span>
    );
  }

  return (
    <span className="block py-2 text-center text-sm text-zinc-100">
      Já possui uma conta?
      <Link className="ml-2 font-medium text-sky-500" to="/login">
        Fazer Login
      </Link>
    </span>
  );
}
