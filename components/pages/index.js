import { format } from "date-fns";

export const HomePage = ({ accounts, categories }) => {
  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex max-w-5xl mx-auto p-4">
          <a className="my-auto" href="/">
            Content
          </a>
        </div>
      </div>
      <div className="flex max-w-5xl mx-auto">
        <div className="py-4 w-2/3">
          <div className="font-bold leading-tight text-2xl tracking-tight p-4">
            Publications
          </div>
          {accounts.map((account) => {
            return (
              <div className="flex flex-wrap w-full" key={`account-${account.id}`}>
                <div className="ml-auto p-4 w-2/3">
                  <h2 className="font-bold leading-tight text-xl tracking-tight">
                    {account.title}
                  </h2>
                  <p className="mb-2 text-gray-700">
                    by {account.name} •{" "}
                    {format(new Date(account.date), "MM/yy")}
                  </p>
                  <p className="text-gray-500">{account.description}.</p>
                </div>
                <div className="px-4 w-full">
                  <div className="border-b w-full" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="py-4 w-1/3">
          <div className="font-bold leading-tight text-2xl tracking-tight p-4">
            Categories
          </div>
          <div className="p-4">
            {categories.map((category) => {
              return (
                <button
                  className="border border-current leading-none mb-2 mr-2 p-4 rounded text-gray-500"
                  key={`category-${category.id}`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountPage = ({ account }) => {
  return (
    <div className="w-full">
      <div className="border-b w-full">
        <div className="flex max-w-3xl mx-auto p-4">
          <a className="my-auto" href="/">
            {account.title}
          </a>
          <button className="bg-black hover:bg-gray-500 leading-none ml-auto p-4 rounded text-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
