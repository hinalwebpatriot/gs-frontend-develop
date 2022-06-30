export default function generateLabels(arr, range, marginLeft = "-15%") {
  //arr is array of labels ['Poor', 'Fair', 'Good']
  //range is highlighted labels [1,3]
  const gray = "rgba(0, 0, 0, 0.45)";
  const black = "rgba(0, 0, 0, 1.0)";
  let labels = {
    0: { label: "", style: { display: "none" } }
  };

  arr.forEach((label, index) => {
    const realIndex = index + 1;
    labels[realIndex] = {
      label: label,
      style: {
        marginLeft: marginLeft,
        color: realIndex >= range[0] && realIndex <= range[1] ? black : gray
      }
    };
  });

  return labels;
}
