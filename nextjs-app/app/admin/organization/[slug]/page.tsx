export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  return (
    <div>
      <h1>Organization: {slug}</h1>
      <p>Organization details page placeholder</p>
    </div>
  )
}