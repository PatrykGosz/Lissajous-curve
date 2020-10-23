document.addEventListener("DOMContentLoaded", () => {
  var A, B, a, b, phase, plot;
  var { ASlider, BSlider, aSlider, bSlider, phaseSlider } = getSliders();
  var { ALabel, BLabel, aLabel, bLabel, phaseLabel } = getLabels();


  updateSlidersEvents();
  updateValues();
  drawCurve(a, A, b, B, phase);


  function drawCurve(a, A, b, B, phase) {
    const objectSize = 400;

    if (plot) {
      plot.selectAll('*').remove();
    }

    plot = d3.select('#canvas')
      .attr('width', objectSize)
      .attr('height', objectSize)


    t = 0.01;
    while (t < 10) {
      startX = calcX(a, A, phase, t);
      startY = calcY(B, b, t);
      endX = calcX(a, A, phase, t + 0.01);
      endY = calcY(B, b, t + 0.01);


      plot.append('line')
        .style("stroke", "#DCDCDC")
        .style("stroke-width", 4)
        .attr("x1", (objectSize / 2) + startX)
        .attr("y1", (objectSize / 2) - startY)
        .attr("x2", (objectSize / 2) + endX)
        .attr("y2", (objectSize / 2) - endY);

      t += 0.01;
    }
  }

  function calcX(a, A, phase, t) {
    var x = A * Math.sin((a * t) + phase);
    return x;
  }

  function calcY(B, b, t) {
    var y = B * Math.sin(b * t);
    return y;
  }

  function getSliders() {
    var ASlider = document.getElementsByClassName("A-slider")[0];
    var BSlider = document.getElementsByClassName("B-slider")[0];
    var aSlider = document.getElementsByClassName("a-slider")[0];
    var bSlider = document.getElementsByClassName("b-slider")[0];
    var phaseSlider = document.getElementsByClassName("phase-slider")[0];

    return { ASlider, BSlider, aSlider, bSlider, phaseSlider };


  }

  function getLabels() {
    var ALabel = document.getElementById("A-label");
    var BLabel = document.getElementById("B-label");
    var aLabel = document.getElementById("a-label");
    var bLabel = document.getElementById("b-label");
    var phaseLabel = document.getElementById("phase-label");

    return { ALabel, BLabel, aLabel, bLabel, phaseLabel };
  }


  function updateValues() {
    A = document.getElementsByClassName("A-slider")[0].value;
    B = document.getElementsByClassName("B-slider")[0].value;
    a = document.getElementsByClassName("a-slider")[0].value;
    b = document.getElementsByClassName("b-slider")[0].value;
    phase = document.getElementsByClassName("phase-slider")[0].value;
    ALabel.innerHTML = document.getElementsByClassName("A-slider")[0].value;
    BLabel.innerHTML = document.getElementsByClassName("B-slider")[0].value;
    aLabel.innerHTML = document.getElementsByClassName("a-slider")[0].value;
    bLabel.innerHTML = document.getElementsByClassName("b-slider")[0].value;
    phaseLabel.innerHTML = document.getElementsByClassName("phase-slider")[0].value;
  }


  function updateSlidersEvents() {
    updateSliderValue(ASlider);
    updateSliderValue(BSlider);
    updateSliderValue(aSlider);
    updateSliderValue(bSlider);
    updateSliderValue(phaseSlider);
  }

  function updateSliderValue(slider) {
    slider.addEventListener("input", () => {
      updateValues();
      drawCurve(a, A, b, B, phase);
    });
  }
});