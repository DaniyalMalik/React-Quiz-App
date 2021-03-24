import React, { Component } from 'react';
import questions from '../questions/questions.json';

class Questions extends Component {
  state = {
    score: 0,
    count: 0,
    progress: 5,
    attempted: 0,
  };

  onAnswerSelect = (value) => {
    let { count, score, attempted } = this.state;
    var buttons = document.querySelectorAll('.options');
    var add = (1 / questions.length) * 100;
    this.setState({ attempted: attempted + 1 });
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    if (value === decodeURIComponent(questions[count].correct_answer)) {
      this.setState({ score: score + add });
      if (count + 1 === 20) {
        document.getElementById('output').innerHTML =
          '<h2>Correct!</h2><h2>Quiz Completed!</h2>';
      } else {
        document.getElementById('output').innerHTML = '<h2>Correct!</h2>';
        document.getElementById('next').style.display = 'block';
      }
    } else {
      if (count + 1 === 20) {
        document.getElementById('output').innerHTML =
          '<h2>Incorrect!</h2><h2>Quiz Completed!</h2>';
      } else {
        document.getElementById('output').innerHTML = '<h2>Incorrect!</h2>';
        document.getElementById('next').style.display = 'block';
      }
    }
  };

  nextQuestion = () => {
    let { count, progress } = this.state;
    var buttons = document.querySelectorAll('.options');
    this.setState({ count: ++count });
    document.getElementById('next').style.display = 'none';
    document.getElementById('output').innerHTML = '';
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
    this.setState({ progress: progress + 5 });
    if (count + 1 === 20) {
      document.getElementById('next').disabled = true;
    } else {
      document.getElementById('output').innerHTML = '';
    }
  };

  render() {
    const { count, score, progress, attempted } = this.state;

    var add = (1 / questions.length) * 100;

    var maxScore = questions.length - attempted;
    maxScore = maxScore * add + score;

    var minScore = (score / 100) * 100;

    var array = questions[count].incorrect_answers.concat(
      questions[count].correct_answer
    );

    return (
      <div className='container'>
        <div className='card'>
          <div className='card-header'>
            <h2>
              Question {count + 1} of {questions.length}
            </h2>
            <h6>{decodeURIComponent(questions[count].category)}</h6>
            {questions[count].difficulty === 'hard' ? (
              <div>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='far fa-star'></i>
                <i class='far fa-star'></i>
              </div>
            ) : questions[count].difficulty === 'medium' ? (
              <div>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='far fa-star'></i>
                <i class='far fa-star'></i>
                <i class='far fa-star'></i>
              </div>
            ) : (
              <div>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='far fa-star'></i>
                <i class='far fa-star'></i>
                <i class='far fa-star'></i>
              </div>
            )}
          </div>
          <div class='progress'>
            <div
              class='progress-bar bg-secondary'
              style={{ width: progress + '%' }}></div>
          </div>
          <div className='card-body'>
            <p>
              <b>{decodeURIComponent(questions[count].question)}</b>
            </p>
            <div className='row'>
              {array.map((item) =>
                questions[count].type === 'multiple' ? (
                  <div className='col-md-3'>
                    <button
                      className='btn btn-dark options'
                      value={decodeURIComponent(item)}
                      type='submit'
                      onClick={() =>
                        this.onAnswerSelect(decodeURIComponent(item))
                      }>
                      {decodeURIComponent(item)}
                    </button>
                  </div>
                ) : (
                  <div className='col-md-3'>
                    <button
                      className='btn btn-dark options'
                      value={decodeURIComponent(item)}
                      type='submit'
                      onClick={() =>
                        this.onAnswerSelect(decodeURIComponent(item))
                      }>
                      {decodeURIComponent(item)}
                    </button>
                  </div>
                )
              )}
            </div>
            <br />
            <div id='output'></div>
            <button
              id='next'
              style={{ display: 'none' }}
              className='btn btn-dark'
              onClick={this.nextQuestion}
              type='submit'>
              Next
            </button>
          </div>
          <div className='card-footer'>
            <h5 style={{ textAlign: 'left' }}>Score: {score}%</h5>
            <h5 style={{ textAlign: 'right' }}>Max Score: {maxScore}%</h5>
            <div className='row'>
              <div className='col-md-12'>
                <div class='progress'>
                  <div
                    class='progress-bar bg-dark'
                    style={{ width: minScore + '%' }}></div>
                  <div
                    class='progress-bar bg-secondary'
                    style={{ width: score + '%' }}></div>
                  <div
                    class='progress-bar bg-light'
                    style={{ width: maxScore + '%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Questions;
