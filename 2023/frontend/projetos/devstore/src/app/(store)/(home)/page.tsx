export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum velit
      similique maxime, autem ea, ratione quae ullam doloribus, repellendus
      aliquam sit est totam eum. Tempore recusandae odit aliquam omnis neque?
    </p>
  )
}
