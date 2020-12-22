import faker from "faker";
import { upperFirst } from "lodash";

export const createChannel = (name) => {
  return {
    date: JSON.parse(JSON.stringify(faker.date.past())),
    description: upperFirst(faker.lorem.words(12)),
    id: faker.random.uuid(),
    image: `https://via.placeholder.com/800x450/${faker.internet
      .color()
      .replace("#", "")}/ffffff`,
    name: name ?? faker.random.word().toLowerCase(),
    owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: faker.name.jobTitle(),
  };
};

export const createChannelLink = (channel) => {
  if (process.env.NEXT_PUBLIC_GIT_COMMIT_REF != "main") {
    return `/channels/${channel.name}`;
  }
};

export const createChannels = (length = 5) => {
  return [...Array(length)].map(() => {
    return createChannel();
  });
};
