interface TitleProps {
  isLogin: boolean;
}

export function Title({ isLogin }: TitleProps) {
  if (isLogin) {
    return (
      <div className="mb-10">
        <h2 className="text-center text-3xl font-bold text-zinc-100">
          Acesse sua Conta
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-center text-3xl font-bold text-zinc-100">
        Crie sua Conta
      </h2>
    </div>
  );
}
