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
      isRolling: false,
      roundWinner: null
    }

    this.roll = this.roll.bind(this);
  }

  roll() {

    let diceValues = [];//index: 0 & 1 = player, index: 2 & 3 = computer
    for (let i = 0; i < 4; i++) {
      diceValues.push(Math.ceil(Math.random() * 6));
    }

    let winner;
    let playerScore = diceValues[0] + diceValues[1];
    let computerScore = diceValues[2] + diceValues[3];

    if (playerScore > computerScore) winner = 'player';
    else if (playerScore === computerScore) winner = 'draw'
    else winner = 'computer';

    this.setState({
      player: { dice1: diceValues[0], dice2: diceValues[1], wins: winner === 'player' ? this.state.player.wins + 1 : this.state.player.wins },
      computer: { dice1: diceValues[2], dice2: diceValues[3], wins: winner === 'computer' ? this.state.computer.wins + 1 : this.state.computer.wins },
      isRolling: true,
      roundWinner: winner
    });

    setTimeout(() => {
      this.setState({ isRolling: false });
    }, 1000);
  }

  getAnimationClassName() {
    let classNames = { player: '', computer: '' };

    if (!this.state.roundWinner) {
      return classNames;
    } else if (this.state.roundWinner === 'player') {
      classNames.player = style.win;
      classNames.computer = style.lose;
      return classNames;
    } else if (this.state.roundWinner === 'draw') {
      classNames.player = style.draw;
      classNames.computer = style.draw;
      return classNames;
    } else {
      classNames.player = style.lose;
      classNames.computer = style.win;
      return classNames;
    }
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
          <div className={`${style.player} ${this.getAnimationClassName().player}`}>

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

          <img alt="Game draw"
            src="https://w7.pngwing.com/pngs/197/820/png-transparent-equals-sign-computer-icons-equality-mathematics-mathematics-rectangle-sign-noun-project.png"
            className={style.draw_image} style={this.state.roundWinner === 'draw' ? { display: 'block' } : { display: 'none' }} /> {/* isDraw image */}

          {/* Computer */}
          <div className={`${style.player} ${this.getAnimationClassName().computer}`}>
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