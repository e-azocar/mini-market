const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  return <div>My Post: {id}</div>
}

export default Product
