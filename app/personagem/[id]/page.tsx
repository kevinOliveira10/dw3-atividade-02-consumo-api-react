// app/personagem/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
};

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

async function CharacterContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full relative bg-slate-800">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover min-h-[300px] md:min-h-[400px]"
        />
      </div>
      <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
            character.status === 'Alive' ? 'bg-emerald-500/20 text-emerald-400' : 
            character.status === 'Dead' ? 'bg-red-500/20 text-red-400' : 
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {character.status}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-2">
          {character.name}
        </h1>
        
        <p className="text-lg text-slate-400 mb-6 border-b border-slate-800 pb-6">
          {character.species} • {character.gender}
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Origem</p>
            <p className="text-slate-200 text-lg">{character.origin?.name || 'Desconhecida'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Localização Atual</p>
            <p className="text-slate-200 text-lg">{character.location?.name || 'Desconhecida'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> 
        Voltar ao catálogo
      </Link>

      <Suspense fallback={<p className="text-center text-slate-400 text-xl mt-10">Carregando detalhes...</p>}>
        <CharacterContent params={params} />
      </Suspense>
    </main>
  );
}