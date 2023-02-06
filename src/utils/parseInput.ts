type ParseInput = (input: string) => {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string
}

export const parseInput: ParseInput = (input) => {
  // expected input: 1 EUR to USD
  // TODO: parse or tokenize the input string
  const splitInput = input.split(" ");
  return {
    fromAmount: Number(splitInput[0]),
    fromCurrency: splitInput[1],
    toCurrency: splitInput[3],
  };
};
