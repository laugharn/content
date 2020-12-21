import dynamic from "next/dynamic";
import faker from "faker";
import { upperFirst } from "lodash";

const AccountPage = dynamic(() =>
  import("~/components/pages").then((m) => m.AccountPage)
);

const HomePage = dynamic(() =>
  import("~/components/pages").then((m) => m.HomePage)
);

const createAccount = (key) => {
  return {
    date: JSON.parse(JSON.stringify(faker.date.past())),
    description: upperFirst(faker.lorem.words(12)),
    id: faker.random.uuid(),
    key: key ?? faker.random.word(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: faker.name.jobTitle(),
  };
};

const Page = (props) => {
  return props.account ? <AccountPage {...props} /> : <HomePage {...props} />;
};

export const getServerSideProps = async (context) => {
  let account;
  // TODO: Actual subdomains
  // context.req.headers.host.split('.content.test:3000').filter(part => part.length > 0)[0] ||
  const subdomain = context.query.account;

  if (subdomain) {
    account = createAccount(subdomain);
  }

  if (subdomain && !account) {
    return {
      notFound: true,
    };
  }

  if (subdomain && account) {
    return {
      props: {
        account,
      },
    };
  }

  const accounts = [...Array(5)].map(() => {
    return createAccount();
  });

  return {
    props: {
      accounts,
      categories: [...Array(10)].map(() => {
        return {
          id: faker.random.uuid(),
          title: upperFirst(faker.random.word()),
        };
      }),
    },
  };
};

export default Page;
