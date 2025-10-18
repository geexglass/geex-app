export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
      <p>User details page placeholder</p>
    </div>
  )
}