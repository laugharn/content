import { LayoutRoot } from '~/components/layout'
import { withSession } from '~/lib/session'

const Page = () => {
  return <LayoutRoot>Home</LayoutRoot>
}

export const getServerSideProps = withSession(async (context) => {
  const user = context.req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: `/get-started?redirect=/home`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
})

export default Page
