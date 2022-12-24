import './Game.css'
import {useEffect, useRef} from "react";
import {lighterGreen, lightGreen} from "../../index";
import {drawSnow, initSnow, updateSnow} from "./Snow";

const GameForm = props => {

    const canvasRef = useRef(null);
    const canvasRefBlur = useRef(null);

    const drawTree = (ctx, col) => {
        let heightOffset = 150;
        let treeWidth = 500;
        let treeHeight = 650;
        let firstHeight = 150;
        let secondHeight = 400;
        let trunkSize = 50;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.strokeStyle = col;
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.moveTo(ctx.canvas.width/2, heightOffset);
        ctx.lineTo(ctx.canvas.width/2 + treeWidth/5, heightOffset+firstHeight);
        ctx.lineTo(ctx.canvas.width/2 + treeWidth/5 - 50, heightOffset+firstHeight);
        ctx.lineTo(ctx.canvas.width/2 + treeWidth/2 - 50, heightOffset+secondHeight);
        ctx.lineTo(ctx.canvas.width/2 + treeWidth/2 - 120, heightOffset+secondHeight);
        ctx.lineTo(ctx.canvas.width/2 + treeWidth/2 , heightOffset+treeHeight);
        ctx.lineTo(ctx.canvas.width/2 + trunkSize/2 , heightOffset+treeHeight);
        ctx.lineTo(ctx.canvas.width/2 + trunkSize/2 , heightOffset+treeHeight+trunkSize);
        ctx.lineTo(ctx.canvas.width/2 - trunkSize/2 , heightOffset+treeHeight+trunkSize);
        ctx.lineTo(ctx.canvas.width/2 - trunkSize/2 , heightOffset+treeHeight);
        ctx.lineTo(ctx.canvas.width/2 - treeWidth/2 , heightOffset+treeHeight);
        ctx.lineTo(ctx.canvas.width/2 - treeWidth/2 + 120, heightOffset+secondHeight);
        ctx.lineTo(ctx.canvas.width/2 - treeWidth/2 + 50, heightOffset+secondHeight);
        ctx.lineTo(ctx.canvas.width/2 - treeWidth/5 + 50, heightOffset+firstHeight);
        ctx.lineTo(ctx.canvas.width/2 - treeWidth/5, heightOffset+firstHeight);
        ctx.lineTo(ctx.canvas.width/2 , heightOffset);
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasBlur = canvasRefBlur.current;
        const context = canvas.getContext('2d');
        const contextBlur = canvasBlur.getContext('2d');
        contextBlur.canvas.style.filter = 'blur(1rem)';
        let animationFrameId;

        initSnow(context);

        setInterval(() => {updateSnow(context)}, 40);

        //Our draw came here
        const render = () => {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            contextBlur.canvas.width = window.innerWidth;
            contextBlur.canvas.height = window.innerHeight;
            drawTree(context, lightGreen);
            drawTree(contextBlur, lighterGreen);
            drawSnow();
            animationFrameId = window.requestAnimationFrame(render);
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [drawTree])


    return (<div>
        <canvas id={"screen"} ref={canvasRef}/>
        <canvas id={"blur"} ref={canvasRefBlur}/>
    </div>);
}

export default GameForm