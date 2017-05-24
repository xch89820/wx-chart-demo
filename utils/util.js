let dataGenerator = (labels, keys = ['value'], min = 10, max = 50) => {
  return labels.map(label => {
    let d = {
      label: label
    };
    keys.map(key => {
      d[key] = Math.floor(Math.random() * (max - min + 1) + min);
    });
    return d;
  });
}

exports.dataGenerator = dataGenerator;