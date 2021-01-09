export interface IPickModel {
  id: string;
  power: number;
}

interface IRequestDTO {
  quantity: number;
  allIds: IPickModel[];
}

const randomPick = ({ quantity, allIds }: IRequestDTO): string[] => {
  let i = 0;
  const picks: string[] = [];

  const addCharWeight = allIds.map(char => {
    return {
      ...char,
      over: (100 - char.power) / 1,
    };
  });

  const arraySorteio: string[] = [];

  const minWeight = 1;

  addCharWeight.forEach(char => {
    const repeticoes = Math.floor(char.over / minWeight);
    for (i = 0; i < repeticoes; i++) {
      arraySorteio.push(char.id);
    }
  });

  console.log(arraySorteio);

  for (i = 0; i < quantity; i++) {
    const posicaoSorteada = Math.floor(Math.random() * arraySorteio.length);
    const pick = arraySorteio[posicaoSorteada];
    picks.push(pick);
  }

  return picks;
};

export default randomPick;
