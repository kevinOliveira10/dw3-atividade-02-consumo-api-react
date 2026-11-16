// app/page.tsx
import Link from 'next/link';
import { Suspense } from 'react';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

async function getCharacters(): Promise<Character[]> {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  if (!res.ok) throw new Error('Falha ao buscar os personagens');
  const data = await res.json();
  return data.results;
}

async function CharactersList() {
  const characters = await getCharacters();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <Link href={`/personagem/${character.id}`} key={character.id} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer h-full flex flex-col">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-slate-700 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${character.status === 'Alive' ? 'bg-emerald-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
              {character.status}
            </div>
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
              {character.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{character.species}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
          Rick and Morty API
        </h1>
        <p className="text-slate-400 text-lg">Explore os personagens do multiverso</p>
      </div>

      <Suspense fallback={<p className="text-center text-slate-400 text-xl mt-10">Carregando catálogo...</p>}>
        <CharactersList />
      </Suspense>
    </main>
  );
}