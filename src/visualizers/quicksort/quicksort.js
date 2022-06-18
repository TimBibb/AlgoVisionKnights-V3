import React from "react";
import "./quicksort.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";

class EmptyStep {
	forward(svg) {
		
	}

	fastForward(svg) {

	}

	backward(svg) {

	}
}

class ColorLowStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");

		// Change prevColor of old bar to whatever it's colored now
		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);
		
		// Fill previous bar with whatever it was before blue (if blue)
		if (color1 === "rgb(100, 143, 255)") {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		}

		svg.select("#lowTxt" + this.id1).attr("visibility", "hidden");
		svg.select("#lowTxt2_" + this.id1).attr("visibility", "hidden");
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== "gray") ? "visible" : "hidden");

		svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#648FFF");
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== "gray")
			{
				svg.select("#lowTxt2_" + this.id2).attr("visibility", "visible");
			}
			else
			{
				svg.select("#lowTxt" + this.id2).attr("visibility", "visible");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		// var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		// var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		// var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		// var prev2 = svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor");
		
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		// svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);

		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", prev2);
		// svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);
	}
}

class ColorHighStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		
		// Change prevColor of new bar to whatever it's colored now
		svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);

		// Fill previous bar with whatever it was before red (if red)
		if (color1 === "rgb(239, 63, 136)") {
			svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		}

		svg.select("#highTxt" + this.id1).attr("visibility", "hidden");
		svg.select("#highTxt2_" + this.id1).attr("visibility", "hidden");
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== "gray") ? "visible" : "hidden");

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#EF3F88");
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== "gray")
			{
				svg.select("#highTxt2_" + this.id2).attr("visibility", "visible");
			}
			else
			{
				svg.select("#highTxt" + this.id2).attr("visibility", "visible");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		// var color1 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		// var color2 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");
		// var prev1 = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");
		// var prev2 = svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor");
		
		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prev1);
		// svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color1);

		// svg.select("#" + this.ids[this.id2]).select("rect").style("fill", prev2);
		// svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);
	}
}

class ColorPivotStep {
	constructor(id1, ids) {
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg) {
		var color = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", color);
		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#FFCE36");
		svg.select("#pivTxt" + this.id1).attr("visibility", "visible");
		svg.select("#arrowpath" + this.id1).attr("visibility", "visible");
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		// var prevColor = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");

		// svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prevColor);
		// svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", "gray");
	}
}

class PartitionStep {
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	forward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").transition().duration(this.stepTime).attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").transition().duration(this.stepTime).attr("y", newytxt);
        }
	}

	fastForward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}

	backward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}
}

class UnpartitionStep {
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

    forward(svg) {
        if (this.id2 !== this.ids.length - 1) {
            svg.select("#divisor").attr("visibility", "visible");
            svg.select("#sortTxt").attr("visibility", "visible");
        }

        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").transition().duration(this.stepTime).attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").transition().duration(this.stepTime).attr("y", newytxt);
        }
	}

	fastForward(svg) {
        if (this.id2 !== this.ids.length - 1) {
            svg.select("#divisor").attr("visibility", "visible");
            svg.select("#sortTxt").attr("visibility", "visible");
        }

        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}

	backward(svg) {
        for (var i = this.id1; i <= this.id2; i++) {
            var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) - 100;
            svg.select("#" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#" + this.ids[i]).select("text").attr("y", newytxt);
        }
	}
}

class SortedStep {
	constructor(id1, ids, stepTime) {
		this.id1 = id1;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	forward(svg) {

        svg.selectAll(".arrowpath").attr("visibility", "hidden");
		svg.selectAll(".ptrTxt").attr("visibility", "hidden");

		var prev = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");

        svg.select("#" + this.ids[this.id1]).select("rect").style("fill", "#1ACA1E");
		svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", prev);

		for (var i = 0; i < this.ids.length; i++) {
			if (i === this.id1)
				continue;

			var color = svg.select("#" + this.ids[i]).select("rect").style("fill");

			if (color !== "rgb(26, 202, 30)") {
				svg.select("#" + this.ids[i]).select("rect").attr("prevColor", color);
				svg.select("#" + this.ids[i]).select("rect").style("fill", "gray");
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
        // svg.selectAll(".arrowpath").attr("visibility", "hidden");
		// svg.selectAll(".insertTxt").attr("visibility", "hidden");

        // for (var i = 0; i < this.ids.length; i++) {
		// 	var color = svg.select("#" + this.ids[i]).select("rect").attr("prevColor");

		// 	svg.select("#" + this.ids[i]).select("rect").style("fill", color);
		// }
	}
}

class SwapStep {
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
		this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

	runSwap(svg) {

		if (this.id1 === this.id2) {
			return;
		}

		var newxbar1 = svg.select("#" + this.ids[this.id2]).select("rect").attr("x");
		var newxbar2 = svg.select("#" + this.ids[this.id1]).select("rect").attr("x");

		var newxtxt1 = svg.select("#" + this.ids[this.id2]).select("text").attr("x");
		var newxtxt2 = svg.select("#" + this.ids[this.id1]).select("text").attr("x");

		console.log("SWAPPING.");

		svg.select("#" + this.ids[this.id1])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar1);

		svg.select("#" + this.ids[this.id1])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt1);

		svg.select("#" + this.ids[this.id2])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar2);

		svg.select("#" + this.ids[this.id2])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt2);

		var bar1 = svg.select("#" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);

		var newColor2 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var newColor1 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", newColor1);
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", newColor2);
	}

	fastSwap(svg) {

		if (this.id1 === this.id2) {
			return;
		}

		var newxbar1 = svg.select("#" + this.ids[this.id2]).select("rect").attr("x");
		var newxbar2 = svg.select("#" + this.ids[this.id1]).select("rect").attr("x");

		var newxtxt1 = svg.select("#" + this.ids[this.id2]).select("text").attr("x");
		var newxtxt2 = svg.select("#" + this.ids[this.id1]).select("text").attr("x");

		console.log("SWAPPING.");

		svg.select("#" + this.ids[this.id1])
			.select("rect")
				.attr("x", newxbar1);

		svg.select("#" + this.ids[this.id1])
			.select("text")
				.attr("x", newxtxt1);

		svg.select("#" + this.ids[this.id2])
			.select("rect")
				.attr("x", newxbar2);

		svg.select("#" + this.ids[this.id2])
			.select("text")
				.attr("x", newxtxt2);

		var bar1 = svg.select("#" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);

		var newColor2 = svg.select("#" + this.ids[this.id1]).select("rect").style("fill");
		var newColor1 = svg.select("#" + this.ids[this.id2]).select("rect").style("fill");

		svg.select("#" + this.ids[this.id1]).select("rect").style("fill", newColor1);
		svg.select("#" + this.ids[this.id2]).select("rect").style("fill", newColor2);
	}

	forward(svg) {
		this.runSwap(svg);
	}

	fastForward(svg) {
		this.fastSwap(svg);
	}

	backward(svg) {
		this.fastSwap(svg);
	}
}

export default class QuickSort extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			arr: [],
			size: 10,
			steps: [],
			ids: [],
			messages: [],
			running: false,
			stepId: 0,
			stepTime: 300,
			waitTime: (9 * 2000) / 8
		};

		this.ref = React.createRef();

		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
	}

	printArray(arr, size) {
		for (let i = 0; i < size; i++)
		{
			console.log(arr[i]);
		}
	}

	quickSort(low, high, arr, size, ids, steps, messages, stepTime)
    {
        var split;
        if (low < high)
        {
			messages.push("<h1>Recursively calling QuickSort from index " + low + " through " + high + ".</h1>");
            steps.push(new PartitionStep(low, high, ids, stepTime));
             

            split = this.partition(low, high, arr, ids, steps, messages, stepTime);

			messages.push("<h1>Returned from calling QuickSort from index " + low + " through " + high + ".</h1>");
			steps.push(new UnpartitionStep(low, high, ids, stepTime));            
             
            this.quickSort(low, split - 1, arr, split - low, ids, steps, messages, stepTime);
            this.quickSort(split + 1, high, arr, high - split + 1, ids, steps, messages, stepTime);
        }
        else
        {
            if(low > -1 && low < size)
            {
                if (low > high)
                {
                    return;
                }
                
				messages.push("<h1>Recursively calling QuickSort on index " + low + ".</h1>");
				steps.push(new PartitionStep(low, low, ids, stepTime));

				messages.push("<h1>Index " + low + " is a single element partition. It is already in its sorted position.</h1>");
				steps.push(new SortedStep(low, ids, stepTime));
                 
				messages.push("<h1>Index " + low + " is a single element partition. It is already in its sorted position.</h1>");
				steps.push(new UnpartitionStep(low, low, ids, stepTime));

            }    
            else if (low <= high)
            {
				messages.push("<h1>Recursively calling QuickSort on index " + high + ".</h1>");
				steps.push(new PartitionStep(high, high, ids, stepTime));

				messages.push("<h1>Index " + high + " is a single element partition. It is already in its sorted position.</h1>");
				steps.push(new SortedStep(high, ids, stepTime));

				messages.push("<h1>Index " + high + " is a single element partition. It is already in its sorted position.</h1>");
				steps.push(new UnpartitionStep(high, high, ids, stepTime));

            }
        }
    }

    partition(low, high, arr, ids, steps, messages, stepTime)
    {
        var pivot = low++; 
        var pHigh = high;

        
        // Set/color the pointers
        messages.push("<h1>Index " + low + " is the Low pointer.</h1>");
		steps.push(new ColorLowStep(low, low, ids));

        messages.push("<h1>Index " + high + " is the High pointer.</h1>");
		steps.push(new ColorHighStep(high, high, ids));

        messages.push("<h1>Index " + pivot + " is the pivot.</h1>");
		steps.push(new ColorPivotStep(pivot, ids));

        while (low <= high)
        {
            while (low <= high && arr[low] <= arr[pivot]){
                
                if (low === pHigh)
                {
                    messages.push("<h1>Low is not greater than the Pivot AND has reached the end of the array.</h1>");
					steps.push(new EmptyStep());

                    low++;
                     
                    break;

                }
                else
                {
					messages.push("<h1>Low is not greater than the Pivot, move Low to the right.</h1>");
					steps.push(new ColorLowStep(low, ++low, ids));
                }
            }

            if (low <= high && arr[low] > arr[pivot])
            {
				messages.push("<h1>Low is greater than the Pivot, switch to High Pointer.</h1>");
				steps.push(new EmptyStep());                 
            }

            while (high >= low && arr[high] > arr[pivot]){
				messages.push("<h1>High is not less than the Pivot, move High to the left.</h1>");
				steps.push(new ColorHighStep(high, --high, ids));                 
            }

            if (high >= low && arr[high] <= arr[pivot])
            {
                messages.push("<h1>High is less than the Pivot. Swap Low and High!</h1>");
				steps.push(new EmptyStep());
            }

            if (low < high)
            {
                [arr[low], arr[high]] = [arr[high], arr[low]];

				messages.push("<h1>High is less than the Pivot. Swap Low and High!</h1>");
				steps.push(new SwapStep(low, high, ids, stepTime));

                messages.push("<h1>After swapping positions, move both pointers.</h1>");
				steps.push(new EmptyStep());

				messages.push("<h1>After swapping positions, move both pointers.</h1>");
				steps.push(new ColorLowStep(low, ++low, ids));

				messages.push("<h1>After swapping positions, move both pointers.</h1>");
				steps.push(new ColorHighStep(high, --high, ids));             
            }
        }
		
        // Finally we swap the pivot with the point high was pointing to
		[arr[pivot], arr[high]] = [arr[high], arr[pivot]];

		messages.push("<h1>High and Low pointers have crossed. Swap High and Pivot!</h1>");
		steps.push(new SwapStep(pivot, high, ids, stepTime));
        
		messages.push("<h1>Pivot is now in its sorted spot.</h1>");
		steps.push(new SortedStep(high, ids, stepTime));
         
        return high;
    }

    sort(arr, ids, size, stepTime)
	{
		var steps = [];
		var messages = [];

		messages.push("<h1>Beginning Quick Sort!</h1>");
		steps.push(new EmptyStep());

        this.quickSort(0, size - 1, arr, size, ids, steps, messages, stepTime);

		console.log("Sorted");
		this.printArray(arr, size);

		messages.push("<h1>Finished Quick Sort!</h1>");
		steps.push(new EmptyStep());

		this.setState({steps: steps});
		this.setState({messages: messages});

		console.log(steps);
		console.log(messages);
	}

	dataInit() {
		var arr = [];

		// fills arr with random numbers [15, 70]
		for (let i = 0; i < this.state.size; i++)
		{
			arr[i] = 15 + Math.floor(Math.random() * 56);
		}

		console.log("Unsorted");
		this.printArray(arr, this.state.size);

		this.setState({arr: arr});
	}

	initialize() {
		const barWidth = 70;
		const barOffset = 30;
		const height = 500;

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(this.state.arr)])
			.range([0, height]);

		var svg = d3.select(this.ref.current)
			.append("svg")
				.attr("width", (this.state.size * (barWidth + barOffset)) + 100)
				.attr("height", height + 250);

		var bars = svg.selectAll(".bar")
					.data(this.state.arr)
					.enter().append("g")
					.attr("class", "bar")
					.attr("id", function (_, i) {
						return "g" + i;
					});
		
		bars.append("rect")
				.attr("width", barWidth)
				.attr("height", (d) => {
					return yScale(d);
				})
				.attr("x", (_, i) => {
					return (i * (barWidth + barOffset)) + 65;
				})
				.attr("y", (d) => {
					return (height + 100) - yScale(d);
				})
				.style("fill", "gray")
				.attr("prevColor", "gray");

		bars.append("text")
				.text((d) => {
					return d;
				})
				.attr("y", (height + 100) - 15)
				.attr("x", (_, i) => {
					return i * (barWidth + barOffset) + (barWidth / 2) + 65;
				})
				.style("text-anchor", "middle")
				.style("font-size", "28px")
				.style("fill", "white");

		bars.append("defs")
			.append("marker")
				.attr("id", "arrow")
				.attr("viewBox", [0, 0, 50, 50])
				.attr("refX", 25)
				.attr("refY", 25)
				.attr("markerWidth", 50)
				.attr("markerHeight", 50)
				.attr("orient", "auto-start-reverse")
			.append("path")
				.attr("d", d3.line()([[0, 0], [0, 50], [50, 25]]))
				.attr("fill", "white");

		bars.append("path")
			.attr("d", (_, i) => {
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 85], [i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 35]]);
			})
			.attr("stroke-width", 1)
			.attr("stroke", "white")
			.attr("marker-end", "url(#arrow)")
			.attr("fill", "white")
			.attr("class", "arrowpath")
			.attr("id", (_, i) => {
				return "arrowpath" + i;
			})
			.attr("visibility", "hidden");

		bars.append("text").text("Low")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "lowTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		bars.append("text").text("Low")
			.attr("y", height + 145)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "lowTxt2_" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

        bars.append("text").text("High")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "highTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		bars.append("text").text("High")
			.attr("y", height + 145)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "highTxt2_" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

        bars.append("text").text("Pivot")
			.attr("y", height + 115)
			.attr("x", (_, i) => {
				return i * (barWidth + barOffset) + (barWidth / 2) + 65;
			})
			.attr("class", "ptrTxt")
			.attr("id", (_, i) => {
				return "pivTxt" + i;
			})
			.style("text-anchor", "middle")
			.style("font-family", "Merriweather")
			.attr("font-weight", "bold")
			.style("font-size", "26px")
			.style("fill", "white")
			.attr("visibility", "hidden");

		var ids = [];

		for (let i = 0; i < this.state.size; i++)
		{
			ids.push("g" + i);
		}

		this.setState({ids: ids});

		svg.attr("visibility", "hidden");

		return svg;
	}

	turnOffRunning() {
		this.setState({running: false});
	}

	forward() {
		console.log("FORWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId === this.state.steps.length) return;
		
		this.state.steps[this.state.stepId].fastForward(d3.select(this.ref.current).select("svg"));
		console.log(this.state.steps[this.state.stepId]);
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	backward() {
		console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;

		var stepId = this.state.stepId - 1;

		// Easy backward functions so just run that
		if (this.state.steps[stepId] instanceof EmptyStep || this.state.steps[stepId] instanceof PartitionStep ||
			this.state.steps[stepId] instanceof UnpartitionStep || this.state.steps[stepId] instanceof SwapStep) {
				console.log(this.state.steps[stepId]);
				this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
		}
		else { // Or make a new svg and run steps up until step before
			d3.select(this.ref.current).select("svg").remove();

			var svg = this.initialize();

			for (var i = 0; i < stepId; i++) {
				this.state.steps[i].fastForward(svg);
				console.log(this.state.steps[i]);
			}

			svg.attr("visibility", "visible");
		}

		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Insertion Sort!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.state.waitTime);
	}

	run() {
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		d3.timeout(this.run, this.state.waitTime);
	}

	play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true});
		this.run(d3.select(this.ref.current).select("svg"));
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");

		var svg = d3.select(this.ref.current).select("svg");
		console.log(svg);

        svg.remove();
		console.log("Removed og");

        document.getElementById("message").innerHTML = "<h1>Welcome to Quick Sort!</h1>";

		console.log("Reset state");
		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	componentDidMount() {
		this.dataInit();
	}

	componentDidUpdate(prevProps, prevState) {
			var svg = d3.select(this.ref.current).select("svg");

		// Data array changed in dataInit -> Make visual
		if (this.state.arr.length > prevState.arr.length) {
			svg = this.initialize();
			svg.attr("visibility", "visible");
		}
		// IDs array changed in initialize -> sort copy of array to get steps and messages
		else if (this.state.ids.length > prevState.ids.length) {
			console.log("We initialized. Time to sort.");
			this.sort([...this.state.arr], this.state.ids, this.state.size, this.state.stepTime);
		}
		// Running changed
		else if (this.state.running !== prevState.running)
		{
			this.run(svg);
			console.log("We ran");
		}
		// For reset
        else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
			console.log("We're restarting");
			svg = this.initialize();
			console.log("Made it out");
			svg.attr("visibility", "visible");
			console.log("All good");
		}
	}

	render() {
		return (
			<div>
				<div class="center-screen" id="banner">
					<button class="button" onClick={this.play}>Play</button>
					<button class="button" onClick={this.pause}>Pause</button>
					<button class="button" onClick={this.restart}>Restart</button>
					<button class="button" onClick={this.backward}>Step Backward</button>
					<button class="button" onClick={this.forward}>Step Forward</button>
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Quick Sort!</h1></span></div>
				<div ref={this.ref} class="center-screen"></div>
			</div>
		)
	}
}