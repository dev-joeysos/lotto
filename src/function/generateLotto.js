export const generateLotto = () => {
  const lottoNumbers = new Set(); // Set()

  while (lottoNumbers.size < 7) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    lottoNumbers.add(randomNumber);
  }

  return Array.from(lottoNumbers);
};