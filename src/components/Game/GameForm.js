import './Game.css'
import {useEffect, useRef} from "react";
import {lightGreen} from "../../index";
import {drawSnow, initSnow, updateSnow} from "./Snow";
import present from '../../1175589.png';

const GameForm = props => {

    const canvasRef = useRef(null);
    const canvasRefBlur = useRef(null);
    const presentRef = useRef(null);

    const drawTree = (ctx, col, lineWidth) => {
        let heightOffset = 150;
        let treeWidth = 500;
        let treeHeight = 650;
        let firstHeight = 150;
        let firstIn = 50;
        let secondHeight = 400;
        let secondIn = 120;
        let trunkSize = 50;

        if (window.innerWidth < 500 || window.innerHeight < 850) {
            heightOffset = 150;
            treeWidth = 250;
            treeHeight = 325;
            firstHeight = 75;
            firstIn = 25;
            secondHeight = 200;
            secondIn = 60;
            trunkSize = 25;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.strokeStyle = col;
        ctx.lineWidth = lineWidth;
        ctx.beginPath()
        ctx.moveTo(ctx.canvas.width / 2, heightOffset);
        ctx.lineTo(ctx.canvas.width / 2 + treeWidth / 5, heightOffset + firstHeight);
        ctx.lineTo(ctx.canvas.width / 2 + treeWidth / 5 - firstIn, heightOffset + firstHeight);
        ctx.lineTo(ctx.canvas.width / 2 + treeWidth / 2 - firstIn, heightOffset + secondHeight);
        ctx.lineTo(ctx.canvas.width / 2 + treeWidth / 2 - secondIn, heightOffset + secondHeight);
        ctx.lineTo(ctx.canvas.width / 2 + treeWidth / 2, heightOffset + treeHeight);
        ctx.lineTo(ctx.canvas.width / 2 + trunkSize / 2, heightOffset + treeHeight);
        ctx.lineTo(ctx.canvas.width / 2 + trunkSize / 2, heightOffset + treeHeight + trunkSize);
        ctx.lineTo(ctx.canvas.width / 2 - trunkSize / 2, heightOffset + treeHeight + trunkSize);
        ctx.lineTo(ctx.canvas.width / 2 - trunkSize / 2, heightOffset + treeHeight);
        ctx.lineTo(ctx.canvas.width / 2 - treeWidth / 2, heightOffset + treeHeight);
        ctx.lineTo(ctx.canvas.width / 2 - treeWidth / 2 + secondIn, heightOffset + secondHeight);
        ctx.lineTo(ctx.canvas.width / 2 - treeWidth / 2 + firstIn, heightOffset + secondHeight);
        ctx.lineTo(ctx.canvas.width / 2 - treeWidth / 5 + firstIn, heightOffset + firstHeight);
        ctx.lineTo(ctx.canvas.width / 2 - treeWidth / 5, heightOffset + firstHeight);
        ctx.lineTo(ctx.canvas.width / 2, heightOffset);
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasBlur = canvasRefBlur.current;
        const p = presentRef.current;
        const context = canvas.getContext('2d');
        const contextBlur = canvasBlur.getContext('2d');
        contextBlur.canvas.style.filter = 'blur(1rem)';
        let animationFrameId;

        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        contextBlur.canvas.width = window.innerWidth;
        contextBlur.canvas.height = window.innerHeight;

        initSnow(context);

        setInterval(() => {
            updateSnow(context)
        }, 40);

        //Our draw came here
        const render = () => {
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            contextBlur.canvas.width = window.innerWidth;
            contextBlur.canvas.height = window.innerHeight;
            drawTree(context, lightGreen, 3);
            drawTree(contextBlur, lightGreen, 10);
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
        <div className={"container-present"} ref={presentRef} onClick={console.log}>
            <span>???</span>
            <img id={"present"} src={present} alt={"Click here"}/>
        </div>
    </div>);
}

export default GameForm