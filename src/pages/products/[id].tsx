import { useRouter } from 'next/router'

export default function Product(): JSX.Element {
  const { query } = useRouter()

  return <div>{query.id}</div>
}
