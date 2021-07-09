const formatInThousands = (value) => {
  if (typeof value !== 'number') {
    return undefined;
  }

  if (value < 1000) {
    return value;
  }

  return `${parseFloat((value / 1000).toFixed(1))}k`;
};

export default formatInThousands;
