const positions = [];
for (let i = 1; i < 4; i += 1) {
  for (let j = 1; j < 4; j += 1) {
    positions.push({ column: j, row: i });
  }
}

export default positions;
