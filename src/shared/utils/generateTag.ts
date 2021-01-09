const generateTag = (payload: string) => {
  let tag = payload.split('').slice(0, 4).join('');
  const numbers: string[] = [];

  for (let i = 0; i < 4; i++) {
    const number = Math.round(Math.random() * 9).toString();
    numbers.push(number);
  }

  const randomTag = numbers.join('');

  tag = `${tag}#${randomTag}`;
  return tag;
};

export default generateTag;
