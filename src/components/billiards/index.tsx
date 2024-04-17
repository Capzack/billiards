import React, {useEffect, useRef, useState} from "react";
import {IBilliardsProps} from "./types";
import './syles.css'
import Game from "../../services/game/game";

export default function Billiards(props: IBilliardsProps){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const game = useRef<Game | null>(null)

    useEffect(() => {
        if(canvasRef.current){
            const context = canvasRef.current.getContext('2d')
            if (context && !game.current) {
                game.current = new Game({gameSize: props.size, canvas: canvasRef.current, context: context})
            }
        }


    }, [])

    return (
        <canvas {...{
            ...props.size,
            ref: canvasRef,
            className: 'billiard-table',
        }}/>
    );
}