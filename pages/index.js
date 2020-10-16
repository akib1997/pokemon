import Layout from "./../components/Layout";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokedex App">
      <h1 className="text-3xl text-center mb-12">NextJS Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img
                  src={pokeman.image}
                  className="w-20 h-20 mr-3"
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold"> {index + 1} </span>
                <span> {pokeman.name} </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(
        "00" +
        (index + 1)
      ).slice(-3)}.png`;
      return {
        ...result,
        image,
      };
    });

    return {
      props: { pokemon },
    };
  } catch (err) {
    console.log(err);
  }
}
