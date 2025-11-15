import { Construction } from "lucide-react";

const ConstructionPage = () => {
  return (
    <div className="flex flex-col">
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-2xl font-semibold">Page in construction</h2>
          <p className="text-muted-foreground mb-6">
            We are working on this page. Soon it will be available!
          </p>

          <Construction size={"5rem"} className="mb-4 text-yellow-500" />
        </div>
      </main>
    </div>
  );
};

export { ConstructionPage };
