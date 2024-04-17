import {IGameProps} from "./types";
import Table from "../table/table";
import {interval, Observable} from "rxjs";

export default class Game{
    private table: Table | undefined
    private readonly interval: Observable<number>
    constructor(props: IGameProps) {
        this.interval = interval(20)
        this.table = new Table({
            gameSize: props.gameSize,
            context: props.context,
        })
        props.canvas.addEventListener('mousemove', this.table.setImpact.bind(this.table))
        this.interval.subscribe(this.table.gameTick.bind(this.table))
    }
}