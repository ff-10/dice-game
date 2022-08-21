import { Component } from "react";
import style from "./style.module.css"
import Die from "../Die";

export default class RollDice extends Component {

  constructor() {
    super();

    this.state = {
      player: {
        dice1: 1,
        dice2: 1,
        wins: 0
      },
      computer: {
        dice1: 1,
        dice2: 1,
        wins: 0
      },
      isRolling: false
    }

    this.roll = this.roll.bind(this);
  }

  roll() {

    let dices = [
      {
        dice1: Math.ceil(Math.random() * 6),
        dice2: Math.ceil(Math.random() * 6),
      },
      {
        dice1: Math.ceil(Math.random() * 6),
        dice2: Math.ceil(Math.random() * 6),
      },
    ]
    let winner;

    if (dices[0].dice1 + dices[0].dice2 < dices[1].dice1 + dices[1].dice2) {
      winner = 'player';
    } else {
      winner = 'computer';
    }

    this.setState({
      player: { dice1: dices[0].dice1, dice2: dices[0].dice2, wins: winner === 'player' ? this.state.player.wins + 1 : this.state.player.wins },
      computer: { dice1: dices[1].dice1, dice2: dices[1].dice2, wins: winner === 'computer' ? this.state.computer.wins + 1 : this.state.computer.wins },
      isRolling: true
    });

    setTimeout(() => {
      this.setState({ isRolling: false })
    }, 1000);
  }

  render() {
    return (
      <div className={style.game_board}>
        <div className={style.game_header}>
          <p className={style.game_title}>dice game</p>
          <button onClick={this.roll} className={style.roll_btn} disabled={this.state.isRolling}>{this.state.isRolling ? 'Rolling' : 'Roll Dices'}</button>
        </div>

        <div className={style.players_area}>

          {/* Player */}
          <div className={style.player}>
            <div className={style.player_header}>
              <p className={style.player_name}>You</p>
              <p className={style.player_score}>Wins: {this.state.player.wins}</p>
            </div>
            <div className={style.player_dices}>
              <Die isRolling={this.state.isRolling} diceValue={this.state.player.dice1} />
              <div className={style.divider}></div>
              <Die isRolling={this.state.isRolling} diceValue={this.state.player.dice2} />
            </div>
          </div>

          {/* Computer */}
          <div className={style.player}>
            <div className={style.player_header}>
              <p className={style.player_name}>Computer</p>
              <p className={style.player_score}>Wins: {this.state.computer.wins}</p>
            </div>
            <div className={style.player_dices}>
              <Die isRolling={this.state.isRolling} diceValue={this.state.computer.dice1} />
              <div className={style.divider}></div>
              <Die isRolling={this.state.isRolling} diceValue={this.state.computer.dice2} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}