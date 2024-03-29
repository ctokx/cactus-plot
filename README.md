# Cactus Plot Library

Cactus Plot is a library for creating dynamic and interactive plots, with support for React. It allows easy integration into React applications and provides a seamless experience for creating cactus plots.

## Installation

Install the library using npm:

```bash
npm install cactus-plot
```

## Usage in React

To use the Cactus Plot in a React application, import the `ReactCactusPlot` component:

```javascript
import ReactCactusPlot from "cactus-plot/react";
```

Use the `ReactCactusPlot` component in your application:

```jsx
<ReactCactusPlot dataSets={dataSets} options={options} />
```

### Props

- `dataSets`: An array of objects representing the data series to be plotted. Each object should include:

  - `data`: An array of numbers for the data points.
  - `color`: The color of the data series.
  - `symbol`: The symbol used in the plot.
  - `lineWidth`: The thickness of the line.
  - `lineStyle`: The style of the line ('solid', 'dashed', or 'dotted').
  - `symbolFontSize`: The size of the symbols in the plot.

- `options`: An object with various settings for the plot:
  - `showXAxisValues`: Whether to display values on the X-axis.
  - `showYAxisValues`: Whether to display values on the Y-axis.
  - `yMax`: The maximum value on the Y-axis.
  - `threshold`: A threshold value highlighted in the plot.
  - `thresholdColor`: The color of the threshold area.
  - `showLines`: Whether to connect the data points with lines.

### Example

Here's how to use `ReactCactusPlot` in a React application:

```jsx
import React from "react";
import ReactCactusPlot from "cactus-plot/react";

function App() {
  const dataSets = [
    {
      data: [1400, 400, 600, 800, 406],
      color: "red",
      symbol: "x",
      lineWidth: 2,
      lineStyle: "dashed",
      symbolFontSize: 40,
    },
  ];

  const options = {
    showXAxisValues: true,
    showYAxisValues: true,
    yMax: 10000,
    threshold: 5000,
    showLines: true,
    thresholdColor: "rgba(255, 0, 0, 0.1)",
  };

  return (
    <div>
      <ReactCactusPlot dataSets={dataSets} options={options} />
    </div>
  );
}

export default App;
```

## Contributing

Contributions to improve Cactus Plot are welcome. Feel free to fork the repository and submit pull requests.

## License

Cactus Plot is [MIT licensed](./LICENSE).
