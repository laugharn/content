import { Input } from "~/components/input";
import { LayoutRoot } from "~/components/layout";
import { POST } from '~/lib/http'
import { PrismaClient } from "@prisma/client";
import { Select } from "~/components/select";
import { Textarea } from "~/components/textarea";
import { useEffect } from 'react'
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { validator } from "~/lib/data";

const schema = {
  properties: {
    body: { minLength: 1, message: { minLength: "Required" }, type: "string" },
    channelId: { type: "number" },
    meta: {
      properties: {
        description: { maxLength: 140, type: "string" },
        title: { maxLength: 70, type: "string" },
      },
      type: "object",
    },
  },
  required: ["body", "channelId", "status"],
  type: "object",
};

const Page = ({ channels }) => {
  const { push } = useRouter();

  const form = useFormik({
    initialValues: {
      body: "",
      channelId: "",
      meta: {
        description: "",
        title: "",
      },
      status: "",
    },
    onSubmit: async (values) => {
      const post = await POST("/api/v1/posts", values)

      push(`/channels/${post.channel.name}/posts/${post.id}`);
    },
    validate: (values) => {
      return validator(values, schema);
    },
  });

  useEffect(() => {
      if (form.values?.channelId) {
          form.setFieldValue('channelId', parseInt(form.values.channelId))
      } 
  }, [form.values?.channelId])

  return (
    <LayoutRoot>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <form onSubmit={form.handleSubmit}>
          <div className="py-2 w-full">
            <Input
              error={form.errors.meta?.title}
              label="Title"
              name="meta.title"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              touched={form.touched.meta?.title}
              value={form.values.meta?.title}
            />
          </div>
          <div className="py-2 w-full">
            <Textarea
              error={form.errors.meta?.description}
              id="description"
              label="Descripition"
              name="meta.description"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              touched={form.touched.meta?.description}
              value={form.values.meta?.description}
            />
          </div>
          <div className="py-2 w-full">
            <Textarea
              error={form.errors.body}
              id="body"
              label="Body"
              name="body"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              touched={form.touched.body}
              value={form.values.body}
            />
          </div>
          <div className="py-2 w-full">
            <Select
              error={form.errors.status}
              label="Status"
              name="status"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              options={[
                { title: "Draft", value: "drafted" },
                { title: "Publish", value: "published" },
              ]}
              touched={form.touched.status}
              value={form.values.status}
            />
          </div>
          <div className="py-2 w-full">
            <Select
              error={form.errors.channelId}
              label="Channel"
              name="channelId"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              options={channels.map((channel) => ({
                title: channel.meta?.title,
                value: channel.id,
              }))}
              touched={form.touched.channelId}
              value={form.values.channelId}
            />
          </div>
          <div className="py-2 w-full">
            <button
              className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </LayoutRoot>
  );
};

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const channels = await prisma.channel
  .findMany({
    orderBy: {
      name: "asc",
    },
  })
  .then((response) => JSON.parse(JSON.stringify(response)))

  await prisma.$disconnect();

  return {
    props: {
      channels,
    },
  };
};

export default Page;
