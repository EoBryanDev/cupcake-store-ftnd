import Link from "next/link";
import { Button } from "../ui/button";

interface INotFoundPage {
  error: string;
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
  btnMessage: string;
}
const NotFoundPage = ({
  error,
  title,
  description,
  link,
  children,
  btnMessage,
}: INotFoundPage) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold">{error}</h1>
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {children}
      <Button asChild>
        <Link href={link}>{btnMessage}</Link>
      </Button>
    </div>
  );
};
export { NotFoundPage };
