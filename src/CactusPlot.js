export class CactusPlot {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
  }

  addDataSet({
    data,
    color,
    symbol,
    lineWidth = 1,
    lineStyle = "solid",
    symbolFontSize = 16,
  }) {
    if (
      this.dataSets.length > 0 &&
      data.length !== this.dataSets[0].data.length
    ) {
      throw new Error("All datasets must have the same length");
    }

    this.dataSets.push({
      data,
      color,
      symbol,
      lineWidth,
      lineStyle,
      symbolFontSize,
    });
  }

  draw(options = {}) {
    const {
      showXAxisValues = true,
      showYAxisValues = true,
      yMax = null,
      threshold = null,
      thresholdColor = "rgba(0, 0, 0, 0.1)",
      showLines = true,
    } = options;

    if (this.dataSets.length === 0) return;

    const padding = 50;
    const width = this.canvas.width - 2 * padding;
    const height = this.canvas.height - 2 * padding;
    const allData = this.dataSets.flatMap((ds) => ds.data);
    const maxVal = yMax !== null ? yMax : Math.max(...allData);
    const maxDataLength = Math.max(
      ...this.dataSets.map((ds) => ds.data.length)
    );
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw axes
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([]);
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, padding + height);
    this.ctx.lineTo(padding + width, padding + height);
    this.ctx.stroke();

    if (threshold !== null) {
      const thresholdY = padding + (1 - threshold / maxVal) * height;
      this.ctx.fillStyle = thresholdColor;
      // Fill from threshold to the top of the plot
      this.ctx.fillRect(padding, padding, width, thresholdY - padding);
    }

    // Draw axes labels
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("X", padding + width + 15, padding + height + 5);
    this.ctx.fillText("Y", padding - 5, padding - 15);

    if (showYAxisValues) {
      for (let i = 0; i <= 5; i++) {
        const text = Math.round((maxVal / 5) * i);
        const textWidth = this.ctx.measureText(text).width;
        this.ctx.fillText(
          text,
          padding - 10 - textWidth,
          padding + height - (i / 5) * height
        );
      }
    }

    this.dataSets.forEach(
      ({ data, color, symbol, lineWidth, lineStyle, symbolFontSize }) => {
        if (showLines) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = color;
          this.ctx.lineWidth = lineWidth;

          if (lineStyle === "dashed") {
            this.ctx.setLineDash([5, 5]);
          } else if (lineStyle === "dotted") {
            this.ctx.setLineDash([1, 3]);
          } else {
            this.ctx.setLineDash([]);
          }

          data.forEach((value, i) => {
            const x = padding + (i / (maxDataLength - 1)) * width;
            const y = padding + height - (value / maxVal) * height;
            if (i === 0) {
              this.ctx.moveTo(x, y);
            } else {
              this.ctx.lineTo(x, y);
            }
          });

          this.ctx.stroke();
        }

        this.ctx.fillStyle = color;
        this.ctx.font = `${symbolFontSize}px Arial`;

        data.forEach((value, i) => {
          const x = padding + (i / (maxDataLength - 1)) * width;
          const y = padding + height - (value / maxVal) * height;
          const metrics = this.ctx.measureText(symbol);
          const textHeight =
            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          const textWidth = metrics.width;
          const adjustedX = x - textWidth / 2;
          const adjustedY = y + textHeight / 2;

          this.ctx.fillText(symbol, adjustedX, adjustedY);
        });
      }
    );

    if (showXAxisValues) {
      this.ctx.fillStyle = "black";
      this.ctx.font = "16px Arial";
      this.dataSets.forEach(({ data }) => {
        data.forEach((value, i) => {
          const x = padding + (i / (maxDataLength - 1)) * width;
          this.ctx.fillText(i + 1, x, padding + height + 20);
        });
      });
    }
  }
}
