import hydrate from 'next-mdx-remote/hydrate'

export const components = {
  p: ({ children }) => <p className="mb-5 text-lg">{children}</p>,
};

export const Content = ({ source }) => {
  const content = hydrate(source, { components });

  return (
    <div className="w-full">
      {content}
    </div>
  );
};
