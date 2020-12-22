import faker from "faker";
import { upperFirst } from "lodash";

export const createPost = () => {
  return {
    body: faker.lorem.paragraphs(5),
    description: `${upperFirst(faker.lorem.words(12))}.`,
    id: faker.random.uuid(),
    image: `https://via.placeholder.com/800x450/${faker.internet
      .color()
      .replace("#", "")}/ffffff`,
    title: faker.random
      .words(4)
      .split(" ")
      .map((word) => upperFirst(word))
      .join(" "),
  };
};

export const createPosts = (length = 5) => {
  return [...Array(length)].map(() => {
    return createPost();
  });
};
