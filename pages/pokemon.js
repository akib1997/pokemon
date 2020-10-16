import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default function pokemon({ pokeman }) {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">
        {pokeman.id}. {pokeman.name}
      </h1>
      <div className="w-full">
        <img src={pokeman.image} className="mx-auto" alt={pokeman.name} />
      </div>

      <Link href="/">
        <a className="bg-grey-400">Back To Home</a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();

    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
      "00" + id
    ).slice(-3)}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.log(err);
  }
}
