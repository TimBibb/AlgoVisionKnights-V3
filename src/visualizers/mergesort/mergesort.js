import React from "react";
import "./mergesort.css";
import * as d3 from "d3";
import "../css/button.css";
import "../css/messages.css";
import "../css/input.css";
import SpeedSlider from "../../components/speedSlider/SpeedSlider";
import {Pseudocode, HighlightLineStep} from "../../components/pseudocode/Pseudocode";

class EmptyStep {
	forward(svg) {
		
	}

	fastForward(svg) {

	}

	backward(svg) {

	}
}

class SliceStep{
	constructor(id1, id2){
		this.id1 = id1;
		this.id2 = id2;

		//id1 is the left side of the array
		//id2 is the complete array
	}

	forward(svg) {
		this.changeLocation(svg);
	}
 
	changeLocation(svg){
		let newArraySize = this.id1.length; 
	
		for(let i = 0; i < newArraySize; i++){ 
			svg.select("#" + this.id2[i]).select("rect")
				.attr("width", 50) 
				.attr("height", 50); 
		}
	}

}

class MoveStep{
	constructor(id){
		this.id = id;
	}

	forward(svg) {
		
	}

	/*translate(){
		return 
	}
	move(svg){
		svg.selectAll("rect").enter().append("rect")
		.attr("transform", translate)
		.attr("width", 20)
		.attr("height", 20)
	}*/
}

class FirstColor{
	constructor(id1, ids){
		this.id1 = id1;
		this.ids = ids;
	}

	forward(svg){
		svg.select("#g" + this.ids[this.id1]).select("rect").style("fill", localStorage.getItem('accentColor'));
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
		svg.select("#g" + this.ids[this.id1]).select("rect").style("fill", localStorage.getItem('accentColor'));
		svg.select("#g" + this.ids[this.id2]).select("rect").style("fill", localStorage.getItem('secondaryColor'));

		svg.selectAll(".qTxt").attr("visibility", "hidden");

		if (this.id1 !== this.id2) {
			svg.selectAll("#qTxt" + this.id1).attr("visibility", "visible");
		}
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
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== localStorage.getItem('secondaryColor')) ? "visible" : "hidden");

		svg.select("#" + this.ids[this.id2]).select("rect").attr("prevColor", color2);

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#" + this.ids[this.id2]).select("rect").style("fill", "#648FFF");
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== localStorage.getItem('secondaryColor'))
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

class MergeStep {
	constructor(id1, id2, ids) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
	}

	forward(svg) {
		// console.log(svg.select("#" + this.ids[this.id2]))
		if (svg.select("#g" + this.ids[this.id1]).select("rect")[0] == null ||
			svg.select("#g" + this.ids[this.id2]).select("rect")[0] == null) {
			return
		}
		console.log("starting merge step")
		var color1 = svg.select("#g" + this.ids[this.id1]).select("rect").style("fill");
		var color2 = svg.select("#g" + this.ids[this.id2]).select("rect").style("fill");
		var prev1 = svg.select("#g" + this.ids[this.id1]).select("rect").attr("prevColor");
		
		// Change prevColor of new bar to whatever it's colored now
		svg.select("#g" + this.ids[this.id2]).select("rect").attr("prevColor", color2);
		console.log("color changed merge")

		// Fill previous bar with whatever it was before red (if red)
		if (color1 === "rgb(239, 63, 136)") {
			svg.select("#g" + this.ids[this.id1]).select("rect").style("fill", prev1);
		}

		svg.select("#highTxt" + this.id1).attr("visibility", "hidden");
		svg.select("#highTxt2_" + this.id1).attr("visibility", "hidden");
		svg.select("#arrowpath" + this.id1).attr("visibility", (prev1 !== localStorage.getItem('secondaryColor')) ? "visible" : "hidden");

		// As long as the new bar isn't sorted
		if (color2 !== "rgb(26, 202, 30)") {
			svg.select("#g" + this.ids[this.id2]).select("rect").style("fill", localStorage.getItem('accentColor'));
			svg.select("#arrowpath" + this.id2).attr("visibility", "visible");

			if (color2 !== localStorage.getItem('secondaryColor'))
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
		 var prevColor = svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor");

		 svg.select("#" + this.ids[this.id1]).select("rect").style("fill", prevColor);
		 svg.select("#" + this.ids[this.id1]).select("rect").attr("prevColor", localStorage.getItem('secondaryColor'));
	}
}
class RaiseStep {
	constructor(partitionIds, stepTime) {
		this.partitionIds = partitionIds;
		this.stepTime = stepTime;
	}

	forward(svg) {
        for (var i = 0; i < this.partitionIds.length; i++) {
			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) - 100;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) - 100;

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
        }
	}

	fastForward(svg){
		this.forward(svg);
	}
	
	backward(svg){
		for (var i = 0; i < this.partitionIds.length; i++) {
			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) + 100;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) + 100;

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
        }
	}
}

class ConvergeStep{
	constructor(id, startId, offset, stepTime){
		this.id = id;
		this.startId = startId;
		this.offset = offset;
		this.stepTime = stepTime;
	}
	
	forward(svg) {
		var newxbar = parseInt(svg.select("#g" + this.startId).select("rect").attr("x")) + this.offset
		var newxtxt = parseInt(svg.select("#g" + this.startId).select("text").attr("x")) + this.offset

		var newybar = parseInt(svg.select("#g" + this.id).select("rect").attr("y")) + 110;
		var newytxt = parseInt(svg.select("#g" + this.id).select("text").attr("y")) + 110;
		console.log("steptime: " + this.stepTime)
		svg.select("#g" + this.id)
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar)
				.attr("y", newybar)

		svg.select("#g" + this.id)
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt)
				.attr("y", newytxt)

		// svg.select("#g" + this.id)
		// 	.select("rect")
		// 		.transition()
		// 		.duration(this.stepTime)
		// 		.attr("y", newybar);

		// svg.select("#g" + this.id)
		// 	.select("text")
		// 		.transition()
		// 		.duration(this.stepTime)
		// 		.attr("y", newytxt);
	}
	
	fastForward(svg){
		var newxbar = parseInt(svg.select("#g" + this.startId).select("rect").attr("x")) + this.offset
		var newxtxt = parseInt(svg.select("#g" + this.startId).select("text").attr("x")) + this.offset

		var newybar = parseInt(svg.select("#g" + this.id).select("rect").attr("y")) + 110;
		var newytxt = parseInt(svg.select("#g" + this.id).select("text").attr("y")) + 110;
		console.log("steptime: " + this.stepTime)
		svg.select("#g" + this.id)
			.select("rect")
				.attr("x", newxbar)
				.attr("y", newybar)

		svg.select("#g" + this.id)
			.select("text")
				.attr("x", newxtxt)
				.attr("y", newytxt)
	}

	backward(svg){
		var newxbar = parseInt(svg.select("#g" + this.startId).select("rect").attr("x")) - this.offset
		var newxtxt = parseInt(svg.select("#g" + this.startId).select("text").attr("x")) - this.offset

		var newybar = parseInt(svg.select("#g" + this.id).select("rect").attr("y")) - 110;
		var newytxt = parseInt(svg.select("#g" + this.id).select("text").attr("y")) - 110;
		
		svg.select("#g" + this.id)
			.select("rect")
				.attr("x", newxbar)
				.attr("y", newybar)

		svg.select("#g" + this.id)
			.select("text")
				.attr("x", newxtxt)
				.attr("y", newytxt)
	}
}

class PartitionStep {
	// 0 indexed, non inclusive ending
	constructor(start, mid, end, partitionIds, stepTime) {
		this.start = start;
		this.mid = mid;
        this.end = end;
		this.partitionIds = partitionIds;
		this.stepTime = stepTime;
	}

	forward(svg) {
        for (var i = this.start; i < this.mid; i++) {
            var newxbar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("x")) - 20;
            var newxtxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("x")) - 20;

			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) - 10;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) - 10;

            svg.select("#g" + this.partitionIds[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
        }

		for(var i = this.mid; i < this.end; i++){
			var newxbar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("x")) + 20;
            var newxtxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("x")) + 20;

			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) - 10;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) - 10;

            svg.select("#g" + this.partitionIds[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
		}
	}

	fastForward(svg){
		this.forward(svg);
	}

	backward(svg){
		for (var i = this.start; i < this.mid; i++) {
            var newxbar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("x")) + 20;
            var newxtxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("x")) + 20;

			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) + 10;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) + 10;

            svg.select("#g" + this.partitionIds[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
        }

		for(var i = this.mid; i < this.end; i++){
			var newxbar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("x")) - 20;
            var newxtxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("x")) - 20;

			var newybar = parseInt(svg.select("#g" + this.partitionIds[i]).select("rect").attr("y")) + 10;
            var newytxt = parseInt(svg.select("#g" + this.partitionIds[i]).select("text").attr("y")) + 10;

            svg.select("#g" + this.partitionIds[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.partitionIds[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.partitionIds[i]).select("text").attr("y", newytxt);
		}
	}

	// fastForward(svg) {
    //     for (var i = this.id1; i <= this.id2; i++) {
    //         var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) - 100;
    //         var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) - 100;
    //         svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
    //         svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
    //     }
	// }

	// backward(svg) {
    //     for (var i = this.id1; i <= this.id2; i++) {
    //         var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) + 100;
    //         var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) + 100;
    //         svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
    //         svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
    //     }
	// }
}

class UnpartitionStep{
	constructor(id1, id2, ids, stepTime) {
		this.id1 = id1;
        this.id2 = id2;
		this.ids = ids;
		this.stepTime = stepTime;
	}

    forward(svg) {
        // if (this.id2 !== this.ids.length - 1) {
        //     svg.select("#divisor").attr("visibility", "visible");
        //     svg.select("#sortTxt").attr("visibility", "visible");
        // }

        // for (var i = this.id1; i <= this.id2; i++) {
        //     // var newybar = parseInt(svg.select("#" + this.ids[i]).select("rect").attr("y")) + 100;
        //     // var newytxt = parseInt(svg.select("#" + this.ids[i]).select("text").attr("y")) + 100;
        //     // svg.select("#" + this.ids[i]).select("rect").transition().duration(this.stepTime).attr("y", newybar);
        //     // svg.select("#" + this.ids[i]).select("text").transition().duration(this.stepTime).attr("y", newytxt);
        // }

		for (var i = 0; i <= this.id1; i++) {
            var newxbar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("x")) + 20;
            var newxtxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("x")) + 20;

			var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) + 10;
            var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) + 10;

            svg.select("#g" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.ids[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
        }

		for(var i = this.id2; i < this.ids.length; i++){
			var newxbar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("x")) - 20;
            var newxtxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("x")) - 20;

			var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) + 10;
            var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) + 10;

            svg.select("#g" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.ids[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
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
        for (var i = 0; i <= this.id1; i++) {
            var newxbar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("x")) - 20;
            var newxtxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("x")) - 20;

			var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) - 10;
            var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) - 10;

            svg.select("#g" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.ids[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
        }

		for(var i = this.id2; i < this.ids.length; i++){
			var newxbar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("x")) + 20;
            var newxtxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("x")) + 20;

			var newybar = parseInt(svg.select("#g" + this.ids[i]).select("rect").attr("y")) - 10;
            var newytxt = parseInt(svg.select("#g" + this.ids[i]).select("text").attr("y")) - 10;

            svg.select("#g" + this.ids[i]).select("rect").attr("x", newxbar);
            svg.select("#g" + this.ids[i]).select("text").attr("x", newxtxt);

			svg.select("#g" + this.ids[i]).select("rect").attr("y", newybar);
            svg.select("#g" + this.ids[i]).select("text").attr("y", newytxt);
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
				svg.select("#" + this.ids[i]).select("rect").style("fill", localStorage.getItem('secondaryColor'));
			}
		}
	}

	fastForward(svg) {
		this.forward(svg);
	}

	backward(svg) {
         svg.selectAll(".arrowpath").attr("visibility", "hidden");
		 svg.selectAll(".insertTxt").attr("visibility", "hidden");

         for (var i = 0; i < this.ids.length; i++) {
		 	var color = svg.select("#" + this.ids[i]).select("rect").attr("prevColor");

		 	svg.select("#" + this.ids[i]).select("rect").style("fill", color);
		 }
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

		var newxbar1 = svg.select("#g" + this.ids[this.id2]).select("rect").attr("x");
		var newxbar2 = svg.select("#g" + this.ids[this.id1]).select("rect").attr("x");

		var newxtxt1 = svg.select("#g" + this.ids[this.id2]).select("text").attr("x");
		var newxtxt2 = svg.select("#g" + this.ids[this.id1]).select("text").attr("x");

		console.log("SWAPPING.");

		svg.select("#g" + this.ids[this.id1])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar1);

		svg.select("#g" + this.ids[this.id1])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt1);

		svg.select("#g" + this.ids[this.id2])
			.select("rect")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxbar2);

		svg.select("#g" + this.ids[this.id2])
			.select("text")
				.transition()
				.duration(this.stepTime)
				.attr("x", newxtxt2);

		var bar1 = svg.select("#g" + this.ids[this.id1]);

			bar1.attr("id", null);

		var bar2 = svg.select("#g" + this.ids[this.id2]);

			bar2.attr("id", null);

			bar1.attr("id", this.ids[this.id2]);
			bar2.attr("id", this.ids[this.id1]);

		var newColor2 = svg.select("#g" + this.ids[this.id1]).select("rect").style("fill");
		var newColor1 = svg.select("#g" + this.ids[this.id2]).select("rect").style("fill");

		svg.select("#g" + this.ids[this.id1]).select("rect").style("fill", newColor1);
		svg.select("#g" + this.ids[this.id2]).select("rect").style("fill", newColor2);
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
export default class MergeSort extends React.Component {
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
			waitTime: (9 * 2000) / 8,
			inputMode: false,
			restartFlag: false,
			interval: null,
		};

		this.ref = React.createRef();

		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.restart = this.restart.bind(this);
		this.backward = this.backward.bind(this);
		this.forward = this.forward.bind(this);
		this.turnOffRunning = this.turnOffRunning.bind(this);
		this.run = this.run.bind(this);
		this.handleInsert = this.handleInsert.bind(this);
		this.sortCaller = this.sortCaller.bind(this);
	}

	printArray(arr, size) {
		for (let i = 0; i < size; i++)
		{
			// console.log(arr[i]);
		}
	}

	//sliceStep - cuts the array in half at designated location (working)
	//convergeStep - brings the cut arrays back together (not tested)
	//moveStep - not implemented
	//FirstColor - lights up the first element in the array (working)
	//ColorLowStep - changes colors of selected elements (not tested)
	//MergeStep - brings arrays back together (not tested)
	//ColorPivotStep
	//PartitionStep - split (not tested)
	//UnpartitionStep - bring together (not tested)
	//SortedStep
	//SwapStep

	sortCaller(arr, ids, stepTime) {
		let lines = this.props.lines;
		var [array,pseudocodeArr,steps,messages] = this.sort(arr, ids, stepTime, lines);
		this.props.handleCodeStepsChange(pseudocodeArr);
		this.setState({steps: steps});
		this.setState({messages: messages});
	}

	sort(arr, ids, stepTime,lines) {
		let steps = [];
		let messages = [];
		let test = [];
		let pseudocodeArr = [];
		
		// sortRecursive doesn't have lines in parameter yet
		// componentDidUpdate needs to update sort to sortCaller
		[steps, messages, test, pseudocodeArr] = this.sortRecursive(arr, [...ids], ids, steps, messages, stepTime, pseudocodeArr);
		//console.log(pseudocodeArr);
		this.setState({steps: steps, messages: messages})
		this.props.handleCodeStepsChange(pseudocodeArr);
	}

	// ARR SHOULD NEVER CHANGE
	// MOVE AROUND IDS
	sortRecursive(arr, partition, ids, steps, messages, stepTime, pseudocodeArr) {
		// Midpoint 
		const midpoint = Math.ceil(partition.length / 2);

		// console.log("ids:  " + ids);
		// console.log("vals: " + arr);

		// initial messages and steps
		if (steps.length === 0) {
			messages.push("<h1>Beginning Merge Sort!</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(0,this.props.lines));
		}
	
		// Base case or terminating case
		if(partition.length < 2){
			messages.push("<h1>Checking the Base Case.</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(4,this.props.lines));

			messages.push("<h1>Array Too Small. Merge Sort Cannot Continue.</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(5,this.props.lines));
			return [steps, messages, partition,pseudocodeArr]; 
		}

		messages.push("<h1>Slicing Array (Left)</h1>");
		steps.push(new PartitionStep(0, midpoint, partition.length, partition, stepTime));
		pseudocodeArr.push(new HighlightLineStep(2,this.props.lines));
		
		messages.push("<h1>Slicing Array (Right)</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(3,this.props.lines));

		const left = partition.slice(0, midpoint);
		const right = partition.slice(midpoint, partition.length)

		// console.log("right: " + right)
		// messages.push("<h1>Swapping values</h1>");
		// steps.push(new SortedStep(0, 3, ids, stepTime))

		messages.push("<h1>Running Merge Sort on Left Partition.</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(7,this.props.lines));
		const lMerge = this.sortRecursive(arr, left, ids, steps, messages, stepTime,pseudocodeArr);

		messages.push("<h1>Running Merge Sort on Right Partition.</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(8,this.props.lines));
		const rMerge = this.sortRecursive(arr, right, ids, steps, messages, stepTime,pseudocodeArr);

		messages.push("<h1>Merging</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(9,this.props.lines));
	
		const mergedIdArray = this.merge(lMerge, rMerge, steps, messages, arr, stepTime,pseudocodeArr);
		
		messages.push("<h1>Finished Iteration!</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(10,this.props.lines));
		
		return [steps, messages, mergedIdArray,pseudocodeArr]
	}

	merge(l, r, steps, messages, vals, stepTime,pseudocodeArr) {
		// Break out of loop if any one of the array gets empty
		var [s, m, left] = l
		var [s1, m1, right] = r
		var result = [];

		var startId = left[0]
		var offset = 0;

		// New step to raise all of them
		messages.push("<h1>Comparing values in Left and Right Sub-Arrays</h1>");
		steps.push(new RaiseStep([...left, ...right], stepTime));
		pseudocodeArr.push(new HighlightLineStep(13,this.props.lines));

		while (left.length > 0 && right.length > 0) {
			messages.push("<h1>The Left and Right Arrays are Longer than 0.</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(15,this.props.lines));
			// Pick the smaller among the smallest element of left and right sub arrays 
			if (vals[left[0]] < vals[right[0]]) {
				messages.push("<h1>Comparing Left and Right Values</h1>");
				steps.push(new EmptyStep());
				pseudocodeArr.push(new HighlightLineStep(16,this.props.lines));

				messages.push("<h1>"+ vals[left[0]]+ " value is Smaller than "+ vals[right[0]]+"</h1>");
				steps.push(new ConvergeStep(left[0], startId, offset, stepTime));
				pseudocodeArr.push(new HighlightLineStep(17,this.props.lines));
				result.push(left.shift());
				offset += 100;
			} else {
				messages.push("<h1>Comparing Left and Right Values</h1>");
				steps.push(new EmptyStep());
				pseudocodeArr.push(new HighlightLineStep(19,this.props.lines));

				messages.push("<h1>"+ vals[right[0]]+ " value is Smaller than "+ vals[left[0]]+"</h1>");
				steps.push(new ConvergeStep(right[0], startId, offset, stepTime));
				pseudocodeArr.push(new HighlightLineStep(20,this.props.lines));

				result.push(right.shift());
				offset += 100;
			}
			startId = result[0]
		}

		// Steps to add to end of small array
		while (left.length > 0) {
			messages.push("<h1>The Left Array is Longer than 0.</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(23,this.props.lines));

			const id = left.shift()
			messages.push("<h1>Adding the rest of the left array to the result</h1>");
			steps.push(new ConvergeStep(id, startId, offset, stepTime));
			pseudocodeArr.push(new HighlightLineStep(25,this.props.lines));

			result.push(id);
			offset += 100;
		}

		while (right.length > 0) {
			messages.push("<h1>The Right Array is Longer than 0.</h1>");
			steps.push(new EmptyStep());
			pseudocodeArr.push(new HighlightLineStep(27,this.props.lines));

			const id = right.shift()
			messages.push("<h1>Adding the rest of the right array to the result</h1>");
			steps.push(new ConvergeStep(id, startId, offset, stepTime));
			pseudocodeArr.push(new HighlightLineStep(29,this.props.lines));

			result.push(id);
			offset += 100;
		}

		messages.push("<h1>Returning Merged Array!</h1>");
		steps.push(new EmptyStep());
		pseudocodeArr.push(new HighlightLineStep(31,this.props.lines));

		return result;
	}

	dataInit() {
		var arr = [];

		// fills arr with random numbers [15, 70]
		for (let i = 0; i < this.state.size; i++)
		{
			arr[i] = 15 + Math.floor(Math.random() * 56);
		}

		console.log("data init");
		this.printArray(arr, this.state.size);

		this.setState({arr: arr});
	}

	initialize() {
		const barWidth = 100;
		const barOffset = 1;
		const height = 100;
		const width = (10 * (barWidth + barOffset)) + 100

		let yScale = d3.scaleLinear()
			.domain([0, d3.max(this.state.arr)])
			.range([0, height]);

		var svg = d3.select(this.ref.current)
			.append("svg")
				.attr("width", "100%")
				.attr("height", height + 250);

		svg.attr("perserveAspectRatio", "xMinYMid meet")
		svg.attr("viewBox", "-25 -50 " + (width+100) + " " + (height+250))

		var bars = svg.selectAll(".bar")
					.data(this.state.arr)
					.enter().append("g")
					.attr("class", "bar")
					.attr("id", function (_, i) {
						return "g" + i;
					});
		
		bars.append("rect")
				.attr("width", barWidth)
				.attr("height", height)
				.attr("x", (_, i) => {
					return (i * (barWidth + barOffset)) + 65;
				})
				.attr("y", height)
				.attr("stroke", "rgb(255,255,255)")
				.attr("stroke-width", "2")
				.style("fill", localStorage.getItem('secondaryColor'));

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
				.style("fill", localStorage.getItem('primaryColor'));

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
				.attr("fill", localStorage.getItem('primaryColor'));

		bars.append("path")
			.attr("d", (_, i) => {
				return d3.line()([[i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 85], [i * (barWidth + barOffset) + (barWidth / 2) + 65, height + 35]]);
			})
			.attr("stroke-width", 1)
			.attr("stroke", localStorage.getItem('primaryColor'))
			.attr("marker-end", "url(#arrow)")
			.attr("fill", localStorage.getItem('primaryColor'))
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
			.style("fill", localStorage.getItem('primaryColor'))
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
			.style("fill", localStorage.getItem('primaryColor'))
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
			.style("fill", localStorage.getItem('primaryColor'))
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
			.style("fill", localStorage.getItem('primaryColor'))
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
			.style("fill", localStorage.getItem('primaryColor'))
			.attr("visibility", "hidden");

		var ids = [];

		for (let i = 0; i < this.state.arr.length; i++)
		{
			//may need to remove g 
			ids.push(i);
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
		this.props.codeSteps[this.state.stepId].forward();
		// console.log(this.state.steps[this.state.stepId]);
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});

		d3.timeout(this.turnOffRunning, this.props.waitTime);
	}

	backward() {
		console.log("BACKWARD CLICKED");
		if (this.state.running) return;
		if (this.state.stepId - 1 < 0) return;

		var stepId = this.state.stepId - 1;

		// Easy backward functions so just run that
		if (this.state.steps[stepId] instanceof EmptyStep || this.state.steps[stepId] instanceof PartitionStep ||
			this.state.steps[stepId] instanceof UnpartitionStep || this.state.steps[stepId] instanceof SwapStep) {
				// console.log(this.state.steps[stepId]);
				this.state.steps[stepId].backward(d3.select(this.ref.current).select("svg"));
				this.props.codeSteps[this.state.stepId].forward();
		}
		else { // Or make a new svg and run steps up until step before
			d3.select(this.ref.current).select("svg").remove();

			var svg = this.initialize();

			for (var i = 0; i < stepId; i++) {
				this.state.steps[i].fastForward(svg);
				// console.log(this.state.steps[i]);
			}

			svg.attr("visibility", "visible");
		}

		document.getElementById("message").innerHTML = (stepId - 1 < 0) ? "<h1>Welcome to Merge Sort!</h1>" : this.state.messages[stepId - 1];
		this.setState({stepId: stepId});
		d3.timeout(this.turnOffRunning, this.props.waitTime);
	}

	run() {
		clearInterval(this.state.interval)
		if (!this.state.running) return;
		if (this.state.stepId === this.state.steps.length) {
			this.setState({running: false});
			return;
		}
		this.state.steps[this.state.stepId].forward(d3.select(this.ref.current).select("svg"));
		this.props.codeSteps[this.state.stepId].forward();
		document.getElementById("message").innerHTML = this.state.messages[this.state.stepId];
		this.setState({stepId: this.state.stepId + 1});
		// d3.timeout(this.run, this.props.waitTime);
		this.setState({interval: setInterval(this.run, this.props.waitTime)})

	}

	play() {
		console.log("PLAY CLICKED");
		if (this.state.running) return;
		this.setState({running: true, restartFlag: false});
		this.run(d3.select(this.ref.current).select("svg"));
	}

	pause() {
		console.log("PAUSE CLICKED");
		this.setState({running: false});
	}

	restart() {
		console.log("RESTART CLICKED");
		var svg = d3.select(this.ref.current).select("svg");
        svg.remove();
        document.getElementById("message").innerHTML = "<h1>Welcome to Merge Sort!</h1>";
		this.setState({running: false, steps: [], ids: [], messages: [], stepId: 0, restartFlag: true});
	
	}

	componentDidMount() {
		this.dataInit();
	}

	componentDidUpdate(prevProps, prevState) {
		var svg = d3.select(this.ref.current).select("svg");
		if (this.state.inputMode) {
			if (JSON.stringify(this.state.arr)!==JSON.stringify(prevState.arr)) {
				console.log("1");
				d3.select(this.ref.current).select("svg").remove();
				this.initialize();
			}
			else if (this.state.ids.length > prevState.ids.length) {
				d3.select(this.ref.current).select("svg").attr("visibility", "visible");
				console.log("2")
				this.sort([...this.state.arr], this.state.ids, this.state.stepTime);
				this.play();
				this.setState({inputMode: false});
			}
			// Part of restart -> Reinitialize with original array
			else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
				console.log("3");
				let svg = this.initialize();
				svg.attr("visibility", "visible");
			}
			else if (this.state.running !== prevState.running && this.state.running === true)
			{
				this.run();
				console.log("4");
				this.setState({inputMode: false});
			}
		} else {
			// Data array changed in dataInit -> Make visual
			if (this.state.arr.length > prevState.arr.length) {
				console.log("1a")
				svg = this.initialize();
				svg.attr("visibility", "visible");
			}
			// IDs array changed in initialize -> sort copy of array to get steps and messages
			else if (this.state.ids.length > prevState.ids.length) {
				console.log("2a");
				this.sort([...this.state.arr], this.state.ids, this.state.stepTime);
				//console.log("ran visualizer");
			}
			// For reset
			else if (this.state.steps.length !== prevState.steps.length && this.state.steps.length === 0) {
				console.log("3a");
				svg = this.initialize();
				//console.log("Made it out");
				svg.attr("visibility", "visible");
				//console.log("All good");
			}
			// Running changed
			else if (this.state.running !== prevState.running)
			{
				this.run(svg);
				console.log("4a");
			}
		}
	}

	handleInsert() {
		if (this.state.running || this.state.inputMode || this.state.restartFlag) {
			return;
		}
		let input = document.getElementById("insertVal").value;
		// Array is split by commas
		let arr = input.split(',');
		// Checks if size is too small or big 1 < size < 11
		if (arr.length < 2 || arr.length > 10) {
			document.getElementById("message").innerHTML = "<h1>Array size must be between 2 and 10!</h1>";
			return;
		}
		// Check each content if it is a number
		let i = 0;
		for (let value of arr) {
			if (!this.isNum(value)) {
				document.getElementById("message").innerHTML = "<h1>Incorrect format.</h1>";
				return;
			}
			// Parse value from string to Number
			arr[i++] = parseInt(value);
		}
		// Must input pass all the requirements..
		// Set state for running, inputmode, and array
		//console.log("inserted array: " + arr)
		this.setState({inputMode: true, arr:arr, running: false, steps: [], ids: [], messages: [], stepId: 0});
	}

	isNum(value) {
		// Short circuit parsing & validation
		let x;
		if (isNaN(value)) return false;
		x = parseFloat(value);
		return (x | 0) === x;
	}

	componentWillUnmount() {
		console.log("component unmounted")
		clearInterval(this.state.interval);
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
					<SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
				</div>
				<div class="center-screen">
					<input class="sortInput"type="text" id="insertVal" placeholder="3,5,2,3,4,5"></input>
					<button class="button" id="insertBut" onClick={this.handleInsert}>Insert</button>
				</div>
				<div class="center-screen" id="message-pane"><span id="message"><h1>Welcome to Merge Sort!</h1></span></div>
				<div class="parent-svg">
					<div id="visualizerDiv" ref={this.ref} class="center-screen"></div>
					<Pseudocode algorithm={"mergesort"} lines={this.props.lines} 
								handleLinesChange={this.props.handleLinesChange} code={this.props.code} 
								handleCodeChange={this.props.handleCodeChange} codeSteps={this.state.codeSteps} 
								handleCodeStepsChange={this.handleCodeStepsChange}>
					</Pseudocode>
				</div>
			</div>
		)
	}
}