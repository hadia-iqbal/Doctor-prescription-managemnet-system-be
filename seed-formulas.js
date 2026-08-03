const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const formulas = [
  {
    name: 'Migraine Formula A',
    category: 'Headache',
    actualComposition: 'Belladonna 30 - 5 drops, Nat Mur 6x - 4 tablets',
    prepInstruction: 'Mix in 30ml bottle. Shake well before use.',
  },
  {
    name: 'Digestive Formula B',
    category: 'Digestive',
    actualComposition: 'Nux Vomica 30 - 5 drops, Carbo Veg 6x - 4 tablets',
    prepInstruction: 'Take before meals, 3 times daily.',
  },
  {
    name: 'Skin Allergy Formula C',
    category: 'Skin',
    actualComposition: 'Sulphur 30 - 4 drops, Rhus Tox 30 - 4 drops, Graphites 6x - 3 tablets',
    prepInstruction: 'Mix drops in 30ml bottle. Tablets packed separately.',
  },
  {
    name: 'Fever Relief Formula D',
    category: 'Fever',
    actualComposition: 'Belladonna 30 - 5 drops, Ferrum Phos 6x - 4 tablets',
    prepInstruction: 'Give every 3 hours until fever subsides.',
  },
  {
    name: 'Cold Cough Formula E',
    category: 'Respiratory',
    actualComposition: 'Aconite 30 - 5 drops, Bryonia 30 - 4 drops',
    prepInstruction: 'Take 3 times daily with warm water.',
  },
  {
    name: 'Joint Pain Formula F',
    category: 'Musculoskeletal',
    actualComposition: 'Rhus Tox 30 - 5 drops, Bryonia 30 - 4 drops',
    prepInstruction: 'Apply gentle massage, take drops twice daily.',
  },
  {
    name: 'Calm Sleep Formula G',
    category: 'Mental Health',
    actualComposition: 'Coffea Cruda 30 - 4 drops, Passiflora Q - 10 drops',
    prepInstruction: 'Take 30 minutes before bedtime.',
  },
  {
    name: 'Allergy Relief Formula H',
    category: 'Allergy',
    actualComposition: 'Allium Cepa 30 - 5 drops, Sabadilla 30 - 4 drops',
    prepInstruction: 'Take 3 times daily during allergy season.',
  },
];

async function main() {
  for (const formula of formulas) {
    await prisma.formula.create({ data: formula });
    console.log(`Added: ${formula.name}`);
  }
  console.log('All formulas added successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });