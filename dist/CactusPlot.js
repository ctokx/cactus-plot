"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CactusPlot = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CactusPlot = exports.CactusPlot = /*#__PURE__*/function () {
  function CactusPlot(canvas) {
    _classCallCheck(this, CactusPlot);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
  }
  return _createClass(CactusPlot, [{
    key: "addDataSet",
    value: function addDataSet(_ref) {
      var data = _ref.data,
        color = _ref.color,
        symbol = _ref.symbol,
        _ref$lineWidth = _ref.lineWidth,
        lineWidth = _ref$lineWidth === void 0 ? 1 : _ref$lineWidth,
        _ref$lineStyle = _ref.lineStyle,
        lineStyle = _ref$lineStyle === void 0 ? "solid" : _ref$lineStyle,
        _ref$symbolFontSize = _ref.symbolFontSize,
        symbolFontSize = _ref$symbolFontSize === void 0 ? 16 : _ref$symbolFontSize;
      if (this.dataSets.length > 0 && data.length !== this.dataSets[0].data.length) {
        throw new Error("All datasets must have the same length");
      }
      this.dataSets.push({
        data: data,
        color: color,
        symbol: symbol,
        lineWidth: lineWidth,
        lineStyle: lineStyle,
        symbolFontSize: symbolFontSize
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$showXAxisVal = options.showXAxisValues,
        showXAxisValues = _options$showXAxisVal === void 0 ? true : _options$showXAxisVal,
        _options$showYAxisVal = options.showYAxisValues,
        showYAxisValues = _options$showYAxisVal === void 0 ? true : _options$showYAxisVal,
        _options$yMax = options.yMax,
        yMax = _options$yMax === void 0 ? null : _options$yMax,
        _options$threshold = options.threshold,
        threshold = _options$threshold === void 0 ? null : _options$threshold,
        _options$thresholdCol = options.thresholdColor,
        thresholdColor = _options$thresholdCol === void 0 ? "rgba(0, 0, 0, 0.1)" : _options$thresholdCol,
        _options$showLines = options.showLines,
        showLines = _options$showLines === void 0 ? true : _options$showLines;
      if (this.dataSets.length === 0) return;
      var padding = 50;
      var width = this.canvas.width - 2 * padding;
      var height = this.canvas.height - 2 * padding;
      var allData = this.dataSets.flatMap(function (ds) {
        return ds.data;
      });
      var maxVal = yMax !== null ? yMax : Math.max.apply(Math, _toConsumableArray(allData));
      var maxDataLength = Math.max.apply(Math, _toConsumableArray(this.dataSets.map(function (ds) {
        return ds.data.length;
      })));
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
        var thresholdY = padding + (1 - threshold / maxVal) * height;
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
        for (var i = 0; i <= 5; i++) {
          var text = Math.round(maxVal / 5 * i);
          var textWidth = this.ctx.measureText(text).width;
          this.ctx.fillText(text, padding - 10 - textWidth, padding + height - i / 5 * height);
        }
      }
      this.dataSets.forEach(function (_ref2) {
        var data = _ref2.data,
          color = _ref2.color,
          symbol = _ref2.symbol,
          lineWidth = _ref2.lineWidth,
          lineStyle = _ref2.lineStyle,
          symbolFontSize = _ref2.symbolFontSize;
        if (showLines) {
          _this.ctx.beginPath();
          _this.ctx.strokeStyle = color;
          _this.ctx.lineWidth = lineWidth;
          if (lineStyle === "dashed") {
            _this.ctx.setLineDash([5, 5]);
          } else if (lineStyle === "dotted") {
            _this.ctx.setLineDash([1, 3]);
          } else {
            _this.ctx.setLineDash([]);
          }
          data.forEach(function (value, i) {
            var x = padding + i / (maxDataLength - 1) * width;
            var y = padding + height - value / maxVal * height;
            if (i === 0) {
              _this.ctx.moveTo(x, y);
            } else {
              _this.ctx.lineTo(x, y);
            }
          });
          _this.ctx.stroke();
        }
        _this.ctx.fillStyle = color;
        _this.ctx.font = "".concat(symbolFontSize, "px Arial");
        data.forEach(function (value, i) {
          var x = padding + i / (maxDataLength - 1) * width;
          var y = padding + height - value / maxVal * height;
          var metrics = _this.ctx.measureText(symbol);
          var textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          var textWidth = metrics.width;
          var adjustedX = x - textWidth / 2;
          var adjustedY = y + textHeight / 2;
          _this.ctx.fillText(symbol, adjustedX, adjustedY);
        });
      });
      if (showXAxisValues) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.dataSets.forEach(function (_ref3) {
          var data = _ref3.data;
          data.forEach(function (value, i) {
            var x = padding + i / (maxDataLength - 1) * width;
            _this.ctx.fillText(i + 1, x, padding + height + 20);
          });
        });
      }
    }
  }]);
}();