export default {
  history: [
    {
      squares: Array(9).fill({ value: null, highlighted: false }),
      position: null,
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  sortAsc: true,
  winner: '',
};
