import { Component } from "react";
import style from "./style.module.css";
import sides from "../../constants/diceSides";


export default class Die extends Component {
    render() {
        return (
            <div
                className={`${style.dice} ${this.props.isRolling && style.shake}`}
                style={{
                    background: `url("${sides[`${this.props.diceValue}`]}") center/cover no-repeat`
                }}></div>
        )
    }
}

Die.defaultProps = {
    diceValue: 1
}