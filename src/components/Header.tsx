import logo from "../assets/logo-todo.svg";
export function Header() {
  return (
    <header className="w-full min-h-[200px] bg-[--gray-700] flex justify-center items-center">
      <img src={logo} />
    </header>
  );
}
